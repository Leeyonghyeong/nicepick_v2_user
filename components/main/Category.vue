<template>
  <section>
    <article v-if="category.length > 0">
      <div class="item-wrapper">
        <div v-for="index in 5" :key="index" class="category-item">
          <img
            :src="category[index - 1].mainImg"
            :alt="category[index - 1].categoryName"
          />
          <div>{{ category[index - 1].categoryName }}</div>
        </div>
      </div>
      <div class="item-wrapper">
        <div v-for="index in 5" :key="index" class="category-item">
          <img
            :src="category[index + 5 - 1].mainImg"
            :alt="category[index + 5 - 1].categoryName"
          />
          <div>{{ category[index + 5 - 1].categoryName }}</div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import api from '~/config/axios.config'
import { LargeCategory } from '~/types/category'

const category = ref<LargeCategory[]>([])

onMounted(async () => {
  const { data } = await api.get('/category')

  if (data.success) {
    category.value = data.largeCategory
  } else {
    alert('카테고리 요청 실패')
  }
})
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 30px;
  article {
    @include pc-container();
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    .item-wrapper {
      display: flex;
      .category-item {
        width: 119px;
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
        width: calc(100% / 2.1);
        justify-content: space-between;
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
        justify-content: space-between;
        padding: 0 20px;

        &:first-child {
          .category-item {
            margin-bottom: 14px;
          }
        }
        .category-item {
          font-size: 11px;
          height: auto;
          width: 40px;

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
