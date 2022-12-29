<template>
  <section>
    <article ref="chartElement" :style="{ height: `${height}px` }"></article>
  </section>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { BrandAreaSalesAve } from '~~/types/brand'
import { calcPrice } from '~/function/common'

const props = defineProps<{
  brandAreaSaleStatus: BrandAreaSalesAve[]
  height: number
}>()

const brandAreaSalesStatueItem = ref<BrandAreaSalesAve[]>(
  props.brandAreaSaleStatus
)
const chartElement = ref<HTMLDivElement | null>(null)

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
])

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
>

let myChart: echarts.ECharts

const resizeChart = () => {
  if (myChart) {
    myChart.resize()
  }
}

onMounted(() => {
  if (chartElement.value) {
    const chartDom = chartElement.value
    myChart = echarts.init(chartDom)

    const _brandAreaSalesStatueItem: BrandAreaSalesAve[] =
      brandAreaSalesStatueItem.value

    const year = _brandAreaSalesStatueItem.map((e) => e.year)
    const maxYear = year.length > 0 ? Math.max(...year) : 0

    const filterItem = _brandAreaSalesStatueItem.filter(
      (e) => e.year === maxYear && e.location !== '전체'
    )

    const allLocationItem = _brandAreaSalesStatueItem.filter(
      (e) => e.year === maxYear && e.location === '전체'
    )

    filterItem.sort((a, b) => (a.location < b.location ? -1 : 0))

    const mergeItem = allLocationItem
    mergeItem.push(...filterItem)

    filterItem.sort((a, b) =>
      parseInt(a.areaSalesAve.replace(/,/g, '')) >
      parseInt(b.areaSalesAve.replace(/,/g, ''))
        ? -1
        : 0
    )

    const maxSalseLocation: BrandAreaSalesAve = filterItem[0]

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: [
          '전체 평균 매출',
          `평균 매출 최대 지역: ${maxSalseLocation.location}`,
        ],
        icon: 'circle',
        show: true,
      },
      xAxis: {
        type: 'category',
        axisTick: { show: true },
        data: [...mergeItem.map((e) => e.location)],
      },
      yAxis: [
        {
          type: 'value',
        },
      ],
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {
          name: '평균 매출',
          type: 'bar',
          barWidth: '10%',
          color: '#FF9264',
          emphasis: {
            focus: 'series',
          },
          tooltip: {
            valueFormatter: (value) => {
              if (typeof value === 'number' && !isNaN(value)) {
                return value < 0
                  ? '-' + calcPrice(Math.abs(value).toLocaleString())
                  : calcPrice(Math.abs(value).toLocaleString())
              } else {
                return '0'
              }
            },
          },
          data: [...mergeItem.map((e) => e.areaSalesAve)],
        },
      ],
    }

    option && myChart.setOption(option)

    window.addEventListener('resize', resizeChart)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
})
</script>

<style lang="scss" scoped></style>
