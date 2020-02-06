const { version, name } = require('../app.json')
const cwd = process.cwd()
const { cdnUrl } = require(`${cwd}/cdnConfig`)

module.exports = {
  projectName: name,
  isLibs: true,
  version,
  dev: {
    assetsSubDirectory: '',
    assetsPublicPath: ``,
    host: '0.0.0.0',
    port: 9000
  },
  build: {
    assetsSubDirectory: '',
    assetsPublicPath: `${cdnUrl}${name}/${version}`
  },
}