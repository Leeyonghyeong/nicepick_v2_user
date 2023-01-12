<template>
  <section>
    <article ref="chartElement" class="graph"></article>
  </section>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
} from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { Arrayable } from '@unhead/vue'
import { ChartData } from '~/types/chart'

const props = defineProps<{
  chartData: ChartData[]
}>()

const chartElement = ref<HTMLDivElement | null>(null)

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | BarSeriesOption
>

let myChart: echarts.ECharts

const makeChart = () => {
  if (chartElement.value) {
    const data: Arrayable<BarSeriesOption> = props.chartData.map((e) => {
      return {
        type: 'bar',
        name: e.name,
        barGap: 0.5,
        barWidth: 20,
        color: e.color,
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
        },
        emphasis: {
          focus: 'series',
        },
        tooltip: {
          valueFormatter: (value) => value.toLocaleString() + ' 개',
        },
        data: [e.value],
      }
    })

    const chartDom = chartElement.value
    myChart = echarts.init(chartDom)

    const option: EChartsOption = {
      tooltip: {
        show: false,
      },
      xAxis: {
        type: 'category',
        data: [
          {
            value: '매장수',
          },
        ],
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        show: false,
      },
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [...data],
    }

    option && myChart.setOption(option)

    window.addEventListener('resize', resizeChart)
  }
}

const resizeChart = () => {
  if (myChart) {
    myChart.resize()
  }
}

watch(
  () => props.chartData,
  () => {
    if (myChart) {
      myChart.dispose()
      makeChart()
    }
  }
)

onMounted(() => {
  makeChart()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
})
</script>

<style lang="scss" scoped>
section {
  height: 100%;
  width: 100%;

  .graph {
    width: 100%;
    height: 280px;
  }
}
</style>
