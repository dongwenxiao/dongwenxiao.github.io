# 电子印章前端

## 包管理
- 统一使用 pnpm，锁文件为 `pnpm-lock.yaml`，请勿生成或提交 `package-lock.json`/`yarn.lock`。
- 安装依赖：`pnpm install`。

## 域名限制
- 允许域名的哈希在 `main.js` 的 `LICENSED_HOST_HASHES` 中，只有这些域名能正常工作。
- 非允许域名会触发反滥用逻辑：字体随机错乱、字号被锁定不可修改。
- 若域名校验不通过，印章样式不可控（字体随机、字号固定，调节无效），仅用于提示盗链者，正常效果无法保障。
- 页面全局暴露了 `window.hostHash()`，默认会返回当前域名的哈希，也可传入域名字符串生成哈希用于更新白名单。

## 构建与混淆
- 默认 `pnpm build` 会用 `javascript-obfuscator`（在 `vite.config.js` 中的自定义插件）对产物做进一步混淆，启用了控制流平坦化、字符串数组、全局重命名等选项。
- 如果需要调整混淆强度，可修改 `vite.config.js` 中传给 `obfuscatePlugin` 的配置。
- 构建输出目录：`public/apps/dianziyinzhang`。

## 开发命令
- 本地开发：`pnpm dev`
- 构建产物：`pnpm build`
- 本地预览：`pnpm preview`
