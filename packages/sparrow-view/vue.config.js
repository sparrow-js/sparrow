module.exports = {
  devServer: {
    watchOptions: {
      poll: 1000, // sparrow server 文件修改时会清空，影响热重载
    }
  }
}