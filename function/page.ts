export const calcTotalPage = (totalCount: number, pageNum: number): number => {
  const totalPage = Math.ceil(totalCount / pageNum)

  return totalPage
}
