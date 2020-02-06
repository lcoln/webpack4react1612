'use strict';

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const clearConsole = require('react-dev-utils/clearConsole');

const makeServerWebpackConfig = require('../config/server')
const makeCompiler = require('./makeCompiler')
const env = require('../utils/env')
const { makeIp } = require('../utils')

if (!env || !env.length)
  return console.log('project not found')

async function main () {
  let webpackConfig = makeCompiler(makeServerWebpackConfig)
  let allServer = await Promise.all(webpackConfig.map(v => startServer(v)))

  allServer.map(v => {
    console.log(`Your application ${v.projectName} is running here: ${v.host}:${v.port}`)
  })
}

function startServer ({webpackConfig, projectConfig}) {
  return new Promise((yes, no) => {
    // console.log(webpackConfig)
    const { devServer } = webpackConfig
    const { port, host } = devServer
    webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
    const compiler = webpack(webpackConfig);
    const server = new webpackDevServer(compiler);
    // console.log({webpackConfig, port, host})
    server.listen(port, '0.0.0.0', () => {
      yes({host, port, projectName: projectConfig.projectName})
    });
  })
}

main()
