<template>
  <nav v-if="getDevice === 'mobile'" class="detail-bottom-nav">
    <div class="wrapper">
      <CommonButtonCompareButton />
      <CommonButtonFavoriteButton />
      <CommonButtonShareButton />
      <CommonButtonQnaButton :width="180" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 60px;
  border-top: 1px solid $sectionLine;

  .wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px 0 24px;
  }
}
</style>
