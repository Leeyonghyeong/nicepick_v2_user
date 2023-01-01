<template>
  <section style="height: 100%">
    <article
      v-if="
        brandAreaSaleStatus.length > 0 &&
        brandAreaSaleStatus.filter((e) =>
          parseInt(e.salesAve.replace(/,/g, ''))
        ).length > 0
      "
      ref="chartElement"
      :style="{ height: `${height}px`, paddingTop: '20px' }"
    ></article>
    <EmptyChart v-else />
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
import { Arrayable } from '@unhead/vue'
import EmptyChart from './EmptyChart.vue'
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
      (e) =>
        e.year === maxYear &&
        e.location !== '전체' &&
        parseInt(e.salesAve.replace(/,/g, '')) > 0
    )

    const allLocationItem = _brandAreaSalesStatueItem.filter(
      (e) => e.year === maxYear && e.location === '전체'
    )

    filterItem.sort((a, b) => (a.location < b.location ? -1 : 0))

    const mergeItem = allLocationItem
    mergeItem.push(...filterItem)

    filterItem.sort((a, b) =>
      parseInt(a.salesAve.replace(/,/g, '')) >
      parseInt(b.salesAve.replace(/,/g, ''))
        ? -1
        : 0
    )

    const maxSalseLocation: BrandAreaSalesAve = filterItem[0]

    const legendData: string[] = maxSalseLocation
      ? ['전체 평균 매출', `평균 매출 최대 지역: ${maxSalseLocation.location}`]
      : ['전체 평균 매출']

    const data: Arrayable<BarSeriesOption> = mergeItem.map((e) => {
      return {
        name:
          e.location === '전체'
            ? '전체 평균 매출'
            : e.location === maxSalseLocation.location
            ? `평균 매출 최대 지역: ${maxSalseLocation.location}`
            : e.location,
        type: 'bar',
        barGap: 0.5,
        barMaxWidth: 20,
        itemStyle: {
          borderRadius: [50, 50, 0, 0],
        },
        color:
          e.location === '전체'
            ? '#A489F0'
            : e.location === maxSalseLocation.location
            ? '#75D6FF'
            : '#BCBCBC',
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
        data: [parseInt(e.salesAve.replace(/,/g, ''))],
      }
    })

    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        data: legendData,
        icon: 'circle',
        show: true,
      },
      xAxis: {
        type: 'category',
        axisTick: { show: true },
        data: [maxYear],
      },
      yAxis: {
        type: 'value',
      },
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [...data],
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
