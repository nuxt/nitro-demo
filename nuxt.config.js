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
    fallback: '404.html',
    // Hybdrid mode only for /about
    crawler: false,
    exclude: [
      /.*/
    ],
    routes: [
      '/about'
    ]
  },

  sigma: {
    minify: false
    // analyze: true
  }

  // pwa: {
  //   workbox: false, // TODO
  //   meta: {
  //     lang: 'en'
  //   }
  // },
}
