<template>
  <div class="re-load-button">
    <img src="~/assets/img/arrow/re-load.png" alt="reload" />
    <div style="margin: 0 10px">{{ title }}</div>
    <div id="currentPage">
      <strong>{{ page }}</strong> / {{ calcTotalPage(totalCount, pageNum) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { calcTotalPage } from '~~/function/common'

defineProps<{
  title: string
  page: number
  totalCount: number
  pageNum: number
}>()
</script>

<style lang="scss" scoped>
.re-load-button {
  width: 100%;
  height: 40px;
  border: 1px solid $mainColor;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $mainColor;
  font-size: 14px;

  img {
    width: 20px;
    height: 20px;
  }

  div {
    strong {
      font-weight: 800;
    }
  }
}
</style>
