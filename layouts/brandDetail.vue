<template>
  <div>
    <Header v-if="getDevice !== 'mobile'" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import Header from '~/components/common/Header.vue'
import { useWindowStore } from '~~/store/window'

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)
</script>

<style lang="scss" scoped></style>
