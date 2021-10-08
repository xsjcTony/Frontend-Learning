const fs = require('fs')
const path = require('path')

class CreateProject {
  constructor (rootPath, projectName) {
    this.rootPath = rootPath
    this.projectName = projectName
    this.subFiles = ['images', 'css', 'js', 'index.html']
  }

  initProject () {
    const projectPath = path.join(this.rootPath, this.projectName)

    fs.mkdirSync(projectPath)
    this.subFiles.forEach((fileName) => {
      if (path.extname(fileName) === '') {
        const dirPath = path.join(projectPath, fileName)
        fs.mkdirSync(dirPath)
      } else {
        const filePath = path.join(projectPath, fileName)
        fs.writeFileSync(filePath, '')
      }
    })
  }
}

const cp = new CreateProject(__dirname, 'taobao')
cp.initProject()



