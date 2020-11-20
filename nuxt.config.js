export default {
  target: 'static',

  buildModules: [
    '@nuxt/sigma'
    // '@nuxtjs/pwa'
  ],

  plugins: [
    './plugins/rendertime.server'
  ],

  router: {
    base: process.env.NUXT_ROUTER_BASE || '/'
  },

  serverMiddleware: [
    { path: '/api/hello', handle: '~/server/hello', lazy: true }
  ],

  generate: {
    fallback: '404.html'
  },

  // pwa: {
  //   workbox: false, // TODO
  //   meta: {
  //     lang: 'en'
  //   }
  // },

  sigma: {
    static: [
      '/about'
    ]
  }
}
