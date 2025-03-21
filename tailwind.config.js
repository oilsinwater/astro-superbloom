module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif']
      }
    }
  },
  plugins: []
}
