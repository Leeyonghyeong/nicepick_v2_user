<template>
  <section style="height: 100%">
    <article
      v-if="brandChangeStatus.length > 0"
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
import { BrandChangeStatus } from '~~/types/brand'

const props = defineProps<{
  brandChangeStatus: BrandChangeStatus[]
  height: number
}>()

const brandChangeStatusItem = ref<BrandChangeStatus[]>(props.brandChangeStatus)
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

    const _brandChangeStatusItem = brandChangeStatusItem.value

    _brandChangeStatusItem.sort((a, b) => (a.year < b.year ? -1 : 0))

    const _newShopData = _brandChangeStatusItem.map((e) => {
      return {
        year: e.year,
        count: e.newShopCount,
      }
    })

    const _terminationData = _brandChangeStatusItem.map((e) => {
      return {
        year: e.year,
        count: e.terminationCount,
      }
    })

    const _cancelData = _brandChangeStatusItem.map((e) => {
      return {
        year: e.year,
        count: e.cancelCount,
      }
    })

    const _changeData = _brandChangeStatusItem.map((e) => {
      return {
        year: e.year,
        count: e.changeCount,
      }
    })

    const year: number[] = _brandChangeStatusItem.map((e) => e.year)

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#191919',
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        data: ['신규개점', '계약종료', '계약해지', '명의변경'],
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
          name: '신규개점',
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            borderRadius: [50, 50, 0, 0],
          },
          color: '#74A3FF',
          emphasis: {
            focus: 'series',
          },
          tooltip: {
            valueFormatter: (value) => value + ' 개',
          },
          data: [..._newShopData.map((e) => e.count)],
        },
        {
          name: '계약종료',
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            borderRadius: [50, 50, 0, 0],
          },
          color: '#7DE39A',
          emphasis: {
            focus: 'series',
          },
          tooltip: {
            valueFormatter: (value) => value + ' 개',
          },
          data: [..._terminationData.map((e) => e.count)],
        },
        {
          name: '계약해지',
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            borderRadius: [50, 50, 0, 0],
          },
          color: '#FFE071',
          emphasis: {
            focus: 'series',
          },
          tooltip: {
            valueFormatter: (value) => value + ' 개',
          },
          data: [..._cancelData.map((e) => e.count)],
        },
        {
          name: '명의변경',
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            borderRadius: [50, 50, 0, 0],
          },
          color: '#FFA2A2',
          emphasis: {
            focus: 'series',
          },
          tooltip: {
            valueFormatter: (value) => value + ' 개',
          },
          data: [..._changeData.map((e) => e.count)],
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
