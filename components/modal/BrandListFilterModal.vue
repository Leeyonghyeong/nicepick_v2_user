<template>
  <section class="filter-modal">
    <article class="filter-modal-wrapper"></article>
  </section>
</template>

<script lang="ts" setup>
onMounted(() => {
  document.body.setAttribute('style', 'overflow: hidden;')
  // window.history.pushState({ page: 'modal' }, '', '#modal')
  // window.addEventListener('popstate', closeModal)
})

onUnmounted(() => {
  document.body.removeAttribute('style')
  // window.removeEventListener('popstate', closeModal)
})
</script>

<style lang="scss" scoped>
.filter-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 102;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
