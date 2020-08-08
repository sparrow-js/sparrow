const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  devServer: {
    host: '127.0.0.1',
    disableHostCheck: true,
    // watchOptions: {
    //   poll: 1000, // sparrow server 文件修改时会清空，影响热重载
    // }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}