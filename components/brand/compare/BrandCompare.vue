<template>
  <section>
    <article class="brand-compare-top">
      <div v-if="getDevice !== 'mobile'" class="page-info">
        <small>브랜드</small>
        <div>
          브랜드 비교 <span>{{ compareList.length }}/4</span>
        </div>
      </div>
      <CommonMobileRouterBackHeader
        v-else
        :title="`브랜드 비교 ${compareList.length}/4`"
      />
    </article>

    <article v-if="compareList.length > 0" class="list">
      <div class="brand-list-wrapper">
        <div
          v-for="(item, index) in compareList"
          :key="item.id"
          class="item"
          :style="{ borderColor: item.color ? item.color : '#BCBCBC' }"
          @click="checkCompareBrandColor(index)"
        >
          <div class="brand-image">
            <img
              v-if="item.brandLogoImg"
              :src="item.brandLogoImg"
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

          <div
            class="absolute-delete-button"
            :style="{ backgroundColor: item.color ? item.color : '#BCBCBC' }"
            @click.stop
            @click="deleteCompareBrand(index)"
          >
            <img src="~/assets/img/close/close_white.png" alt="delete" />
          </div>
        </div>
      </div>

      <div class="graph-list-wrapper">
        <div class="graph-item">
          <div class="graph-title">매장수</div>
          <div class="graph-box">
            <BrandCompareGraph :chart-data="shopCountChartData" />
          </div>
          <div class="graph-info">
            <div
              v-for="item in shopCountChartData"
              :key="item.name"
              class="info-item"
            >
              <div class="graph-info-brand-name">
                <div
                  :style="{
                    width: '20px',
                    height: '10px',
                    backgroundColor: item.color,
                    borderRadius: '50px',
                    marginRight: '6px',
                  }"
                ></div>
                <div>{{ item.name }}</div>
              </div>
              <div class="graph-info-value">
                {{ item.value.toLocaleString() }}개
              </div>
            </div>
          </div>
        </div>
        <div class="graph-item">
          <div class="graph-title">창업비용</div>
          <div class="graph-box">
            <BrandCompareGraph :chart-data="startCostChartData" />
          </div>
          <div class="graph-info">
            <div
              v-for="item in startCostChartData"
              :key="item.name"
              class="info-item"
            >
              <div class="graph-info-brand-name">
                <div
                  :style="{
                    width: '20px',
                    height: '10px',
                    backgroundColor: item.color,
                    borderRadius: '50px',
                    marginRight: '6px',
                  }"
                ></div>
                <div>{{ item.name }}</div>
              </div>
              <div class="graph-info-value">
                {{ calcPrice(item.value.toLocaleString()) }}
              </div>
            </div>
          </div>
        </div>
        <div class="graph-item">
          <div class="graph-title">월 평균 매출액</div>
          <div class="graph-box">
            <BrandCompareGraph :chart-data="monthSalesChartData" />
          </div>
          <div class="graph-info">
            <div
              v-for="item in monthSalesChartData"
              :key="item.name"
              class="info-item"
            >
              <div class="graph-info-brand-name">
                <div
                  :style="{
                    width: '20px',
                    height: '10px',
                    backgroundColor: item.color,
                    borderRadius: '50px',
                    marginRight: '6px',
                  }"
                ></div>
                <div>{{ item.name }}</div>
              </div>
              <div class="graph-info-value">
                {{ calcPrice(item.value.toLocaleString()) }}
              </div>
            </div>
          </div>
        </div>
        <div class="graph-item">
          <div class="graph-title">3.3㎡ (1평)당 월 평균 매출액</div>
          <div class="graph-box">
            <BrandCompareGraph :chart-data="monthAreaSalesChartData" />
          </div>
          <div class="graph-info">
            <div
              v-for="item in monthAreaSalesChartData"
              :key="item.name"
              class="info-item"
            >
              <div class="graph-info-brand-name">
                <div
                  :style="{
                    width: '20px',
                    height: '10px',
                    backgroundColor: item.color,
                    borderRadius: '50px',
                    marginRight: '6px',
                  }"
                ></div>
                <div>{{ item.name }}</div>
              </div>
              <div class="graph-info-value">
                {{ calcPrice(item.value.toLocaleString()) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <article v-else class="empty">
      <img src="~/assets/img/common/compare.png" alt="브랜드비교" />
      <strong>브랜드 비교 내역이 없습니다.</strong>
      <small>브랜드를 찾아보고 지금 바로 비교해보세요!</small>
      <button @click="moveCategoryPage">카테고리별 찾아보기</button>
      <button @click="moveThemePage">테마별 찾아보기</button>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'
import { useBrandListStore } from '~/store/brandList'
import { loadCategoryImg, calcPrice } from '~/function/common'
import { useCategoryStore } from '~~/store/category'
import { CategoryColor } from '~/types/category'
import { ChartData } from '~/types/chart'

const router = useRouter()

const windowStore = useWindowStore()
const brandListStore = useBrandListStore()
const categoryStore = useCategoryStore()
const { getDevice } = storeToRefs(windowStore)
const { compareList, categoryList, themeList } = storeToRefs(brandListStore)
const { category } = storeToRefs(categoryStore)

if (category.value.length === 0) {
  await categoryStore.getCategory()
}

const compareColor: string[] = ['#74A3FF', '#7DE39A', '#FFE071', '#FFA2A2']

const initCompareBrandColor = () => {
  compareList.value.forEach((e, index) => {
    e.color = compareColor[index]
  })
}

const checkCompareBrandColor = (index: number) => {
  if (compareList.value[index].color) {
    compareList.value[index].color = undefined

    computedShopCountChartData()
    computedStartCostChartData()
    computedMonthSalesChartData()
    computedMonthAreaSalesChartData()
  } else {
    compareList.value[index].color = compareColor[index]

    computedShopCountChartData()
    computedStartCostChartData()
    computedMonthSalesChartData()
    computedMonthAreaSalesChartData()
  }
}

const deleteCompareBrand = (index: number) => {
  compareList.value.splice(index, 1)

  initCompareBrandColor()

  computedShopCountChartData()
  computedStartCostChartData()
  computedMonthSalesChartData()
  computedMonthAreaSalesChartData()
}

initCompareBrandColor()

const shopCountChartData = ref<ChartData[]>([])
const startCostChartData = ref<ChartData[]>([])
const monthSalesChartData = ref<ChartData[]>([])
const monthAreaSalesChartData = ref<ChartData[]>([])

const computedShopCountChartData = () => {
  shopCountChartData.value = compareList.value
    .map((e) => {
      const name = e.brandName
      const maxYear =
        e.brandFranchiseStatus.length > 0
          ? Math.max(...e.brandFranchiseStatus.map((yearData) => yearData.year))
          : 0

      const value: number =
        e.brandFranchiseStatus.length > 0
          ? e.brandFranchiseStatus.filter(
              (v) => v.location === '전체' && v.year === maxYear
            )[0].allCount
          : 0

      return {
        name,
        value,
        color: e.color ? e.color : '#bcbcbc',
      }
    })
    .sort((a, b) => b.value - a.value)
}

const computedStartCostChartData = () => {
  startCostChartData.value = compareList.value
    .map((e) => {
      const name = e.brandName

      const value: number = e.brandStartCost
        ? parseInt(e.brandStartCost.startTotalPrice.replace(/,/g, ''))
        : 0

      return {
        name,
        value,
        color: e.color ? e.color : '#bcbcbc',
      }
    })
    .sort((a, b) => b.value - a.value)
}

const computedMonthSalesChartData = () => {
  monthSalesChartData.value = compareList.value
    .map((e) => {
      const name = e.brandName

      const value: number =
        e.brandAreaSalesAve.length > 0
          ? Math.floor(
              parseInt(
                e.brandAreaSalesAve
                  .filter((e) => e.location === '전체')[0]
                  .salesAve.replace(/,/g, '')
              ) / 12
            )
          : 0

      return {
        name,
        value,
        color: e.color ? e.color : '#bcbcbc',
      }
    })
    .sort((a, b) => b.value - a.value)
}

const computedMonthAreaSalesChartData = () => {
  monthAreaSalesChartData.value = compareList.value
    .map((e) => {
      const name = e.brandName

      const value: number =
        e.brandAreaSalesAve.length > 0
          ? Math.floor(
              parseInt(
                e.brandAreaSalesAve
                  .filter((e) => e.location === '전체')[0]
                  .areaSalesAve.replace(/,/g, '')
              ) / 12
            )
          : 0

      return {
        name,
        value,
        color: e.color ? e.color : '#bcbcbc',
      }
    })
    .sort((a, b) => b.value - a.value)
}

computedShopCountChartData()
computedStartCostChartData()
computedMonthSalesChartData()
computedMonthAreaSalesChartData()

const moveCategoryPage = () => {
  categoryList.value.brandItems = []
  categoryList.value.page = 1
  categoryList.value.nextPage = false
  categoryList.value.totalCount = 0
  categoryList.value.areaFilter = undefined
  categoryList.value.costFilter = undefined
  router.push('/category/커피%2F베이커리')
}

const moveThemePage = () => {
  themeList.value.brandItems = []
  themeList.value.page = 1
  themeList.value.nextPage = false
  themeList.value.totalCount = 0
  themeList.value.areaFilter = undefined
  themeList.value.costFilter = undefined

  router.push('/theme/무인')
}
</script>

<style lang="scss" scoped>
section {
  .brand-compare-top {
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

        span {
          font-size: 14px;
        }
      }
    }
  }

  .list {
    @include pc-container();
    margin-bottom: 80px;

    .brand-list-wrapper {
      display: grid;
      gap: 0 30px;
      grid-template-columns: repeat(4, calc((100% - 90px) / 4));
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid $sectionLine;

      .item {
        border: 1px solid;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        padding: 10px 0 12px 16px;
        box-sizing: border-box;
        cursor: pointer;

        .brand-image {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid $sectionLine;
          overflow: hidden;
          border-radius: 10px;
          width: 112px;
          height: 45px;

          img {
            display: block;
            width: 100%;
            height: 100%;

            &.default-image {
              width: 50%;
              height: 50%;
            }
          }
        }

        .category {
          display: inline-block;
          padding: 3px 4px;
          border-radius: 3px;
          font-size: 11px;
          margin: {
            top: 10px;
            bottom: 7px;
          }
        }

        .brand-name {
          font-size: 14px;
          color: $fontMainColor;
        }

        .absolute-delete-button {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 21px;
          height: 21px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 0 8px;
          border-bottom-left-radius: 10px;

          img {
            width: 15px;
          }
        }
      }
    }

    .graph-list-wrapper {
      display: grid;
      gap: 30px;
      grid-template-columns: repeat(2, calc((100% - 30px) / 2));

      .graph-item {
        position: relative;
        padding: 0 25px;
        height: 240px;
        border-radius: 30px;
        border: 1px solid $sectionLine;
        // overflow: hidden;
        display: grid;
        grid-template-columns: repeat(2, calc(100% / 2));

        .graph-box {
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .graph-info {
          display: flex;
          flex-direction: column;
          justify-content: center;

          .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: $fontMainColor;
            margin-bottom: 20px;

            &:last-child {
              margin-bottom: 0;
            }

            .graph-info-brand-name {
              display: flex;
              align-items: center;
            }
          }
        }

        .graph-title {
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: center;
          top: 20px;
          font-size: 14px;
          font-weight: 400;
          color: $fontMainColor;
        }
      }
    }
  }

  .empty {
    @include pc-container();
    padding: {
      top: 50px;
      bottom: 250px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 200px;
      margin-bottom: 10px;
    }

    strong {
      font-size: 16px;
      color: $fontMainColor;
      font-weight: 400;
      margin-bottom: 9px;
      line-height: 19px;
    }

    small {
      font-size: 14px;
      color: $fontSubColor;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 30px;
    }

    button {
      width: 378px;
      height: 50px;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      background-color: $mainColor;

      &:last-child {
        background-color: #fff;
        border: 1px solid $mainColor;
        color: $mainColor;
        margin-top: 8px;
      }
    }
  }

  @include tablet {
    .brand-compare-top {
      @include tablet-container();
      padding: {
        top: 50px;
        bottom: 30px;
      }
    }

    .list {
      @include tablet-container();
      margin-bottom: 60px;

      .brand-list-wrapper {
        gap: 0 24px;
        grid-template-columns: repeat(4, calc((100% - 72px) / 4));
      }

      .graph-list-wrapper {
        gap: 20px 0;
        grid-template-columns: repeat(1, 100%);
      }
    }

    .empty {
      @include tablet-container();
      padding: {
        top: 50px;
        bottom: 200px;
      }
    }
  }

  @include mobile {
    .brand-compare-top {
      width: 100%;
      padding: {
        top: 0;
        bottom: 30px;
      }
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .list {
      width: 100%;
      margin-bottom: 30px;

      .brand-list-wrapper {
        @include mobile-container();
        gap: 15px 8px;
        grid-template-columns: repeat(2, calc((100% - 8px) / 2));
        padding-bottom: 30px;
        border-bottom: 6px solid $sectionLine;

        .item {
          .brand-name {
            font-size: 13px;
          }
        }
      }

      .graph-list-wrapper {
        @include mobile-container();
        gap: 20px 0;
        grid-template-columns: repeat(1, 100%);

        .graph-item {
          @include mobile-container();
          padding: {
            top: 20px;
            bottom: 20px;
          }

          display: flex;
          flex-direction: column;
          height: auto;

          .graph-info {
            padding: 0 30px;
          }

          .graph-title {
            width: calc(100% - 48px);
            font-size: 13px;
          }
        }
      }
    }

    .empty {
      @include mobile-container();
      padding: {
        top: 30px;
        bottom: 60px;
      }

      img {
        width: 150px;
      }

      strong {
        font-size: 14px;
        margin-bottom: 8px;
        line-height: 17px;
      }

      small {
        font-size: 13px;
        line-height: 20px;
      }

      button {
        width: 100%;
        font-size: 14px;
      }
    }
  }
}
</style>
