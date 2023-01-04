<template>
  <section>
    <article class="search-result-keyword">
      <div class="etc-img">
        <img
          v-if="getDevice !== 'mobile'"
          src="~/assets/img/common/search-gray.png"
          alt="search"
        />
        <img v-else src="~/assets/img/header/search.png" alt="search" />
      </div>
      <div>
        {{ $route.params.keyword }}
        <span v-if="getDevice !== 'mobile'">검색 결과</span>
      </div>
      <div v-if="getDevice === 'mobile'" class="mobile-search-modal">
        <img
          src="~/assets/img/close/close_black.png"
          alt="search"
          @click="isShowSearchModal = true"
        />
      </div>
    </article>

    <CommonBrandRecommendBrandItem background-color="#F8FAFD" />

    <article class="list">
      <CommonBrandFilter :total-count="totalCount" />

      <CommonBrandItemListAdWrapper v-if="brandItems.length > 0">
        <template v-for="(item, index) in brandItems" :key="item.id">
          <CommonBrandStartCostBrandItem
            :brand-item="item"
            :style="{
              flexBasis:
                getDevice === 'pc'
                  ? '214.8px'
                  : getDevice === 'tablet'
                  ? 'calc((100% - 72px) / 4)'
                  : 'calc((100% - 16px) / 3)',
              marginBottom:
                getDevice === 'pc'
                  ? '80px'
                  : getDevice === 'tablet'
                  ? '60px'
                  : '30px',
              marginRight:
                getDevice === 'pc'
                  ? !((index + 1) % 5)
                    ? '0'
                    : '30px'
                  : getDevice === 'tablet'
                  ? !((index + 1) % 4)
                    ? '0'
                    : '24px'
                  : !((index + 1) % 3)
                  ? '0'
                  : '8px',
              overflow: 'hidden',
            }"
          />
          <CommonAdBanner
            v-if="getDevice === 'pc' && !((index + 1) % 15)"
            style="margin: 0 0 80px 0"
          />
          <CommonAdBanner
            v-if="getDevice === 'tablet' && !((index + 1) % 12)"
            style="margin: 0 -44px 60px -44px; width: 100vw"
          />
          <CommonAdBanner
            v-if="getDevice === 'mobile' && !((index + 1) % 9)"
            style="margin: 0 -24px 30px -24px; width: 100vw"
          />
        </template>
      </CommonBrandItemListAdWrapper>
      <div v-else class="empty">검색 결과가 존재하지 않습니다.</div>
    </article>
    <div ref="infinity" class="observer"></div>
  </section>
  <ModalSearchModal
    v-if="isShowSearchModal"
    @close-search-modal="closeSearchModal"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'
import api from '~/config/axios.config'
import { useCategoryStore } from '~~/store/category'
import { useBrandListStore } from '~~/store/brandList'

const categoryStore = useCategoryStore()
const windowStore = useWindowStore()
const brandListStore = useBrandListStore()
const { category } = storeToRefs(categoryStore)
const { getDevice } = storeToRefs(windowStore)
const {
  searchList: brandItems,
  searchListPage: page,
  searchListNextPage: nextPage,
  searchListTotalCount: totalCount,
} = storeToRefs(brandListStore)

if (category.value.length === 0) {
  await categoryStore.getCategory()
}

const route = useRoute()

const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 10 : getDevice.value === 'tablet' ? 8 : 6
})

const getBrandItems = async () => {
  page.value = 1
  const { keyword } = route.params
  const { data } = await api.get(
    `/brand/search?keyword=${keyword}&sortType=p&page=${page.value}&pageNum=${pageNum.value}`
  )

  if (data.success) {
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    brandItems.value = data.brand
  }
}

const nextBrandItems = async () => {
  if (brandItems.value.length === 0) {
    getBrandItems()
    return
  }

  if (nextPage.value) {
    page.value++
    const { keyword } = route.params
    const { data } = await api.get(
      `/brand/search?keyword=${keyword}&sortType=p&page=${page.value}&pageNum=${pageNum.value}`
    )

    if (data.success) {
      totalCount.value = data.page.totalCount
      nextPage.value = data.page.next
      brandItems.value.push(...data.brand)
    }
  }
}

const isShowSearchModal = ref<boolean>(false)

const closeSearchModal = () => {
  isShowSearchModal.value = false
}

let io: IntersectionObserver
const infinity = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (brandItems.value.length === 0) {
    getBrandItems()
  }

  io = new IntersectionObserver(
    () => {
      if (nextPage.value) {
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
  .search-result-keyword {
    @include pc-container();
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;

    div {
      font-size: 20px;
      color: $mainColor;
      span {
        color: $fontMainColor;
      }
      &.etc-img {
        padding: 9px;
        border-radius: 50%;
        background-color: #fafafa;
        margin-bottom: 10px;

        img {
          width: 30px;
        }
      }
    }
  }

  .list {
    @include pc-container();
    padding: {
      top: 50px;
      bottom: 28px;
    }

    .empty {
      display: flex;
      justify-content: center;
      color: $fontSubColor;
      padding: {
        top: 120px;
        bottom: 300px;
      }
    }
  }

  @include tablet {
    .search-result-keyword {
      @include tablet-container();
      padding: {
        top: 50px;
        bottom: 50px;
      }
    }

    .list {
      @include tablet-container();
      padding: {
        top: 50px;
      }
    }
  }

  @include mobile {
    .search-result-keyword {
      @include mobile-container();
      flex-direction: row;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid $sectionLine;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 1;

      div {
        color: $fontMainColor;
        font-size: 13px;
        &.etc-img {
          padding: 0;
          border-radius: 0;
          background-color: #fff;
          margin: 0;
          margin-right: 8px;
        }

        &.mobile-search-modal {
          position: absolute;
          right: 24px;

          img {
            width: 30px;
          }
        }
      }
    }

    .list {
      @include mobile-container();
      padding: {
        top: 30px;
      }

      .empty {
        font-size: 14px;
      }
    }
  }
}
</style>
