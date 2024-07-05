const baseConfig = require("@humblebrag/tailwindcss-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
