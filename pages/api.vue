<template>
  <div>
    <br>
    <div>
  
   
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
