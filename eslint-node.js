module.exports = {
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'global-require': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'import/no-dynamic-require': 'off',
    // Node.js ES6 Module 里需要把 noUselessIndex 设为 false
    // 'noUselessIndex' needs to be set to false in Node.js ES6 Modules.
    'import/no-useless-path-segments': ['error', { noUselessIndex: false }],
  },
}
