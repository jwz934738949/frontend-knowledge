import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import tailwindcss from "@tailwindcss/postcss";

const config = {
  plugins: [tailwindcss(), autoprefixer(), cssnano()].filter(Boolean),
};

export default config;
