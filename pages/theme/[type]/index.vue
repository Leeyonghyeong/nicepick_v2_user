<template>
  <main>
    <Theme />
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'mobile',
})

const route = useRoute()

useHead({
  title: `창업할 땐 창업픽 - 테마(${route.params.type})`,
})
</script>

<style lang="scss" scoped></style>
