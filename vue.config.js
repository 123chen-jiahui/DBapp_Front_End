module.exports = {
  devServer: {
    disableHostCheck: true,
    // proxy: {
    //   '/': {
    //     target: 'https://localhost:5001',
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,
    //     pathrewrite: {
    //       '^api/': '',
    //     },
    //   },
    // },
  },
  transpileDependencies: ['vuetify'],
  lintOnSave: false,
}
