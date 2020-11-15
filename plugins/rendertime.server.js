export default function (ctx) {
  console.log('>>', ctx)
  ctx.ssrContext.nuxt.renderedOn = new Date()
}
