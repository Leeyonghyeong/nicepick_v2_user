<template>
  <section>
    <article class="brand-rank-top">
      <div v-if="getDevice !== 'mobile'" class="page-info">
        <small>브랜드</small>
        <div>브랜드 랭킹</div>
      </div>
      <CommonMobileRouterBackHeader v-else title="브랜드 랭킹" />

      <div class="rank-category">
        <div class="rank-category-wrapper">
          <div
            :class="{ active: rankType === 'grow' }"
            @click="
              router.push(
                `/brand/rank?type=grow${
                  route.query.category
                    ? `&category=${route.query.category}`
                    : ''
                }`
              )
            "
          >
            급성장 브랜드
          </div>
          <div
            :class="{ active: rankType === 'shop' }"
            @click="
              router.push(
                `/brand/rank?type=shop${
                  route.query.category
                    ? `&category=${route.query.category}`
                    : ''
                }`
              )
            "
          >
            매장수 많은 브랜드
          </div>
          <div
            :class="{ active: rankType === 'cost' }"
            @click="router.push(`/brand/rank?type=cost&cost=0`)"
          >
            예산별 인기브랜드
          </div>
        </div>
      </div>

      <div
        v-if="rankType !== 'cost'"
        ref="largeCategoryList"
        class="large-category-list"
      >
        <div
          class="large-item"
          :class="{ active: !route.query.category }"
          @click="router.push(`/brand/rank?type=${rankType}`)"
        >
          전체
        </div>
        <div
          v-for="item in category"
          :key="item.id"
          class="large-item"
          :class="{ active: route.query.category === item.categoryName }"
          @click="
            router.push(
              `/brand/rank?type=${rankType}&category=${item.categoryName}`
            )
          "
        >
          <img :src="item.mainImg" :alt="item.categoryName" />
          {{ item.categoryName }}
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
      <div v-else class="cost-list">
        <div
          class="cost-item"
          :class="{ active: route.query.cost === '0' }"
          @click="router.push(`/brand/rank?type=${rankType}&cost=0`)"
        >
          0~5천 미만
        </div>
        <div
          class="cost-item"
          :class="{ active: route.query.cost === '1' }"
          @click="router.push(`/brand/rank?type=${rankType}&cost=1`)"
        >
          5천~1억 미만
        </div>
        <div
          class="cost-item"
          :class="{ active: route.query.cost === '2' }"
          @click="router.push(`/brand/rank?type=${rankType}&cost=2`)"
        >
          1억~1억 5천 미만
        </div>
        <div
          class="cost-item"
          :class="{ active: route.query.cost === '3' }"
          @click="router.push(`/brand/rank?type=${rankType}&cost=3`)"
        >
          1억5천~2억 미만
        </div>
        <div
          class="cost-item"
          :class="{ active: route.query.cost === '4' }"
          @click="router.push(`/brand/rank?type=${rankType}&cost=4`)"
        >
          2억 이상
        </div>
      </div>
    </article>

    <article class="list">
      <div class="notice">
        각 브랜드에서 제공하는 최신 정보공개서를 바탕으로 창업픽 데이터센터에서
        분석한 내용입니다.
      </div>

      <div class="list-wrapper">
        <div
          v-for="(item, index) in brandItems"
          :key="item.id"
          class="item"
          @click="router.push(`/brand/detail/${item.id}`)"
        >
          <div class="brand-image">
            <img
              v-if="item.brandImg"
              :src="item.brandImg"
              :alt="item.brandName"
            />
            <img
              v-else
              :src="
                loadCategoryImg(
                  category,
                  item.largeCategoryName,
                  item.smallCategoryName
                )
              "
              :alt="item.brandName"
              class="default-image"
            />
            <div class="rank">{{ index + 1 }}</div>
          </div>
          <div
            class="category"
            :style="{
              color: CategoryColor(item.largeCategoryName),
              border: `1px solid ${CategoryColor(item.largeCategoryName)}`,
            }"
          >
            {{ item.smallCategoryName }}
          </div>
          <div class="brand-name">
            {{ item.brandName }}
          </div>
          <div class="rank-info">
            <div v-if="rankType === 'grow'" class="info">
              전년 대비 매장
              {{ (item.maxShopCount - item.minShopCount).toLocaleString() }}개
              증가
              <img src="~/assets/img/rank/up.png" alt="up" />
            </div>
            <div v-else-if="rankType === 'shop'" class="info">
              매장수 {{ item.maxShopCount.toLocaleString() }}개
            </div>
            <div v-else class="info">
              창업비 {{ calcPrice(item.brandStartCost.startTotalPrice) }}
              <span>{{ item.brandStartCost.standardArea }}㎡</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~~/store/category'
import { useWindowStore } from '~~/store/window'
import { useBrandListStore } from '~/store/brandList'
import api from '~/config/axios.config'
import { BrandStartCost, Brand } from '~/types/brand'
import { calcPrice, loadCategoryImg } from '~/function/common'
import { CategoryColor } from '~/types/category'

const categoryStore = useCategoryStore()
const windowStore = useWindowStore()
const brandListStore = useBrandListStore()
const { getDevice } = storeToRefs(windowStore)
const { category } = storeToRefs(categoryStore)
const { rankList } = storeToRefs(brandListStore)

if (category.value.length === 0) {
  await categoryStore.getCategory()
}

const route = useRoute()
const router = useRouter()

const largeCategoryList = ref<HTMLDivElement | null>(null)
const isShowButtonLeft = ref<boolean>(false)

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

type RankType = 'grow' | 'shop' | 'cost'

const rankType = ref<RankType>('grow')
const brandItems = ref<Brand[]>([])

const getBrandItems = async () => {
  const { data } = await api.get('/brand/search/rank')

  if (data.success) {
    // eslint-disable-next-line
    data.brand.forEach((e: any) => {
      const brandStartCost: BrandStartCost = {
        createAt: e.BrandStartCost_createAt,
        deposit: e.BrandStartCost_deposit,
        educationFee: e.BrandStartCost_educationFee,
        etcFee: e.BrandStartCost_etcFee,
        interiorFee: e.BrandStartCost_interiorFee,
        membershipFee: e.BrandStartCost_membershipFee,
        standardArea: e.BrandStartCost_standardArea,
        startTotalPrice: e.BrandStartCost_startTotalPrice,
        totalFee: e.BrandStartCost_totalFee,
      }

      e.brandStartCost = brandStartCost
      rankList.value.brandItems.push(e)
    })

    calcRankData()
  }
}

const calcRankData = () => {
  const { type, category, cost } = route.query
  rankType.value = type ? (type as RankType) : 'grow'

  const _brandItems = rankList.value.brandItems

  if (rankType.value === 'grow') {
    if (category) {
      _brandItems.sort((a, b) =>
        a.maxShopCount - a.minShopCount > b.maxShopCount - b.minShopCount
          ? -1
          : 0
      )

      brandItems.value = _brandItems
        .filter((e) => e.largeCategoryName === category)
        .slice(0, 10)
    } else {
      _brandItems.sort((a, b) =>
        a.maxShopCount - a.minShopCount > b.maxShopCount - b.minShopCount
          ? -1
          : 0
      )

      brandItems.value = _brandItems.slice(0, 10)
    }
  } else if (rankType.value === 'shop') {
    if (category) {
      _brandItems.sort((a, b) => (a.maxShopCount > b.maxShopCount ? -1 : 0))

      brandItems.value = _brandItems
        .filter((e) => e.largeCategoryName === category)
        .slice(0, 10)
    } else {
      _brandItems.sort((a, b) => (a.maxShopCount > b.maxShopCount ? -1 : 0))

      brandItems.value = _brandItems.slice(0, 10)
    }
  } else if (cost) {
    _brandItems.sort((a, b) => (a.maxShopCount > b.maxShopCount ? -1 : 0))

    brandItems.value = _brandItems
      .filter((e) => {
        const totalPrice: number = Math.floor(
          parseInt(e.brandStartCost.startTotalPrice.replace(/,/g, '')) / 10
        )

        if (cost === '0' && totalPrice >= 0 && totalPrice < 5000) {
          return e
        } else if (cost === '1' && totalPrice >= 5000 && totalPrice < 10000) {
          return e
        } else if (cost === '2' && totalPrice >= 10000 && totalPrice < 15000) {
          return e
        } else if (cost === '3' && totalPrice >= 15000 && totalPrice < 20000) {
          return e
        } else if (cost === '4' && totalPrice >= 20000) {
          return e
        }

        return false
      })
      .slice(0, 10)
  }
}

watch(
  () => route.query,
  () => {
    calcRankData()
  }
)

onMounted(() => {
  if (rankList.value.brandItems.length === 0) {
    getBrandItems()
  } else {
    calcRankData()
  }
})
</script>

<style lang="scss" scoped>
section {
  .brand-rank-top {
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

    .page-info {
      small {
        font-size: 12px;
        color: $fontSubColor;
      }

      div {
        margin-top: 6px;
        font-size: 20px;
        color: $fontMainColor;
      }
    }

    .rank-category {
      margin: {
        top: 30px;
        bottom: 30px;
      }
      border-bottom: 1px solid $sectionLine;

      .rank-category-wrapper {
        display: flex;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 17px;
          box-sizing: border-box;
          position: relative;
          font-size: 14px;
          font-weight: 400;
          color: $fontSubColor;
          margin-right: 30px;
          cursor: pointer;

          &.active,
          &:hover {
            color: $fontMainColor;
            font-weight: 600;

            &::before {
              content: '';
              position: absolute;
              width: 100%;
              bottom: 0;
              height: 2px;
              background-color: $fontMainColor;
            }
          }
        }
      }
    }

    .large-category-list {
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

        display: flex;
        align-items: center;
        cursor: pointer;
        color: $fontSubColor;

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

    .cost-list {
      display: flex;
      white-space: nowrap;
      font-size: 14px;
      overflow-x: auto;

      .cost-item {
        padding: 9px 14px;
        border-radius: 20px;
        border: 1px solid #ebebeb;
        margin-right: 8px;

        &:last-child {
          margin-right: 0;
        }

        display: flex;
        align-items: center;
        cursor: pointer;
        color: $fontSubColor;

        &.active {
          border-color: $mainColor;
          color: $mainColor;
        }
      }
    }
  }

  .list {
    @include pc-container();
    padding: {
      top: 20px;
      bottom: 80px;
    }

    .notice {
      font-size: 12px;
      color: $fontSubColor;
    }

    .list-wrapper {
      margin-top: 20px;
      display: grid;
      gap: 80px 30px;
      grid-template-columns: repeat(5, calc((100% - 120px) / 5));

      .item {
        cursor: pointer;
        .brand-image {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 10px;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
          background-color: #fafafa;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            display: block;
            width: 100%;
            height: 100%;

            &.default-image {
              width: 50%;
              height: 50%;
            }
          }

          .rank {
            position: absolute;
            background-color: rgba(25, 25, 25, 0.8);
            top: 0;
            left: 0;
            color: #fff;
            font-size: 20px;
            font-weight: 600;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom-right-radius: 10px;
          }
        }

        .category {
          display: inline-block;
          padding: 3px 4px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 400;
          margin-bottom: 7px;
        }

        .brand-name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-bottom: 10px;
          border-bottom: 1px solid $sectionLine;
          font-size: 16px;
          color: $fontMainColor;
          font-weight: 600;
        }

        .rank-info {
          font-size: 12px;
          font-weight: 400;
          color: $fontSubColor;
          margin-top: 10px;

          .info {
            display: flex;
            align-items: center;

            img {
              width: 18px;
            }

            span {
              padding: 3px 4px;
              background-color: #f3f3f3;
              border: 1px solid $iconLine;
              font-size: 10px;
              margin-left: 6px;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }

  @include tablet {
    .brand-rank-top {
      width: 100%;
      margin: 0;

      padding: {
        top: 50px;
        bottom: 50px;
      }

      .page-info {
        @include tablet-container();
      }

      .rank-category {
        @include tablet-container();
        border-bottom: none;

        .rank-category-wrapper {
          border-bottom: 1px solid $sectionLine;
        }
      }

      .large-category-list,
      .cost-list {
        @include tablet-container();
      }
    }

    .list {
      @include tablet-container();
      padding-bottom: 60px;

      .list-wrapper {
        gap: 60px 20px;
        grid-template-columns: repeat(3, calc((100% - 40px) / 3));
      }
    }
  }

  @include mobile {
    .brand-rank-top {
      position: sticky;
      padding: 0;
      top: 0;
      background-color: #fff;
      z-index: 1;
      width: 100%;
      margin: 0;

      div {
        font-size: 16px;
      }

      .rank-category {
        @include mobile-container();
        margin: {
          top: 16px;
          bottom: 20px;
        }

        .rank-category-wrapper {
          justify-content: space-between;

          div {
            font-size: 13px;
            margin-right: 0;
          }
        }
      }

      .large-category-list,
      .cost-list {
        @include mobile-container();
        padding-bottom: 20px;

        .large-item,
        .cost-item {
          padding: 8px 10px;
          font-size: 14px;
        }

        .cost-item {
          padding: 9px 14px;
        }
      }
    }

    .list {
      @include mobile-container();
      padding: {
        top: 20px;
        bottom: 30px;
      }

      .notice {
        font-size: 11px;
      }

      .list-wrapper {
        gap: 30px 8px;
        grid-template-columns: repeat(2, calc((100% - 8px) / 2));
      }
    }
  }
}
</style>
