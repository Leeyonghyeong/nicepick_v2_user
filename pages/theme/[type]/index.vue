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
  title: `- 테마(${route.params.type})`,
})
</script>

<style lang="scss" scoped></style>
