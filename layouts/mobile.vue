<template>
  <div>
    <Header v-if="getDevice !== 'mobile'" />
    <slot />
    <Footer />
    <BottomNav />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'
import BottomNav from '~~/components/common/BottomNav.vue'
import { useWindowStore } from '~~/store/window'

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)
</script>

<style lang="scss" scoped></style>
