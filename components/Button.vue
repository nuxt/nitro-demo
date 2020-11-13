<template>
  <a class="button">
    <slot/>
  </a>
</template>

<style>
.button {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  background-color: #032A2A;
  color: #EFEFE6;
}

.button:hover {
  color: #032A2A;
  background-color: #00DC82;
}
</style>