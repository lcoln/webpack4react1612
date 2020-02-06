const cwd = process.cwd()
const { cdnUrl } = require(`${cwd}/cdnConfig`)

module.exports = function (projectConfig) {
  
  let result = `<script type="text/javascript" src="${cdnUrl}cdn-boot.js"></script>`
  if (projectConfig.build.refs) {
    for (let it of projectConfig.build.refs) {
      let { version } = require(`${cwd}/projects/${it}/app.json`)
      result += `<script type="text/javascript" src="${cdnUrl}${it}/${version}/module/module.js"></script>`
    }
  }
  result += `<script type="text/javascript" src="${projectConfig.build.assetsPublicPath}/module/module.js"></script>`
  // console.log({result})
  return result
}