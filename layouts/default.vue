<template>
  <div class="container">
    <sidebar />
    <main>
      <navbar />
      <nuxt class="page" />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Sidebar,
    Navbar
  },
  head: {
    title: 'Nuxt nitro Demo',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&display=swap');

body {
  margin: 0;
  background: #EFEFE6;
  color: #003C3C;
  font-family: Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.container {
  display: flex;
  min-height: 100vh;
  height: 100vh;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
