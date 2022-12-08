export interface LargeCategory {
  id: string
  categoryName: string
  mainImg: string
}

export const CategoryColor = (category: string): string => {
  if (category === '편의점/식품') return '#3CA5DB'
  else if (category === '판매/도소매') return '#FF4B2E'
  else if (category === '주점/기타 외식') return '#8941E6'
  else if (category === '교육/놀이') return '#83CE00'
  else if (category === '분식/패스트푸드') return '#CFB200'
  else if (category === '커피/베이커리') return '#AA641F'
  else if (category === '한·중·일') return '#46A246'
  else if (category === '오락/스포츠') return '#408EFF'
  else if (category === '생활서비스') return '#EC55BF'
  else return '#FF7655'
}
