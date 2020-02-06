const path = require('path')
const autoprefixer = require('autoprefixer')
const makeExternals = require('../scripts/makeExternals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack')

module.exports = function (paths, projectConfig, env) {
  // console.log({env})
  const appEnv = require(paths.appEnv)
  const processEnv =
    typeof appEnv === 'function' ?
    appEnv(env.ENV || env.mode) :
    appEnv
  const {
    projectName,
    assetsPublicPath
  } = projectConfig
  return {
    entry: [
      // 'webpack/hot/only-dev-server',
      // 'react-hot-loader/patch',
      // require.resolve("react-dev-utils/webpackHotDevClient"),
      paths.appIndex
    ],
    externals: makeExternals(projectConfig.isLibs),
    resolve: {
      alias: {
        // 'react-dom': '@hot-loader/react-dom'
      },
      extensions: [
        ".mjs",
        ".web.ts",
        ".ts",
        ".web.tsx",
        ".tsx",
        ".web.js",
        ".js",
        ".json",
        ".web.jsx",
        ".jsx"
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [{
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "media/[name].[hash:8].[ext]"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "fonts/[name].[hash:8].[ext]"
          }
        },
        {
          test: /\.(js|jsx|mjs)$/,
          include: paths.appSrc,
          loader: require.resolve("babel-loader"),
          /* options: {
            plugins: ['react-hot-loader/babel']
          } */
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(processEnv)
      })
    ]
  }
}