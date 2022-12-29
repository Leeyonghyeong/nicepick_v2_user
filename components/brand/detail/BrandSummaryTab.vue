<template>
  <div class="brand-summary-info">
    <div class="summary-info-box">
      <div class="logo-name">
        <div class="logo">
          <img
            v-if="brandStatusItem.brandLogoImg"
            :src="brandStatusItem.brandLogoImg"
            :alt="brandStatusItem.brandName"
          />
          <img
            v-else
            :src="
              loadCategoryImg(
                category,
                brandStatusItem.largeCategoryName,
                brandStatusItem.smallCategoryName
              )
            "
            :alt="brandStatusItem.brandName"
            class="default-image"
          />
        </div>
        <div class="brand-name-category">
          <div
            class="category"
            :style="{
              color: CategoryColor(brandStatusItem.largeCategoryName),
              border: `1px solid ${CategoryColor(
                brandStatusItem.largeCategoryName
              )}`,
            }"
          >
            {{ brandStatusItem.smallCategoryName }}
          </div>
          <div class="brand-name">{{ brandStatusItem.brandName }}</div>
        </div>
      </div>

      <div class="brand-info">
        <div class="item">
          <div class="info-title">창업비용</div>
          <div class="info-value price">
            {{ calcPrice(brandStatusItem.brandStartCost.startTotalPrice) }}
          </div>
          <div class="standard-area">
            {{ brandStatusItem.brandStartCost.standardArea }}㎡
          </div>
        </div>
        <div class="item">
          <div class="info-title">월 평균 매출액</div>
          <div class="info-value">
            {{ calcMonthSalesAve(brandStatusItem.brandAreaSalesAve) }}
          </div>
        </div>
        <div class="item">
          <div class="info-title">매장수</div>
          <div class="info-value">
            {{ calcShopCount(brandStatusItem.brandFranchiseStatus) }}
          </div>
        </div>
        <div class="item">
          <div class="info-title">본사명</div>
          <div class="info-value">
            {{ brandStatusItem.companyName }}
          </div>
        </div>
      </div>

      <div v-if="getDevice !== 'mobile'" class="button-box">
        <CommonButtonCompareButton />
        <CommonButtonFavoriteButton />
        <CommonButtonShareButton />
        <CommonButtonQnaButton
          :width="getDevice === 'pc' ? 138 : getDevice === 'tablet' ? 328 : 180"
        />
      </div>
    </div>

    <div class="consulting">
      <div v-if="getDevice !== 'mobile'" class="text">
        <div>프랜차이즈 창업 고민된다면</div>
        <div>성공 창업상담</div>
      </div>
      <div v-else class="text">
        <div>성공 창업상담 받기 ></div>
      </div>

      <div class="image">
        <img src="~/assets/img/button/consulting.png" alt="성공 창업상담" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Brand } from '~~/types/brand'
import { CategoryColor, LargeCategory } from '~/types/category'
import {
  calcPrice,
  calcMonthSalesAve,
  calcShopCount,
  loadCategoryImg,
} from '~/function/common'

defineProps<{
  brandStatusItem: Brand
  getDevice: string
  category: LargeCategory[]
}>()
</script>

<style lang="scss" scoped>
.brand-summary-info {
  .summary-info-box {
    width: 100%;
    height: 406px;
    border: 1px solid $sectionLine;
    border-radius: 10px;
    padding: 30px;

    .logo-name {
      width: 100%;
      display: flex;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid $sectionLine;

      .logo {
        border-radius: 10px;
        border: 1px solid $sectionLine;
        margin-right: 10px;
        overflow: hidden;
        width: 125px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          display: block;
          width: 100%;
          height: 100%;

          &.default-image {
            width: 40px;
            height: 40px;
          }
        }
      }

      .brand-name-category {
        font-size: 14px;
        color: $fontMainColor;
        flex-grow: 1;
        overflow: hidden;

        .category {
          display: inline-block;
          padding: 3px 4px;
          font-size: 11px;
          border-radius: 3px;
          margin-bottom: 7px;
        }

        .brand-name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .brand-info {
      padding: 20px 0;
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(2, calc((100% - 10px) / 2));

      .item {
        background-color: #fafafa;
        border: 1px solid $sectionLine;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80px;
        padding: 0 10px;

        .info-title {
          font-size: 12px;
          color: $fontSubColor;
          margin-bottom: 4px;
        }

        .info-value {
          width: 100%;
          text-align: center;
          font-size: 14px;
          color: $fontMainColor;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &.price {
            color: $mainColor;
          }
        }

        .standard-area {
          margin-top: 4px;
          font-size: 10px;
          color: #bcbcbc;
          padding: 3px 4px;
          background-color: $sectionLine;
          border: 1px solid $iconLine;
          border-radius: 3px;
        }
      }
    }

    .button-box {
      display: flex;
      padding-top: 20px;
      border-top: 1px solid $sectionLine;
      justify-content: space-between;
      align-items: center;
    }
  }

  .consulting {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e8f0ff;
    border-radius: 10px;
    height: 80px;
    padding: 0 40px;
    cursor: pointer;

    .text {
      font-size: 13px;
      color: $fontMainColor;
      line-height: 20px;

      div {
        &:last-child {
          font-size: 15px;
          font-weight: 600;
          line-height: 24px;
        }
      }
    }

    .image {
      img {
        display: block;
        width: 112px;
      }
    }
  }
}

@include tablet {
  .brand-summary-info {
    @include tablet-container();
    margin-bottom: 80px;

    .summary-info-box {
      height: 300px;
      padding: 24px 24px 20px;

      .logo-name {
        padding-bottom: 20px;

        .logo {
          width: 115px;
          height: 46px;
        }
      }

      .brand-info {
        gap: 0 24px;
        grid-template-columns: repeat(4, calc((100% - 72px) / 4));
      }

      .button-box {
        padding-left: 35px;
      }
    }
  }
}

@include mobile {
  .brand-summary-info {
    @include mobile-container();
    margin-bottom: 30px;

    .summary-info-box {
      border: none;
      border-radius: 0;
      padding: 0;
      height: auto;

      .logo-name {
        padding-bottom: 20px;

        .logo {
          width: 115px;
          height: 46px;
        }

        .brand-name-category {
          font-size: 13px;
        }
      }

      .brand-info {
        padding: 20px 0 0;
        gap: 8px 9px;
        grid-template-columns: repeat(2, calc((100% - 9px) / 2));
      }
    }

    .consulting {
      height: 40px;
      padding: 0 30px 0 20px;
      overflow: hidden;

      .text {
        div {
          &:last-child {
            font-size: 13px;
            font-weight: 400;
          }
        }
      }

      .image {
        margin-top: -12px;
      }
    }
  }
}
</style>
