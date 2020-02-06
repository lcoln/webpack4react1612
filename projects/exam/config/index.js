const { version, name } = require('../app.json')
const cwd = process.cwd()
const { cdnUrl } = require(`${cwd}/cdnConfig`)

module.exports = {
  projectName: name,
  isLibs: false,
  version,
  title: 'exam',
  dev: {
    assetsSubDirectory: '',
    assetsPublicPath: `/`,
    host: '0.0.0.0',
    port: 8000,
    //调试环境下返回公有库链接
    makeLib (link) {
      return `${link}:9000/js/app.js`
    }
  },
  build: {
    refs: ['commonLibs'],
    assetsSubDirectory: '',
    // assetsPublicPath: `${name}/${version}`,
    assetsPublicPath: `${cdnUrl}${name}/${version}`
  },
}