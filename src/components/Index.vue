<template lang="pug">
  div.wx-index
    div.title 上传文件
    div.upload-content
      div.tips-one
        i.el-icon-upload
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
    div.title 选择主题
    el-radio-group(v-model="selectedTheme")
      el-radio-button(:label="item.key" v-for="item in themes" :key="item.key") {{item.value}}
    div.btn-content
      el-button(type="primary" @click="btnSubmit") 生成
</template>
<script>
import themes from '../config'
export default {
  name: 'Index',
  data () {
    return {
      fileName: '',
      themes,
      selectedTheme: '0'
    }
  },
  methods: {
    uploadFile (e) {
      if (e.target.files[0]) {
        this.fileName = e.target.files[0].name
      }
    },
    clearFile () {
      this.fileName = ''
    },
    btnSubmit () {
      this.$router.push({name: 'Detail', query: {selectedTheme: this.selectedTheme}})
    }
  },
  components: {
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .wx-index{
    margin: 40px auto;
    width: 1000px;
    .title{
    }
    .upload-content{
      width: 100%;
      height: 400px;
      text-align: center;
      border: 1px dashed #CCC;
      position: relative;
      margin-bottom: 10px;
      .tips-one{
        margin-top: 150px;
        .el-icon-upload{
          font-size: 60px;
        }
      }
      .tips-two{
        .btn-upload-input{
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .upload-input{
        display: none;
      }
      .file-name{
        font-size: 14px;
        color: #666;
      }
      .el-icon-close{
        position: absolute;
        font-size: 30px;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
    .el-radio-button{
      margin-right: 10px;
      .el-radio-button__inner{
        border: 1px solid #dcdfe6;
      }
      &.is-active{
        .el-radio-button__inner{
          border-left: none;
        }
      }
    }
    .btn-content{
      margin: 30px 0;
      text-align: center;
      .el-button{
        width: 200px;
      }
    }
  }
</style>
