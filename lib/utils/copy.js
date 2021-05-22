
const fs = require('fs')
const path = require('path');
const shell = require('shelljs');

class Copy {
  constructor(optios) {
    const { viewPath, copyPath, pageDirName, imagesDir, del } = optios;
    this.viewPath = viewPath;
    this.copyPath = copyPath;
    this.pageDirName = pageDirName;
    this.imagesDir = imagesDir;
    this.clearImg = del;
    if (this.clearImg) {
      this.clearImgDir(this.copyPath, this.pageDirName)
    } else {
      this.readDir(viewPath);
    }
  }

  clearImgDir(copyPath, pageDirName) {
    if (shell.test('-e', path.join(copyPath, pageDirName))) {
      shell.rm('-rf', path.join(copyPath, pageDirName));
    }
    this.readDir(this.viewPath);
  }

  readDir(filedir) {
    if (!shell.test('-e', filedir)) {
      throw new Error(`${filedir} 目录不存在`)
      return;
    }
    fs.readdir(filedir, (err, files) => {
      if (err) {
        throw new Error(err)
      } else {
        files.forEach((filename) => {
          this.isDir(path.join(filedir, filename), filename)
        })
      }
    })
  }

  isDir(filedir, filename) {
    fs.stat(filedir, (err,stats) => {
      if(err){
        throw new Error(err)
      } else{
        if(stats.isDirectory()){
          if (filename === this.imagesDir) {
            this.createDir(filedir.replace(this.viewPath, this.copyPath + '\\' + this.pageDirName), filedir)
          } else {
            this.readDir(filedir)
          }
        }
      }
    })
  }

  createDir(createPathName, filedir) {
    fs.mkdir(createPathName, { recursive: true }, (err) => {
      if (err) {
        throw err;
      } else {
        fs.readdir(filedir, (err, files) => {
          if (err) {
            throw err;
          } else {
            files.forEach((file) => {
              this.writeFile(filedir, createPathName, file)
            })
          }
        })
      }
    });
  }

  writeFile(fileDir, newDir, file) {
    let readable = fs.createReadStream(path.resolve(fileDir, file));
    let writable = fs.createWriteStream(path.resolve(newDir, file));
    readable.pipe(writable);
  }
}

module.exports = Copy
