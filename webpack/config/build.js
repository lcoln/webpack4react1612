const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge')
const glob = require('glob-all')

const makeBaseWebpackConfig = require('./base')
const makeScripts = require('../scripts/makeScripts')
const makeModule = require('../scripts/makeModule')

/**
 * @description: 生成生产环境webpack配置
 * @param {Object} {paths: 路径参数, projectConfig: 工程具体的webpack配置，对应工程config/index.js}
 * @return: 合并baseWebpackConfig与devWebpackConfig
 */
module.exports = function ({
  paths,
  projectConfig,
  env
}) {
  const webpackConfig = makeBaseWebpackConfig(paths, projectConfig, env)
  // console.log({paths, glob})
  const {
    assetsPublicPath
  } = projectConfig.build
  const {
    projectName,
    version
  } = projectConfig
  // console.log({env})
  const prodConfig = {
    mode: 'production',
    output: {
      library: projectName,
    },
    devtool: env.MODE === 'server' ? 'nosources-source-map' : '',
    output: {
      path: `${paths.appBuild}/${projectName}/${version}`,
      publicPath: assetsPublicPath,
      pathinfo: true,
      filename: `js/[name].[chunkhash].js`,
      chunkFilename: `js/[name].[chunkhash].js`,
    },
    module: {
      strictExportPresence: true,
      rules: [{
        test: /\.(less|css)$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve("css-loader")
          },
          "postcss-loader",
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
          },
        ]
      }]
    },
    optimization: {
      /* runtimeChunk: {
        name: 'runtime'
      }, */
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /node_modules\/(.*)\.js/,
            priority: -10,
            name: 'vendors'
          },
          default: false
        }
      },
      minimizer: [
        // 压缩css
        new OptimizeCSSAssetsPlugin(),
        // 压缩js
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          }
        }),
      ],
      // tree shaking 只支持ES Module写法的处理，去除打包结果里没有使用到但引入的代码
      usedExports: true,
      sideEffects: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        isBuild: true,
        title: projectConfig.title,
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        scripts: makeScripts(projectConfig),
      }),
      // CSS 分离
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: 'css/[name].[chunkhash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      }),
      // CSS Tree Shaking
      new PurifyCSSPlugin({
        paths: glob.sync([
          // 要做 CSS Tree Shaking 的路径文件
          `${paths.appPublic}/*.html`, // 请注意，我们同样需要对 html 文件进行 tree shaking
          `${paths.appSrc}/*.js`
        ])
      }),
    ],
  }

  prodConfig.plugins.push(new makeModule({
    projectConfig,
    prodConfig
  }))

  // prodConfig.plugins.push()

  return merge(webpackConfig, prodConfig)
}