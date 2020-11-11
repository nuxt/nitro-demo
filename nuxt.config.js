export default {
  target: 'static',

  buildModules: [
    '@nuxt/serverless',
    '@nuxtjs/pwa'
  ],

  plugins: [
    './plugins/rendertime.server'
  ],

  router: {
    base: process.env.NUXT_ROUTER_BASE || '/'
  },

  pwa: {
    workbox: {
      autoRegister: false // TODO
    },
    meta: {
      lang: 'en'
    }
  },

  serverless: {
    static: [
      '/about'
    ]
  }
}
