# General ESLint Configs

## Philosophy

### Simplicity

Enable fewer rules to reduce the bug rate, rather than restrict the code style.

### Not concerned with code style

Following the suggestion of [this article](https://typescript-eslint.io/linting/troubleshooting/formatting/),
do not enable code style rules and let a dedicated formatting tool (`Prettier`) handle them.

[Excluded Rules](https://github.com/prettier/eslint-config-prettier/blob/main/index.js)，
this mainly includes all the rules in the `Layout & Formatting` section of ESLint itself, as well as many rules from the TypeScript and React plugins."

---

## Config Files

| Path                                 | Content                      |
| ------------------------------------ | ---------------------------- |
| @anjianshi/presets/eslint-base       | Base JavaScript rules        |
| @anjianshi/presets/eslint-typescript | TypeScript rules             |
| @anjianshi/presets/eslint-react      | React App rules              |
| @anjianshi/presets/eslint-node       | Rules for running in Node.js |

Each file only contains content within its own domain, and for composite scenarios, a combination of files is required (the `base` file must be imported before other files).
For example, when developing a TypeScript-based React application, you need to import the `base`, `typescript`, and `react` files."

---

## Usage

### Install

```sh
yarn add --dev eslint @anjianshi/presets
```

### Setting ESLint

Create `.eslintrc.js`：

```js
module.exports = {
  extends: [
    './node_modules/@anjianshi/presets/eslint-base',
    ...
  ]
}
```

### Setting TypeScript

1.  Install TypeScript：

    ```sh
    yarn add --dev typescript
    ```

2.  `@typescript-eslint/parser` requires specifying the location of the `tsconfig.json` file (relative to the project root directory).  
    This preset file assumes that the `tsconfig.json` file is located in the project root directory and has been configured properly.  
    If it is located in a different location, it needs to be manually specified as follows:

    ```js
    module.exports = {
      extends: [
        './node_modules/@gnlab/presets/eslint-base',
        './node_modules/@gnlab/presets/eslint-typescript',
      ],
      parserOptions: {
        project: './src/tsconfig.json',
      },
    }
    ```

3.  If you enable the Node.js native ES6 module or configure aliases in a TypeScript project,  
    `eslint-import-plugin` needs to work with `eslint-import-resolver-typescript` and specify the location of `tsconfig.json` (relative to the project root directory) to correctly resolve file references.  
    This package includes this dependency and assumes that the `tsconfig.json` file is located in the project root directory and has been properly configured.  
    If it is located in a different location, it needs to be manually specified as follows:

    ```js
    {
      settings: {
        'import/resolver': {
          typescript: {
            project: './src/'
          }
        }
      }
    }
    ```

### Setting VSCode

1. Install `ESLint` plugin in VSCode

2. Change VSCode Settings（Code - Preferences - Settings）

   ```json
   {
     "editor.tabSize": 2,
     "files.insertFinalNewline": true,
     "files.trimTrailingWhitespace": true,

     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "eslint.workingDirectories": [{ "mode": "auto" }]
   }
   ```

#### About ESLint workingDirectories

If the workspace in VSCode is configured with a directory structure similar to the following:

```js
projects/     // /Users/me/office/projects/
  proj-1/
  proj-2/
  ...

library/      // /Users/me/library/
  lib-1/
  lib-2/
```

Means that there are multiple independent folders added under the workspace,  
and each of these folders contains multiple projects (such as `proj-1`, `lib-1`, etc.).

When developing these projects (`proj-1`, `lib-1`, etc.), VSCode by default sets the top-level directory as the workingDirectory for ESLint,  
loading plugins and dependencies from that directory, which causes dependency resolution issues.

To solve this issue, you can specify `{ "mode": "auto" }` in the VSCode configuration,  
which will set the directory containing package.json as the workingDirectory for ESLint.  
This allows for proper dependency resolution.

#### About `eslint.validate`

In the past, it was necessary to configure `eslint.validate` in VSCode, but it has now been replaced by `eslint.probe`.  
Furthermore, the default value of `eslint.probe` already meets the requirements, so there is no need for further configuration.

---

## Developing

### How to update ESLint configs

Reviewing the ChangeLog of ESLint and its plugins to supplement, remove, and adjust rule definitions.
(Only defines the rules that differ from the default values. For example, rules that are not enabled by default and are not planned to be enabled are not included in the file.)
