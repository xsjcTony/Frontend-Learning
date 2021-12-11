const packageInfo = require('../package.json')


module.exports = {
  version: packageInfo.version,
  templateDownloadDirPath: process.platform === 'win32' ? `${ process.env.USERPROFILE }\\.aue-template` : `${ process.env.HOME }/.aue-template`,
  pkg: packageInfo
}
