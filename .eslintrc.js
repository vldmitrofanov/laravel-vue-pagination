module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    //'plugin:vue/essential',
    //'@vue/standard',
    //'prettier',
    //'prettier/vue',
    'plugin:prettier/recommended',
    //'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    // 'indent': ['error', 4],
    // 'semi': 'off',
    'prettier/prettier': 'error'
    //'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
