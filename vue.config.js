
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/social-links-app/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Social-links module demo',
    }
  },
  lintOnSave: false,
});
