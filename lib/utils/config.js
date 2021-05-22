
const path = require('path');

module.exports = (options) => {
  const cp = `docs/.vuepress/public`;
  const pageDirName = options.pageDirName || 'views';
  const viewPath = path.join(process.cwd(), 'docs', pageDirName);
  const copyPath = path.join(process.cwd(), cp);
  const imagesDir = options.imagesDir || 'assets';
  const clearImg = options.clearImg || false;
  return {
    viewPath,
    copyPath,
    pageDirName,
    imagesDir,
    del: clearImg
  }
}
