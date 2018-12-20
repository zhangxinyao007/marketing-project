<template lang="pug">
  div.wx-detail
    div
      i.el-icon-arrow-left(@click="$router.go(-1)")
      span 返回
    div.title 命中群体
    div.tabs-content
      div.tabs-content-item(v-for="(item, index) in tabs" :key="index")
        div.tabs-item-title
          span.title-left {{item.title[0]}}
          span.title-right {{item.title[1]}}
        div.tabs-item-content
          strong 群体简介：
          span {{item.detail}}
    div#myChart(style="width: 500px;height: 300px")
</template>
<script>
// import themes from '../config'
export default {
  name: 'Detail',
  data () {
    return {
      tabs: [
        {
          title: ['10号群体：刚毕业的白领', '60%'],
          detail: '我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介'
        },
        {
          title: ['10号群体：刚毕业的白领', '60%'],
          detail: '我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介'
        },
        {
          title: ['10号群体：刚毕业的白领', '60%'],
          detail: '我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介我是群体简介'
        }
      ]
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  },
  components: {
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .wx-detail{
    margin: 10px auto;
    width: 1000px;
    .tabs-content{
      overflow: hidden;
      .tabs-content-item{
        width: 300px;
        height: 200px;
        border: 1px solid #ccc;
        border-radius: 5px;
        float: left;
        margin-right: 10px;
        cursor: pointer;
        .tabs-item-title{
          overflow: hidden;
          padding: 10px;
          .title-left{
            float: left;
          }
          .title-right{
            float: right;
          }
        }
        .tabs-item-content{
          padding: 10px;
        }
      }
    }
  }
</style>
