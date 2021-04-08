
export default (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  return { api: `generated at ${Date.now()}` }
}
