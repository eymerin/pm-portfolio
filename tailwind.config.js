/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      '#1C1F28',
          surface: '#2A3240',
          raised:  '#1E3A68',
          accent:  '#3D6A9A',
          muted:   '#CFD9E6',
        },
        skill: {
          bg:      '#0f0f0f',
          surface: '#1a1a1a',
          raised:  '#222222',
          border:  '#2a2a2a',
          text:    '#f0f0f0',
          muted:   '#aaaaaa',
          dim:     '#888888',
          brand:   '#4f9eff',
          green:   '#4caf50',
          amber:   '#ffb432',
          red:     '#e05555',
          orange:  '#F97316',
        },
        site: {
          bg:      '#00243D',  // darkest navy — page base
          surface: '#004D85',  // dark blue — card/panel surfaces
          raised:  '#0063A3',  // mid blue — raised elements, alt sections
          ink:     '#C8E4F5',  // light blue-white — primary text
          secondary:'#8FA4B2', // blue-gray — secondary text
          muted:   '#646E78',  // slate — muted/placeholder text
          border:  '#0063A3',  // mid blue — borders (with opacity)
          accent:  '#0089CE',  // vivid blue — interactive elements
          warm:    '#F97316',  // deeper tangerine — action (buttons, stats, CTAs)
          emerald: '#059669',  // emerald green — informational (labels, borders, categories)
          header:  '#00243D',  // seamless with bg
          // Blue World alt theme (swap these if revisiting):
          // bg:#0063A3  surface:#004D85  raised:#00243D  accent:#C8E4F5  header:#00243D
        },
      },
    },
  },
  plugins: [],
};
