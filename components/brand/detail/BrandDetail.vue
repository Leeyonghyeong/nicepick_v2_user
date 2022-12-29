<template>
  <section>
    <div v-if="getDevice === 'mobile'" class="detail-page-mobile-top">
      <div class="left">
        <img
          src="~/assets/img/arrow/router-back.png"
          alt="back"
          @click="$router.back()"
        />
        <div>{{ brandIntroItem.brandName }}</div>
      </div>
      <div class="right">
        <img
          src="~/assets/img/button/home.png"
          alt="home"
          @click="$router.push('/')"
        />
        <img
          src="~/assets/img/header/search.png"
          alt="검색"
          @click="isShowSearchModal = true"
        />
      </div>
    </div>
    <article class="brand-info">
      <article class="right">
        <div v-if="brandIntroItem.brandImg" class="brand-main-img">
          <img :src="brandIntroItem.brandImg" :alt="brandIntroItem.brandName" />
        </div>

        <BrandSummaryTab
          v-if="getDevice !== 'pc'"
          :brand-status-item="brandStatusItem"
          :get-device="getDevice"
          :category="category"
        />

        <div
          v-if="
            brandIntroItem.brandPromotion || brandIntroItem.brandPromotionIcon
          "
          class="brand-promotion"
        >
          <div class="title">프로모션</div>
          <div v-if="brandIntroItem.brandPromotionIcon" class="promotion-icons">
            <div
              v-for="item in brandIntroItem.brandPromotionIcon
                .split(',')
                .sort((a, b) => (a < b ? -1 : 0))"
              :key="item"
              class="promotion-item"
            >
              <img
                v-if="item.replace(/ /g, '') === '가맹비할인'"
                src="~/assets/img/promotion/franchise-fee-sale.png"
                alt="가맹비할인"
              />
              <img
                v-else-if="item.replace(/ /g, '') === '가맹비면제'"
                src="~/assets/img/promotion/franchise-fee-free.png"
                alt="가맹비면제"
              />
              <img
                v-else-if="item.replace(/ /g, '') === '교육비할인'"
                src="~/assets/img/promotion/edu-fee-sale.png"
                alt="교육비할인"
              />
              <img
                v-else-if="item.replace(/ /g, '') === '교육비면제'"
                src="~/assets/img/promotion/edu-fee-free.png"
                alt="교육비면제"
              />
              <img
                v-else-if="item.replace(/ /g, '') === '물품지원'"
                src="~/assets/img/promotion/article-help.png"
                alt="물품지원"
              />
              <img
                v-else-if="item.replace(/ /g, '') === '장비지원'"
                src="~/assets/img/promotion/equipment-help.png"
                alt="장비지원"
              />
              <img
                v-else
                src="~/assets/img/promotion/interior-help.png"
                alt="인테리어비용지원"
              />
              <div v-if="item.replace(/ /g, '') === '인테리어비용지원'">
                <div>{{ item.slice(0, 4) }}</div>
                <div>{{ item.slice(4, item.length) }}</div>
              </div>
              <div v-else>{{ item }}</div>
            </div>
          </div>
          <div v-if="brandIntroItem.brandPromotion" class="promotion-text">
            <img src="~/assets/img/promotion/promotion.png" alt="" />{{
              brandIntroItem.brandPromotion
            }}
          </div>
        </div>

        <div class="brand-info-tab-menu">
          <div class="tab-menu-wrapper">
            <div
              v-if="isTabMenuActive[0] || isShowIntroTabButton"
              :class="{ active: isTabMenuActive[0] }"
              @click="isTabMenuActive = [true, false, false]"
            >
              브랜드 소개
            </div>
            <div
              :class="{ active: isTabMenuActive[1] }"
              @click="isTabMenuActive = [false, true, false]"
            >
              브랜드 현황
            </div>
            <div
              :class="{ active: isTabMenuActive[2] }"
              @click="isTabMenuActive = [false, false, true]"
            >
              본사 정보
            </div>
          </div>
        </div>

        <div class="brand-info-tab">
          <BrandIntro
            v-if="isTabMenuActive[0]"
            :brand-intro-item="brandIntroItem"
            :get-device="getDevice"
          />
          <BrandStatus
            v-else-if="isTabMenuActive[1]"
            :brand-status-item="brandStatusItem"
            :get-device="getDevice"
          />
          <BrandCompany
            v-else
            :brand-company-item="brandCompanyItem"
            :brand-same-list-items="brandSameListItems"
            :get-device="getDevice"
          />
        </div>
      </article>

      <article v-if="getDevice === 'pc'" class="left">
        <BrandSummaryTab
          :brand-status-item="brandStatusItem"
          :get-device="getDevice"
          :category="category"
        />
      </article>
    </article>

    <article v-if="recommendBrand.length > 0" class="recommend-brand">
      <div class="title">이 브랜드는 어때요?</div>
      <div class="recommend-brand-list">
        <div v-for="item in recommendBrand" :key="item.id" class="item">
          <CommonBrandStartCostBrandItem :brand-item="item" />
        </div>
      </div>
    </article>
  </section>
  <ModalSearchModal
    v-if="isShowSearchModal"
    @close-search-modal="closeSearchModal"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~~/store/category'
import { useWindowStore } from '~~/store/window'
import { Brand } from '~~/types/brand'
import api from '~/config/axios.config'

const props = defineProps<{
  brandIntroItem: Brand
  brandStatusItem: Brand
  brandCompanyItem: Brand
  brandSameListItems: Brand[]
}>()

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)
const categoryStore = useCategoryStore()
const { category } = storeToRefs(categoryStore)

if (category.value.length === 0) {
  await categoryStore.getCategory()
}

const isTabMenuActive = ref<boolean[]>([false, false, false])
const isShowIntroTabButton = ref<boolean>(false)

const initTabMenuActive = () => {
  const brandIntro = props.brandIntroItem

  if (
    brandIntro.brandIntroImg.length > 0 ||
    brandIntro.brandYoutube.length > 0 ||
    brandIntro.brandMenuImg.length > 0 ||
    brandIntro.brandInteriorImg.length > 0 ||
    brandIntro.brandStartCostImg.length > 0
  ) {
    isTabMenuActive.value = [true, false, false]
    isShowIntroTabButton.value = true
  } else {
    isTabMenuActive.value = [false, true, false]
  }
}

const isShowSearchModal = ref<boolean>(false)

const closeSearchModal = () => {
  isShowSearchModal.value = false
}

const recommendBrand = ref<Brand[]>([])

const getRecommendBrand = async () => {
  const { data } = await api.get<{
    brand: Brand[]
    success: boolean
    errorMessage: string
  }>(
    `/brand/detail/recommend?category=${props.brandIntroItem.largeCategoryName}`
  )

  if (data.success) {
    const premiumBrand = data.brand
      .filter((e) => e.isPremium && e.id !== props.brandIntroItem.id)
      .sort((_a, _b) => Math.random() - 0.5)
      .slice(0, 3)

    const normalBrand = data.brand
      .filter((e) => !e.isPremium && e.id !== props.brandIntroItem.id)
      .sort((_a, _b) => Math.random() - 0.5)

    const _recommendBrand: Brand[] = premiumBrand
    _recommendBrand.push(...normalBrand)

    recommendBrand.value = _recommendBrand.slice(0, 5)
  }
}

onMounted(() => {
  initTabMenuActive()
  getRecommendBrand()
})
</script>

<style lang="scss" scoped>
section {
  .brand-info {
    @include pc-container();
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 50px;

    .right {
      width: 786px;
      position: relative;

      .brand-main-img {
        border-radius: 10px;
        overflow: hidden;
        height: 442px;
        margin-bottom: 80px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .brand-promotion {
        margin-bottom: 80px;
        .title {
          font-size: 14px;
          color: $fontMainColor;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .promotion-icons {
          display: flex;
          margin-bottom: 20px;
          font-size: 13px;
          color: $fontMainColor;

          .promotion-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 80px;
            height: 80px;
            padding: {
              top: 5px;
              left: 10px;
              right: 10px;
            }
            margin-right: 8px;

            img {
              width: 40px;
            }

            div {
              height: 32px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          }
        }

        .promotion-text {
          padding: 10px;
          font-size: 13px;
          color: $fontMainColor;
          display: flex;
          align-items: center;
          background-color: #fafafa;
          border-radius: 10px;

          img {
            width: 20px;
            margin-right: 10px;
          }
        }
      }

      .brand-info-tab-menu {
        position: sticky;
        top: 60px;
        z-index: 1;
        .tab-menu-wrapper {
          border-bottom: 1px solid $sectionLine;
          display: flex;
          margin-bottom: 30px;
          background-color: #fff;

          div {
            margin-right: 30px;
            font-size: 14px;
            color: $fontSubColor;
            padding: 15px 0;
            cursor: pointer;

            &.active,
            &:hover {
              color: $fontMainColor;
              font-weight: 600;
              border-bottom: 2px solid $fontMainColor;
            }
          }
        }
      }
    }

    .left {
      position: sticky;
      top: 110px;
      height: 506px;
      width: 378px;
    }
  }

  .recommend-brand {
    @include pc-container();

    .title {
      padding-top: 50px;
      border-top: 1px solid $sectionLine;
      font-size: 18px;
      color: $fontMainColor;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .recommend-brand-list {
      display: grid;
      gap: 0 30px;
      grid-template-columns: repeat(5, calc((100% - 120px) / 5));
    }
  }

  @include tablet {
    .brand-info {
      width: 100%;
      border-bottom: none;

      .right {
        width: 100%;

        .brand-main-img {
          @include tablet-container();
          height: auto;
          margin-bottom: 30px;

          img {
            border-radius: 10px;
            width: 100%;
          }
        }

        .brand-promotion {
          @include tablet-container();
        }

        .brand-info-tab-menu {
          @include tablet-container();
          background-color: #fff;
        }
      }
    }

    .recommend-brand {
      width: 100%;
      position: relative;

      &::before {
        content: '';
        width: calc(100% - 88px);
        top: 0;
        left: 44px;
        height: 1px;
        background-color: $sectionLine;
        position: absolute;
      }

      .title {
        @include tablet-container();
        padding-top: 50px;
        font-size: 18px;
        color: $fontMainColor;
        font-weight: 500;
        margin-bottom: 20px;
        border-top: none;
      }

      .recommend-brand-list {
        @include tablet-container();
        display: block;
        white-space: nowrap;
        overflow-x: auto;

        .item {
          display: inline-block;
          width: calc(100% / 4.5);
          margin-right: 24px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  @include mobile {
    .detail-page-mobile-top {
      position: sticky;
      top: 0;
      height: 60px;
      background-color: #fff;
      z-index: 100;
      border-bottom: 1px solid $sectionLine;
      @include mobile-container();
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 30px;
      }

      .left {
        display: flex;
        align-items: center;
        color: $fontMainColor;

        img {
          margin-right: 8px;
        }
      }

      .right {
        img {
          &:first-child {
            margin-right: 16px;
          }
        }
      }
    }

    .brand-info {
      padding-top: 0;
      width: 100%;

      .right {
        width: 100%;

        .brand-main-img {
          border-radius: 0;
          height: auto;
          margin-bottom: 20px;
        }

        .brand-promotion {
          @include mobile-container();
          margin-bottom: 30px;

          .promotion-icons {
            flex-wrap: wrap;

            .promotion-item {
              margin-right: 2px;
              margin-bottom: 2px;
            }
          }
        }

        .brand-info-tab-menu {
          border-top: 6px solid $sectionLine;
          top: 54px;
          background-color: #fff;
          @include mobile-container();
        }
      }
    }

    .recommend-brand {
      width: 100%;

      .title {
        @include mobile-container();
        padding-top: 30px;
        font-size: 16px;
        color: $fontMainColor;
        font-weight: 500;
        margin-bottom: 20px;
        border-top: 6px solid $sectionLine;
      }

      .recommend-brand-list {
        @include mobile-container();
        display: block;
        white-space: nowrap;
        overflow-x: auto;

        .item {
          display: inline-block;
          width: calc(100% / 3.2);
          margin-right: 8px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
