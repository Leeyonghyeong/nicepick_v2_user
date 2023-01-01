<template>
  <section class="brand-status-wrapper">
    <div class="top-noti">
      <div>
        · 공정거래위원회에 등록된 가맹사업거래 정보공개서를 창업픽
        데이터센터에서 분석한 정보입니다.
      </div>
      <div>
        · 산정 방식 및 입력 내용은 가맹본부마나 차이가 있을수 있으니 최신 자료는
        각 가맹본부에 직접 요청 바랍니다.
      </div>
    </div>

    <div class="change-graph status-box">
      <div class="title">가맹점 증감 현황</div>
      <div class="graph-box">
        <BrandChangeStatus
          :brand-change-status="brandStatusItem.brandChangeStatus"
          :height="300"
        />
      </div>
    </div>

    <div class="franchise-graph status-box">
      <div class="title">연도별 매장 현황</div>
      <div class="graph-box">
        <BrandFranchiseStatus
          :brand-franchise-status="brandStatusItem.brandFranchiseStatus"
          :height="300"
        />
      </div>
    </div>

    <div class="sales-graph status-box">
      <div class="title">지역별 평균 매출</div>
      <div class="graph-box">
        <BrandAreaSalesStatus
          :brand-area-sale-status="brandStatusItem.brandAreaSalesAve"
          :height="300"
        />
      </div>
    </div>

    <div class="start-cost status-box">
      <div class="title">창업 비용</div>
      <div class="start-cost-box">
        <div class="start-cost-items">
          <div class="start-cost-item">
            <div>기준 면적</div>
            <div>
              {{
                brandStatusItem.brandStartCost
                  ? brandStatusItem.brandStartCost.standardArea
                  : 0
              }}㎡
            </div>
          </div>
          <div class="start-cost-item">
            <div>가맹비</div>
            <div>
              {{
                calcPrice(
                  brandStatusItem.brandStartCost
                    ? brandStatusItem.brandStartCost.membershipFee
                    : '0'
                )
              }}
            </div>
          </div>
          <div class="start-cost-item">
            <div>교육비</div>
            <div>
              {{
                calcPrice(
                  brandStatusItem.brandStartCost
                    ? brandStatusItem.brandStartCost.educationFee
                    : '0'
                )
              }}
            </div>
          </div>
          <div class="start-cost-item">
            <div>보증금</div>
            <div>
              {{
                calcPrice(
                  brandStatusItem.brandStartCost
                    ? brandStatusItem.brandStartCost.deposit
                    : '0'
                )
              }}
            </div>
          </div>
          <div class="start-cost-item">
            <div>인테리어</div>
            <div>
              {{
                calcPrice(
                  brandStatusItem.brandStartCost
                    ? brandStatusItem.brandStartCost.interiorFee
                    : '0'
                )
              }}
            </div>
          </div>
          <div class="start-cost-item">
            <div>기타비용</div>
            <div>
              {{
                calcPrice(
                  brandStatusItem.brandStartCost
                    ? brandStatusItem.brandStartCost.etcFee
                    : '0'
                )
              }}
            </div>
          </div>
        </div>
        <div v-if="getDevice !== 'mobile'" class="equal">
          <img src="~/assets/img/common/equal.png" alt="equal" />
        </div>
        <div class="total-price">
          <div>총 합계</div>
          <div>
            {{
              calcPrice(
                brandStatusItem.brandStartCost
                  ? brandStatusItem.brandStartCost.startTotalPrice
                  : '0'
              )
            }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import BrandChangeStatus from './graph/BrandChangeStatus.vue'
import { Brand } from '~~/types/brand'
import { calcPrice } from '~/function/common'

defineProps<{
  brandStatusItem: Brand
  getDevice: string
}>()
</script>

<style lang="scss" scoped>
section {
  .top-noti {
    font-size: 12px;
    color: #000;
    margin-bottom: 30px;

    div {
      line-height: 14px;

      &:first-child {
        margin-bottom: 4px;
      }
    }
  }

  .status-box {
    margin-bottom: 80px;
    .title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .graph-box {
      border: 1px solid $sectionLine;
      border-radius: 10px;
      height: 300px;
    }

    .start-cost-box {
      height: 205px;
      display: flex;
      justify-content: space-between;

      .start-cost-items {
        width: 480px;
        display: grid;
        gap: 15px;
        grid-template-columns: repeat(3, calc((100% - 30px) / 3));

        .start-cost-item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #fafafa;
          border: 1px solid $sectionLine;
          border-radius: 10px;

          div {
            line-height: 17px;
            color: $fontMainColor;
            font-weight: 400;
            font-size: 14px;

            &:last-child {
              color: $fontSubColor;
              margin-top: 4px;
            }
          }
        }
      }

      .equal {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 30px;
          display: block;
        }
      }

      .total-price {
        width: 276px;
        height: 200px;
        border: 1px solid #d6dff5;
        background-color: #f8faff;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        div {
          font-size: 18px;
          font-weight: 400;
          line-height: 21px;
          color: $fontMainColor;

          &:last-child {
            color: $mainColor;
            font-size: 20px;
            font-weight: 600;
            line-height: 24px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}

@include tablet {
  .brand-status-wrapper {
    @include tablet-container();

    .start-cost {
      .start-cost-box {
        .start-cost-items {
          width: calc(100% * 0.6);
        }

        .equal {
          width: 24px;

          img {
            width: 24px;
          }
        }

        .total-price {
          width: calc(100% * 0.4 - 24px);
        }
      }
    }
  }
}

@include mobile {
  .brand-status-wrapper {
    @include mobile-container();

    .status-box {
      margin-bottom: 50px;

      .title {
        font-size: 16px;
      }

      .start-cost-box {
        flex-direction: column;
        padding: 0;
        border: none;
        border-radius: 0;
        height: auto;

        .start-cost-items {
          width: 100%;
          gap: 10px 14px;
          grid-template-columns: repeat(3, calc((100% - 28px) / 3));
          margin-bottom: 20px;

          .start-cost-item {
            height: 100px;

            div {
              font-size: 13px;
              line-height: 16px;
            }
          }
        }

        .total-price {
          width: 100%;
          height: 100px;

          div {
            font-size: 14px;
            line-height: 17px;

            &:last-child {
              font-size: 16px;
              line-height: 19px;
              margin-top: 6px;
            }
          }
        }
      }
    }
  }
}
</style>
