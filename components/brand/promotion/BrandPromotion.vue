<template>
  <section>
    <article class="brand-promotion-top">
      <div v-if="getDevice !== 'mobile'" class="page-info">
        <small>브랜드</small>
        <div>프로모션</div>
      </div>
      <MobileRouterBackHeader v-else title="프로모션" />
    </article>

    <article class="list">
      <div v-if="promotionList.brandItems.length > 0" class="item-list-wrapper">
        <div
          v-for="item in promotionList.brandItems"
          :key="item.id"
          class="item"
          @click="$router.push(`/brand/detail/${item.id}`)"
        >
          <div class="top">
            <div class="logo">
              <img
                v-if="item.brandLogoImg"
                :src="item.brandLogoImg"
                :alt="item.brandName"
              />
              <img
                v-else
                :src="
                  loadCategoryImg(
                    category,
                    item.largeCategoryName,
                    item.smallCategoryName
                  )
                "
                :alt="item.brandName"
                class="default-image"
              />
            </div>
            <div class="category-name">
              <div
                :style="{
                  color: CategoryColor(item.largeCategoryName),
                  border: `1px solid ${CategoryColor(item.largeCategoryName)}`,
                }"
                class="category"
              >
                {{ item.smallCategoryName }}
              </div>
              <div class="brand-name">
                {{ item.brandName }}
              </div>
            </div>
          </div>

          <div v-if="item.brandPromotionIcon" class="mid">
            <div
              v-for="promotionItem in item.brandPromotionIcon
                .split(',')
                .sort((a, b) => (a < b ? -1 : 0))"
              :key="promotionItem"
              class="promotion-item"
            >
              <img
                v-if="promotionItem.replace(/ /g, '') === '가맹비할인'"
                src="~/assets/img/promotion/franchise-fee-sale.png"
                alt="가맹비할인"
              />
              <img
                v-else-if="promotionItem.replace(/ /g, '') === '가맹비면제'"
                src="~/assets/img/promotion/franchise-fee-free.png"
                alt="가맹비면제"
              />
              <img
                v-else-if="promotionItem.replace(/ /g, '') === '교육비할인'"
                src="~/assets/img/promotion/edu-fee-sale.png"
                alt="교육비할인"
              />
              <img
                v-else-if="promotionItem.replace(/ /g, '') === '교육비면제'"
                src="~/assets/img/promotion/edu-fee-free.png"
                alt="교육비면제"
              />
              <img
                v-else-if="promotionItem.replace(/ /g, '') === '물품지원'"
                src="~/assets/img/promotion/article-help.png"
                alt="물품지원"
              />
              <img
                v-else-if="promotionItem.replace(/ /g, '') === '장비지원'"
                src="~/assets/img/promotion/equipment-help.png"
                alt="장비지원"
              />
              <img
                v-else
                src="~/assets/img/promotion/interior-help.png"
                alt="인테리어비용지원"
              />
              <div
                v-if="promotionItem.replace(/ /g, '') === '인테리어비용지원'"
              >
                <div>{{ promotionItem.slice(0, 4) }}</div>
                <div>{{ promotionItem.slice(4, promotionItem.length) }}</div>
              </div>
              <div v-else>{{ promotionItem }}</div>
            </div>
          </div>

          <div v-if="item.brandPromotion" class="bottom">
            <img src="~/assets/img/promotion/promotion.png" alt="promotion" />
            <div>{{ item.brandPromotion }}</div>
          </div>
        </div>
      </div>
      <div v-else class="empty">프로모션 진행중인 브랜드가 없습니다.</div>
    </article>
    <div ref="infinity" class="observer"></div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import MobileRouterBackHeader from '~~/components/common/MobileRouterBackHeader.vue'
import { useWindowStore } from '~~/store/window'
import { useBrandListStore } from '~/store/brandList'
import api from '~/config/axios.config'
import { loadCategoryImg } from '~/function/common'
import { useCategoryStore } from '~~/store/category'
import { CategoryColor } from '~/types/category'

const windowStore = useWindowStore()
const brandListStore = useBrandListStore()
const categoryStore = useCategoryStore()
const { getDevice } = storeToRefs(windowStore)
const { promotionList } = storeToRefs(brandListStore)
const { category } = storeToRefs(categoryStore)

if (category.value.length === 0) {
  await categoryStore.getCategory()
}

const getBrandItems = async () => {
  promotionList.value.page = 1

  const { data } = await api.get(
    `/brand/search/promotion?type=전체&page=${promotionList.value.page}&pageNum=8`
  )

  if (data.success) {
    promotionList.value.brandItems = data.brand
    promotionList.value.nextPage = data.page.next
    promotionList.value.totalCount = data.page.totalCount
  }
}

const nextBrandItems = async () => {
  if (promotionList.value.brandItems.length === 0) {
    getBrandItems()
    return
  }

  if (promotionList.value.nextPage) {
    promotionList.value.page++

    const { data } = await api.get(
      `/brand/search/promotion?type=전체&page=${promotionList.value.page}&pageNum=8`
    )

    if (data.success) {
      promotionList.value.brandItems.push(...data.brand)
      promotionList.value.nextPage = data.page.next
      promotionList.value.totalCount = data.page.totalCount
    }
  }
}

let io: IntersectionObserver
const infinity = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (promotionList.value.brandItems.length === 0) {
    getBrandItems()
  }

  io = new IntersectionObserver(
    () => {
      if (promotionList.value.nextPage) {
        nextBrandItems()
      }
    },
    {
      threshold: 0,
    }
  )

  if (infinity.value) io.observe(infinity.value)
})

onUnmounted(() => {
  io.disconnect()
})
</script>

<style lang="scss" scoped>
section {
  .brand-promotion-top {
    @include pc-container();
    position: relative;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
    padding: {
      top: 50px;
      bottom: 30px;
    }

    small {
      font-size: 12px;
      color: $fontSubColor;
    }

    div {
      margin-top: 6px;
      font-size: 20px;
      color: $fontMainColor;
    }
  }

  .list {
    @include pc-container();
    margin-bottom: 80px;

    .item-list-wrapper {
      column-count: 2;
      column-gap: 30px;

      .item {
        border-radius: 10px;
        border: 1px solid $inputLine;
        overflow: hidden;
        margin-bottom: 30px;
        cursor: pointer;

        .top {
          display: flex;
          padding: 20px;
          align-items: center;
          border-bottom: 1px solid $sectionLine;
          .logo {
            width: 115px;
            height: 46px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            border: 1px solid $sectionLine;
            overflow: hidden;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
              display: block;

              &.default-image {
                width: 40px;
                height: 40px;
              }
            }
          }

          .category-name {
            font-weight: 400;
            .category {
              display: inline-block;
              padding: 3px 4px;
              border-radius: 3px;
              font-size: 11px;
              margin-bottom: 7px;
            }

            .brand-name {
              font-size: 14px;
              color: $fontMainColor;
            }
          }
        }

        .mid {
          display: flex;
          padding: 10px 11px;

          .promotion-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 80px;
            height: 80px;
            font-size: 13px;
            font-weight: 400;
            color: $fontMainColor;

            img {
              width: 40px;
            }

            div {
              height: 32px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          }
        }

        .bottom {
          width: 100%;
          background-color: #fafafa;
          height: 40px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          font-size: 13px;
          font-weight: 400;
          color: #000;

          img {
            width: 20px;
            margin-right: 10px;
          }

          div {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }

  @include tablet {
    .brand-promotion-top {
      @include tablet-container();
      padding: {
        top: 50px;
        bottom: 20px;
      }
    }

    .list {
      @include tablet-container();
      margin-bottom: 60px;

      .item-list-wrapper {
        column-count: 1;
      }
    }
  }

  @include mobile {
    .brand-promotion-top {
      position: sticky;
      padding: 0;
      top: 0;

      div {
        font-size: 16px;
      }
    }

    .list {
      @include mobile-container();
      margin-top: 20px;
      margin-bottom: 30px;

      .item-list-wrapper {
        column-count: 1;

        .item {
          margin-bottom: 20px;

          .top {
            .category-name {
              .brand-name {
                font-size: 13px;
              }
            }
          }

          .mid {
            flex-wrap: wrap;
            padding: 10px 12px;

            .promotion-item {
              width: 60px;
              height: 60px;
              font-size: 10px;

              img {
                width: 30px;
              }

              div {
                height: 24px;
                line-height: 12px;
              }
            }
          }

          .bottom {
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>
