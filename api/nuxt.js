console.log(__dirname)
console.log(require('fs').readdirSync(process.cwd()))
module.exports = require('./_nuxt')
