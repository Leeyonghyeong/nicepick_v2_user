<template>
  <section>
    <article class="theme-select-list">
      <small v-if="getDevice !== 'mobile'">테마별로 만나는 브랜드</small>
      <div class="current-theme">
        <img
          v-if="getDevice === 'mobile'"
          src="~/assets/img/arrow/router-back.png"
          alt="back"
          class="back"
          @click="router.push('/')"
        />
        <div>
          {{
            route.params.type === '무인'
              ? '무인창업, 지금은 언택트 시대!'
              : route.params.type === '신생'
              ? '응애~ 새로운 시작! 신생브랜드'
              : route.params.type === '초보'
              ? '초보창업? 오히려 좋아!'
              : '띵똥! 배달왔습니다~ 배달특화!'
          }}
        </div>
      </div>
      <div class="theme-list">
        <div
          class="theme-item"
          :class="{ active: route.params.type === '무인' }"
          @click="changeTheme('무인')"
        >
          <img src="~/assets/img/theme/muin.png" alt="무인" />무인
        </div>
        <div
          class="theme-item"
          :class="{ active: route.params.type === '신생' }"
          @click="changeTheme('신생')"
        >
          <img src="~/assets/img/theme/new.png" alt="신생" />신생
        </div>
        <div
          class="theme-item"
          :class="{ active: route.params.type === '초보' }"
          @click="changeTheme('초보')"
        >
          <img src="~/assets/img/theme/beginner.png" alt="초보" />초보
        </div>
        <div
          class="theme-item"
          :class="{ active: route.params.type === '배달' }"
          @click="changeTheme('배달')"
        >
          <img src="~/assets/img/theme/delivery.png" alt="배달" />배달
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

const brandItems = ref<Brand[]>([])
const nextPage = ref<boolean>(false)
const page = ref<number>(1)
const totalCount = ref<number>(0)
const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 10 : getDevice.value === 'tablet' ? 8 : 6
})

const getBrandItems = async () => {
  page.value = 1
  const { type } = route.params
  const { data } = await api.get(
    `/brand/search/theme/${type}?sortType=p&page=${page.value}&pageNum=${pageNum.value}`
  )

  if (data.success) {
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    brandItems.value = data.brand
  }
}

const nextBrandItems = async () => {
  page.value++
  const { type } = route.params
  const { data } = await api.get(
    `/brand/search/theme/${type}?sortType=p&page=${page.value}&pageNum=${pageNum.value}`
  )

  if (data.success) {
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    brandItems.value.push(...data.brand)
  }
}

const changeTheme = (type: string) => {
  router.push(`/theme/${type}`)
}

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
})
</script>

<style lang="scss" scoped>
section {
  .theme-select-list {
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

    .current-theme {
      margin-top: 6px;
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
    }

    .theme-list {
      margin-top: 30px;
      display: flex;
      white-space: nowrap;
      font-size: 14px;
      overflow-x: auto;

      .theme-item {
        padding: 9px 14px;
        border-radius: 20px;
        border: 1px solid #ebebeb;
        margin-right: 8px;
        display: flex;
        align-items: center;
        color: $fontSubColor;
        cursor: pointer;

        img {
          width: 20px;
          margin-right: 2px;
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
      bottom: 108px;
    }
  }

  @include tablet {
    .theme-select-list {
      width: 100%;

      small {
        @include tablet-container();
      }

      .current-theme {
        @include tablet-container();

        .large-category-list {
          left: 44px;
        }
      }

      .theme-list {
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
    .theme-select-list {
      width: 100%;
      height: 140px;
      padding: 0;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 103;

      .current-theme {
        @include mobile-container();
        display: flex;
        width: 100%;
        height: 60px;
        border-bottom: 1px solid $sectionLine;
        color: $fontMainColor;

        .back {
          width: 30px;
          left: 24px;
          margin-right: 8px;
        }
      }

      .theme-list {
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
