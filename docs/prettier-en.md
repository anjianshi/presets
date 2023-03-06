# Common Prettier Config

## Usage

1. Install
   ```sh
   yarn add --dev @anjianshi/presets
   ```
2. Create `.prettierrc.js` file at the root directory of the project:
   ```js
   module.exports = '@anjianshi/presets/prettierrc'
   ```

## Use With VSCode

1. Install `Prettier` plugin in VSCode
2. Add following content to VSCode’s settings：
   ```json
   "editor.defaultFormatter": "esbenp.prettier-vscode",
   "editor.formatOnSave": true,
   ```
3. (Optional) You can alose add prettier config to VSCode's settings, this way, temporary projects can also apply formatting:
   ```json
   "prettier.semi": false
   ...
   ```
