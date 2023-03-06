# 公共 Prettier Config

## 如何使用

1. 安装此类库
   ```sh
   yarn add --dev @anjianshi/presets
   ```
2. 项目根目录建立 `.prettierrc.js` 文件：
   ```js
   module.exports = '@gnlab/presets/prettierrc'
   ```

## 配置 VSCode

1. VSCode 安装 `Prettier` 插件
2. VSCode 配置里指定如下内容：
   ```json
   "editor.defaultFormatter": "esbenp.prettier-vscode",
   "editor.formatOnSave": true,
   ```
3. 也可以把此配置粘贴到 VSCode 配置里作为全局配置，这样临时项目也能应用格式化，格式如下：
   ```json
   "prettier.semi": false
   ```
