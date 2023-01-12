<template>
  <div>
    <main>
      <BrandDetail
        v-if="brandIntroItem && brandStatusItem && brandCompanyItem"
        :brand-intro-item="brandIntroItem"
        :brand-status-item="brandStatusItem"
        :brand-company-item="brandCompanyItem"
        :brand-same-list-items="brandSameListItems || []"
      />
    </main>
    <Footer />
    <DetailBottomNav :brand="brandStatusItem!" />
  </div>
</template>

<script lang="ts" setup>
import { Brand } from '~~/types/brand'
import api from '~/config/axios.config'
import DetailBottomNav from '~~/components/common/DetailBottomNav.vue'
import Footer from '~~/components/common/Footer.vue'

definePageMeta({
  layout: 'brand-detail',
})

const route = useRoute()
const brandIntroItem = ref<Brand>()
const brandStatusItem = ref<Brand>()
const brandCompanyItem = ref<Brand>()
const brandSameListItems = ref<Brand[]>()

const { data: introItem } = await api.get<{
  brand: Brand
  success: boolean
  errorMessage: string
}>(`/brand/detail/images/${route.params.id}`)

const { data: statusItem } = await api.get<{
  brand: Brand
  success: boolean
  errorMessage: string
}>(`/brand/detail/status/${route.params.id}`)

const { data: companyItem } = await api.get<{
  brand: Brand
  success: boolean
  errorMessage: string
}>(`/brand/detail/company/${route.params.id}`)

if (introItem.success) {
  brandIntroItem.value = introItem.brand
}

if (statusItem.success) {
  brandStatusItem.value = statusItem.brand
}

if (companyItem.success) {
  brandCompanyItem.value = companyItem.brand

  const bizNumber = brandCompanyItem.value.brandNormalStatus
    ? brandCompanyItem.value.brandNormalStatus.bizNumber
    : brandCompanyItem.value.bizNumber

  const { data } = await api.get<{
    brand: Brand[]
    success: boolean
    errorMessage: string
  }>(`/brand/detail/same/${bizNumber}/${route.params.id}`)

  if (data.success) {
    brandSameListItems.value = data.brand
  }
}

if (brandIntroItem.value) {
  useHead({
    title: `- ${brandIntroItem.value.brandName}`,
    meta: [
      {
        property: 'og:title',
        content: `창업할 땐 창업픽 - ${brandIntroItem.value.brandName}`,
      },
      {
        property: 'og:image',
        content: `${
          brandIntroItem.value.brandImg
            ? brandIntroItem.value.brandImg
            : 'https://nicepick.s3.ap-northeast-2.amazonaws.com/etc/main.jpeg'
        }`,
      },
      {
        property: 'og:url',
        content: `http://3.38.51.90/brand/detail/${route.params.id}`,
      },
    ],
  })
}
</script>

<style lang="scss" scoped></style>
