const ENV = require('../utils/env')
const path = require('path')
const client = require('scp2');
const cwd = process.cwd()
const { cdnConfig } = require(path.resolve(cwd, 'cdnConfig'))
const whiteList = require(path.resolve(cwd, 'cdnConfig/whiteList'))()
const { scpOpts } = cdnConfig
const distPath = path.resolve(cwd, 'dist')

function scpFile(dist = distPath, opts = scpOpts) {
  
  return new Promise((yes, no) => {
    // console.log({dist, opts})
    client.scp(dist, opts, function (err) {
      // console.log({err})
      yes(err ? { code: -1, msg: err } : { code: 1, msg: '部署完毕' })
    })

  })
}

function modulePath(m) {
  return `/home/ubuntu/data/www/projects/${whiteList[m]}/views/index.tpl`;
}

(async function () {
  const ora = require('ora');

  let module = ENV.filter(v => v.PROJECT in whiteList).map(v => v.PROJECT)
  // console.log({module, ENV, whiteList})
  while (module.length) {
    let cur = module.shift()
    let { version, isLibs } = require(
      path.resolve(cwd, `projects/${cur}/app.json`)
    )
    // console.log(`正在测试机部署${cur}-${version}...`)
    const project = `${cur}-${version}`
    const spinner = ora(`正在测试机部署${project}...`).start();
    spinner.color = 'green';
    
    // console.log(`${distPath}/${cur}`)
    let scpRes = await scpFile()
    // console.log({scpRes, isLibs})
    if (scpRes.code > 0) {
      if (!isLibs) {
        let source = path.resolve(cwd, `dist/${cur}/${version}/index.html`)
        scpOpts.path = modulePath(cur)
        // console.log({scpOpts, source, module})
        let scpRes = await scpFile(
          source,
          scpOpts
        )
        if (scpRes.code > 0) {
          // console.log('部署完毕')
          spinner.succeed(`${project}部署完毕`)
        } else {
          // console.log('部署失败, 原因: ' + JSON.stringify(scpRes))
          spinner.fail('部署失败')
        }
      } else {
        // console.log('部署完毕')
        spinner.succeed(`${project}部署完毕`)
      }
    } else {
      // console.log('部署失败, 原因: ' + JSON.stringify(scpRes))
      spinner.fail(`${project}部署失败, 原因:  ${JSON.stringify(scpRes)}`)
    }
  }
})();