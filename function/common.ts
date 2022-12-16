export const calcTotalPage = (totalCount: number, pageNum: number): number => {
  const totalPage = Math.ceil(totalCount / pageNum)

  return totalPage
}

export const calcStartCost = (startTotalPrice: string): string => {
  const price = Math.floor(parseInt(startTotalPrice.replaceAll(',', '')) / 10)

  const unit = Math.floor(price / 10000)

  return unit > 0
    ? `${unit}억 ${Math.floor(price % 10000).toLocaleString()}만원`
    : `${price.toLocaleString()}만원`
}
