// 引入nodejs路径模块
var path = require('path')
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  externals: {
    BMap: 'BMap'
  }
}
