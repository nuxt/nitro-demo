export default {
  target: 'static',

  buildModules: [
    '@nuxt/serverless'
  ],


  serverless: {
    static: [
      '/2'
    ],
    outName: 'nuxt.js',
    target: 'vercel',
    minify: false,
  }
}
