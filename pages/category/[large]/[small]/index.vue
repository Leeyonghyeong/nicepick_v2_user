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
  title: `- ${route.params.large}(${route.params.small})`,
})
</script>

<style lang="scss" scoped></style>
