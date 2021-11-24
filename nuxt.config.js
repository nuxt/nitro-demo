import { version as nitroVersion } from '@nuxt/nitro/package.json'

const meta = {
  title: 'Plan8 Clients',
  desc: 'All for the clients of Plan8',
  image: 'https://clients.plan8.co/social.jpg',
  url: 'https://clients.plan8.co'
}

export default {
  components: true,
  target: 'static',

  head: {
    title: meta.title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1 ,maximum-scale=1, user-scalable=no" },
      { hid: "description", name: "description", content: meta.desc }
    ],
    // link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    // script: [{
    //   src: '/js/iospwa.js'
    // }]
  },
  pwa: {
    icon: {
      source: "static/icon.png",
      filename: "icon.png"
    },
    meta: {
      description: meta.desc,
      name: meta.title,
      ogTitle: meta.title,
      ogDescription: meta.desc,
      ogImage: meta.image,
      ogHost: meta.url,
      twitterSite: meta.url
    }


  },

  buildModules: [
    '@nuxt/bridge'
    // '@nuxtjs/pwa'
  ],

  plugins: [
    './plugins/rendertime.server'
  ],
  css: [
    '~/assets/scss/main.scss'
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
    nitroVersion: nitroVersion.split('.').pop(),
    apiEndpoint: process.env.NODE_ENV == 'production' ? 'https://hqapi.plan8.co/v1' : 'http://localhost:3000/v1'
  }

  // pwa: {
  //   workbox: false, // TODO
  //   meta: {
  //     lang: 'en'
  //   }
  // },
}
