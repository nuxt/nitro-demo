const { Server } = require('http')
const { middleware } = require('../.vercel_build_output/functions/node/_nuxt')
const { log, error } = console

const app = new Server(middleware)

const port = process.env.PORT || 4000

app.listen(port, (err) => {
  if (err) {
    error(err)
    process.exit(1)
  }
  log(`http://localhost:${port}`)
})
