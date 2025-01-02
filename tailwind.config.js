/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui"],
      },
    },
  },
  plugins: [],
};
