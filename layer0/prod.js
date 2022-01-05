const http = require('http')

module.exports = async function prod(port) {
  const { handle } = await import('../.output/server/index.mjs')
  const server = http.createServer(handle)
  server.listen(port)
}
