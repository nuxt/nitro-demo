export default {
  target: 'static',

  buildModules: [
    '@nuxt/serverless'
  ],

  generate: {
    routes: [
      '/1'
    ]
  },

  serverless: {
    static: [
      '/1'
    ]
  }
}
