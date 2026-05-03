# ui-example

一个简单的 Minecraft 基岩版（MCBE）UI 表单示例 addon，使用 TypeScript 编写，演示 `@minecraft/server-ui` 提供的三种表单（`ActionFormData` / `MessageFormData` / `ModalFormData`）以及一个简易密码验证流程。

## 功能预览

手持**书本**右键或长按（移动端）即可打开主菜单，包含以下示例：

- **选项 1**：基础按钮回调示例
- **选项 2**：打开 `MessageFormData` 双按钮确认对话框
- **选项 3**：打开 `ModalFormData` 自定义控件表单（下拉、滑动条、文本框、开关）
- **密码验证**：演示通过 `ModalFormData` 进行密码校验（正确密码：`114514`）

入口逻辑见 [`scripts/main.ts`](scripts/main.ts)。

## 旧版
之前的 Javascript 版本见[`UI-example(js-version)/scripts`](UI-example(js-version)/scripts/main.js)

## 环境要求

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 8
- Minecraft 基岩版 ≥ 1.26.10（`@minecraft/server` 2.0.0）

## 快速开始

```bash
# 安装依赖
pnpm install

# 代码检查
pnpm lint

# 构建（编译 + 打包 JS）
pnpm build

# 打包成 .mcaddon（生产模式）
pnpm mcaddon:production
```

打包产物输出到 `dist/packages/ui-example.mcaddon`，双击即可导入 Minecraft。

## 本地开发部署

将 addon 直接部署到本地 Minecraft 的 `development_*_packs` 目录，并监听文件改动自动重新构建：

```bash
pnpm local-deploy
```

> Windows 用户首次部署 Minecraft 预览版/正式版前可能需要解除回环限制：
>
> ```bash
> pnpm enablemcloopback          # 正式版
> pnpm enablemcpreviewloopback   # 预览版
> ```

## 项目结构

```
ui-example/
├── scripts/                     # TypeScript 源码（主入口 main.ts）
├── behavior_packs/ui-example/   # 行为包（含 manifest.json、pack_icon）
├── resource_packs/ui-example/   # 资源包
├── dist/                        # 构建产物（包含 .mcaddon）
├── just.config.ts               # just-scripts 任务配置
├── .env                         # 项目环境变量（PROJECT_NAME 等）
└── package.json
```

## 可用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm lint` | 运行 ESLint 检查 |
| `pnpm build` | TypeScript 编译 + esbuild 打包 |
| `pnpm build:production` | 生产模式构建 |
| `pnpm clean` | 清理构建缓存与本地部署目录 |
| `pnpm local-deploy` | 监听变动并部署到本地 Minecraft |
| `pnpm mcaddon` | 打包为 `.mcaddon` 文件 |
| `pnpm mcaddon:production` | 生产模式打包 `.mcaddon` |

## 持续集成

仓库内置 GitHub Actions 工作流（见 `.github/workflows/build.yml`）：

- 推送到任意分支或提交 PR 时自动执行 `lint` 与 `build`
- 推送形如 `v*.*.*` 的 tag 时自动构建 `.mcaddon` 并创建 GitHub Release

发布新版本只需：

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 许可证

[MIT](LICENSE) © 2026 rice-awa
