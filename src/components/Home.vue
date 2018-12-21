<template lang="pug">
  div.wx-home
    home-header
    el-container
      router-view
</template>
<script>
import HomeHeader from './Header'
export default {
  name: 'Home',
  components: {
    HomeHeader
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  .wx-home{
    .el-container{
      position: absolute;
      top: 72px;
      right: 0;
      bottom: 0;
      left: 0;
      .el-aside{
        height: 100%;
        background-color: #F5F5F5;
      }
      .el-main{
        padding: 24px 40px;
        width: 100%;
        min-width: 1120px;
      }
    }
  }
</style>
