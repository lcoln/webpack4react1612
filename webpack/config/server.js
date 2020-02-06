const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const makeDevServerConfig = require('./devServer')
const makeBaseWebpackConfig = require('./base')
const { makeIp, deepMerge } = require('../utils')

/**
 * @description: linteng
 * @param {Object} {paths: 路径参数, projectConfig: 工程具体的webpack配置，对应工程config/index.js}
 * @return: 合并baseWebpackConfig与devWebpackConfig
 */
module.exports = function ({paths, projectConfig, env}) {
  const webpackConfig = makeBaseWebpackConfig(paths, projectConfig, env)
  const { assetsPublicPath, makeLib, port } = projectConfig.dev

  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
      publicPath: assetsPublicPath,
      filename: `js/app.js`,
      chunkFilename: `js/[name].chunk.js`,
    },
    module: {
      rules: [
        {
          test: /\.(less|css)$/,
          use: [
            // 'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // 只在开发模式中启用热更新
                hmr: true,
                // 如果模块热更新不起作用，重新加载全部样式
                reloadAll: true,
              },
            },
            {
              loader: require.resolve("css-loader")
            },
            {
              loader: require.resolve("less-loader"),
              options: {
                javascriptEnabled: true,
                /* globalVars: {
                  env: path.join(
                    resolveModule("src"),
                    "_env",
                    aliasEnv[binEnv.MODE]
                  )
                } */
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        isBuild: false,
        title: projectConfig.title,
        isLibs: projectConfig.isLibs,
        host: makeIp(), 
        scripts: !projectConfig.isLibs && makeLib && makeLib(`//${makeIp()}`),
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: 'css/[name].[chunkhash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ],
  }
  devConfig.devServer = makeDevServerConfig(paths, projectConfig)
  !projectConfig.isLibs && devConfig.plugins.push(
    new OpenBrowserPlugin({ 
      url: `http://${devConfig.devServer.host}:${port}` 
    })
  )
  
  return merge(webpackConfig, devConfig)
}