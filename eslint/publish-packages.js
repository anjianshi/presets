const path = require('node:path')
const fs = require('node:fs')
const childProcess = require('child_process')

const packages = [
  {
    file: 'base',
    extends: [],
    dependencies: {
      eslint: '^8.56.0',
      'eslint-plugin-import': '^2.29.1',
      'eslint-config-prettier': '^9.1.0',
    },
  },
  {
    file: 'typescript',
    extends: ['base'],
    dependencies: {
      '@typescript-eslint/eslint-plugin': '^6.19.1',
      '@typescript-eslint/parser': '^6.19.1',
      'eslint-import-resolver-typescript': '^3.6.1',
      typescript: '^5.3.3',
    },
  },
  {
    file: 'react',
    extends: ['base', 'typescript'],
    dependencies: {
      'eslint-plugin-react': '^7.33.2',
      'eslint-plugin-react-hooks': '^4.6.0',
      'eslint-plugin-ts-react-hooks': '^0.1.1',
    },
  },
  {
    file: 'node',
    extends: ['base'],
    dependencies: {},
  },
]

const packageJSONTemplate = require('./package.json')
delete packageJSONTemplate['scripts']

function getPackageName(file) {
  return packageJSONTemplate.name.replace('build', file)
}

function getIndexContent(extendFiles) {
  const paths = [
    ...extendFiles.map(file => `../../${getPackageName(file)}/exclusive.js`),
    './exclusive.js',
  ]
    .map(path => `'${path}'`)
    .join(', ')

  return `module.exports = {
  extends: [${paths}],
}
  `
}

// ---------------------------------

const base = path.resolve(__dirname)
const src = path.join(base, 'src')
const dist = path.join(base, 'dist')

fs.rmSync(dist, { force: true, recursive: true })
fs.mkdirSync(dist)

for (const package of packages) {
  const packageDir = path.join(dist, package.file)
  fs.mkdirSync(packageDir)

  const packageName = getPackageName(package.file)
  const packageJSON = {
    ...packageJSONTemplate,
    name: packageName,
    description: packageJSONTemplate.description + ' - ' + package.file,
    dependencies: {},
  }
  for (const extendFile of package.extends) {
    packageJSON.dependencies[getPackageName(extendFile)] = '^' + packageJSON.version
  }
  for (const extendFile of package.extends) {
    Object.assign(
      packageJSON.dependencies,
      packages.find(package => package.file === extendFile).dependencies
    )
  }
  Object.assign(packageJSON.dependencies, package.dependencies)
  fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify(packageJSON, undefined, 2))

  fs.writeFileSync(
    path.join(packageDir, 'exclusive.js'),
    fs.readFileSync(path.join(src, package.file + '.js'))
  )
  fs.writeFileSync(path.join(packageDir, 'index.js'), getIndexContent(package.extends))

  childProcess.execSync('npm publish', {
    cwd: packageDir,
  })
}
