const path = require('path');

module.exports = {
  transpileDependencies: ['vuex-persist'],
  outputDir: path.resolve(__dirname, '../Backend/build'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    },
    port: 8081
  },
  pwa: {
    themeColor: '#382129',
    msTileColor: '#000000',
    iconPaths: {
      msTileImage: ''
    }
  }
}