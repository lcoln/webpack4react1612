const ENV = require('../utils/env')
const qiniuUpload = require('../utils/qiniu')
const path = require('path')
const cwd = process.cwd()
const {
  cdnConfig
} = require(path.resolve(cwd, 'cdnConfig'))
const whiteList = require(path.resolve(cwd, 'cdnConfig/whiteList'))()
const distPath = path.resolve(cwd, 'dist')
const fs = require('iofs');

// console.log({fs})
function rule() {

}

;
(async function () {
  const ora = require('ora');

  let module = ENV.filter(v => v.PROJECT in whiteList).map(v => v.PROJECT)
  // console.log({module})
  while (module.length) {
    let cur = module.shift()
    let {
      version,
      isLibs
    } = require(
      path.resolve(cwd, `projects/${cur}/app.json`)
    )
    // console.log(`正在测试机部署${cur}-${version}...`)
    const project = `${cur}-${version}`
    // const spinner = ora(`正在上传七牛文件${project}...`).start();
    let filesConfig = await fs.ls(`${distPath}/${cur}`, true)
    // console.log({filesConfig})
    filesConfig = filesConfig
      .filter(v => !fs.isdir(v) && !/\.html$/.test(v))
      .map(v => ({
        filePath: v,
        fileName: v.slice(v.indexOf('dist') + 5)
      }))
    // console.log(filesConfig)
    let res = await qiniuUpload(filesConfig, cdnConfig)
    /* console.log({
      res
    }) */
  }
})();