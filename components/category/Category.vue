<template>
  <section>
    <article class="category-select-list">
      <small v-if="getDevice !== 'mobile'">업종</small>
      <div class="current-large-category">
        <img
          v-if="getDevice === 'mobile'"
          src="~/assets/img/arrow/router-back.png"
          alt="back"
          class="back"
          @click="router.push('/')"
        />
        <div>{{ route.params.large }}</div>
        <div>
          <img
            src="~/assets/img/arrow/list_button_down.png"
            alt="down"
            @click="isShowLargeCategoryHandler"
          />
        </div>
        <div v-if="isShowLargeCategoryList" class="large-category-list">
          <div
            v-for="item in category"
            :key="item.id"
            class="large-item"
            @click="
              selectCategoryHandler(
                `/category/${item.categoryName.replaceAll('/', '%2F')}`
              )
            "
          >
            {{ item.categoryName }}
          </div>
        </div>
      </div>
      <div ref="smallCategoryList" class="small-category-list">
        <div
          class="small-item"
          :class="{ active: !route.params.small }"
          @click="
            selectCategoryHandler(
              `/category/${currentLargeCategory?.categoryName.replaceAll(
                '/',
                '%2F'
              )}`
            )
          "
        >
          전체
        </div>
        <div
          v-for="item in currentLargeCategory?.smallCategory"
          :key="item.id"
          class="small-item"
          :class="{ active: route.params.small === item.categoryName }"
          @click="
            selectCategoryHandler(
              `/category/${currentLargeCategory?.categoryName.replaceAll(
                '/',
                '%2F'
              )}/${item.categoryName.replaceAll('/', '%2F')}`
            )
          "
        >
          <img
            v-if="route.query.s !== item.categoryName"
            :src="item.categoryImg"
            :alt="item.categoryName"
          />
          <img v-else :src="item.categoryActiveImg" :alt="item.categoryName" />
          {{ item.categoryName }}
        </div>
        <div
          v-if="
            currentLargeCategory &&
            currentLargeCategory.categoryName === '생활서비스' &&
            getDevice === 'pc' &&
            !isShowButtonLeft
          "
          class="page-absolute-button-right page-button"
        >
          <img
            src="~/assets/img/arrow/page_button_right.png"
            alt="right"
            @click="scrollButtonHandler('right')"
          />
        </div>
        <div
          v-if="
            currentLargeCategory &&
            currentLargeCategory.categoryName === '생활서비스' &&
            getDevice === 'pc' &&
            isShowButtonLeft
          "
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

    <CommonBrandRecommendBrandItem background-color="#f8fafd" />

    <article class="list">
      <CommonBrandFilter
        :total-count="categoryList.totalCount"
        list-type="category"
        @get-brand-items="getBrandItems"
      />

      <CommonBrandItemListAdWrapper v-if="categoryList.brandItems.length > 0">
        <template
          v-for="(item, index) in categoryList.brandItems"
          :key="item.id"
        >
          <CommonBrandStartCostBrandItem
            :brand-item="item"
            :style="{
              flexBasis:
                getDevice === 'pc'
                  ? 'calc((100% - 120px) / 5)'
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
            style="margin: 0 -44px 60px -44px"
            width="100vw"
          />
          <CommonAdBanner
            v-if="getDevice === 'mobile' && !((index + 1) % 9)"
            style="margin: 0 -24px 30px -24px"
            width="100vw"
          />
        </template>
      </CommonBrandItemListAdWrapper>
      <div v-else class="empty">검색 결과가 존재하지 않습니다.</div>
    </article>
    <div ref="infinity" class="observer"></div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~~/store/category'
import { LargeCategory } from '~/types/category'
import { useWindowStore } from '~~/store/window'
import { useBrandListStore } from '~/store/brandList'
import api from '~/config/axios.config'

const categoryStore = useCategoryStore()
const windowStore = useWindowStore()
const brandListStore = useBrandListStore()
const { category } = storeToRefs(categoryStore)
const { getDevice } = storeToRefs(windowStore)
const { categoryList } = storeToRefs(brandListStore)

if (category.value.length === 0) {
  await categoryStore.getCategory()
}

const route = useRoute()
const router = useRouter()

const currentLargeCategory = ref<LargeCategory>()
const isShowLargeCategoryList = ref<boolean>(false)

const smallCategoryList = ref<HTMLDivElement | null>(null)
const isShowButtonLeft = ref<boolean>(false)

const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 10 : getDevice.value === 'tablet' ? 8 : 6
})

const initCurrentLargeCategory = () => {
  currentLargeCategory.value = category.value.find(
    (item) => item.categoryName === route.params.large
  )
}

const scrollButtonHandler = (type: string) => {
  if (smallCategoryList.value) {
    if (type === 'right') {
      smallCategoryList.value.scrollLeft += 100
      isShowButtonLeft.value = true
    } else {
      smallCategoryList.value.scrollLeft -= 100
      isShowButtonLeft.value = false
    }
  }
}

const getBrandItems = async () => {
  categoryList.value.page = 1
  const { large, small } = route.params
  const { data } = await api.get(
    `/brand/search/category?l=${large}&s=${small}&sortType=p&type=${
      small ? 's' : 'l'
    }&page=${categoryList.value.page}&pageNum=${pageNum.value}${
      categoryList.value.costFilter
        ? `&costFilter=${categoryList.value.costFilter}`
        : ''
    }${
      categoryList.value.areaFilter
        ? `&areaFilter=${categoryList.value.areaFilter}`
        : ''
    }`
  )

  if (data.success) {
    categoryList.value.totalCount = data.page.totalCount
    categoryList.value.nextPage = data.page.next
    categoryList.value.brandItems = data.brand
  }
}

const nextBrandItems = async () => {
  if (categoryList.value.brandItems.length === 0) {
    getBrandItems()
    return
  }

  if (categoryList.value.nextPage) {
    categoryList.value.page++

    const { large, small } = route.params
    const { data } = await api.get(
      `/brand/search/category?l=${large}&s=${small}&sortType=p&type=${
        small ? 's' : 'l'
      }&page=${categoryList.value.page}&pageNum=${pageNum.value}${
        categoryList.value.costFilter
          ? `&costFilter=${categoryList.value.costFilter}`
          : ''
      }${
        categoryList.value.areaFilter
          ? `&areaFilter=${categoryList.value.areaFilter}`
          : ''
      }`
    )

    if (data.success) {
      categoryList.value.totalCount = data.page.totalCount
      categoryList.value.nextPage = data.page.next
      categoryList.value.brandItems.push(...data.brand)
    }
  }
}

const isShowLargeCategoryHandler = () => {
  if (isShowLargeCategoryList.value) {
    document.body.removeAttribute('style')
    isShowLargeCategoryList.value = false
  } else {
    if (getDevice.value === 'mobile') {
      document.body.setAttribute('style', 'overflow: hidden')
    }

    isShowLargeCategoryList.value = true
  }
}

const selectCategoryHandler = (url: string) => {
  if (route.path === url) {
    return
  }

  categoryList.value.brandItems = []
  categoryList.value.page = 1
  categoryList.value.nextPage = false
  categoryList.value.totalCount = 0

  router.push(url)
}

let io: IntersectionObserver
const infinity = ref<HTMLDivElement | null>(null)

onMounted(() => {
  initCurrentLargeCategory()
  if (categoryList.value.brandItems.length === 0) {
    getBrandItems()
  }

  io = new IntersectionObserver(
    () => {
      if (categoryList.value.nextPage) {
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
  .category-select-list {
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
      display: block;
      font-size: 12px;
      color: $fontSubColor;
      margin-bottom: 6px;
    }

    .current-large-category {
      display: flex;
      position: relative;
      align-items: center;

      div {
        display: flex;
        font-size: 20px;

        img {
          width: 24px;
          margin-left: 8px;
          cursor: pointer;
        }
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

    .small-category-list {
      margin-top: 30px;
      display: flex;
      white-space: nowrap;
      font-size: 14px;
      overflow-x: auto;

      .small-item {
        padding: 9px 14px;
        border-radius: 20px;
        border: 1px solid #ebebeb;
        margin-right: 8px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: $fontSubColor;

        img {
          width: 20px;
          margin-right: 2px;
        }

        &:last-child {
          margin-right: 0;
        }

        &.active {
          border-color: $mainColor;
          color: $mainColor;
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
    .category-select-list {
      width: 100%;

      small {
        @include tablet-container();
      }

      .current-large-category {
        @include tablet-container();

        .large-category-list {
          left: 44px;
        }
      }

      .small-category-list {
        @include tablet-container();
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
    .category-select-list {
      width: 100%;
      height: 140px;
      padding: 0;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 103;

      .current-large-category {
        @include mobile-container();
        position: relative;
        width: 100%;
        justify-content: center;
        height: 60px;
        border-bottom: 1px solid $sectionLine;

        .back {
          width: 30px;
          position: absolute;
          left: 24px;
        }

        .large-category-list {
          position: absolute;
          padding: 0;
          top: 0;
          margin-top: 60px;
          border: 0;
          height: 100vh;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 0;
          display: grid;
          grid-template-columns: repeat(2, calc(100% / 2));
          grid-template-rows: repeat(5, 50px);

          .large-item {
            display: inline;
            margin: 0;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
          }
        }
      }

      .small-category-list {
        @include mobile-container();
        margin: 20px 0;
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
