import type { Config } from 'tailwindcss'
import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      brand: {
        primary: '#2563eb',
        secondary: '#059669',
        'secondary-light': 'rgba(74, 222, 128, 0.1)',
      },
      surface: {
        0: '#111827',
        1: '#1f2937',
        2: '#374151',
        3: '#4b5563',
      },
      ink: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        subtle: '#9ca3af',
      },
      white: '#ffffff',
      black: '#000000',
      red: {
        400: '#f87171',
        500: '#ef4444',
      },
      green: {
        400: '#4ade80',
        500: '#22c55e',
      },
      yellow: {
        400: '#facc15',
      },
      blue: {
        700: '#1d4ed8',
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [
    lineClamp,
  ],
}

export default config