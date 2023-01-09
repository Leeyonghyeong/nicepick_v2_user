<template>
  <section>
    <article class="brand-expect-top">
      <div v-if="getDevice !== 'mobile'" class="brand-expect-notice">
        <small>앞으로가 기대되는</small>
        <div>유망브랜드</div>
      </div>
      <CommonMobileRouterMainHeader
        v-else
        title="앞으로가 기대되는 유망브랜드"
      />
      <div ref="largeCategoryList" class="large-category-list">
        <div class="large-item" :class="{ active: !route.query.type }">
          <NuxtLink to="/brand/expect" style="height: 20px">전체 </NuxtLink>
        </div>
        <div
          v-for="item in category"
          :key="item.id"
          class="large-item"
          :class="{ active: route.query.type === item.categoryName }"
        >
          <NuxtLink :to="`/brand/expect?type=${item.categoryName}`">
            <img :src="item.mainImg" :alt="item.categoryName" />
            {{ item.categoryName }}
          </NuxtLink>
        </div>
        <div
          v-if="getDevice === 'pc' && !isShowButtonLeft"
          class="page-absolute-button-right page-button"
        >
          <img
            src="~/assets/img/arrow/page_button_right.png"
            alt="right"
            @click="scrollButtonHandler('right')"
          />
        </div>
        <div
          v-if="getDevice === 'pc' && isShowButtonLeft"
          class="page-absolute-button-left page-button"
        >
          <img
            src="~/assets/img/arrow/page_button_left.png"
            alt="left"
            @click="scrollButtonHandler('left')"
          />
        </div>
      </div>
    </article>

    <article class="list">
      <CommonBrandFilter
        :total-count="expectList.totalCount"
        list-type="expect"
        @get-brand-items="getBrandItems"
      />

      <CommonBrandItemListWrapper v-if="expectList.brandItems.length > 0">
        <CommonBrandStartCostBrandItem
          v-for="(item, index) in expectList.brandItems"
          :key="item.id"
          :brand-item="item"
          :index="index"
        />
      </CommonBrandItemListWrapper>
      <div v-else class="empty">검색 결과가 존재하지 않습니다.</div>
    </article>
    <div ref="infinity" class="observer"></div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~~/store/category'
import { useWindowStore } from '~~/store/window'
import api from '~/config/axios.config'
import { useBrandListStore } from '~~/store/brandList'

const categoryStore = useCategoryStore()
const windowStore = useWindowStore()
const brandListStore = useBrandListStore()
const { category } = storeToRefs(categoryStore)
const { getDevice } = storeToRefs(windowStore)
const { expectList } = storeToRefs(brandListStore)

if (category.value.length === 0) {
  await categoryStore.getCategory()
}

const route = useRoute()

const largeCategoryList = ref<HTMLDivElement | null>(null)
const isShowButtonLeft = ref<boolean>(false)

const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 10 : getDevice.value === 'tablet' ? 8 : 6
})

const scrollButtonHandler = (type: string) => {
  if (largeCategoryList.value) {
    if (type === 'right') {
      largeCategoryList.value.scrollLeft += 200
      isShowButtonLeft.value = true
    } else {
      largeCategoryList.value.scrollLeft -= 200
      isShowButtonLeft.value = false
    }
  }
}

const getBrandItems = async () => {
  expectList.value.page = 1
  const { type } = route.query
  const { data } = await api.get(
    `/brand/search/main/ad/${expectList.value.page}?pageNum=${pageNum.value}${
      type ? `&type=${type}` : ''
    }${
      expectList.value.costFilter
        ? `&costFilter=${expectList.value.costFilter}`
        : ''
    }${
      expectList.value.areaFilter
        ? `&areaFilter=${expectList.value.areaFilter}`
        : ''
    }`
  )

  if (data.success) {
    expectList.value.totalCount = data.page.totalCount
    expectList.value.nextPage = data.page.next
    expectList.value.brandItems = data.brand
  }
}

const nextBrandItems = async () => {
  if (expectList.value.brandItems.length === 0) {
    getBrandItems()
    return
  }

  if (expectList.value.nextPage) {
    expectList.value.page++
    const { type } = route.query
    const { data } = await api.get(
      `/brand/search/main/ad/${expectList.value.page}?pageNum=${pageNum.value}${
        type ? `&type=${type}` : ''
      }${
        expectList.value.costFilter
          ? `&costFilter=${expectList.value.costFilter}`
          : ''
      }${
        expectList.value.areaFilter
          ? `&areaFilter=${expectList.value.areaFilter}`
          : ''
      }`
    )

    if (data.success) {
      expectList.value.totalCount = data.page.totalCount
      expectList.value.nextPage = data.page.next
      expectList.value.brandItems.push(...data.brand)
    }
  }
}

watch(
  () => route.query,
  () => {
    getBrandItems()
  }
)

watch(
  () => expectList.value.nextPage,
  () => {
    if (expectList.value.page === 1) {
      nextBrandItems()
    }
  }
)

let io: IntersectionObserver
const infinity = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (expectList.value.brandItems.length === 0) {
    getBrandItems()
  }

  io = new IntersectionObserver(
    () => {
      if (expectList.value.nextPage) {
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
  document.body.removeAttribute('style')
})
</script>

<style lang="scss" scoped>
section {
  .brand-expect-top {
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

    .brand-expect-notice {
      display: flex;
      flex-direction: column;
      position: relative;

      small {
        font-size: 12px;
        color: $fontSubColor;
      }

      div {
        display: flex;
        margin-top: 6px;
        font-size: 20px;
      }

      .large-category-list {
        position: absolute;
        z-index: 1;
        top: 34px;
        left: 0;
        border: 1px solid #ebebeb;
        background-color: #fff;
        border-radius: 10px;
        flex-direction: column;
        padding: 15px;

        .large-item {
          margin-bottom: 23px;
          cursor: pointer;
          font-size: 14px;

          a {
            color: $fontSubColor;
            text-decoration: none;

            &.active {
              color: $mainColor;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .large-category-list {
      margin-top: 30px;
      display: flex;
      white-space: nowrap;
      font-size: 14px;
      overflow-x: auto;

      .large-item {
        padding: 9px 14px;
        border-radius: 20px;
        border: 1px solid #ebebeb;
        margin-right: 8px;

        &:last-child {
          margin-right: 0;
        }

        a {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: $fontSubColor;

          img {
            width: 20px;
            margin-right: 2px;
          }
        }

        &.active {
          border-color: $mainColor;

          a {
            color: $mainColor;
          }
        }
      }

      .page-button {
        position: absolute;
        background-color: #fff;

        img {
          width: 40px;
          cursor: pointer;
        }

        &.page-absolute-button-right {
          right: 0;
          filter: drop-shadow(-12px 0px 10px #ffffff);
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        }

        &.page-absolute-button-left {
          left: 0;
          filter: drop-shadow(12px 0px 10px #ffffff);
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        }
      }
    }
  }

  .list {
    @include pc-container();
    padding: {
      top: 50px;
      bottom: 108px;
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
    .brand-expect-top {
      width: 100%;

      .brand-expect-notice {
        @include tablet-container();

        .large-category-list {
          left: 44px;
        }
      }

      .large-category-list {
        @include tablet-container();
      }
    }

    .list {
      @include tablet-container();
      padding: {
        top: 50px;
        bottom: 60px;
      }

      .empty {
        font-size: 14px;
      }
    }
  }

  @include mobile {
    .brand-expect-top {
      width: 100%;
      height: 140px;
      padding: 0;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 103;

      .large-category-list {
        @include mobile-container();
        margin: 20px 0;
      }
    }

    .list {
      @include mobile-container();
      padding: {
        top: 30px;
        bottom: 30px;
      }
    }
  }
}
</style>
