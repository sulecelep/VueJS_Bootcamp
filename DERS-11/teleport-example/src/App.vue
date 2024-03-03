<script setup>
</script>

<template>
  <teleport to="#modal-area">
    <img alt="Vue Logo" src="./assets/logo.svg" />
    <h1>Merhaba</h1>
  </teleport>
</template>

<style scoped>


.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }


}
</style>
