<template>
  <article :style="{ backgroundColor }">
    <div class="recommend-brand">
      <h1>추천 브랜드<span>AD</span></h1>
      <div class="recommend-brand-items">
        <div
          v-for="item in brand"
          :key="item.id"
          class="item"
          @click="$router.push(`/brand/detail/${item.id}`)"
        >
          <div class="logo">
            <img :src="item.brandLogoImg" :alt="item.brandName" />
          </div>
          <div class="brand-name-category">
            <div
              class="category"
              :style="{
                borderColor: CategoryColor(item.largeCategoryName),
                color: CategoryColor(item.largeCategoryName),
              }"
            >
              {{ item.smallCategoryName }}
            </div>
            <div class="brand-name">{{ item.brandName }}</div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import api from '~/config/axios.config'
import { Brand } from '~~/types/brand'
import { CategoryColor } from '~~/types/category'

defineProps<{
  backgroundColor: string
}>()

const brand = ref<Brand[]>([])

onMounted(async () => {
  const { data } = await api.get('/brand/search/recommend/brand')

  if (data.success) {
    brand.value = data.brand.sort(() => Math.random() - 0.5).slice(0, 6)
  }
})
</script>

<style lang="scss" scoped>
article {
  padding: 47px 0;

  .recommend-brand {
    @include pc-container();

    h1 {
      font-weight: 500;
      display: flex;
      align-items: center;
      color: $fontMainColor;

      span {
        color: #fff;
        background-color: #bcbcbc;
        padding: 2px 5px;
        border-radius: 20px;
        font-size: 10px;
        margin-left: 4px;
      }
    }

    .recommend-brand-items {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item {
        cursor: pointer;
        width: 174px;
        .logo {
          border: 1px solid #f3f3f3;
          border-radius: 10px;
          height: 68px;
          overflow: hidden;

          img {
            width: 174px;
            height: 68px;
          }
        }

        .brand-name-category {
          margin-top: 10px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $fontMainColor;

          .category {
            padding: 3px 4px;
            font-size: 11px;
            border: 1px solid;
            border-radius: 3px;
            margin-right: 8px;
          }

          .brand-name {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }
}

@include tablet {
  article {
    width: 100%;
    .recommend-brand {
      width: 100%;
      h1 {
        @include tablet-container();
      }
      .recommend-brand-items {
        @include tablet-container();
        display: flex;
        white-space: nowrap;
        overflow-x: auto;

        .item {
          margin-right: 24px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}

@include mobile {
  article {
    width: 100%;
    padding: 40px 0;
    .recommend-brand {
      width: 100%;
      h1 {
        @include mobile-container();
      }

      .recommend-brand-items {
        @include mobile-container();
        white-space: nowrap;
        overflow-x: auto;

        .item {
          margin-right: 8px;
          width: 160px;

          &:last-child {
            margin-right: 0;
          }

          .logo {
            height: 62px;

            img {
              width: 160px;
              height: 62px;
            }
          }

          .brand-name-category {
            .brand-name {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
