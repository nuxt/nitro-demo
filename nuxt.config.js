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

  serverMiddleware: {
    '/api/hello': '~/api/hello'
  },

  pwa: {
    workbox: false, // TODO
    meta: {
      lang: 'en'
    }
  },

  serverless: {
    static: [
      '/'
    ]
  }
}
