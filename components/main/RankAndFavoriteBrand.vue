<template>
  <section>
    <article class="rank-favorite">
      <article class="rank">
        <h1 class="title">주간 검색 순위</h1>
        <div class="rank-box">
          <div v-for="item in currentRank" :key="item.rank" class="rank-item">
            <div class="keyword-rank">{{ item.rank }}</div>
            <div class="keyword">{{ item.keyword }}</div>
            <div class="variance">
              <img
                v-if="item.variance === 'new'"
                src="~/assets/img/rank/new.png"
                alt="new"
              />
              <img
                v-else-if="item.variance > 0"
                src="~/assets/img/rank/up.png"
                alt="up"
              />
              <img
                v-else-if="item.variance === 0"
                src="~/assets/img/rank/no-change.png"
                alt="new"
              />
              <img v-else src="~/assets/img/rank/down.png" alt="down" />
            </div>
          </div>
        </div>
      </article>
      <article class="favorite">
        <div class="top">
          <h1>찜 많이 받은 브랜드</h1>
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
        <div class="favorite-brand-box">
          <div
            v-for="item in favoriteBrandItems"
            :key="item.id"
            class="favorite-item"
          >
            <div class="brand-image">
              <img :src="item.brandImg" :alt="item.brandName" />
            </div>
            <div class="brand-info">
              <div
                class="category-name"
                :style="{
                  color: CategoryColor(item.largeCategoryName),
                  border: `1px solid ${CategoryColor(item.largeCategoryName)}`,
                }"
              >
                {{ item.smallCategoryName }}
              </div>
              <div class="brand-name">{{ item.brandName }}</div>
              <div class="favorite-count">
                <img src="~/assets/img/favorite/start.png" alt="star" />
                {{ item.count.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </article>
      <article v-if="getDevice === 'mobile'" class="re-load">
        <CommonButtonNextPageLoad
          title="찜 브랜드 더보기"
          :page="page"
          :total-count="totalCount"
          :page-num="pageNum"
          @click="changePage('+')"
        />
      </article>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import api from '~/config/axios.config'
import { useWindowStore } from '~~/store/window'
import { Brand } from '~~/types/brand'
import { CategoryColor } from '~~/types/category'

type Rank = {
  keyword: string
  rank: number
  variance: number | string
}

const store = useWindowStore()
const { getDevice } = storeToRefs(store)

const currentRank = ref<Rank[]>([])
const lastRank = ref<Rank[]>([])

const favoriteBrandItems = ref<Brand[]>([])
const page = ref<number>(1)
const nextPage = ref<boolean>(false)
const prevPage = ref<boolean>(false)
const totalCount = ref<number>(0)
const pageNum = computed<number>(() => {
  return getDevice.value === 'pc' ? 12 : getDevice.value === 'tablet' ? 8 : 4
})

const getRank = async () => {
  const { data } = await api.get('/search/rank')

  if (data.success) {
    currentRank.value = data.currentRank
    lastRank.value = data.lastRank

    currentRank.value.map((current) => {
      const test = lastRank.value.find(
        (last) => current.keyword === last.keyword
      )

      if (test) {
        current.variance = test.rank - current.rank
      } else {
        current.variance = 'new'
      }

      return current
    })
  } else {
    alert('주간 검색 순위 요청 실패')
  }
}

const getFavoriteBrand = async () => {
  const { data } = await api.get(
    `/brand/search/favorite/${page.value}?pageNum=${pageNum.value}`
  )

  if (data.success) {
    favoriteBrandItems.value = data.brand
    totalCount.value = data.page.totalCount
    nextPage.value = data.page.next
    prevPage.value = data.page.prev
  } else {
    alert('찜 많이 받은 브랜드 요청 실패')
  }
}

const changePage = (type: string): void => {
  if (type === '+' && nextPage.value) {
    page.value++
    getFavoriteBrand()
  } else if (type === '+' && !nextPage.value) {
    page.value = 1
    getFavoriteBrand()
  }

  if (type === '-' && prevPage.value) {
    page.value--
    getFavoriteBrand()
  }
}

getRank()

onMounted(() => {
  getFavoriteBrand()
})

watch(
  () => getDevice.value,
  () => getFavoriteBrand()
)
</script>

<style lang="scss" scoped>
section {
  .rank-favorite {
    @include pc-container();
    display: flex;
    margin-top: 80px;
    margin-bottom: 80px;

    h1 {
      font-size: 18px;
      font-weight: 500;
      height: 30px;
      display: flex;
      align-items: center;
      margin-bottom: 25px;
    }

    .rank {
      .rank-box {
        background-color: #fbfbfb;
        border-radius: 10px;
        border: 1px solid #ebebeb;
        height: 515px;
        width: 276px;
        padding: 40px 26px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-right: 30px;

        .rank-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          .keyword-rank {
            font-weight: 700;
            color: #3d50cb;
            width: 20px;
            text-align: center;
          }

          .keyword {
            flex: 1;
            padding: 0 27px;
            font-size: 14px;
            color: $fontMainColor;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
          }

          .variance {
            img {
              width: 18px;
              height: 18px;
            }
          }
        }
      }
    }

    .favorite {
      flex: 1;
      .top {
        display: flex;
        justify-content: space-between;

        .page-button {
          img {
            width: 30px;
            height: 30px;
            cursor: pointer;
            margin-left: 12px;
          }
        }
      }

      .favorite-brand-box {
        width: 100%;
        display: grid;
        gap: 25px 30px;
        grid-template-columns: repeat(3, calc((100% - 60px) / 3));

        .favorite-item {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          cursor: pointer;

          .brand-image {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            overflow: hidden;
            height: 100%;
            width: 110px;

            img {
              width: 110px;
              height: 110px;
            }
          }

          .brand-info {
            width: calc(100% - 110px);
            height: 100%;
            padding: 14px 13px 0;
            border-width: 1px;
            border-color: #ebebeb;
            border-style: solid;
            box-sizing: border-box;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            .category-name {
              padding: 3px 4px;
              font-size: 11px;
              border-radius: 3px;
              display: inline-block;
            }

            .brand-name {
              width: 138px;
              margin-top: 8px;
              font-size: 13px;
              color: $fontMainColor;
              padding-bottom: 8px;
              border-bottom: 1px solid #ebebeb;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .favorite-count {
              margin-top: 8px;
              display: flex;
              align-items: center;
              font-size: 11px;
              color: $fontSubColor;

              img {
                width: 30px;
                height: 30px;
              }
            }
          }
        }
      }
    }
  }

  @include tablet {
    .rank-favorite {
      @include tablet-container();
      flex-direction: column;
      margin-top: 50px;
      margin-bottom: 50px;

      h1 {
        height: auto;
        margin-bottom: 20px;
      }

      .rank {
        .rank-box {
          width: 100%;
          height: 245px;
          padding: 23px 0;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 50px;

          .rank-item {
            width: calc(100% / 2.5);
            height: calc(100% / 5);
          }
        }
      }

      .favorite {
        .top {
          align-items: center;
          margin-bottom: 20px;

          h1 {
            margin-bottom: 0;
          }
        }

        .favorite-brand-box {
          width: 100%;
          gap: 15px 24px;
          grid-template-columns: repeat(2, calc((100% - 24px) / 2));

          .favorite-item {
            height: 119px;
            .brand-image {
              width: 119px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .brand-info {
              width: calc(100% - 119px);
              padding: 16px 12px 0;

              .brand-name {
                width: 100%;
                padding-bottom: 15px;
              }

              .favorite-count {
                margin-top: 7px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  @include mobile {
    .rank-favorite {
      width: 100%;
      margin: 0;
      flex-direction: column;
      margin-top: 30px;

      h1 {
        height: auto;
        font-size: 16px;
        margin-bottom: 20px;
      }

      .rank {
        @include mobile-container();
        padding-bottom: 30px;
        border-bottom: 6px solid $sectionLine;
        .rank-box {
          width: 100%;
          height: 380px;
          padding: 30px 27px;
        }
      }

      .favorite {
        @include mobile-container();
        margin-top: 30px;

        .favorite-brand-box {
          width: 100%;
          display: grid;
          gap: 15px 0;
          grid-template-columns: repeat(1, calc(100% / 1));

          .favorite-item {
            height: 119px;

            .brand-image {
              width: 119px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .brand-info {
              width: calc(100% - 119px);
              padding: 16px 12px 0;

              .brand-name {
                width: 100%;
                padding-bottom: 15px;
              }

              .favorite-count {
                margin-top: 7px;
                font-size: 12px;
              }
            }
          }
        }
      }

      .re-load {
        @include mobile-container();
        margin: 30px 0;
      }
    }
  }
}
</style>
