<template>
  <main>
    <Category />
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'mobile',
})
const route = useRoute()

useHead({
  title: `창업할 땐 창업픽 - ${route.query.s ? route.query.s : route.query.l}`,
})
</script>

<style lang="scss" scoped></style>
