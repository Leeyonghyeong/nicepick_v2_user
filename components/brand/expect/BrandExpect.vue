<template>
  <section>
    <article class="brand-expect-top">
      <small v-if="getDevice !== 'mobile'">앞으로가 기대되는</small>
      <div class="brand-expect-notice">
        <img
          v-if="getDevice === 'mobile'"
          src="~/assets/img/arrow/router-back.png"
          alt="back"
          class="back"
          @click="router.push('/')"
        />
        <div>유망브랜드</div>
      </div>
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
import { useWindowStore } from '~~/store/window'
import api from '~/config/axios.config'
import { Brand } from '~~/types/brand'

const categoryStore = useCategoryStore()
const windowStore = useWindowStore()
const { category } = storeToRefs(categoryStore)
const { getDevice } = storeToRefs(windowStore)

if (category.value.length === 0) {
  await categoryStore.addCategory()
}

const route = useRoute()
const router = useRouter()

const largeCategoryList = ref<HTMLDivElement | null>(null)
const isShowButtonLeft = ref<boolean>(false)

const brandItems = ref<Brand[]>([])
const nextPage = ref<boolean>(false)
const page = ref<number>(1)
const totalCount = ref<number>(0)
const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 12 : getDevice.value === 'tablet' ? 8 : 6
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
  page.value = 1
  const { type } = route.query
  const { data } = await api.get(
    `/brand/search/main/ad/${page.value}?pageNum=${pageNum.value}${
      type ? `&type=${type}` : ''
    }`
  )

  if (data.success) {
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    brandItems.value = data.brand
  }
}

const nextBrandItems = async () => {
  page.value++
  const { type } = route.query
  const { data } = await api.get(
    `/brand/search/main/ad/${page.value}?pageNum=${pageNum.value}${
      type ? `&type=${type}` : ''
    }`
  )

  if (data.success) {
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    brandItems.value.push(...data.brand)
  }
}

watch(
  () => route.query,
  () => {
    getBrandItems()
  }
)

let io: IntersectionObserver
const infinity = ref<HTMLDivElement | null>(null)

onMounted(() => {
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

    small {
      font-size: 12px;
      color: $fontSubColor;
    }

    .brand-expect-notice {
      display: flex;
      position: relative;
      align-items: center;

      div {
        display: flex;
        margin-top: 6px;

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
  }

  @include tablet {
    .brand-expect-top {
      width: 100%;

      small {
        @include tablet-container();
      }

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

      .brand-expect-notice {
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
