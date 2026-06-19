import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0fbfa',
          100: '#ccf2ee',
          200: '#99e5de',
          400: '#2bbfb0',
          500: '#2bbfb0',
          600: '#1a9e91',
          700: '#0f7a70',
          800: '#085550',
        },
        navy: {
          50:  '#eef1f8',
          100: '#ccd4eb',
          400: '#5570b0',
          600: '#2a4a90',
          700: '#1a3068',
          800: '#102050',
          900: '#091530',
        },
        ink: {
          50:  '#f7f7f5',
          100: '#eeeeea',
          200: '#d8d8d2',
          400: '#9c9c94',
          600: '#5a5a54',
          800: '#222220',
          900: '#0f0f0e',
        },
      },
    },
  },
  plugins: [],
}
export default config
