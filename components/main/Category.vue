<template>
  <section>
    <article v-if="category.length > 0">
      <div class="item-wrapper">
        <div
          v-for="item in category"
          :key="item.id"
          class="category-item"
          @click="moveCategoryPage(item.categoryName)"
        >
          <img :src="item.mainImg" :alt="item.categoryName" />
          <div>{{ item.categoryName }}</div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~~/store/category'

const categoryStore = useCategoryStore()
const { category } = storeToRefs(categoryStore)

if (category.value.length === 0) {
  categoryStore.addCategory()
}

const router = useRouter()

const moveCategoryPage = (l: string) => {
  router.push(`/category?l=${l}`)
}
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 30px;
  article {
    @include pc-container();
    margin-top: 30px;
    justify-content: space-between;

    .item-wrapper {
      display: grid;
      gap: 0;
      grid-template-columns: repeat(10, calc(100% / 10));
      .category-item {
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 15px;
        font-weight: 400;
        color: $fontMainColor;

        img {
          width: 50px;
          height: 50px;
          margin-bottom: 10px;
        }
      }
    }
  }

  @include tablet {
    article {
      @include tablet-container();
      margin-top: 30px;
      .item-wrapper {
        .category-item {
          font-size: 12px;
          height: auto;
          padding-top: 8px;
          width: auto;

          img {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }

  @include mobile {
    article {
      @include mobile-container();
      margin-top: 30px;
      flex-direction: column;
      justify-content: space-between;

      .item-wrapper {
        gap: 14px 0;
        grid-template-columns: repeat(5, calc(100% / 5));

        .category-item {
          font-size: 11px;
          height: auto;

          div {
            text-align: center;
            word-break: break-all;
          }

          img {
            width: 40px;
            height: 40px;
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
