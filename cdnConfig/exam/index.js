const { MODE } = process.env
const cwd = process.cwd()
const cdnConfig = require(`${cwd}/cdnConfig/cdn`)[MODE];
const serverConfig = require(`${cwd}/cdnConfig/server`)[MODE];
const cdnConfigs = MODE === 'SERVER'
? serverConfig && serverConfig
: cdnConfig && cdnConfig
// console.log({cdnConfigs})
module.exports = {
  cdnUrl: cdnConfigs.qiniuBaseUrl,
  cdnConfig: cdnConfigs
}