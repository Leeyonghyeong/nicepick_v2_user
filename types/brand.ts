export interface Brand {
  id: string
  brandLogoImg: string
  brandImg: string
  brandName: string
  bizNumber: string
  companyName: string
  isPremium: boolean
  largeCategoryName: string
  smallCategoryName: string
  brandPromotion: string
  brandPromotionIcon: string
  webUrl: string
  count: number
  createAt: Date
  updateAt: Date
  brandYoutube: BrandYoutube[]
  brandIntroImg: BrandIntroImg[]
  brandMenuImg: BrandMenuImg[]
  brandInteriorImg: BrandInteriorImg[]
  brandStartCostImg: BrandStartCostImg[]
  brandStartCost: BrandStartCost
  brandAreaSalesAve: BrandAreaSalesAve[]
  brandFranchiseStatus: BrandFranchiseStatus[]
  brandChangeStatus: BrandChangeStatus[]
  brandNormalStatus: BrandNormalStatus
  brandFinanceStatus: BrandFinanceStatus[]
  brandEmployee: BrandEmployee[]
}

export interface BrandYoutube {
  id: string
  youtubeUrl: string
  youtubeId: string
  youtubeTitle: string
  createAt: Date
}

export interface BrandIntroImg {
  id: string
  introImgUrl: string
  introImgUrlKey: string
  createAt: Date
}

export interface BrandMenuImg {
  id: string
  menuImgUrl: string
  menuImgUrlKey: string
  menuName?: string
  menuPrice?: number
  createAt: Date
}

export interface BrandInteriorImg {
  id: string
  interiorImgUrl: string
  interiorImgUrlKey: string
  createAt: Date
}

export interface BrandStartCostImg {
  id: string
  startCostImgUrl: string
  startCostImgUrlKey: string
  createAt: Date
}

export interface BrandStartCost {
  membershipFee: string
  educationFee: string
  deposit: string
  etcFee: string
  interiorFee: string
  totalFee: string
  startTotalPrice: string
  standardArea: string
  createAt: Date
}

export interface BrandAreaSalesAve {
  year: number
  franchiseCount?: number
  location: string
  salesAve: string
  areaSalesAve: string
  createAt: Date
}

export interface BrandFranchiseStatus {
  year: number
  location: string
  allCount: number
  createAt: Date
}

export interface BrandChangeStatus {
  year: number
  newShopCount: number
  terminationCount: number
  cancelCount: number
  changeCount: number
  createAt: Date
}

export interface BrandNormalStatus {
  companyName: string
  brandName: string
  ownerName: string
  corpRegDate: string
  bizRegDate: string
  bizNumber: string
  address: string
  repTel: string
  repFaxTel: string
  regNumber: string
  regDate: string
  lastUpdateDate: string
  corpNumber: string
  createAt: Date
}

export interface BrandFinanceStatus {
  year: number
  asset: string
  liability: string
  equity: string
  sales: string
  operatingIncome: string
  netIncome: string
  createAt: Date
}

export interface BrandEmployee {
  year: number
  excutives: number
  employees: number
  createAt: Date
}

export interface BrandList {
  brandItems: Brand[]
  page: number
  nextPage: boolean
  totalCount: number
  costFilter?: string
  areaFilter?: string
}
