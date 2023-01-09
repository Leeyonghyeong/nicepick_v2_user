<template>
  <section>
    <article>
      <div class="top">
        <div class="title-theme">
          <div class="title">테마별로 만나는 브랜드</div>
          <div class="theme-button">
            <div
              :class="{ active: currentTheme === '무인' }"
              @click="currentTheme = '무인'"
            >
              무인
            </div>
            <div
              :class="{ active: currentTheme === '신생' }"
              @click="currentTheme = '신생'"
            >
              신생
            </div>
            <div
              :class="{ active: currentTheme === '초보' }"
              @click="currentTheme = '초보'"
            >
              초보
            </div>
            <div
              :class="{ active: currentTheme === '배달' }"
              @click="currentTheme = '배달'"
            >
              배달
            </div>
          </div>
        </div>
        <div class="page-button">
          <div
            class="show-all"
            @click="moveShowAllPage(`/theme/${currentTheme}`)"
          >
            전체보기
            <img
              v-if="getDevice === 'mobile'"
              src="~/assets/img/arrow/more.png"
              alt="more"
            />
          </div>
          <div v-if="getDevice !== 'mobile'" class="button">
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

      <div class="theme-list">
        <CommonBrandItemListWrapper>
          <CommonBrandStartCostBrandItem
            v-for="item in themeBrandItems"
            :key="item.id"
            :brand-item="item"
          />
        </CommonBrandItemListWrapper>
      </div>
      <div v-if="getDevice === 'mobile'" class="re-load">
        <CommonButtonNextPageLoad
          :title="`${currentTheme} 테마 더보기`"
          :page="page"
          :page-num="pageNum"
          :total-count="totalCount"
          @click="changePage('+')"
        />
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import api from '~/config/axios.config'
import { useBrandListStore } from '~~/store/brandList'
import { useWindowStore } from '~~/store/window'
import { Brand } from '~~/types/brand'

const windowStore = useWindowStore()
const brandListStore = useBrandListStore()
const { getDevice } = storeToRefs(windowStore)
const { themeList } = storeToRefs(brandListStore)

const router = useRouter()

const themeBrandItems = ref<Brand[]>([])

const currentTheme = ref<string>('무인')
const page = ref<number>(1)
const nextPage = ref<boolean>(false)
const prevPage = ref<boolean>(false)
const totalCount = ref<number>(0)
const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 10 : getDevice.value === 'tablet' ? 8 : 6
})

const getThemeBrand = async () => {
  const { data } = await api.get(
    `/brand/search/theme/${currentTheme.value}?sortType=p&page=${page.value}&pageNum=${pageNum.value}`
  )

  if (data.success) {
    themeBrandItems.value = data.brand
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    prevPage.value = data.page.prev
  } else {
    alert('테마 브랜드 요청 실패')
  }
}

const changePage = (type: string): void => {
  if (type === '+' && nextPage.value) {
    page.value++
    getThemeBrand()
  } else if (type === '+' && !nextPage.value) {
    page.value = 1
    getThemeBrand()
  }

  if (type === '-' && prevPage.value) {
    page.value--
    getThemeBrand()
  }
}

const moveShowAllPage = (url: string) => {
  themeList.value.brandItems = []
  themeList.value.page = 1
  themeList.value.nextPage = false
  themeList.value.totalCount = 0
  themeList.value.areaFilter = undefined
  themeList.value.costFilter = undefined

  router.push(url)
}

onMounted(() => {
  getThemeBrand()
})

watch(
  () => getDevice.value,
  () => getThemeBrand()
)

watch(
  () => currentTheme.value,
  () => {
    page.value = 1
    getThemeBrand()
  }
)
</script>

<style lang="scss" scoped>
section {
  article {
    @include pc-container();
    margin-top: 80px;

    .top {
      display: flex;
      justify-content: space-between;
      .title-theme {
        display: flex;
        align-items: center;
        .title {
          font-size: 18px;
          font-weight: 500;
          color: $fontMainColor;
          margin-right: 40px;
        }

        .theme-button {
          display: flex;

          div {
            cursor: pointer;
            padding: 4px 12px;
            font-size: 14px;
            color: $fontSubColor;
            background-color: #f3f3f3;
            border-radius: 50px;
            margin-right: 10px;

            &.active {
              color: #fff;
              background-color: $mainColor;
            }
          }
        }
      }

      .page-button {
        font-size: 12px;
        display: flex;
        align-items: center;

        .show-all {
          cursor: pointer;
          color: $fontSubColor;
        }

        .button {
          img {
            width: 30px;
            height: 30px;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
    }

    .theme-list {
      margin-bottom: 80px;
    }
  }

  @include tablet {
    article {
      @include tablet-container();
      margin-top: 60px;

      .top {
        display: block;
        position: relative;
        width: 100%;

        .title-theme {
          flex-direction: column;
          align-items: flex-start;
          width: 100%;

          .title {
            margin: 0;
            line-height: 30px;
          }

          .theme-button {
            width: 100%;
            display: grid;
            gap: 0 24px;
            grid-template-columns: repeat(4, calc((100% - 72px) / 4));
            margin-top: 20px;

            div {
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 0;
              padding: 0;
            }
          }
        }

        .page-button {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      .theme-list {
        margin-bottom: 60px;
      }
    }
  }

  @include mobile {
    article {
      @include mobile-container();
      margin-top: 30px;
      padding-bottom: 30px;
      border-bottom: 6px solid #f3f3f3;

      .top {
        display: block;
        position: relative;

        .title-theme {
          flex-direction: column;
          align-items: flex-start;

          .title {
            margin: 0;
            font-size: 16px;
          }

          .theme-button {
            margin-top: 20px;
            width: 100%;
            display: grid;
            gap: 0 24px;
            grid-template-columns: repeat(4, calc((100% - 72px) / 4));

            div {
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 0;
              padding: 0;
            }
          }
        }

        .page-button {
          position: absolute;
          top: 0;
          right: 0;

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

      .theme-list {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
