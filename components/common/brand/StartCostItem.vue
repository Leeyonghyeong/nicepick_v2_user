<template>
  <div class="brand-start-cost-item">
    <div class="brand-image">
      <img :src="brandItem.brandImg" :alt="brandItem.brandName" />
      <div
        v-if="
          brandItem.isPremium &&
          (brandItem.brandPromotion || brandItem.brandPromotionIcon)
        "
        class="promotion-icon"
      >
        프로모션
      </div>
    </div>
    <div
      class="brand-category"
      :style="{
        color: CategoryColor(brandItem.largeCategoryName),
        border: `1px solid ${CategoryColor(brandItem.largeCategoryName)}`,
      }"
    >
      {{ brandItem.smallCategoryName }}
    </div>
    <div class="brand-name">{{ brandItem.brandName }}</div>
    <div class="brand-start-cost">
      <div>창업비 10억 1,000만원</div>
      <div>100㎡</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CategoryColor } from '~~/types/category'
import { Brand } from '~~/types/brand'

defineProps<{
  brandItem: Brand
}>()
</script>

<style lang="scss" scoped>
.brand-start-cost-item {
  width: 100%;
  cursor: pointer;
  .brand-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;

    .promotion-icon {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 3px 6px;
      background-color: #ff4b2e;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .brand-category {
    display: inline-block;
    margin-bottom: 7px;
    font-size: 11px;
    padding: 3px 4px;
    border-radius: 3px;
  }

  .brand-name {
    font-size: 14px;
    margin-bottom: 5px;
    color: $fontMainColor;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .brand-start-cost {
    font-size: 12px;
    color: $fontSubColor;
    display: flex;
    align-items: center;

    div:last-child {
      font-size: 10px;
      color: #bcbcbc;
      padding: 3px 4px;
      background-color: #f3f3f3;
      border: 1px solid $iconLine;
      border-radius: 3px;
      margin-left: 6px;
    }
  }

  @include mobile {
    .brand-name {
      font-size: 13px;
    }
    .brand-start-cost {
      flex-direction: column;
      align-items: flex-start;
      font-size: 11px;

      div:last-child {
        margin-left: 0;
        margin-top: 7px;
      }
    }
  }
}
</style>
