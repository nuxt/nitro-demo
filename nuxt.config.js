export default {
  target: 'static',

  buildModules: [
    '@nuxt/serverless'
  ],


  serverless: {
    static: [
      '/2'
    ],
    // auto detected only for debug
    target: 'vercel',
    minify: false,
  }
}
