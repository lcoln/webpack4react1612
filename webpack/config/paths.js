const path = require('path')
const cwd = process.cwd()
const { makeProjectPath } = require('../utils')

module.exports = function (project, env) {
  return {
    webpackPath: path.resolve(cwd, 'webpack'),
    appRoot: makeProjectPath(`${project}`),
    appSrc: makeProjectPath(`${project}/src`),
    appIndex: makeProjectPath(`${project}/src/index.jsx`),
    appPublic: makeProjectPath(`${project}/public`),
    appHtml: makeProjectPath(`${project}/public/index.html`),
    appConfig: makeProjectPath(`${project}/config/index.js`),
    appEnv: makeProjectPath(`${project}/config/env.js`),
    appBuild: path.resolve(cwd, 'dist')
  }
}