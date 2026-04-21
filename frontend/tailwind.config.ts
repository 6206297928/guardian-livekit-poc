import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // This covers BOTH app and components folders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
