
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  singleQuote: false,
  semi: true,
  trailingComma: "es5",
  jsxSingleQuote: false,
  tailwindStylesheet: "./src/app/style.css",
};

export default config;