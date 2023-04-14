const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
// module.exports = {
//   devServer: {       //开启代理服务器 (方式1)   配置多个代理
//     proxy: {
//       '/api': {       //'/api'是自行设置的请求前缀
//         target: 'http://127.0.0.1:3001',
//         pathRewrite:{'^/api':''},  //路径重写，（正则）匹配以api开头的路径为空（将请求前缀删除）
//       },
//   }
// } 
// }
