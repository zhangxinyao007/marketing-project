<template lang="pug">
  div.wx-index
    el-upload(
      class="upload-demo"
      drag
      multiple
      )
      i.el-icon-upload
      div.el-upload__text
        | 将文件拖到此处，或
        em 点击上传
      <!--div.el-upload__tip(slot="tip") 只能上传jpg/png文件，且不超过500kb-->
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {}
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .wx-index{
    margin: 60px auto;
  }
</style>
