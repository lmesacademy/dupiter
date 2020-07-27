module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "vue/html-self-closing": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "quotes": "off",
    "quote-props": "off",
    "semi": "off",
    "padded-blocks": "off",
    "space-before-function-paren": "off",
    "no-console": "off",
    "comma-dangle": "off",
    "indent": "off",
    "arrow-parens": "off",
    "no-multiple-empty-lines": "off",
    "vue/no-v-html": "off"
  }
}
