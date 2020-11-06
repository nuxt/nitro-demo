export default {
  target: 'static',

  buildModules: [
    '@nuxt/serverless'
  ],

  router: {
    base: process.env.NUXT_ROUTER_BASE || '/'
  },

  serverless: {
    static: [
      '/2'
    ]
  }
}
