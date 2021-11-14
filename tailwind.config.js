module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A8B8A5',
          DEFAULT: '#7F977B',
          dark: '#646464',
          footer: '#65895F',
          link: '#6E7D60'
        },
        highlight: '#E0DA48',
        tag: '#BEA363',
        more: '#FF725E',
        black: '#2F2F2F',
        block: '#F9F9F9'
      },
      outline: {
        primary: ['2px solid #7F977B']
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'last'],
      borderColor: ['hover'],
      borderStyle: ['hover'],
      outline: ['active', 'focus'],
      scale: ['group-hover']
    }
  },
  plugins: []
}
