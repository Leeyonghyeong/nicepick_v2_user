<template>
  <section style="height: 100%">
    <article
      v-if="brandFinanceStatus.length > 0"
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
import EmptyChart from './EmptyChart.vue'
import { BrandFinanceStatus } from '~~/types/brand'
import { calcPrice } from '~/function/common'

const props = defineProps<{
  brandFinanceStatus: BrandFinanceStatus[]
  height: number
}>()

const brandFinanceStatusItem = ref<BrandFinanceStatus[]>(
  props.brandFinanceStatus
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

//   year: 연도
//   asset: 자산
//   liability: 부채
//   equity: 자본
//   sales: 매출액
//   operatingIncome: 영업이익
//   netIncome: 당기순수익

onMounted(() => {
  if (chartElement.value) {
    const chartDom = chartElement.value
    myChart = echarts.init(chartDom)

    const _brandFinanceStatusItem: BrandFinanceStatus[] =
      brandFinanceStatusItem.value

    _brandFinanceStatusItem.sort((a, b) => (a.year < b.year ? -1 : 0))

    const year: number[] = _brandFinanceStatusItem.map((e) => e.year)

    const _asset: number[] = _brandFinanceStatusItem.map((e) =>
      parseInt(e.asset.replace(/,/g, ''))
    )

    const _equity: number[] = _brandFinanceStatusItem.map((e) =>
      parseInt(e.equity.replace(/,/g, ''))
    )

    const _liability: number[] = _brandFinanceStatusItem.map((e) =>
      parseInt(e.liability.replace(/,/g, ''))
    )

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#191919',
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        data: ['자산', '자본', '부채'],
        icon: 'circle',
        textStyle: {
          fontWeight: 600,
        },
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
          name: '자산',
          type: 'bar',
          barGap: 0.5,
          barMaxWidth: 20,
          color: '#15AF79',
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
          data: [
            ..._asset.map((e) => {
              return {
                value: e,
                itemStyle: {
                  borderRadius: e > 0 ? [50, 50, 0, 0] : [0, 0, 50, 50],
                },
              }
            }),
          ],
        },
        {
          name: '자본',
          type: 'bar',
          barGap: 0.5,
          barMaxWidth: 20,
          color: '#5C64B7',
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
          data: [
            ..._equity.map((e) => {
              return {
                value: e,
                itemStyle: {
                  borderRadius: e > 0 ? [50, 50, 0, 0] : [0, 0, 50, 50],
                },
              }
            }),
          ],
        },
        {
          name: '부채',
          type: 'bar',
          barGap: 0.5,
          barMaxWidth: 20,
          color: '#bcbcbc',
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
          data: [
            ..._liability.map((e) => {
              return {
                value: e,
                itemStyle: {
                  borderRadius: e > 0 ? [50, 50, 0, 0] : [0, 0, 50, 50],
                },
              }
            }),
          ],
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
