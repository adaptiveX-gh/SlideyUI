import slideyUI from 'slideyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    slideyUI({
      theme: 'pitch-deck',
      defaultRatio: '16:9',
    }),
  ],
};
