<!-- 粉丝管理 -->
<template>
 <div class="fans-container">
    <div id="fansChart" ref="fansChart" style="width: 600px;height:400px;"></div>
    <map-demo />
 </div>
</template>

<script>
import MapDemo from './components/map-demo.vue'
export default {
  name: 'FansIndex',
  components: {
    MapDemo
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.echartsInit()
      })
    })
  },
  methods: {
    echartsInit () {
      var fansChart = this.$echarts.init(this.$refs.fansChart)
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      fansChart.setOption(option)
    }
  }
}

</script>

<style lang='less' scoped>

</style>
