/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3DD883',
        'background-light': '#F8FAFC',
        'background-dark': '#18181B',
        'light-accent': '#E6F3EC',
        'dark-accent': '#1F2937',
        'light-border': '#E2E8F0',
        'dark-border': '#374151',
        'light-text-primary': '#1E293B',
        'dark-text-primary': '#F8FAFC',
        'light-text-secondary': '#64748B',
        'dark-text-secondary': '#94A3B8',
      },
      fontFamily: {
        display: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      backgroundImage: {
        'chat-gradient-light': 'linear-gradient(180deg, #F0FFF7 0%, #FFFFFF 100%)',
        'chat-gradient-dark': 'linear-gradient(180deg, #1A2E25 0%, #18181B 100%)',
        'chat-bubble-gradient': 'linear-gradient(135deg, #005A3B 0%, #108C4F 100%)',
        'ai-chat-bubble-gradient-light': 'linear-gradient(135deg, #E6F3EC 0%, #F5FBF8 100%)',
        'ai-chat-bubble-gradient-dark': 'linear-gradient(135deg, #102A20 0%, #15392A 100%)',
      },
    },
  },
  plugins: [],
}
