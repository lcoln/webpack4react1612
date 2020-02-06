'use strict';

const webpack = require('webpack');
const path = require('path')
const makeBuildWebpackConfig = require('../config/build')
const makeCompiler = require('./makeCompiler')
const env = require('../utils/env')
const { deleteFolder, copyPublicFolder } = require('../utils')
const fs = require('iofs');

if (!env || !env.length)
  return console.log('project not found')

function build ({webpackConfig, projectConfig, paths}) {
  const compiler = webpack(webpackConfig);
  // console.log(webpackConfig)
  fs.rm(path.resolve(__dirname, '../../', 'dist', projectConfig.projectName));
  // copyPublicFolder(paths.appPublic, `${paths.appBuild}/${projectConfig.projectName}`)
  return new Promise((yes, no) => {
    compiler.run((err, stat) => {
      // console.log({err, stat})
      if (err) {
        no(err)
      } 
      yes(stat)
    })
  })
}

async function main () {
  let compiler = makeCompiler(makeBuildWebpackConfig)
  let allBuilder = await Promise.all(compiler.map(async v => build(v)))
  // console.log({allBuilder})
}

main()
