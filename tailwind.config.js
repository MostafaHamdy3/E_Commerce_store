/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bgScreen: 'var(--bgScreen)',
        bgContainer: 'var(--bgContainer)',
        mainColor: 'var(--mainColor)',
        primaryColor: 'var(--primaryColor)',
        secondaryColor: 'var(--secondaryColor)',
        descColor: 'var(--descColor)',
        error: 'var(--error)',
        borderColor: 'var(--borderColor)',
        placeholder: 'var(--placeholder)',
      },
      fontFamily: {
        enRg: ['enRg'],
        enMd: ['enMd'],
        enB: ['enB'],
      },
    },
  },
  plugins: [],
}