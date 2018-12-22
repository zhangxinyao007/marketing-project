<template lang="pug">
  div.wx-index
    div.upload-file-content
      div.title 上传文件
      div.upload-content
        div.tips-one
          label(for="uploadInput" v-if="!fileName")
            i.icon-upload-file
          i.icon-upload-excel(v-if="fileName")
        div.tips-two(v-if="!fileName") 拖拽至该网页上传 或
          label.btn-upload-input(for="uploadInput") 点击上传
        div.tips-three(v-if="!fileName") (支持 csv,xlsx 格式)
        input#uploadInput.upload-input(
          type="file"
          title=""
          name="file"
          accept=".xls,.xlsx,.csv"
          @change="uploadFile($event)"
          v-if="!fileName"
          )
        div.file-name(v-if="fileName") {{fileName}}
        i.el-icon-close(@click="clearFile" v-if="fileName")
    div.btn-content
      el-button(type="primary" @click="btnSubmit" :disabled="!fileName") 生成
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      fileName: this.$route.query.filename || ''
    }
  },
  methods: {
    uploadFile (e) {
      if (e.target.files[0]) {
        this.fileName = e.target.files[0].name
        this.$router.push({name: 'Index', query: {filename: this.fileName}})
      }
    },
    clearFile () {
      this.fileName = ''
      this.$router.push({name: 'Index', query: {}})
    },
    btnSubmit () {
      this.$router.push({name: 'Detail', query: {filename: this.fileName}})
    }
  },
  components: {
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .wx-index{
    width: 100%;
    .upload-file-content{
      padding-top: 32px;
      .title{
        font-family: 'PingFangSC-Medium';
        font-size: 24px;
        color: #4A4A4A;
        margin-bottom: 16px;
      }
      .upload-content{
        width: 100%;
        height: 320px;
        border: 1px dotted #B1C5D8;
        border-radius: 4px;
        text-align: center;
        position: relative;
        background-color: #FFF;
        .tips-one{
          margin-top: 95px;
          .icon-upload-file{
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url('../assets/images/icon-upload-file.png') no-repeat;
            background-size: 30px 30px;
            cursor: pointer;
          }
          .icon-upload-excel{
            display: inline-block;
            width: 53px;
            height: 64px;
            background: url('../assets/images/icon-upload-excel.png') no-repeat;
            background-size: 53px 64px;
            cursor: pointer;
          }
        }
        .tips-two{
          margin-top: 26px;
          font-size: 16px;
          color: #4A4A4A;
          .btn-upload-input{
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .tips-three{
          margin-top: 8px;
          font-size: 14px;
          color: #9B9B9B;
        }
        .upload-input{
          display: none;
        }
        .file-name{
          font-size: 18px;
          color: #4A4A4A;
          margin-top: 24px;
        }
        .el-icon-close{
          position: absolute;
          font-size: 14px;
          top: 20px;
          right: 20px;
          cursor: pointer;
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
  }
</style>
