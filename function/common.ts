import { BrandAreaSalesAve, BrandFranchiseStatus } from '~~/types/brand'
import { LargeCategory } from '~~/types/category'

export const loadCategoryImg = (
  category: LargeCategory[],
  largeCategoryName: string,
  smallCategoryName: string
): string => {
  const largeCategory = category.find(
    (category) => category.categoryName === largeCategoryName
  )

  let url = ''

  if (largeCategory) {
    const smallCategory = largeCategory.smallCategory.find(
      (category) => category.categoryName === smallCategoryName
    )

    if (smallCategory) {
      url = smallCategory.categoryImg
    }
  }

  return url
}

export const calcTotalPage = (totalCount: number, pageNum: number): number => {
  const totalPage = Math.ceil(totalCount / pageNum)

  return totalPage
}

export const calcPrice = (price: string): string => {
  const _calcPrice = Math.floor(parseInt(price.replaceAll(',', '')) / 10)

  return makeMoneyString(_calcPrice)
}

export const calcMonthSalesAve = (
  brandAreaSalesAve: BrandAreaSalesAve[]
): string => {
  const findItem: BrandAreaSalesAve | undefined = brandAreaSalesAve.find(
    (item) => item.location === '전체'
  )

  if (findItem) {
    const totalSales = Math.floor(
      parseInt(findItem.salesAve.replace(/,/g, '')) / 10
    )

    if (isNaN(totalSales)) return '정보 없음'

    const monthAve = Math.floor(totalSales / 12)

    return makeMoneyString(monthAve)
  }

  return '정보 없음'
}

export const calcShopCount = (
  brandFranchiseStatus: BrandFranchiseStatus[]
): string => {
  const yearArr: number[] = brandFranchiseStatus.map((item) => item.year)
  const maxYear = yearArr.length > 0 ? Math.max(...yearArr) : 0

  if (maxYear > 0) {
    const findLocation: BrandFranchiseStatus | undefined =
      brandFranchiseStatus.find(
        (item) => item.location === '전체' && item.year === maxYear
      )

    if (findLocation) {
      return findLocation.allCount.toLocaleString() + '개'
    } else {
      return '정보 없음'
    }
  }

  return '정보 없음'
}

const makeMoneyString = (price: number): string => {
  const unit = Math.floor(price / 10000)

  return unit > 0
    ? `${unit}억 ${Math.floor(price % 10000).toLocaleString()}만원`
    : `${price.toLocaleString()}만원`
}
