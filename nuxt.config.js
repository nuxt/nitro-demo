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

  serverMiddleware: [
    { path: '/api/hello', handle: '~/api/hello', lazy: true }
  ],

  generate: {
    fallback: '404.html'
  },

  pwa: {
    workbox: false, // TODO
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
