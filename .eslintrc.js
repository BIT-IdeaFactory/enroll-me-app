
module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard'
  ],
  plugins: ['react', 'react-native', 'import', 'jest'],
  env: {
    'react-native/react-native': true,
    'jest/globals': true,
  },
  rules: {
    'import/no-unresolved': 2,
    'react/jsx-uses-vars': 2,
  },
};