<template>
  <main>
    <Search />
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'mobile',
})

const route = useRoute()

useHead({
  title: `- ${route.params.keyword}`,
})
</script>

<style lang="scss" scoped></style>
