<template>
  <div class="top">
    <div class="total-count">
      <span>{{ totalCount }}개</span> 브랜드
    </div>
    <div class="filter">
      필터<img src="~/assets/img/common/filter.png" alt="filter" />
    </div>
  </div>
  <!-- <ModalBrandListFilterModal /> -->
</template>

<script lang="ts" setup>
defineProps<{
  totalCount: number
}>()
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .total-count {
    font-size: 15px;
    color: $fontMainColor;
    span {
      color: $mainColor;
    }
  }

  .filter {
    display: flex;
    align-items: center;
    padding: 4px 10px;
    font-size: 12px;
    color: $fontSubColor;
    border: 1px solid #ebebeb;
    border-radius: 10px;
    cursor: pointer;

    img {
      width: 20px;
    }
  }
}
</style>
