const path = require('path')
const APP_NAME = require('./package.json').name
const ThemeCssExtractWebpackPlugin = require('@zougt/theme-css-extract-webpack-plugin')
const UnpluginVueComponentsWebpack = require('unplugin-vue-components/webpack')
const devServerPort = 10004

module.exports = {
  devServer: {
    port: devServerPort,
    inline: true,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/121': {
        target: 'http://121.36.17.224:30552',
        changeOrigin: true,
        pathRewrite: {
          '/121': '/api'
        },
        secure: true
      },
      '/202': {
        target: 'http://202.100.247.175:32569',
        changeOrigin: true,
        pathRewrite: {
          '/202': '/api'
        },
        secure: true
      }
    }
  },
  configureWebpack: {
    output: {
      library: APP_NAME, // 微应用的包名，这里与主应用中注册的微应用名称一致
      libraryTarget: 'umd', // 将你的 library 暴露为所有的模块定义下都可运行的方式
      jsonpFunction: `webpackJsonp_${APP_NAME}` // 按需加载相关，设置为 webpackJsonp_微应用名称 即可
    },
    plugins: [
      UnpluginVueComponentsWebpack({
        // 指定组件位置，默认是src/components
        dirs: ['src/components', 'lib/umd/packages'],
        // ui库解析器
        extensions: ['vue', 'js'],
        // 配置文件生成位置
        dts: 'components.d.ts'
      })
    ]
  },
  lintOnSave: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  transpileDependencies: ['color'],
  chainWebpack(config) {
    config.module
      .rule('bpmn')
      .test(/\.bpmn$/)
      .use()
      .loader('raw-loader')
      .end()

    config.set('name', APP_NAME)
    config.when(process.env.NODE_ENV === 'development', conf => conf.devtool('cheap-source-map'))

    config.when(process.env.NODE_ENV !== 'development', conf => {
      conf.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      conf.optimization.runtimeChunk('single')
    })
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@lib', path.resolve('lib'))
      .set('@assets', path.resolve('src/assets'))
    if (process.env.NODE_ENV === 'development') {
      // 添加setCustomTheme的热更新loader（仅开发模式需要）
      config.module
        .rule('setCustomTheme-hot-loader')
        .test(/setCustomTheme.js$/)
        .enforce('pre')
        .use('setCustomTheme-hot-loader')
        .loader('@zougt/theme-css-extract-webpack-plugin/dist/hot-loader/index.js')
    }
    //  添加主题插件（调色板必要插件）(暂未使用)
    config
      .plugin('ThemeCssExtractWebpackPlugin')
      .use(ThemeCssExtractWebpackPlugin, [
        {
          arbitraryMode: true, // 以下是任意主题模式的参数 arbitraryMode:true 有效
          defaultPrimaryColor: '#2E78FF', // 默认主题色
          hueDiffControls: {
            low: 0,
            high: 0
          },
          includeStyleWithColors: [ // 【注意】includeStyleWithColors作用： css中不是由主题色变量生成的颜色，也让它抽取到主题css内，可以提高权重
            {
              color: '#ffffff',
              excludeCssProps: ['background', 'background-color'], // 排除掉样式属性，这里将非背景的白色提升权重
              inGradient: true // 此类颜色的是否跟随主题色梯度变化，默认false
            },
            {
              color: [ // element-ui 的非primary颜色，受到了primary的权重问题，这里可以让他们提升权重
                '#67C23A', // success background-color
                '#909399', // info background-color
                '#E6A23C', // warning background-color
                '#F56C6C', // danger background-color
                '#85ce61', // success hover  background-color
                '#a6a9ad', // info hover  background-color
                '#ebb563', // warning hover  background-color
                '#f78989' // danger hover  background-color
              ]
            }
          ]
        }
      ])
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/themesio/io-token-light-vars.scss'),
        path.resolve(__dirname, 'src/styles/themesio/io-token-dark-vars.scss'),
        path.resolve(__dirname, 'src/styles/variables.scss'),
        path.resolve(__dirname, 'src/styles/indexio.scss'),
        path.resolve(__dirname, 'src/styles/mixins.scss')
      ]
    }
  }
}
