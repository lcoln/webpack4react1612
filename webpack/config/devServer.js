'use strict';
const { makeIp } = require('../utils')
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');

module.exports = function(paths, projectConfig) {
  // console.log({devConfig})
  return {
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc)
    },
    quiet: true,
    contentBase: paths.appSrc,
    hot: true,
    // publicPath: devConfig.output.publicPath,
    open: true,
    hotOnly: true,
    host: makeIp() || 'localhost',
    // inline: true,
    // overlay: true, // 编译出现错误时，将错误直接显示在页面上
    port: projectConfig.dev.port,
    /* before(app) {
      app.use(errorOverlayMiddleware());
    } */
  };
};
