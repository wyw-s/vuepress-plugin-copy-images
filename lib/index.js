

const Copy = require('./utils/copy.js')
const config = require('./utils/config')

module.exports = (options) => {
  new Copy(config(options));
  return {
    name: 'vuepress-plugin-copy-images'
  }
}
