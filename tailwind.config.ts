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
        background: '#fffcf9', // Warm white
        foreground: '#1e293b', // Slate 800
        primary: {
          DEFAULT: '#7c3aed', // Violet 600
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#0ea5e9', // Sky 500
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#f97316', // Orange 500
          foreground: '#ffffff',
        },
        coral: '#fb7185',
        mint: '#34d399',
        sun: '#facc15',
        muted: '#f1f5f9',
        border: '#e2e8f0',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 20px 40px -15px rgba(0, 0, 0, 0.12)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      borderRadius: {
        soft: '1.25rem',
        'soft-xl': '2rem',
      },
      backgroundImage: {
        'artistic-gradient': 'linear-gradient(135deg, #7c3aed 0%, #38bdf8 50%, #fb7185 100%)',
      }
    }
  },
  plugins: []
};

export default config;
