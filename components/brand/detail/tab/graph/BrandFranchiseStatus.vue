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
import { BrandFranchiseStatus } from '~~/types/brand'

const props = defineProps<{
  brandFranchiseStatus: BrandFranchiseStatus[]
  height: number
}>()

const brandFranchiseStatusItem = ref<BrandFranchiseStatus[]>(
  props.brandFranchiseStatus
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

    const _brandFranChiseStatusItem: BrandFranchiseStatus[] =
      brandFranchiseStatusItem.value

    const _brandFranChiseStatusItemFilter = _brandFranChiseStatusItem.filter(
      (e) => e.location === '전체'
    )

    _brandFranChiseStatusItemFilter.sort((a, b) => (a.year < b.year ? -1 : 0))

    const year: number[] = _brandFranChiseStatusItemFilter.map((e) => e.year)

    const _allCount: number[] = _brandFranChiseStatusItemFilter.map(
      (e) => e.allCount
    )

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['가맹점 및 직영점 수'],
        icon: 'circle',
      },
      xAxis: {
        type: 'category',
        axisTick: { show: true },
        data: [...year],
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
          name: '가맹점 및 직영점 수',
          type: 'bar',
          barWidth: '10%',
          color: '#FF9264',
          emphasis: {
            focus: 'series',
          },
          tooltip: {
            valueFormatter: (value) => value + ' 개',
          },
          data: [..._allCount],
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
