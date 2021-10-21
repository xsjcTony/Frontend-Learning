const fs = require('fs')
const path = require('path')

class CleanWebpackPlugin {
  apply (compiler) {
    const outputPath = compiler.options.output.path
    compiler.hooks.entryOption.tap('CleanWebpackPlugin', () => {
      this.cleanDir(outputPath)
    })
  }

  cleanDir (dirPath) {
    // 判断是否是非空目录
    if (fs.statSync(dirPath).isDirectory() && fs.readdirSync(dirPath).length !== 0) {
      // 非空目录 => 删除目录中的内容
      const files = fs.readdirSync(dirPath)
      files.forEach((file) => {
        const filePath = path.resolve(dirPath, file)
        if (fs.statSync(filePath).isDirectory()) {
          this.cleanDir(filePath)
        } else {
          fs.unlinkSync(filePath)
        }
      })
    }
    // 不是非空目录 => 删除目录
    fs.rmdirSync(dirPath)
  }
}

module.exports = CleanWebpackPlugin
