/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0D0E12",       // Deep midnight slate canvas background
        surface: "#16171D",      // Elevated surface charcoal for component cards
        insetSurface: "#1E2028", // Recessed dark contrast for inputs and dropdowns
        primaryText: "#F3F4F6",  // Soft off-white to eliminate eye strain
        mutedText: "#9CA3AF",    // Highly legible medium gray for descriptions
        sfBlue: "#3B82F6",       // Premium Apple-style interactive blue
        googleIndigo: "#818CF8", // Premium Google Material-style indigo accent
      },
      borderRadius: {
        'squircle': '16px',      // Smooth organic corner radius for primary layers
      },
      screens: {
        'xs': '375px',           // Extra small breakpoint targeting compact mobile devices
      }
    },
  },
  plugins: [],
}
