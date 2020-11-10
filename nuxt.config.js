export default {
  target: 'static',

  buildModules: [
    '@nuxt/serverless'
  ],

  plugins: [
    './plugins/rendertime.server'
  ],

  router: {
    base: process.env.NUXT_ROUTER_BASE || '/'
  },

  serverless: {
    static: [
      '/about'
    ]
  }
}
