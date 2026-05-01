/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Allianz-aligned brand tokens (from existing strategy doc)
        teal: {
          50: '#EAF6F7',
          100: '#CFE8EB',
          400: '#1FA3B0',
          600: '#007B87', // primary brand
          700: '#005F69',
          900: '#003339',
        },
        gold: {
          400: '#D9BB6E',
          500: '#C9A84C', // brand accent
          600: '#A88836',
        },
        cream: '#FAF8F4',   // Kinfolk warm white background
        stone: {
          100: '#F2EEE5',
          200: '#E8E2D6',
          400: '#A8A095',
          600: '#5C544A',
          800: '#2A2520',
        },
        ink: '#1A1A1A',
      },
      fontFamily: {
        // IBM Plex Sans Thai = body, Anuphan = display/headings (both cover TH + EN).
        sans: ['"IBM Plex Sans Thai"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['"Anuphan"', '"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Editorial scale — generous, readable
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'prose-narrow': '38rem',
        'prose-wide': '72rem',
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 8rem)',
      },
    },
  },
  plugins: [],
};
