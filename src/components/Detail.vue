<template lang="pug">
  div.wx-detail
    div.btn-back
      i.icon-back(@click="$router.go(-1)")
      span(@click="$router.go(-1)") 返回
    div.tabs-content
      div.tabs-content-item(v-for="(item, index) in tabs" :key="index" @click="selectTab(item)" :class="{'active': item.active}")
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
    div.detail-content
      div.echarts-content
        div#ageChart.age-chart.chart-item
        div#schoolChart.school-chart.chart-item
      div.list-content
        div.list-content-title 分发列表
        el-table(:data="list")
          el-table-column(prop="code", label="编号", width="56")
          el-table-column(prop="tel", label="手机号", width="99")
          el-table-column(prop="name", label="姓名", width="221")
    div.echart-bottom-content
      div.title 兴趣爱好
      div(style="overflow:hidden")
        div#oneChart.chart-bottom-item
        div#twoChart.chart-bottom-item
        div#threeChart.chart-bottom-item
        div#fourChart.chart-bottom-item
    div.product-type-content
      div.title 产品类型推荐
      div.product-type-item(v-for="(list, index) in productTypes" :key="index" @click="selectProductType(list)" :class="{'active': list.active}")
        div.product-detail01 {{list.value}}
        div.product-detail02(style="display: none")
          div.title {{list.value}}
          div.content
            el-radio(v-model="productValue" v-for="(item, i) in list" :key="i" :label="item.key") {{item.value}}
    div.title 选择主题
      el-radio-group(v-model="selectedTheme")
        i.el-icon-arrow-down
        el-radio-button(:label="item.key" v-for="item in themes" :key="item.key") {{item.value}}
    div.btn-content
      el-button(type="primary" @click="btnSubmit") 生成
</template>
<script>
import themes from '../config'
import html2canvas from 'html2canvas'
export default {
  name: 'Detail',
  data () {
    return {
      themes,
      tabs: [
        {
          name: '10号群体',
          title: ['刚毕业的白领', '60%'],
          active: true,
          icon: 'icon-touxiang01',
          detail: '年龄在23-35岁之间，学历均在本科及以上。工作时间短，财富积累较少，普遍没有房产车产，但有很强的消费需求。'
        },
        {
          name: '16号群体',
          title: ['有一定积蓄的公司管理层', '60%'],
          icon: 'icon-touxiang02',
          detail: '年龄在23-35岁之间，学历均在本科及以上。工作时间短，财富积累较少，普遍没有房产车产，但有很强的消费需求。'
        },
        {
          name: '24号群体',
          title: ['都市休闲老人', '60%'],
          icon: 'icon-touxiang03',
          detail: '年龄在23-35岁之间，学历均在本科及以上。工作时间短，财富积累较少，普遍没有房产车产，但有很强的消费需求。'
        }
      ],
      productTypes: [
        {
          'value': '信用卡',
          'list': [
            {
              'key': '1',
              'value': '信用卡1'
            },
            {
              'key': '2',
              'value': '信用卡2'
            },
            {
              'key': '3',
              'value': '信用卡3'
            }
          ]
        },
        {
          'value': '小额现金贷',
          'list': [
            {
              'key': '1',
              'value': '小额现金贷1'
            },
            {
              'key': '2',
              'value': '小额现金贷2'
            },
            {
              'key': '3',
              'value': '小额现金贷3'
            }
          ]
        },
        {
          'value': '无抵押贷款',
          'list': [
            {
              'key': '1',
              'value': '无抵押贷款1'
            },
            {
              'key': '2',
              'value': '无抵押贷款2'
            },
            {
              'key': '3',
              'value': '无抵押贷款3'
            }
          ]
        }
      ],
      list: [],
      imgurl: '',
      dataURL: '',
      productValue: '',
      selectedTheme: '0'
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    selectProductType (item) {
      console.log(item)
    },
    selectTab (item) {
      this.tabs.forEach(val => {
        val.active = false
      })
      item.active = true
    },
    draw () {
      let ageChart = this.$echarts.init(document.getElementById('ageChart'))
      let schoolChart = this.$echarts.init(document.getElementById('schoolChart'))
      let oneChart = this.$echarts.init(document.getElementById('oneChart'))
      let twoChart = this.$echarts.init(document.getElementById('twoChart'))
      let threeChart = this.$echarts.init(document.getElementById('threeChart'))
      let fourChart = this.$echarts.init(document.getElementById('fourChart'))
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
          data: ['18-22', '23-26', '27-30', '31-35', '36-40', '41-45', '46-50', '51-55'],
          name: '年龄'
        },
        yAxis: {
          name: 'TGI指数'
        },
        series: [{
          name: '年龄',
          type: 'bar',
          data: [138, 233, 210, 143, 1, 2, 10, 40],
          barWidth: '30'
        }]
      })
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
          data: ['初中及以下', '高中', '大专', '本科', '研究生及以上'],
          name: '年龄'
        },
        yAxis: {
          name: 'TGI指数'
        },
        series: [{
          name: '年龄',
          type: 'bar',
          data: [138, 233, 210, 143, 45],
          barWidth: '30'
        }]
      })
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
            data: ['飞机', '火车', '长途汽车', '租车']
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
            data: [50, 22, -23, -17]
          }
        ]
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
    // .btn-upload-input{
    //   display: inline-block;
    //   width: 200px;
    //   height: 100px;
    //   line-height: 100px;
    //   text-align: center;
    //   border: 1px solid #CCC;
    //   margin: 10px;
    //   cursor: pointer;
    // }
    // .upload-input{
    //   display: none;
    // }
    // .img-show{
    //   display: inline-block;
    //   width: 200px;
    //   height: 100px;
    //   margin: 10px;
    // }
  }
</style>
