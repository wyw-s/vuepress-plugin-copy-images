
const fs = require('fs')
const path = require('path');

class Copy {
  constructor(viewPath, copyPath) {
    this.viewPath = viewPath;
    this.copyPath = copyPath;
    this.readDir(viewPath);
  }

  readDir(filedir) {
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
          if (filename === 'assets') {
            this.createDir(filedir.replace(this.viewPath, this.copyPath + '\\view'), filedir)
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
