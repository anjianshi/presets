# 通用 tsconfig.json 配置

| 文件                                              | 场景                                                            |
| ------------------------------------------------- | --------------------------------------------------------------- |
| @anjianshi/presets-typescript/tsconfig-base.json  | 用 TypeScript 包进行类型检查、用其他工具编译代码                |
| @anjianshi/presets-typescript/tsconfig-build.json | 用 tsc 执行编译（支持编译类库和 Node.js 脚本，输出 ES6 Module） |
| @anjianshi/presets-typescript/tsconfig-vite.json  | 用 Vite 打包                                                    |

注意：此包已包含对 TypeScript 的依赖，无需在项目里再次添加 TypeScript
