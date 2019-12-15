const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  assetsDir: 'static',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: `http://localhost:3000`,
        changeOrigin: true,
        overlay: {
            warnings: false,
            errors: true
        },
        pathRewrite: {
            '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    // CDN 加速  左侧是我们自己引入时候要用的，右侧是开发依赖库的主人定义的不能修改
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'vue-ls': 'VueStorage',
      'vue-lazyload': 'VueLazyload',
      'mavon-editor': 'MavonEditor',
      'view-design': 'iview',
      'vue-social-share': 'Share',
      // '_core-js': 'core',
      // '_lodash': '_'
      'qs': 'Qs'
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!isProduction,
    // 开启 CSS source maps
    sourceMap: !!isProduction,
    // css预设器配置项
    loaderOptions: {}
  },
  // 链式操作  https://github.com/neutrinojs/webpack-chain
  chainWebpack: config => {
    config.module
      .rule('compile')
      .test(/\.js$/)
      .include
      .add(resolve('src'))
      .add(resolve('tests'))
      .end()
      .exclude
      .add(/node_modules/)
      .add(/bower_components/)
      .add(/dist/)
      .end()
      .use('babel')
      .loader('happypack-loader?id=happyBabel')
      .loader('babel-loader?cacheDirectory=true')
      .options({
        presets: [
          ['@babel/preset-env', {modules: false}]
        ]
      })
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/css/common.less')
      ]
    }
  }
}
