import { version as nitroVersion } from '@nuxt/nitro/package.json'

const meta = {
  title: 'Plan8 Clients',
  desc: 'All for the clients of Plan8',
  image: 'https://clients.plan8.co/social.jpg',
  url: 'https://clients.plan8.co'
}

const environments = {
  production: {
    // previewUrl: 'https://d2rcsgqjie6nxs.cloudfront.net/',
    apiURL: 'https://hqapi.plan8.co/v1',
    previewUrl: 'https://plan8-api-preview.s3.eu-central-1.amazonaws.com/',
    uploadBucket: 'https://plan8-api-uploads-frankfurt-prod.s3.eu-central-1.amazonaws.com'

  },
  development: {
    apiURL: 'http://localhost:3000/v1',
    
    previewUrl: 'https://plan8-api-preview-dev.s3.eu-central-1.amazonaws.com/',
    uploadBucket: 'https://plan8-api-uploads-frankfurt.s3.eu-central-1.amazonaws.com'

  },
  migration: {
    apiURL: 'http://localhost:3000/v1',
    previewUrl: 'https://migration-plan8-api-preview.s3.eu-central-1.amazonaws.com/',
    uploadBucket: 'https://migration-plan8-api-uploads-frankfurt.s3.eu-central-1.amazonaws.com'
  }
}

export default {
  components: true,
  target: 'static',
  loading: {
    color: 'blue',
    height: '5px'
  },

  server: {
    port: 4000
  },

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
    // './plugins/rendertime.server'
    { src: '~/plugins/masterChannel.js', mode: 'client' }
  ],
  css: [
    '~/assets/scss/main.scss'
  ],

  router: {
    base: process.env.NUXT_ROUTER_BASE || '/'
  },

  serverMiddleware: [
    // { path: '/api/hello', handle: '~/server/hello' }
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
    apiEndpoint: process.env.NODE_ENV == 'production' ? 'https://hqapi.plan8.co/v1' : 'http://localhost:3000/v1',
    previewURL: environments[process.env.NODE_ENV].previewUrl,
    uploadBucket: environments[process.env.NODE_ENV].uploadBucket,
  },
  axios: {
    //baseUrl: process.env.API_URL || "http://localhost:3000/v1",
    //baseUrl: 'https://plan8-api.onrender.com/v1',
    //baseUrl: 'http://172.105.69.69:3000/v1',
    baseUrl: environments[process.env.NODE_ENV].apiURL,
    common: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },

  // pwa: {
  //   workbox: false, // TODO
  //   meta: {
  //     lang: 'en'
  //   }
  // },
}
