<template>
  <section>
    <article>
      <div class="top">
        <div class="title">앞으로 기대되는 유망 브랜드</div>
        <div class="page">
          <div class="show-all" @click="moveShowAllPage">
            전체보기
            <img
              v-if="getDevice === 'mobile'"
              src="~/assets/img/arrow/more.png"
              alt="more"
            />
          </div>
          <div v-if="getDevice !== 'mobile'" class="page-button">
            <img
              src="~/assets/img/arrow/page_button_left.png"
              alt="prev"
              :style="{ cursor: prevPage ? 'pointer' : 'default' }"
              @click="changePage('-')"
            />
            <img
              src="~/assets/img/arrow/page_button_right.png"
              alt="next"
              @click="changePage('+')"
            />
          </div>
        </div>
      </div>
    </article>
    <article class="list">
      <CommonBrandItemListWrapper>
        <CommonBrandStartCostBrandItem
          v-for="brandItem in brandItems"
          :key="brandItem.id"
          :brand-item="brandItem"
        />
      </CommonBrandItemListWrapper>
    </article>
    <article v-if="getDevice === 'mobile'" class="re-load">
      <CommonButtonNextPageLoad
        title="유망브랜드 더보기"
        :page="page"
        :total-count="totalCount"
        :page-num="pageNum"
        @click="changePage('+')"
      />
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'
import api from '~/config/axios.config'
import { Brand } from '~/types/brand'
import { useBrandListStore } from '~~/store/brandList'

const windowStore = useWindowStore()
const brandListStore = useBrandListStore()
const { getDevice } = storeToRefs(windowStore)
const { expectList } = storeToRefs(brandListStore)

const router = useRouter()

const brandItems = ref<Brand[]>([])
const nextPage = ref<boolean>(false)
const prevPage = ref<boolean>(false)
const page = ref<number>(1)
const totalCount = ref<number>(0)
const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 10 : getDevice.value === 'tablet' ? 8 : 6
})

const getBrnadItems = async () => {
  const { data } = await api.get(
    `/brand/search/main/ad/${page.value}?pageNum=${pageNum.value}`
  )

  if (data.success) {
    brandItems.value = data.brand
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    prevPage.value = data.page.prev
  } else {
    alert('유망브랜드 요청 실패')
  }
}

const changePage = (type: string): void => {
  if (type === '+' && nextPage.value) {
    page.value++
    getBrnadItems()
  } else if (type === '+' && !nextPage.value) {
    page.value = 1
    getBrnadItems()
  }

  if (type === '-' && prevPage.value) {
    page.value--
    getBrnadItems()
  }
}

const moveShowAllPage = () => {
  expectList.value.brandItems = []
  expectList.value.page = 1
  expectList.value.nextPage = false
  expectList.value.totalCount = 0
  expectList.value.areaFilter = undefined
  expectList.value.costFilter = undefined

  router.push('/brand/expect')
}

onMounted(() => {
  getBrnadItems()
})

watch(
  () => getDevice.value,
  () => {
    getBrnadItems()
  }
)
</script>

<style lang="scss" scoped>
section {
  article {
    @include pc-container();
    margin-top: 80px;

    &.list {
      margin-top: 0px;
      margin-bottom: 80px;
    }

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 18px;
        font-weight: 500;
        color: $fontMainColor;
      }

      .page {
        display: flex;
        align-items: center;
        .show-all {
          font-size: 12px;
          font-weight: 400;
          color: $fontSubColor;
          cursor: pointer;
        }

        .page-button {
          img {
            width: 30px;
            height: 30px;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
    }
  }

  @include tablet {
    article {
      @include tablet-container();
      margin-top: 60px;

      &.list {
        margin-bottom: 60px;
      }
    }
  }

  @include mobile {
    article {
      @include mobile-container();

      &.list {
        margin-bottom: 30px;
      }

      &.re-load {
        margin-bottom: 30px;
        margin-top: 0;
      }

      .top {
        .title {
          font-size: 16px;
        }
        .page {
          .show-all {
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
