<template>
  <article @click="addOrRemoveCompare(brand)">
    <div class="image">
      <img v-if="!isCompare" src="~/assets/img/button/compare.png" alt="비교" />
      <img v-else src="~/assets/img/button/compare_active.png" alt="비교" />
    </div>
    <div class="text" :style="{ color: isCompare ? '#1569FF' : '#191919' }">
      비교
    </div>
  </article>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBrandListStore } from '~~/store/brandList'
import { Brand } from '~~/types/brand'

const props = defineProps<{
  brand: Brand
}>()

const brandListStore = useBrandListStore()
const { compareList } = storeToRefs(brandListStore)

const isCompare = ref<boolean>(false)

const addOrRemoveCompare = (brand: Brand) => {
  const findIndex = compareList.value.findIndex((e) => e.id === brand.id)

  if (findIndex > -1) {
    compareList.value.splice(findIndex, 1)
  } else {
    if (compareList.value.length === 4) {
      alert('비교는 4개까지 가능')
      return
    }
    compareList.value.push(brand)
  }

  checkCompareButton()
}

const checkCompareButton = () => {
  if (compareList.value.length > 0) {
    const find = compareList.value.find((e) => e.id === props.brand.id)

    if (find) {
      isCompare.value = true
    } else {
      isCompare.value = false
    }
  } else {
    isCompare.value = false
  }
}

checkCompareButton()
</script>

<style lang="scss" scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .image {
    img {
      display: block;
      width: 30px;
    }
  }

  .text {
    font-size: 12px;
    color: $fontMainColor;
  }
}
</style>
