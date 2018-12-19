<template lang="pug">
  el-header.wx-header(height="72px")
    el-row
      el-col.title(:span="12")
        span 营销活动平台
      el-col.userinfo(:span="12")
        span {{userinfo.name}}
        i.el-icon-caret-bottom
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
  background-image: linear-gradient(90deg, #218688 0%, #36B785 100%);
  box-shadow: 0 0 2px 0;
  padding: 0 36px 0 24px;
  color: #fff;
  line-height: 72px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  .el-row{
    .el-col{
      &.title{
        text-align: left;
      }
      &.userinfo{
        text-align: right;
        filter: drop-shadow(24px, 24px, 24px, red);
        span{
          position: relative;
          margin-right: 8px;
          &::before{
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url("../assets/images/icon-user.svg") no-repeat;
            position: absolute;
            top: 0;
            left: 0;
            margin-left: -28px;
          }
        }
      }
    }
  }
}
</style>
