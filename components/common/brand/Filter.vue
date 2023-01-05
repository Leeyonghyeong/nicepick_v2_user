<template>
  <div class="top">
    <div class="title">
      <div class="total-count">
        <span>{{ totalCount }}개</span> 브랜드
      </div>
      <div class="filter" @click="isShowFilterModal = true">
        필터<img src="~/assets/img/common/filter.png" alt="filter" />
      </div>
    </div>

    <div v-if="costFilter || areaFilter" class="filter-info">
      <div class="filter-box">
        <div v-if="costFilter">
          {{ calcCostFilter(costFilter) }}
          <img
            src="~/assets/img/close/close_gray.png"
            alt="remove"
            @click="removeFilter('cost')"
          />
        </div>
        <div v-if="areaFilter">
          {{ calcAreaFilter(areaFilter) }}
          <img
            src="~/assets/img/close/close_gray.png"
            alt="remove"
            @click="removeFilter('area')"
          />
        </div>
      </div>
      <div class="filter-reset" @click="resetFilter">
        <img src="~/assets/img/arrow/re-load-black.png" alt="초기화" />
        초기화
      </div>
    </div>
  </div>
  <ModalBrandListFilterModal
    v-if="isShowFilterModal"
    :list-type="listType"
    :area-type="areaType"
    @get-brand-items="$emit('getBrandItems')"
    @close-modal="closeModal"
    @set-filter="setFilter"
    @set-area-type="setAreaType"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBrandListStore } from '~~/store/brandList'

const props = defineProps<{
  totalCount: number
  listType: string
}>()

const emit = defineEmits<{
  (e: 'getBrandItems'): void
}>()

const brandListStore = useBrandListStore()
const { categoryList, expectList, searchList, themeList } =
  storeToRefs(brandListStore)

const areaType = ref<boolean>(false)
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

const setFilter = (cost: string | undefined, area: string | undefined) => {
  costFilter.value = cost
  areaFilter.value = area
}

const setAreaType = (bool: boolean) => {
  areaType.value = bool
}

const calcCostFilter = (cost: string) => {
  let result

  if (cost === '50,000') result = '5천'
  else if (cost === '100,000') result = '1억'
  else if (cost === '150,000') result = '1억5천'
  else if (cost === '200,000') result = '2억'
  else result = '2억 이상'

  return result
}

const calcAreaFilter = (area: string) => {
  let result

  if (areaType.value) {
    if (area === '33') result = '33㎡'
    else if (area === '66') result = '66㎡'
    else if (area === '99') result = '99㎡'
    else if (area === '132') result = '132㎡'
    else result = '132㎡ 이상'
  } else if (area === '33') result = '10평대'
  else if (area === '66') result = '20평대'
  else if (area === '99') result = '30평대'
  else if (area === '132') result = '40평대'
  else result = '40평대 이상'

  return result
}

const removeFilter = (type: string) => {
  if (type === 'cost') {
    if (props.listType === 'category') {
      categoryList.value.costFilter = undefined
    } else if (props.listType === 'theme') {
      themeList.value.costFilter = undefined
    } else if (props.listType === 'search') {
      searchList.value.costFilter = undefined
    } else {
      expectList.value.costFilter = undefined
    }

    costFilter.value = undefined
  } else {
    if (props.listType === 'category') {
      categoryList.value.areaFilter = undefined
    } else if (props.listType === 'theme') {
      themeList.value.areaFilter = undefined
    } else if (props.listType === 'search') {
      searchList.value.areaFilter = undefined
    } else {
      expectList.value.areaFilter = undefined
    }

    areaFilter.value = undefined
  }

  emit('getBrandItems')
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

  emit('getBrandItems')
}

const isShowFilterModal = ref<boolean>(false)

const closeModal = () => {
  isShowFilterModal.value = false
}

onMounted(() => {
  initFilter()
})
</script>

<style lang="scss" scoped>
.top {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .total-count {
      font-size: 15px;
      color: $fontMainColor;
      span {
        color: $mainColor;
      }
    }

    .filter {
      display: flex;
      align-items: center;
      padding: 4px 10px;
      font-size: 12px;
      color: $fontSubColor;
      border: 1px solid #ebebeb;
      border-radius: 10px;
      cursor: pointer;

      img {
        width: 20px;
      }
    }
  }

  .filter-info {
    margin-top: 20px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8fa;
    padding: 0 16px;

    .filter-box {
      display: flex;

      div {
        padding: 4px 10px;
        border-radius: 50px;
        border: 1px solid $iconLine;
        background-color: #fff;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $fontSubColor;
        margin-right: 8px;

        img {
          width: 20px;
          margin-left: 4px;
          cursor: pointer;
        }
      }
    }

    .filter-reset {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: $fontSubColor;
      cursor: pointer;

      img {
        width: 20px;
      }
    }
  }
}
</style>
