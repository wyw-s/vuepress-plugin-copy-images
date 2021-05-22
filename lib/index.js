
const path = require('path');
const Copy = require('./utils/copy.js')

module.exports = (options) => {
  const vp = options.pagePath || 'docs/view';
  const cp = options.toPath || 'docs/.vuepress/public';
  const viewPath = path.join(process.cwd(), vp);
  const copyPath = path.join(process.cwd(), cp);
  new Copy(viewPath, copyPath);
  return {
    name: 'vuepress-plugin-copy-images'
  }
}
