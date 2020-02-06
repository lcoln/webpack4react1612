'use strict';

const env = require('../utils/env')
const { makeIp } = require('../utils')

if (!env || !env.length)
  return console.log('project not found')

function makeProjectConfig (config) {
  let result = {}
  if (config && config.paths.appConfig) {
    result = require(config.paths.appConfig)
    if (config.env.MODE !== 'server') {
      result.dev.assetsPublicPath = `//${makeIp()}:${result.dev.port}`
    }
  }
  return result
}

module.exports = function main (makeWebpackConfig) {
  let result = []
  for (let it of env) {
    let config = {}
    config.paths = require('../config/paths')(it.PROJECT)
    config.env = it
    config.projectConfig = makeProjectConfig(config)
    config.webpackConfig = makeWebpackConfig(config)
    result.push(config)
  }
  // clearConsole()
  return result
}

