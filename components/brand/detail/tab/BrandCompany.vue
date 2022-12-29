<template>
  <section class="brand-company-wrapper">
    <div class="top-noti">
      <div>· 해당본사에서 등록한 정보공개서를 기준으로 작성된 내용입니다.</div>
    </div>

    <div class="info-box">
      <div class="title">본사 정보</div>

      <div class="info-wrapper">
        <div class="info-content">
          <div class="item">
            <div>상호</div>
            <div>{{ brandCompanyItem.brandNormalStatus.companyName }}</div>
          </div>
          <div class="item">
            <div>대표자</div>
            <div>{{ brandCompanyItem.brandNormalStatus.ownerName }}</div>
          </div>
        </div>

        <div class="info-content">
          <div class="item">
            <div>대표번호</div>
            <div>{{ brandCompanyItem.brandNormalStatus.repTel }}</div>
          </div>
          <div class="item">
            <div>대표FAX</div>
            <div>{{ brandCompanyItem.brandNormalStatus.repFaxTel }}</div>
          </div>
        </div>

        <div class="info-content">
          <div class="item">
            <div>법인설립 등기일</div>
            <div>{{ brandCompanyItem.brandNormalStatus.corpRegDate }}</div>
          </div>
          <div class="item">
            <div>법인등록번호</div>
            <div>{{ brandCompanyItem.brandNormalStatus.corpNumber }}</div>
          </div>
        </div>

        <div class="info-content">
          <div class="item">
            <div>사업자 등록일</div>
            <div>{{ brandCompanyItem.brandNormalStatus.bizRegDate }}</div>
          </div>
          <div class="item">
            <div>사업자등록번호</div>
            <div>{{ brandCompanyItem.brandNormalStatus.bizNumber }}</div>
          </div>
        </div>

        <div class="info-content">
          <div class="item">
            <div>정보공개서 최초등록일</div>
            <div>{{ brandCompanyItem.brandNormalStatus.companyName }}</div>
          </div>
          <div class="item">
            <div>정보공개서 최종등록일</div>
            <div>{{ brandCompanyItem.brandNormalStatus.lastUpdateDate }}</div>
          </div>
        </div>

        <div class="info-content">
          <div class="item">
            <div>정보공개서 등록번호</div>
            <div>{{ brandCompanyItem.brandNormalStatus.regNumber }}</div>
          </div>
          <div class="item">
            <div>홈페이지</div>
            <div>
              <a
                :href="brandCompanyItem.webUrl"
                :target="getDevice === 'pc' ? '_blank' : ''"
                >홈페이지 ></a
              >
            </div>
          </div>
        </div>

        <div class="info-content">
          <div class="item addr">
            <div>주소</div>
            <div>{{ brandCompanyItem.brandNormalStatus.address }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <div class="title">본사 매출정보</div>
      <div class="graph-tab">
        <div
          :class="{ active: isGraphActive[0] }"
          @click="isGraphActive = [true, false, false, false]"
        >
          재무상태
        </div>
        <div
          :class="{ active: isGraphActive[1] }"
          @click="isGraphActive = [false, true, false, false]"
        >
          매출액
        </div>
        <div
          :class="{ active: isGraphActive[2] }"
          @click="isGraphActive = [false, false, true, false]"
        >
          영업이익
        </div>
        <div
          :class="{ active: isGraphActive[3] }"
          @click="isGraphActive = [false, false, false, true]"
        >
          당기순이익
        </div>
      </div>

      <div class="graph-box">
        <CompanyFinanceStatus
          v-if="isGraphActive[0]"
          :brand-finance-status="brandCompanyItem.brandFinanceStatus"
          :height="300"
        />
        <CompanyTakeStatus
          v-if="isGraphActive[1]"
          :brand-finance-status="brandCompanyItem.brandFinanceStatus"
          :height="300"
        />
        <CompanyOperatingStatus
          v-if="isGraphActive[2]"
          :brand-finance-status="brandCompanyItem.brandFinanceStatus"
          :height="300"
        />
        <CompanyIncomeStatus
          v-if="isGraphActive[3]"
          :brand-finance-status="brandCompanyItem.brandFinanceStatus"
          :height="300"
        />
      </div>
    </div>

    <div class="info-box">
      <div class="title">본사 임직원 수</div>
      <div class="employee-box">
        <div class="employee-wrapper">
          <img src="~/assets/img/common/employee.png" alt="임직원 수" />
          <div>
            임원
            <span>{{ brandCompanyItem.brandEmployee[0].excutives }}명</span>
          </div>
        </div>
        <div class="employee-wrapper">
          <img src="~/assets/img/common/employee.png" alt="임직원 수" />
          <div>
            직원
            <span>{{ brandCompanyItem.brandEmployee[0].employees }}명</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="brandSameListItems.length > 0" class="info-box">
      <div class="title">
        <span style="color: #1569ff">{{
          brandCompanyItem.brandNormalStatus.companyName
        }}</span
        >의 다른 브랜드
      </div>

      <div class="brand-list">
        <div
          v-for="item in brandSameListItems"
          :key="item.id"
          class="item"
          @click="$router.push(`/brand/detail/${item.id}`)"
        >
          <div class="logo">
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
          <div class="name-category">
            <div
              class="category"
              :style="{
                color: CategoryColor(item.largeCategoryName),
                borderColor: CategoryColor(item.largeCategoryName),
              }"
            >
              {{ item.smallCategoryName }}
            </div>
            <div class="name">{{ item.brandName }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import CompanyFinanceStatus from './graph/CompanyFinanceStatus.vue'
import CompanyTakeStatus from './graph/CompanyTakeStatus.vue'
import CompanyOperatingStatus from './graph/CompanyOperatingStatus.vue'
import CompanyIncomeStatus from './graph/CompanyIncomeStatus.vue'
import { Brand } from '~~/types/brand'
import { loadCategoryImg } from '~~/function/common'
import { useCategoryStore } from '~~/store/category'
import { CategoryColor } from '~~/types/category'

defineProps<{
  brandCompanyItem: Brand
  brandSameListItems: Brand[]
  getDevice: string
}>()

const categoryStore = useCategoryStore()
const { category } = storeToRefs(categoryStore)

const isGraphActive = ref<boolean[]>([true, false, false, false])
</script>

<style lang="scss" scoped>
.brand-company-wrapper {
  .top-noti {
    font-size: 12px;
    color: #000;
    font-weight: 400;
    margin-bottom: 30px;
  }

  .info-box {
    margin-bottom: 80px;

    .title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .info-wrapper {
      border: 1px solid $sectionLine;
      border-radius: 10px;
      overflow: hidden;

      .info-content {
        display: flex;
        border-bottom: 1px solid $sectionLine;

        &:last-child {
          border-bottom: none;
        }

        .item {
          display: flex;
          height: 47px;
          width: calc(100% / 2);

          &.addr {
            width: 100%;
          }

          div {
            display: flex;
            align-items: center;
            padding-left: 13px;
            font-size: 14px;
            font-weight: 400;

            a {
              color: $mainColor;
              padding: 6px;
              border: 1px solid $mainColor;
              border-radius: 5px;
              font-size: 11px;
              font-weight: 400;
              cursor: pointer;
            }

            &:first-child {
              background-color: #fafafa;
              width: 150px;
              color: $fontSubColor;
            }

            &:last-child {
              color: $fontMainColor;
            }
          }
        }
      }
    }

    .graph-tab {
      display: flex;
      margin-bottom: 20px;

      div {
        padding: 12px 14px;
        border: 1px solid $iconLine;
        border-radius: 50px;
        color: $fontSubColor;
        font-size: 14px;
        margin-right: 8px;
        cursor: pointer;

        &.active {
          color: $mainColor;
          border-color: $mainColor;
        }
      }
    }

    .graph-box {
      height: 300px;
      padding: 20px 0 0;
      border: 1px solid $sectionLine;
      border-radius: 10px;
    }

    .employee-box {
      display: grid;
      gap: 0 20px;
      grid-template-columns: repeat(2, calc((100% - 20px) / 2));

      .employee-wrapper {
        height: 100px;
        background-color: #fafafa;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 400;
        color: $fontSubColor;

        img {
          width: 30px;
          margin-bottom: 4px;
        }

        div {
          span {
            color: $fontMainColor;
          }
        }
      }
    }

    .brand-list {
      display: grid;
      gap: 40px 30px;
      grid-template-columns: repeat(4, calc((100% - 90px) / 4));

      .item {
        cursor: pointer;
        .logo {
          border: 1px solid $sectionLine;
          border-radius: 10px;
          height: 68px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            display: block;
            width: 100%;
            aspect-ratio: 2.5;

            &.default-image {
              width: 40px;
              height: 40px;
            }
          }
        }

        .name-category {
          display: flex;
          align-items: center;
          margin-top: 10px;

          .category {
            border: 1px solid;
            padding: 3px 4px;
            font-size: 11px;
            font-weight: 400;
            margin-right: 8px;
          }

          .name {
            font-size: 14px;
            color: $fontMainColor;
            font-weight: 400;
          }
        }
      }
    }
  }
}

@include tablet {
  .brand-company-wrapper {
    @include tablet-container();

    .info-box {
      .brand-list {
        gap: 40px 24px;
        grid-template-columns: repeat(4, calc((100% - 72px) / 4));

        .item {
          .logo {
            height: 59px;
          }
        }
      }
    }
  }
}

@include mobile {
  .brand-company-wrapper {
    @include mobile-container();

    .info-box {
      margin-bottom: 50px;

      .title {
        font-size: 16px;
      }

      .brand-list {
        gap: 30px 8px;
        grid-template-columns: repeat(2, calc((100% - 8px) / 2));

        .item {
          .logo {
            height: 62px;
          }

          .name-category {
            .name {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
