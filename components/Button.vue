<template>
  <a class="button">
    <slot />
  </a>
</template>

<style>
.button {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #EFEFE6;
}

.button:hover {
  color: #00DC82;
}
</style>
