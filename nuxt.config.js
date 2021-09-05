export default {
  target: 'static',

  buildModules: [
    '@nuxt/bridge'
    // '@nuxtjs/pwa'
  ],

  plugins: [
    './plugins/rendertime.server'
  ],

  router: {
    base: process.env.NUXT_ROUTER_BASE || '/'
  },

  serverMiddleware: [
    { path: '/api/hello', handle: '~/server/hello' }
    // { path: '/api/graphql', handle: '~/server/graphql' }
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

  nitro: {
    // minify: false
    // analyze: true
  },

  publicRuntimeConfig: {
    nitroVersion: require('@nuxt/nitro/package.json').version
  }

  // pwa: {
  //   workbox: false, // TODO
  //   meta: {
  //     lang: 'en'
  //   }
  // },
}
