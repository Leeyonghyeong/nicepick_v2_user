<template>
  <section>
    <article class="category-select-list">
      <small v-if="getDevice !== 'mobile'">카테고리</small>
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
          <div v-for="item in category" :key="item.id" class="large-item">
            <NuxtLink
              :to="`/category/${item.categoryName.replaceAll('/', '%2F')}`"
              :class="{ active: item.categoryName === route.params.large }"
            >
              {{ item.categoryName }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div ref="smallCategoryList" class="small-category-list">
        <div class="small-item" :class="{ active: !route.params.small }">
          <NuxtLink
            :to="`/category/${currentLargeCategory?.categoryName.replaceAll(
              '/',
              '%2F'
            )}`"
            style="height: 20px"
            >전체
          </NuxtLink>
        </div>
        <div
          v-for="item in currentLargeCategory?.smallCategory"
          :key="item.id"
          class="small-item"
          :class="{ active: route.params.small === item.categoryName }"
        >
          <NuxtLink
            :to="`/category/${currentLargeCategory?.categoryName.replaceAll(
              '/',
              '%2F'
            )}/${item.categoryName.replaceAll('/', '%2F')}`"
          >
            <img
              v-if="route.query.s !== item.categoryName"
              :src="item.categoryImg"
              :alt="item.categoryName"
            />
            <img
              v-else
              :src="item.categoryActiveImg"
              :alt="item.categoryName"
            />
            {{ item.categoryName }}
          </NuxtLink>
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
      <CommonBrandFilter :total-count="totalCount" />

      <CommonBrandItemListWrapper>
        <CommonBrandStartCostBrandItem
          v-for="item in brandItems"
          :key="item.id"
          :brand-item="item"
        />
      </CommonBrandItemListWrapper>
    </article>
    <div ref="infinity" class="observer"></div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~~/store/category'
import { LargeCategory } from '~/types/category'
import { useWindowStore } from '~~/store/window'
import api from '~/config/axios.config'
import { Brand } from '~~/types/brand'

const categoryStore = useCategoryStore()
const windowStore = useWindowStore()
const { category } = storeToRefs(categoryStore)
const { getDevice } = storeToRefs(windowStore)

if (category.value.length === 0) {
  await categoryStore.getCategory()
}

const route = useRoute()
const router = useRouter()

const currentLargeCategory = ref<LargeCategory>()
const isShowLargeCategoryList = ref<boolean>(false)

const smallCategoryList = ref<HTMLDivElement | null>(null)
const isShowButtonLeft = ref<boolean>(false)

const brandItems = ref<Brand[]>([])
const nextPage = ref<boolean>(false)
const page = ref<number>(1)
const totalCount = ref<number>(0)
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
  page.value = 1
  const { large, small } = route.params
  const { data } = await api.get(
    `/brand/search/category?l=${large}&s=${small}&sortType=p&type=${
      small ? 's' : 'l'
    }&page=${page.value}&pageNum=${pageNum.value}`
  )

  if (data.success) {
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    brandItems.value = data.brand
  }
}

const nextBrandItems = async () => {
  page.value++
  const { large, small } = route.params
  const { data } = await api.get(
    `/brand/search/category?l=${large}&s=${small}&sortType=p&type=${
      small ? 's' : 'l'
    }&page=${page.value}&pageNum=${pageNum.value}`
  )

  if (data.success) {
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    brandItems.value.push(...data.brand)
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

let io: IntersectionObserver
const infinity = ref<HTMLDivElement | null>(null)

onMounted(() => {
  initCurrentLargeCategory()
  getBrandItems()

  io = new IntersectionObserver(
    () => {
      nextBrandItems()
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
      font-size: 12px;
      color: $fontSubColor;
    }

    .current-large-category {
      display: flex;
      position: relative;
      align-items: center;

      div {
        display: flex;
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
        bottom: 60px;
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
        bottom: 30px;
      }
    }
  }
}
</style>
