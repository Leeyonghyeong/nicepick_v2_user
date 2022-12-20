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
        {{ $route.query.keyword }}
        <span v-if="getDevice !== 'mobile'">검색 결과</span>
      </div>
    </article>

    <CommonBrandRecommendBrandItem background-color="#F8FAFD" />

    <article class="list">
      <CommonBrandFilter :total-count="totalCount" />

      <CommonBrandItemListWrapper v-if="brandItems.length > 0">
        <CommonBrandStartCostBrandItem
          v-for="item in brandItems"
          :key="item.id"
          :brand-item="item"
        />
      </CommonBrandItemListWrapper>
      <div v-else class="empty">검색 결과가 존재하지 않습니다.</div>
    </article>
    <div ref="infinity" class="observer"></div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'
import { Brand } from '~~/types/brand'
import api from '~/config/axios.config'
import { useCategoryStore } from '~~/store/category'

const categoryStore = useCategoryStore()
const windowStore = useWindowStore()
const { category } = storeToRefs(categoryStore)
const { getDevice } = storeToRefs(windowStore)

if (category.value.length === 0) {
  await categoryStore.addCategory()
}

const route = useRoute()

const brandItems = ref<Brand[]>([])
const nextPage = ref<boolean>(false)
const page = ref<number>(1)
const totalCount = ref<number>(0)
const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 12 : getDevice.value === 'tablet' ? 8 : 6
})

const getBrandItems = async () => {
  page.value = 1
  const { keyword } = route.query
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
  page.value++
  const { keyword } = route.query
  const { data } = await api.get(
    `/brand/search?keyword=${keyword}&sortType=p&page=${page.value}&pageNum=${pageNum.value}`
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
        bottom: 60px;
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
      }
    }

    .list {
      @include mobile-container();

      .empty {
        font-size: 14px;
      }
    }
  }
}
</style>
