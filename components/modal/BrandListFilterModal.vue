<template>
  <section class="filter-modal">
    <article class="filter-modal-wrapper">
      <div class="filter-box">
        <div class="top">
          <div>필터</div>
          <img
            src="~/assets/img/close/close_black.png"
            alt="close"
            @click="closeModalAndHistoryBack"
          />
        </div>
        <div class="filter">
          <div class="cost-filter">
            <div class="title">창업 비용</div>
            <div class="select-filter">
              <div
                :class="{ active: costFilter === '50,000' }"
                @click="costFilter = '50,000'"
              >
                5천
              </div>
              <div
                :class="{ active: costFilter === '100,000' }"
                @click="costFilter = '100,000'"
              >
                1억
              </div>
              <div
                :class="{ active: costFilter === '150,000' }"
                @click="costFilter = '150,000'"
              >
                1.5억
              </div>
              <div
                :class="{ active: costFilter === '200,000' }"
                @click="costFilter = '200,000'"
              >
                2억
              </div>
              <div
                :class="{ active: costFilter === '200,001' }"
                @click="costFilter = '200,001'"
              >
                2억 이상
              </div>
            </div>
          </div>

          <div class="area-filter">
            <div class="title">
              <div>기준 면적</div>
              <div class="area-type">
                <div
                  :class="{ active: !areaType }"
                  @click="$emit('setAreaType', false)"
                >
                  평
                </div>
                <div
                  :class="{ active: areaType }"
                  @click="$emit('setAreaType', true)"
                >
                  ㎡
                </div>
              </div>
            </div>
            <div class="select-filter">
              <div
                :class="{ active: areaFilter === '33' }"
                @click="areaFilter = '33'"
              >
                {{ areaType ? '33㎡' : '10평대' }}
              </div>
              <div
                :class="{ active: areaFilter === '66' }"
                @click="areaFilter = '66'"
              >
                {{ areaType ? '66㎡' : '20평대' }}
              </div>
              <div
                :class="{ active: areaFilter === '99' }"
                @click="areaFilter = '99'"
              >
                {{ areaType ? '99㎡' : '30평대' }}
              </div>
              <div
                :class="{ active: areaFilter === '132' }"
                @click="areaFilter = '132'"
              >
                {{ areaType ? '132㎡' : '40평대' }}
              </div>
              <div
                :class="{ active: areaFilter === '133' }"
                @click="areaFilter = '133'"
              >
                {{ areaType ? '132㎡ 이상' : '40평 이상' }}
              </div>
            </div>
          </div>
        </div>
        <div class="filter-button">
          <div class="reset" @click="resetFilter">
            <img
              src="~/assets/img/arrow/re-load-black.png"
              alt="초기화"
            />초기화
          </div>
          <div class="submit" @click="setFilter">필터 적용</div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBrandListStore } from '~~/store/brandList'

const props = defineProps<{
  listType: string
  areaType: boolean
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void
  (e: 'getBrandItems'): void
  (e: 'setFilter', cost: string | undefined, area: string | undefined): void
  (e: 'setAreaType', bool: boolean): void
}>()

const brandListStore = useBrandListStore()
const { categoryList, expectList, searchList, themeList } =
  storeToRefs(brandListStore)

const costFilter = ref<string>()
const areaFilter = ref<string>()

const initFilter = () => {
  if (props.listType === 'category') {
    costFilter.value = categoryList.value.costFilter
    areaFilter.value = categoryList.value.areaFilter
  } else if (props.listType === 'theme') {
    costFilter.value = themeList.value.costFilter
    areaFilter.value = themeList.value.areaFilter
  } else if (props.listType === 'search') {
    costFilter.value = searchList.value.costFilter
    areaFilter.value = searchList.value.areaFilter
  } else {
    costFilter.value = expectList.value.costFilter
    areaFilter.value = expectList.value.areaFilter
  }
}

const resetFilter = () => {
  costFilter.value = ''
  areaFilter.value = ''

  if (props.listType === 'category') {
    categoryList.value.costFilter = undefined
    categoryList.value.areaFilter = undefined
  } else if (props.listType === 'theme') {
    themeList.value.costFilter = undefined
    themeList.value.areaFilter = undefined
  } else if (props.listType === 'search') {
    searchList.value.costFilter = undefined
    searchList.value.areaFilter = undefined
  } else {
    expectList.value.costFilter = undefined
    expectList.value.areaFilter = undefined
  }
}

const setFilter = () => {
  if (props.listType === 'category') {
    categoryList.value.costFilter = costFilter.value
    categoryList.value.areaFilter = areaFilter.value
  } else if (props.listType === 'theme') {
    themeList.value.costFilter = costFilter.value
    themeList.value.areaFilter = areaFilter.value
  } else if (props.listType === 'search') {
    searchList.value.costFilter = costFilter.value
    searchList.value.areaFilter = areaFilter.value
  } else {
    expectList.value.costFilter = costFilter.value
    expectList.value.areaFilter = areaFilter.value
  }

  emit('setFilter', costFilter.value, areaFilter.value)
  emit('getBrandItems')
  closeModalAndHistoryBack()
}

const closeModal = () => {
  emit('closeModal')
}

const closeModalAndHistoryBack = () => {
  emit('closeModal')
  history.back()
}

onMounted(() => {
  initFilter()

  document.body.setAttribute('style', 'overflow: hidden;')
  window.history.pushState({ page: 'modal' }, '', '#modal')
  window.addEventListener('popstate', closeModal)
})

onUnmounted(() => {
  document.body.removeAttribute('style')
  window.removeEventListener('popstate', closeModal)
})
</script>

<style lang="scss" scoped>
.filter-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 103;
  background-color: rgba(0, 0, 0, 0.6);

  .filter-modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .filter-box {
      background-color: #fff;
      padding: 30px;
      width: 438px;
      border-radius: 10px;

      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $sectionLine;
        padding-bottom: 20px;
        font-size: 18px;
        font-weight: 400;
        color: $fontMainColor;
        position: relative;

        img {
          position: absolute;
          right: 0;
          width: 30px;
          cursor: pointer;
        }
      }

      .filter {
        margin-top: 30px;

        .cost-filter,
        .area-filter {
          &.cost-filter {
            margin-bottom: 30px;
          }

          &.area-filter {
            padding-bottom: 104px;
            border-bottom: 1px solid $sectionLine;
          }
          .title {
            font-size: 15px;
            font-weight: 400;
            color: $fontMainColor;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .area-type {
              display: flex;
              font-size: 13px;
              color: #bcbcbc;
              font-weight: 500;

              div {
                cursor: pointer;

                &.active {
                  color: $mainColor;
                }

                &:first-child {
                  &::after {
                    content: '|';
                    margin: 0 4px;
                    color: #bcbcbc;
                  }
                }
              }
            }
          }

          .select-filter {
            display: flex;
            justify-content: space-between;

            div {
              width: 70px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid $iconLine;
              border-radius: 10px;
              font-size: 13px;
              color: $fontSubColor;
              font-weight: 400;
              cursor: pointer;

              &.active {
                color: $mainColor;
                border-color: $mainColor;
              }
            }
          }
        }
      }

      .filter-button {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

        div {
          cursor: pointer;
          height: 50px;
          font-weight: 400;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;

          &.reset {
            width: 102px;
            background-color: #f3f3f3;
            font-size: 13px;
            color: $fontSubColor;

            img {
              width: 20px;
            }
          }

          &.submit {
            width: 268px;
            background-color: $mainColor;
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }

  @include mobile {
    .filter-modal-wrapper {
      .filter-box {
        position: relative;
        width: 100%;
        height: 100vh;
        border-radius: 0;
        padding: 0;

        .top {
          height: 60px;
          align-items: center;
          padding: 0 24px 0;
          justify-content: space-between;
          font-size: 16px;

          img {
            right: 24px;
          }
        }

        .filter {
          .cost-filter,
          .area-filter {
            padding: 0 24px;
            &.cost-filter {
              margin-bottom: 43px;
            }

            &.area-filter {
              padding-bottom: 0;
              border-bottom: none;
            }

            .title {
              font-size: 14px;

              .area-type {
                font-size: 12px;

                div {
                  &:first-child {
                    &::after {
                      content: '|';
                      margin: 0 8px;
                      color: #bcbcbc;
                    }
                  }
                }
              }
            }

            .select-filter {
              display: grid;
              gap: 8px;
              grid-template-columns: repeat(3, calc((100% - 16px) / 3));

              div {
                width: 100%;
              }
            }
          }
        }

        .filter-button {
          width: 100%;
          padding: 10px 24px;
          position: absolute;
          bottom: 0;
          border-top: 1px solid $sectionLine;

          div {
            &.reset {
              width: calc((100% - 8px) * 0.35);
              background-color: #f3f3f3;
              font-size: 12px;
              color: $fontSubColor;

              img {
                width: 20px;
              }
            }

            &.submit {
              width: calc((100% - 8px) * 0.65);
              background-color: $mainColor;
              color: #fff;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
