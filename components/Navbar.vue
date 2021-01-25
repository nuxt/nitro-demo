<template>
  <div class="navbar">
    <div class="links">
      <!-- TODO: fix router base for GH pages -->
      <a href="/">
        Dynamic
      </a>
      <a href="/about">
        Static
      </a>
      <a href="/api">
        API
      </a>
      <!-- <a href="/graphql">
        GraphQL
      </a> -->
    </div>
    <a href="https://github.com/nuxt/nitro-demo" target="_blank" rel="noopener" class="gh-button">
      GitHub
    </a>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  padding-top: 16px;
  background-color: #8F8F70;
}

.navbar .links {
  display: flex;
}

.links a {
  display: block;
  padding: 20px 32px;
  color: #555522;
  margin: 0 8px;
  text-decoration: none;
  font-weight: 600;
  background-color: #B4B48C;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.links a:hover  {
  color: #003C3C;
}

.links .nuxt-link-exact-active, .links .nuxt-link-exact-active:hover {
  color: #003C3C;
  background-color: #EFEFE6;
}

.gh-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  background-color: #003C3C;
  color: #EFEFE6;
  margin-bottom: 16px;
}

.gh-button:hover {
  color: #fff;
  background-color: #032A2A;
}

</style>
