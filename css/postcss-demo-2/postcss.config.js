import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import stylelint from "stylelint";
import postcssPresetEnv from "postcss-preset-env";
import postcssImport from "postcss-import";
import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";

const config = {
  plugins: [
    purgeCSSPlugin({
      content: ["./src/**/*.html"],
    }),
    postcssImport({
      path: ["./src"],
    }),
    postcssPresetEnv({
      stage: 2,
      browsers: "last 2 versions",
      autoprefixer: {
        grid: true,
      },
      preserve: true,
    }),
    stylelint({
      fix: true,
    }),
    autoprefixer(),
    cssnano(),
  ],
  // map: { inline: false },
  // syntax: "postcss-scss",
};

export default config;
