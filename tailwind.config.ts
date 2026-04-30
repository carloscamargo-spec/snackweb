import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#e6fd31',
        'neutral-950': '#0a0a0a',
        'neutral-900': '#111111',
        'neutral-800': '#1a1a1a',
        'neutral-700': '#2a2a2a',
        'neutral-500': '#6b6b6b',
        'neutral-400': '#8a8a8a',
        'neutral-300': '#b8b8b8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
