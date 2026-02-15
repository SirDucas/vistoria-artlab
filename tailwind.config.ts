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
        background: '#000000', // True black
        foreground: '#f8fafc', // Slate 50
        primary: {
          DEFAULT: '#8b5cf6', // Violet 500 (slightly brighter for dark)
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#38bdf8', // Sky 400 (slightly brighter)
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#fb923c', // Orange 400
          foreground: '#ffffff',
        },
        coral: '#fb7185',
        mint: '#34d399',
        sun: '#facc15',
        muted: '#1e293b', // Slate 800
        border: '#334155', // Slate 700
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
