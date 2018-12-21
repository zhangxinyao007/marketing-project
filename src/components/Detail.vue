<template lang="pug">
  div.wx-detail
    div(@click="$router.go(-1)" style="cursor: pointer")
      i.el-icon-arrow-left
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
    el-row
      el-col(:span="12")
        div 群体分布指数
        div#ageChart(style="width: 100%;height: 300px")
        div#schoolChart(style="width: 100%;height: 300px")
        div 兴趣爱好
        el-row(:span="24")
          el-col(:span="12")
            div#oneChart(style="width: 100%;height: 200px")
            div#twoChart(style="width: 100%;height: 200px")
          el-col(:span="12")
            div#threeChart(style="width: 100%;height: 200px")
            div#fourChart(style="width: 100%;height: 200px")
      el-col(:span="12")
        div 营销海报
        div(style="width:100%;height:500px;border:1px solid #ccc" ref="imageWrapper")
          label.btn-upload-input(for="uploadInput" v-if="!imgurl") 点击上传logo
          img.img-show(:src="imgurl" v-if="imgurl" download :href="imgurl")
          img(:src="imgurl" width="200px" height="200px")
          input#uploadInput.upload-input(
            type="file"
            title=""
            name="file"
            accept=".xls,.xlsx,.jpg"
            @change="uploadFile($event)"
            )
    el-row
      el-button(@click="download") 一键下载
      img(:src="dataURL")
</template>
<script>
// import themes from '../config'
import html2canvas from 'html2canvas'
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
      ],
      imgurl: '',
      dataURL: ''
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let ageChart = this.$echarts.init(document.getElementById('ageChart'))
      let schoolChart = this.$echarts.init(document.getElementById('schoolChart'))
      let oneChart = this.$echarts.init(document.getElementById('oneChart'))
      let twoChart = this.$echarts.init(document.getElementById('twoChart'))
      let threeChart = this.$echarts.init(document.getElementById('threeChart'))
      let fourChart = this.$echarts.init(document.getElementById('fourChart'))
      ageChart.setOption({
        title: { text: '年龄分布指数' },
        color: ['#ccc'],
        tooltip: {},
        xAxis: {
          data: ['18-22', '23-26', '27-30', '31-35', '36-40', '41-45', '46-50', '51-55']
        },
        yAxis: {},
        series: [{
          name: '年龄',
          type: 'bar',
          data: [138, 233, 210, 143, 1, 2, 10, 40]
        }]
      })
      schoolChart.setOption({
        title: { text: '年龄分布指数' },
        color: ['#ccc'],
        tooltip: {},
        xAxis: {
          data: ['初中及以下', '高中', '大专', '本科', '研究生及以上']
        },
        yAxis: {},
        series: [{
          name: '年龄',
          type: 'bar',
          data: [138, 233, 210, 143, 45]
        }]
      })
      oneChart.setOption({
        title: { text: '商旅出行' },
        color: ['#ccc'],
        tooltip: {},
        xAxis: {},
        yAxis: {
          data: ['飞机', '火车', '长途汽车', '租车']
        },
        series: [{
          name: '年龄',
          type: 'bar',
          data: [138, 233, 210, 143]
        }]
      })
      twoChart.setOption({
        title: { text: '市内出行' },
        color: ['#ccc'],
        tooltip: {},
        xAxis: {},
        yAxis: {
          data: ['公共交通', '出租车', '代驾']
        },
        series: [{
          name: '年龄',
          type: 'bar',
          data: [138, 233, 210]
        }]
      })
      threeChart.setOption({
        title: { text: '生活方式' },
        color: ['#ccc'],
        tooltip: {},
        xAxis: {},
        yAxis: {
          data: ['飞机', '火车', '长途汽车', '租车']
        },
        series: [{
          name: '年龄',
          type: 'bar',
          data: [138, 233, 210, 143]
        }]
      })
      fourChart.setOption({
        title: { text: '关注领域' },
        color: ['#ccc'],
        tooltip: {},
        xAxis: {},
        yAxis: {
          data: ['关注车', '关注房']
        },
        series: [{
          name: '年龄',
          type: 'bar',
          data: [138, 233]
        }]
      })
    },
    uploadFile (e) {
      if (e.target.files[0]) {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (e) => {
          this.imgurl = e.target.result
          localStorage.setItem('imgurl', this.imgurl)
        }
        reader.readAsDataURL(file)
      }
    },
    download () {
      window.open('http://marketing.zhangxinyao.xyz/xiazai.xlsx', '_blank')
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null
      }).then((canvas) => {
        let dataURL = canvas.toDataURL('image/png')
        this.dataURL = dataURL
        console.log('=======', this.dataURL)
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
    width: 1200px;
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
    .btn-upload-input{
      display: inline-block;
      width: 200px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      border: 1px solid #CCC;
      margin: 10px;
      cursor: pointer;
    }
    .upload-input{
      display: none;
    }
    .img-show{
      display: inline-block;
      width: 200px;
      height: 100px;
      margin: 10px;
    }
  }
</style>
