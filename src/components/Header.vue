<template lang="pug">
  el-header.wx-header(height="72px")
    el-row
      el-col(:span="24")
        i.icon-logo
        span.title-name 智能海报
        span.page-name 数据上传
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      userinfo: {
        name: 'username'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wx-header{
  z-index: 9999;
  background-image: linear-gradient(-90deg, #0AE6F7 0%, #5628EF 100%);
  box-shadow: 0 0 2px 0;
  color: #fff;
  line-height: 72px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  font-family: 'PingFangSC-Medium';
  font-size: 16px;
  .el-row{
    .el-col{
      .icon-logo{
        display: inline-block;
        width: 109px;
        height: 22px;
        background: url('../assets/images/icon-logo.png') no-repeat;
        background-size: 109px 16px;
        background-position-y: bottom;
      }
      .title-name{
        display: inline-block;
        width: 80px;
        height: 22px;
        line-height: 22px;
        text-align: right;
        margin-left: 16px;
        border-left: 2px solid rgba(255, 255, 255, 0.4);
        margin-right: 68px;
      }
    }
  }
}
</style>
