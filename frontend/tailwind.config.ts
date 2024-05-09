import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'ph': '340px',
      // => @media (min-width: 440px) { ... }

      'phone': '440px',
      // => @media (min-width: 440px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'gray-1000': '#2E2E2E',
        'gray-950': '#4E4E4E',
        'gray-900': '#2c2c2c',
        'black': '#0F0F0F',
        'primary': '#81E6D9',
        'secondary': '#212121',
        'white': '#FFFFFF',

      },
    },
  },
  plugins: [],
};
export default config;
