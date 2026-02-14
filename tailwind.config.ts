import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#fffaf6',
        text: '#1f2937',
        primary: '#7c3aed',
        accent: '#f97316',
        coral: '#fb7185',
        mint: '#34d399',
        sky: '#38bdf8',
        sun: '#facc15'
      },
      boxShadow: {
        soft: '0 10px 25px rgba(15, 23, 42, 0.08)'
      },
      borderRadius: {
        soft: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;
