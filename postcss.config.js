module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-discard-font-face': ['woff2'],
    'postcss-remove-google-fonts': {},
  },
});
