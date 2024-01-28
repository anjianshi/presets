# 公共 ESLint 配置

## 设计思路

### 从简

少开启规则，目标为“减少 bug 率”，而不是限制代码风格。

### 不关注”代码样式“

参考 [此文章](https://typescript-eslint.io/linting/troubleshooting/formatting/) 的建议，不开启代码样式规则，
由专门的格式化工具（`Prettier`）来控制它们。

[被排除的规则列表](https://github.com/prettier/eslint-config-prettier/blob/main/index.js)，
主要包括 ESLint 自身 `Layout & Formatting` 段落的全部规则和 TypeScript、React 插件的许多规则。

---

## 包列表

| 文件                                 | 内容                    |
| ------------------------------------ | ----------------------- |
| @anjianshi/presets-eslint-base       | 基础 JavaScript 规则    |
| @anjianshi/presets-eslint-typescript | TypeScript 规则         |
| @anjianshi/presets-eslint-react      | React + TypeScript 规则 |
| @anjianshi/presets-eslint-node       | Node.js 环境下的规则    |

除 `base` 包外，每个包里有两个文件：

- `index.js`：包含 base 规则和包自身规则
- `exclusive.js`：仅包含包自身规则

`base` 包只有 `index.js`。

只使用一个包时，直接使用包的 `index.js` 即可。
如果要组合使用多个包，例如开发使用 TypeScript 语言的 Node.js 应用，要引用：`typescript` 和 `node`，
则第一个包可以引用 `index.js`，后面的包应引用 `exclusive.js`，以免重复引入 base 规则，覆盖掉前面的包对 base 规则的修改。

---

## 如何使用

### 安装

```sh
npm install --dev @anjianshi/presets-eslint-xxx
```

此包已包含 ESLint 依赖，无需再手动添加。

### 配置 ESLint

建立一个 `.eslintrc.js` 文件：  
（若项目指定了 `{ "type": "module" }`，则要命名为 `.eslintrc.cjs`）

```js
module.exports = {
  extends: [
    './node_modules/@anjianshi/eslint-xxx',
    ...
  ]
}
```

### 配置 TypeScript

1.  安装 TypeScript

2.  `@typescript-eslint/parser` 要求指定 `tsconfig.json` 的位置（以项目根目录为基准）。  
    此预设文件已假定 `tsconfig.json` 处于项目根目录并配置好了。  
    如果它在别的位置，则需手动指明：

    ```js
    module.exports = {
      extends: ['./node_modules/@anjianshi/eslint-typescript'],
      parserOptions: {
        project: './src/tsconfig.json',
      },
    }
    ```

3.  如果在 TypeScript 项目里启用了 Node.js 原生 ES6 Module 或配置了 alias，  
    则 `eslint-import-plugin` 需要配合 `eslint-import-resolver-typescript`，并指明 `tsconfig.json` 所处位置（以项目根目录为基准），才能正确解析文件引用。  
    当前包已包含此依赖，并假定 `tsconfig.json` 处于项目根目录，配置好了。  
    如果它在别的位置，则需手动指明：

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

### 配置 VSCode

1. 安装 VSCode 插件 `ESLint`

2. 修改 VSCode 设置（Code - Preferences - Settings）

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

#### 关于 ESLint workingDirectories

若 VSCode 的 workspace 配置成类似如下目录结构：

```js
projects/     // /Users/me/office/projects/
  proj-1/
  proj-2/
  ...

library/      // /Users/me/library/
  lib-1/
  lib-2/
```

也就是，workspace 下添加了多个独立的文件夹，每个独立文件夹下又有多个项目。
在开发这些项目（`proj-1`、`lib-1`...）时，VSCode 默认会把顶层目录作为 ESLint 的 `workingDirectory`，从那个目录下加载插件等依赖，导致找不到依赖。
在 VSCode 配置里指定 `{ "mode": "auto" }` 可解决此问题，它会让 VSCode 把 `package.json` 存在的目录作为 `workingDirectory`，也就能正常引入依赖了。

#### 关于 eslint.validate 配置

以前 VSCode 里还需要配置 `eslint.validate`，但它现在被 `eslint.probe` 代替了。  
且 `eslint.probe` 的默认值已符合需求，所以无需配置。

---

## 开发说明

### 如何更新 ESLint 规则

看 ESLint 及各插件的 ChangeLog，来补充、移除、调整规则定义。
(规则文件里只定义和默认值不同的规则，例如默认不开启，也没准备开启的规则就不写下来)

### 如何发布

1. 更新 `eslint/package.json` 里的 `version`
2. 在 `eslint` 目录下执行 `npm pubish-packages`
