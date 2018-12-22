<template lang="pug">
  div.wx-home
    home-header
    el-container
      router-view.main-content
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
      left: 0;
      background-color: rgb(243, 247, 251);
      .main-content{
        width: 1200px;
        height: auto;
        margin: 0 auto;
        padding: 0;
        position: relative;
      }
    }
  }
</style>
