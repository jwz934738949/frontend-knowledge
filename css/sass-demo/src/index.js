import path from "path";
import fs from "fs";
import sass from "sass";

// scss文件路径
const scssPath = path.resolve("src", "index.scss");
// css目录路径
const cssDir = "dist";
// css文件路径
const cssPath = path.resolve(cssDir, "index.css");
// 编译结果
const result = sass.compile(scssPath);

if (!fs.existsSync(cssDir)) {
  // 不存在文件路径，首先创建文件路径
  fs.mkdirSync(cssDir);
}
// 输出css内容到对应文件中
fs.writeFileSync(cssPath, result.css);
