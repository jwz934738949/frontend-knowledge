import fs from "fs";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

// 读取src/index.css文件内容
const style = fs.readFileSync("src/index.css", "utf8");

// 使用postcss进行处理
postcss([
  // autoprefixer，兼容处理css文件，添加前缀
  autoprefixer({
    overrideBrowserslist: "last 10 versions",
  }),
])
  .process(style, { from: undefined })
  .then((res) => {
    console.log("result", res);
  });
