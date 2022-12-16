export interface Brand {
  id: string
  brandLogoImg: string
  brandImg: string
  brandName: string
  isPremium: string
  largeCategoryName: string
  smallCategoryName: string
  brandPromotion: string
  brandPromotionIcon: string
  brandStartCost: BrandStartCost
  count: number
  brandYoutube: BrandYoutube[]
}

export interface BrandStartCost {
  totalFee: string
  standardArea: string
  startTotalPrice: string
}

export interface BrandYoutube {
  id: string
  youtubeUrl: string
  youtubeId: string
  youtubeTitle: string
}
