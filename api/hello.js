
export default (req, res) => {
  res.setHeader('content-type', 'application/json')
  res.end(JSON.stringify({ api: 'works!' }))
}
