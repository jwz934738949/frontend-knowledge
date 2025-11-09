import { resolve } from "path";
import fs from "fs";

import { compile } from "sass";
import postcss from "postcss";
import stylelint from "stylelint";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

// 定义编译输入文件与输出文件
const from = resolve("src/styles", "optimize.scss");
const to = resolve("src/styles", "build.css");

// 编辑scss
const scssResult = compile(from);
console.log("编译成功", scssResult.css);

// postcss后处理
postcss([
  stylelint({
    fix: true,
  }),
  autoprefixer,
  cssnano,
])
  .process(scssResult.css, { from: undefined })
  .then((res) => {
    fs.writeFileSync(to, res.css);
    console.log("后处理成功");
  })
  .catch((err) => {
    console.error("后处理失败", err.message);
  });
