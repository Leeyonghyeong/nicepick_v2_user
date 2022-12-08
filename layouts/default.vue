<template>
  <div>
    <Header />
    <slot />
    <Footer />
    <BottomNav />
  </div>
</template>

<script lang="ts" setup>
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'
import BottomNav from '~~/components/common/BottomNav.vue'
</script>

<style lang="scss" scoped></style>
