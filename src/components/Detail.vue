<template lang="pug">
  div.wx-detail
    div.btn-back
      i.icon-back(@click="$router.go(-1)")
      span(@click="$router.go(-1)") 返回
    div.tabs-content
      div.tabs-content-item(v-for="(item, index) in tabs" :key="index" @click="selectTab(item, index)" :class="{'active': item.active}")
        div.tabs-item-left
          i.icon-touxiang(:class="item.icon")
        div.tabs-item-right
          div.name {{item.name}}
          div.tabs-item-title
            span.title-left {{item.title[0]}}
            span.title-right {{item.title[1]}}
          div.tabs-item-content
            span {{item.detail}}
        div.tabs-active-line
    div.detail-content(v-show="currentStep == 0")
      div.echarts-content
        div#ageChart.age-chart.chart-item
        div#schoolChart.school-chart.chart-item
      div.list-content
        div.list-content-title 分发列表
        el-table(:data="list")
          el-table-column(prop="code", label="编号", width="56")
          el-table-column(prop="telephone", label="手机号", width="220")
          el-table-column(prop="name", label="姓名", width="99")
    div.echart-bottom-content(v-show="currentStep == 0")
      div.title 兴趣爱好
      div(style="overflow:hidden")
        div#oneChart.chart-bottom-item
        div#twoChart.chart-bottom-item
        div#threeChart.chart-bottom-item
        div#fourChart.chart-bottom-item
    div.product-type-content(v-show="currentStep == 0")
      div.title 产品类型推荐
      div.product-type-item(v-for="(list, index) in productTypes" :key="index" @click="selectProductType(list, index)" :class="{'active': list.active}")
        div.product-detail01(v-if="!list.active") {{list.value}}
        div.product-detail02(v-if="list.active")
          div.title {{list.value}}
          div.content
            el-radio(v-model="productValue" v-for="(item, i) in list.list" :key="item.key" :label="item.key") {{item.value}}
    div.theme-content(v-show="currentStep == 0")
      div.title 选择主题
      el-radio-group(v-model="selectedTheme")
        el-radio(:label="item.key" v-for="item in themes" :key="item.key") {{item.value}}
          img.theme-item-image(:src="item.img")
    div.btn-content(v-show="currentStep == 0")
      el-button(type="primary" @click="btnCreate") 一键生成
    i.el-icon-arrow-left(v-show="currentStep == 1" @click="btnOperation('prew')")
    i.el-icon-arrow-right(v-show="currentStep == 0 && imgurl" @click="btnOperation('next')")
    div.show-pic-content(v-show="currentStep == 1")
      div.pic-content-left(ref="imageWrapper")
        div.btn-upload-pic-logo
          label(for="uploadImage" v-if="!imgurl")
            i.icon-pic-btn-logo
            span 点击上传logo
            input#uploadImage.upload-input(
              type="file"
              title=""
              name="file"
              accept=".png"
              @change="uploadImage($event)"
              v-show="false"
            )
          img(:src="imgurl" v-if="imgurl" width="100%" height="40px")
        i.bg-img
        el-button(@click="downloadImg") 下载
      div.pic-content-right
        div.list-content-title 分发列表
        el-table(:data="list")
          el-table-column(prop="code", label="编号", width="56")
          el-table-column(prop="telephone", label="手机号", width="220")
          el-table-column(prop="name", label="姓名", width="99")
        el-button(@click="downloadFile") 下载
</template>
<script>
import {themes} from '../config'
import list from '../../mock/list.json'
import category from '../../mock/category.json'
import html2canvas from 'html2canvas'
export default {
  name: 'Detail',
  data () {
    return {
      themes,
      category,
      tabs: category.describeList,
      imgurl: '',
      dataURL: '',
      productValue: '',
      selectedTheme: '0',
      currentStep: 0,
      currentTab: '10'
    }
  },
  computed: {
    list () {
      let _list = list.filter(n => n.label === this.currentTab)
      return _list
    },
    productTypes () {
      return this.category.list[this.currentTab].productTypes || []
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    btnOperation (type) {
      if (type === 'prew') {
        this.currentStep = 0
      } else if (type === 'next') {
        this.currentStep = 1
      }
    },
    btnCreate () {
      this.currentStep = 1
    },
    selectProductType (item, index) {
      this.productTypes.forEach(val => { val.active = false })
      let _item = Object.assign({}, item, {
        active: !item.active
      })
      this.$set(this.productTypes, index, _item)
    },
    selectTab (item, index) {
      this.tabs.forEach(val => { val.active = false })
      let _item = Object.assign({}, item, {
        active: true
      })
      this.currentTab = item.id
      this.$set(this.tabs, index, _item)
      this.draw()
    },
    draw () {
      let currentCategory = this.category.list[this.currentTab]
      let ageChart = this.$echarts.init(document.getElementById('ageChart'))
      let schoolChart = this.$echarts.init(document.getElementById('schoolChart'))
      let oneChart = this.$echarts.init(document.getElementById('oneChart'))
      let twoChart = this.$echarts.init(document.getElementById('twoChart'))
      let threeChart = this.$echarts.init(document.getElementById('threeChart'))
      let fourChart = this.$echarts.init(document.getElementById('fourChart'))
      // 第一个图
      ageChart.setOption({
        title: {
          text: '年龄分布指数',
          textStyle: {
            fontSize: 16,
            color: '#4A4A4A'
          }
        },
        color: ['#46A8FF'],
        tooltip: {},
        xAxis: {
          data: currentCategory.ageText,
          name: '年龄'
        },
        yAxis: {
          name: 'TGI指数'
        },
        series: [{
          name: '年龄',
          type: 'bar',
          data: currentCategory.ageValue,
          barWidth: '30'
        }]
      })
      // 第二个图
      schoolChart.setOption({
        title: {
          text: '学历分布指数',
          textStyle: {
            fontSize: 16,
            color: '#4A4A4A'
          }
        },
        color: ['#46A8FF'],
        tooltip: {},
        xAxis: {
          data: currentCategory.schoolText,
          name: '年龄'
        },
        yAxis: {
          name: 'TGI指数'
        },
        series: [{
          name: '年龄',
          type: 'bar',
          data: currentCategory.schoolValue,
          barWidth: '30'
        }]
      })
      // 第三个图
      oneChart.setOption({
        title: {
          text: '商旅出行',
          textStyle: {
            fontSize: 16,
            color: '#4A4A4A'
          }
        },
        tooltip: {},
        xAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        yAxis: [
          {
            type: 'category',
            show: false,
            data: currentCategory.oneText
          }
        ],
        series: [
          {
            name: '年龄',
            type: 'bar',
            itemStyle: {
              normal: {
                color: (params) => {
                  if (params.data > 0) {
                    return '#46A8FF'
                  } else {
                    return '#6BCD48'
                  }
                },
                label: {
                  show: true,
                  position: 'right',
                  formatter: (params) => {
                    let tip = params.name + ' ' + Math.abs(params.data) + '%'
                    return tip
                  }
                }
              }
            },
            data: currentCategory.oneValue
          }
        ]
      })
      // 第四个图
      twoChart.setOption({
        title: {
          text: '市内出行',
          textStyle: {
            fontSize: 16,
            color: '#4A4A4A'
          }
        },
        tooltip: {},
        xAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        yAxis: [
          {
            type: 'category',
            show: false,
            data: currentCategory.twoText
          }
        ],
        series: [
          {
            name: '年龄',
            type: 'bar',
            itemStyle: {
              normal: {
                color: (params) => {
                  if (params.data > 0) {
                    return '#46A8FF'
                  } else {
                    return '#6BCD48'
                  }
                },
                label: {
                  show: true,
                  position: 'right',
                  formatter: (params) => {
                    let tip = params.name + ' ' + Math.abs(params.data) + '%'
                    return tip
                  }
                }
              }
            },
            data: currentCategory.twoValue
          }
        ]
      })
      // 第五个图
      threeChart.setOption({
        title: {
          text: '生活方式',
          textStyle: {
            fontSize: 16,
            color: '#4A4A4A'
          }
        },
        tooltip: {},
        xAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        yAxis: [
          {
            type: 'category',
            show: false,
            data: currentCategory.threeText
          }
        ],
        series: [
          {
            name: '年龄',
            type: 'bar',
            itemStyle: {
              normal: {
                color: (params) => {
                  if (params.data > 0) {
                    return '#46A8FF'
                  } else {
                    return '#6BCD48'
                  }
                },
                label: {
                  show: true,
                  position: 'right',
                  formatter: (params) => {
                    let tip = params.name + ' ' + Math.abs(params.data) + '%'
                    return tip
                  }
                }
              }
            },
            data: currentCategory.threeValue
          }
        ]
      })
      fourChart.setOption({
        title: {
          text: '关注领域',
          textStyle: {
            fontSize: 16,
            color: '#4A4A4A'
          }
        },
        tooltip: {},
        xAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        yAxis: [
          {
            type: 'category',
            show: false,
            data: currentCategory.fourText
          }
        ],
        series: [
          {
            name: '年龄',
            type: 'bar',
            itemStyle: {
              normal: {
                color: (params) => {
                  if (params.data > 0) {
                    return '#46A8FF'
                  } else {
                    return '#6BCD48'
                  }
                },
                label: {
                  show: true,
                  position: 'right',
                  formatter: (params) => {
                    let tip = params.name + ' ' + Math.abs(params.data) + '%'
                    return tip
                  }
                }
              }
            },
            data: currentCategory.fourValue
          }
        ]
      })
    },
    uploadImage (e) {
      if (e.target.files[0]) {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (e) => {
          this.imgurl = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    downloadFile () {
      window.open('http://poster.zhangxinyao.xyz/数据.xlsx', '_blank')
    },
    downloadImg () {
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null
      }).then((canvas) => {
        let dataURL = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataURL
        a.setAttribute('download', 'chart-download')
        a.click()
      })
    }
  },
  components: {
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .wx-detail{
    width: 100%;
    .btn-back{
      font-size: 20px;
      color: #4A4A4A;
      margin: 16px 0;
      .icon-back,
      span{
        cursor: pointer;
      }
      .icon-back{
        background: url('../assets/images/icon-back.png') no-repeat;
        background-size: 20px 20px;
        width: 24px;
        height: 24px;
        display: inline-block;
        background-position: center;
        float: left;
        margin-top: 2px;
      }
    }
    .tabs-content{
      overflow: hidden;
      border-radius: 4px;
      background: #FFFFFF;
      box-shadow: 0 0 6px 0 rgba(0,127,255,0.12);
      padding: 10px 0;
      .tabs-content-item{
        width: 399px;
        height: 165px;
        float: left;
        cursor: pointer;
        position: relative;
        border-right: 1px solid #DDD;
        &:last-child{
          border-right: none;
        }
        &.active{
          .tabs-active-line{
            width: 100%;
            height: 4px;
            background-color: #FFAE16;
            position: absolute;
            bottom: 0;
            left: 0;
            margin-bottom: -10px;
          }
        }
        .tabs-item-left{
          position: absolute;
          width: 104px;
          height: 165px;
          left: 0;
          top: 0;
          .icon-touxiang{
            display: inline-block;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background-size: 60px 60px;
            background-repeat: no-repeat;
            margin-left: 24px;
            margin-top: 26px;
            &.icon-touxiang01{
              background: url('../assets/images/icon-touxiang01.png');
            }
            &.icon-touxiang02{
              background: url('../assets/images/icon-touxiang02.png');
            }
            &.icon-touxiang03{
              background: url('../assets/images/icon-touxiang03.png');
            }
          }

        }
        .tabs-item-right{
          height: 165px;
          padding: 0 22px 0 104px;
          .name{
            font-family: 'PingFangSC-Regular';
            font-size: 14px;
            color: #9B9B9B;
            margin-top: 19px;
          }
          .tabs-item-title{
            overflow: hidden;
            font-family: 'PingFangSC-Medium';
            font-size: 16px;
            color: #4A4A4A;
            margin-top: 8px;
            .title-left{
              float: left;
            }
            .title-right{
              float: right;
            }
          }
          .tabs-item-content{
            margin-top: 16px;
            font-family: 'PingFangSC-Regular';
            font-size: 14px;
            color: #9B9B9B;
          }
        }
      }
    }
    .detail-content{
      margin-top: 16px;
      overflow: hidden;
      .echarts-content{
        float: left;
        width: 800px;
        margin-right: 24px;
        .chart-item{
          background: #FFFFFF;
          box-shadow: 0 0 6px 0 rgba(0,127,255,0.12);
          border-radius: 4px;
        }
        .age-chart,
        .school-chart{
          height: 320px;
          padding: 24px;
          margin-bottom: 16px;
        }
      }
      .list-content{
        width: 375px;
        height: 752px;
        float: left;
        background-color: #FFF;
        box-shadow: 0 0 6px 0 rgba(0,127,255,0.12);
        border-radius: 4px;
        .list-content-title{
          height: 64px;
          font-family: 'PingFangSC-Medium';
          font-size: 16px;
          color: #4A4A4A;
          letter-spacing: 0;
          line-height: 64px;
          text-indent: 24px;
        }
        .el-table{
          .el-table__header{
            th{
              background: #FAFAFA;
              font-family: 'PingFangSC-Medium';
              font-size: 14px;
              color: #4A4A4A;
              text-align: center;
            }
          }
          .cell{
            text-align: center;
          }
          .el-table__body-wrapper{
            height: 640px;
            overflow-y: auto;
          }
        }
      }
    }
    .echart-bottom-content{
      background-color: #FFF;
      box-shadow: 0 0 6px 0 rgba(0,127,255,0.12);
      border-radius: 4px;
      .title{
        height: 62px;
        line-height: 62px;
        font-family: 'PingFangSC-Medium';
        font-size: 16px;
        color: #4A4A4A;
        text-indent: 24px;
        border-bottom: 1px solid #DDD;
      }
      .chart-bottom-item{
        width: 25%;
        height: 285px;
        float: left;
        padding: 24px;
        box-sizing: border-box;
        border-right: 1px solid #DDD;
        &:last-child{
          border-right: none;
        }
      }
    }
    .product-type-content{
      background-color: #FFF;
      margin-top: 16px;
      overflow: hidden;
      .title{
        height: 62px;
        line-height: 62px;
        font-family: 'PingFangSC-Medium';
        font-size: 16px;
        color: #4A4A4A;
        text-indent: 24px;
      }
      .product-type-item{
        float: left;
        margin: 0 8px;
        width: 384px;
        height: 200px;
        box-sizing: border-box;
        border: 1px solid #DDD;
        cursor: pointer;
        &:last-child{
          margin-right: 0;
        }
        .product-detail01{
          height: 200px;
          line-height: 200px;
          text-align: center;
        }
        .product-detail02{
          .el-radio{
            display: block;
            margin-left: 30px;
            margin-bottom: 10px;
          }
        }
      }
    }
    .theme-content{
      margin-top: 16px;
      background-color: #FFF;
      padding-bottom: 20px;
      .title{
        height: 62px;
        line-height: 62px;
        font-family: 'PingFangSC-Medium';
        font-size: 16px;
        color: #4A4A4A;
        text-indent: 24px;
      }
      .el-radio-group{
        width: 100%;
        .el-radio{
          width: 180px;
          height: 60px;
          margin-left: 16px;
          border-radius: 4px;
          border: 1px solid #DDD;
          float: left;
          text-indent: 40px;
          position: relative;
          box-sizing: border-box;
          .el-radio__input{
            display: none;
          }
          .el-radio__input.is-checked+.el-radio__label{
            color: #5D6977;
          }
          .el-radio__label{
            font-size: 18px;
            color: #5D6977;
            font-family: 'PingFangSC-Regular';
          }
          &.is-checked{
            border: 2px solid #FFAE16;
            background: url('../assets/images/icon-btn-checked.png') no-repeat;
            background-size: 25px 23px;
            background-position: right bottom;
          }
        }
        .el-radio__label{
          line-height: 60px;
          .theme-item-image{
            float: left;
            width: 40px;
            height: 40px;
            margin: 10px;
          }
        }
      }
    }
    .btn-content{
      margin-top: 46px;
      text-align: center;
      .el-button{
        width: 320px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        background-image: linear-gradient(-270deg, #FF9105 0%, #FFCC02 100%);
        border-radius: 24px;
        font-family: 'PingFangSC-Semibold';
        font-size: 18px;
        color: #FFFFFF;
        border: none;
        padding: 0;
      }
    }
    .show-pic-content{
      width: 800px;
      height: 1000px;
      margin: 15px auto;
      position: relative;
      .pic-content-left{
        width: 375px;
        height: 800px;
        position: relative;
        float: left;
        .btn-upload-pic-logo{
          position: relative;
          height: 55px;
          line-height: 55px;
          font-family: 'PingFangSC-Regular';
          font-size: 16px;
          color: #5D6977;
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          .icon-pic-btn-logo{
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url('../assets/images/icon-btn-add.png') no-repeat;
            background-size: 20px 20px;
            margin: 18px 15px 18px 18px;
            float: left;
            cursor: pointer;
          }
          span{
            cursor: pointer;
          }
        }
        .bg-img{
          display: block;
          width: 375px;
          height: 800px;
          background: url('../assets/images/poster/poster01.png') no-repeat;
          background-size: 375px auto;
        }
      }
      .pic-content-right{
        width: 375px;
        height: 800px;
        float: right;
        background-color: #FFF;
        .list-content-title{
          height: 64px;
          font-family: 'PingFangSC-Medium';
          font-size: 16px;
          color: #4A4A4A;
          letter-spacing: 0;
          line-height: 64px;
          text-indent: 24px;
        }
        .el-table{
          .el-table__header{
            th{
              background: #FAFAFA;
              font-family: 'PingFangSC-Medium';
              font-size: 14px;
              color: #4A4A4A;
              text-align: center;
            }
          }
          .cell{
            text-align: center;
          }
          .el-table__body-wrapper{
            overflow-y: auto;
            height: 688px;
          }
        }
      }
    }
    .el-icon-arrow-left,
    .el-icon-arrow-right{
      position: absolute;
      font-size: 80px;
      top: 400px;
      color: #666;
    }
    .el-icon-arrow-left{
      left: 0;
    }
    .el-icon-arrow-right{
      right: 0;
      margin-right: -80px;
    }
  }
</style>
