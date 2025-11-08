export default {
  "extends": "stylelint-config-standard",
  "ignoreFiles": [
    // 忽略 dist 文件夹下所有文件（含子文件夹）
    "dist/**/*",
    // 可选：补充忽略其他无需检查的文件（如压缩后的 CSS、node_modules）
    "*.min.css",
    "node_modules/**/*"
  ]
}
