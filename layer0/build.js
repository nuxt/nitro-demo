const { DeploymentBuilder } = require('@layer0/core/deploy')
const { join } = require('path')

const appDir = process.cwd()
const builder = new DeploymentBuilder(appDir)

module.exports = async function build(options) {
  builder.clearPreviousBuildOutput()
  const { skipFramework } = options

  if (!skipFramework) {
    // run the nuxt.js build with --standalone so that dependencies are bundled and the user
    // doesn't need to add them to package.json dependencies, thus keeping the lambda as
    // small as possible.
    let command = 'NITRO_PRESET=node npx nuxt generate'

    try {
      await builder.exec(command)
    } catch (e) {
      throw new FrameworkBuildError('Nuxt.js', command, e)
    }
  }

  builder.addJSAsset(join(appDir, '.output'))

  await builder.build()
}
