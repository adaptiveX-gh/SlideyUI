import slideyUI from '@slideyui/core';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,tsx}'],
  safelist: [
    // SlideyUI component classes that must always be included
    { pattern: /^slide-.*/ },
    { pattern: /^card-.*/ },
  ],
  theme: {
    extend: {
      colors: {
        'slidey-primary': '#6366f1',
        'slidey-secondary': '#8b5cf6',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    slideyUI({
      theme: 'pitch-deck',
      defaultRatio: '16:9',
    }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#f59e0b',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
      'dark',
      'cupcake',
      'corporate',
      'business',
    ],
  },
};
