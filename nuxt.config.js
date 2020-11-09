export default {
  target: 'static',

  buildModules: [
    '@nuxt/serverless'
  ],

  router: {
    base: process.env.NUXT_ROUTER_BASE || '/'
  },

  serverless: {
    target: 'vercel',
    outDir: '.vercel_build_output/functions/node/_nuxt',
    outName: 'index.js',
    static: [
      '/about'
    ]
  }
}
