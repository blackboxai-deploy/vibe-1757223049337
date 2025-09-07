/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Luminara Brand Colors
        luminara: {
          'deep-blue': '#1a365d',
          'vibrant-teal': '#2dd4bf',
          'warm-accent': '#f59e0b',
          'soft-blue': '#3b82f6',
          'light-teal': '#5eead4',
          'dark-slate': '#0f172a',
          'glass-blue': 'rgba(26, 54, 93, 0.8)',
          'glass-teal': 'rgba(45, 212, 191, 0.8)',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'luminara-gradient': 'linear-gradient(135deg, #1a365d 0%, #2dd4bf 50%, #f59e0b 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(26, 54, 93, 0.1) 0%, rgba(45, 212, 191, 0.1) 100%)',
        'hero-gradient': 'linear-gradient(145deg, #0f172a 0%, #1a365d 50%, #2dd4bf 100%)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'card-hover': 'card-hover 0.3s ease-in-out',
        'progress-fill': 'progress-fill 2s ease-in-out',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(45, 212, 191, 0.5)',
            transform: 'scale(1)' 
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(45, 212, 191, 0.8)',
            transform: 'scale(1.05)' 
          },
        },
        'slide-up': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        'slide-in': {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(-30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        'card-hover': {
          '0%': { 
            transform: 'translateY(0px) rotateX(0deg)',
          },
          '100%': { 
            transform: 'translateY(-10px) rotateX(5deg)',
          },
        },
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transform: {
        '3d': 'preserve-3d',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const new3DUtilities = {
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.perspective-2000': {
          'perspective': '2000px',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.glass-card': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': '16px',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
        '.glass-dark': {
          'background': 'rgba(26, 54, 93, 0.3)',
          'backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(45, 212, 191, 0.2)',
          'border-radius': '16px',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        '.float-3d': {
          'transform': 'translateZ(0)',
          'animation': 'float 6s ease-in-out infinite',
        },
        '.card-3d': {
          'transform': 'rotateX(5deg) rotateY(5deg)',
          'transition': 'transform 0.3s ease',
        },
        '.card-3d:hover': {
          'transform': 'rotateX(10deg) rotateY(10deg) translateZ(20px)',
        },
      }
      addUtilities(new3DUtilities)
    }
  ],
}