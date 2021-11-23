<template>
  <div>
    <br>
    <div>
      Direct SSR calls makes fetch super fast!
   
      <pre>{{project}}</pre>
    </div>
  </div>
</template>

<script>
async function timer (promise) {
  const start = Date.now()
  const res = await promise
  const end = Date.now()
  const time = end - start
  return [time, res]
}

const ORIGINS = {
  vercel: 'https://nitro-demo.vercel.app',
  browser: 'https://nuxt.github.io/nitro-demo',
  netlify: 'https://nitro-demo.netlify.app',
  cloudflare: 'https://nitro-demo.netlify.app',
  azure_functions: 'https://nuxt-sigma.azurewebsites.net',
  azure: 'https://nitro-azure-demo.nuxtjs.org',
  default: process.client ? '' : (process.dev ? 'http://localhost:3000' : 'https://nitro-demo.netlify.app')
}

export default {
  head(){
    return {
      title: `hello ${this.project.name}`
    }
  },
  async asyncData ({ route }) {
    const { id } = route.params

    let projectId

    if (id) {
      projectId = id;
    } else {
      projectId = '619b7749fc984a00176ee238'

    }

    const projectPath = `https://api.plan8.co/v1/projects/${projectId}/public`
    const project = await $fetch(projectPath)
    return {

      project
    }
  }
}
</script>
