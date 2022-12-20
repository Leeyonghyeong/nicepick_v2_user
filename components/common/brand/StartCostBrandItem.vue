<template>
  <div class="brand-start-cost-item">
    <div class="brand-image">
      <img
        v-if="brandItem.brandImg"
        :src="brandItem.brandImg"
        :alt="brandItem.brandName"
      />
      <img
        v-else
        :src="
          loadCategoryImg(
            brandItem.largeCategoryName,
            brandItem.smallCategoryName
          )
        "
        :alt="brandItem.brandName"
        class="default-image"
      />
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
      <div>
        창업비 {{ calcStartCost(brandItem.brandStartCost.startTotalPrice) }}
      </div>
      <div>{{ brandItem.brandStartCost.standardArea }}㎡</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { CategoryColor } from '~~/types/category'
import { Brand } from '~~/types/brand'
import { calcStartCost } from '~/function/common'
import { useCategoryStore } from '~~/store/category'

defineProps<{
  brandItem: Brand
}>()

const categoryStore = useCategoryStore()
const { category } = storeToRefs(categoryStore)

const loadCategoryImg = (
  largeCategoryName: string,
  smallCategoryName: string
): string => {
  const largeCategory = category.value.find(
    (category) => category.categoryName === largeCategoryName
  )

  let url = ''

  if (largeCategory) {
    const smallCategory = largeCategory.smallCategory.find(
      (category) => category.categoryName === smallCategoryName
    )

    if (smallCategory) {
      url = smallCategory.categoryImg
    }
  }

  return url
}
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
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;

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

      &.default-image {
        width: 50%;
        height: 50%;
      }
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
    font-weight: bold;
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
