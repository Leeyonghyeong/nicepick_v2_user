<template>
  <div
    class="brand-start-cost-item"
    @click="$router.push(`/brand/detail/${brandItem.id}`)"
  >
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
            category,
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
        창업비
        {{ calcPrice(brandItem.brandStartCost.startTotalPrice) }}
      </div>
      <div>{{ brandItem.brandStartCost.standardArea }}㎡</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { CategoryColor } from '~~/types/category'
import { Brand } from '~~/types/brand'
import { calcPrice, loadCategoryImg } from '~/function/common'
import { useCategoryStore } from '~~/store/category'

defineProps<{
  brandItem: Brand
}>()

const categoryStore = useCategoryStore()
const { category } = storeToRefs(categoryStore)
</script>

<style lang="scss" scoped>
.brand-start-cost-item {
  cursor: pointer;
  .brand-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 10px;
    margin-bottom: 14px;
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
      display: block;

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
    font-size: 16px;
    margin-bottom: 7px;
    color: $fontMainColor;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
  }

  .brand-start-cost {
    font-size: 13px;
    color: $fontMainColor;
    display: flex;
    align-items: center;

    div:last-child {
      font-size: 10px;
      color: $fontSubColor;
      padding: 3px 4px;
      background-color: #f3f3f3;
      border: 1px solid $iconLine;
      border-radius: 3px;
      margin-left: 6px;
    }
  }

  @include tablet {
    .brand-start-cost {
      font-size: 11px;
    }
  }

  @include mobile {
    .brand-image {
      margin-bottom: 10px;
    }
    .brand-name {
      font-size: 14px;
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
