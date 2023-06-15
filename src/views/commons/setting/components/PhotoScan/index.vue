<!--
 *  功能：  图片预览
 *  入参：
        scanList:      [必传]浏览图片列表
 *  用法：
        import PhotoScan from '@/components/PhotoScan'
        ...
        <template>
             <PhotoScan :scan-list="fileList" />
        </template>
-->
<template>
  <div>
    <div v-for="(file,index) in scanList" :key="index" class="demo-upload-list">
      <img :src="file.filePath">
      <div class="demo-upload-list-cover">
        <span @click="handlePictureCardPreview(file)">
          <i class="to-icon-zoom-in" />
        </span>
      </div>
    </div>
    <MyPreview ref="myPreview" :preview-list="scanList" />
  </div>
</template>
<script>
import MyPreview from '../MyPreview'

export default {
  name: 'PhotoScan',
  components: {
    MyPreview
  },
  props: {
    /**
     *  浏览文件列表
     * 【必传】
     */
    scanList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      headers: {}
    }
  },
  methods: {
    handlePictureCardPreview() {
      this.$refs.myPreview.openOrClose()
    },
    downloadImg() {
      this.$message({ type: 'warning', message: '开发中...' })
    }
  }
}
</script>
<style lang="scss" scoped>
.demo-upload-list{
  display: inline-block;
  width: 146px;
  height: 146px;
  text-align: center;
  line-height: 146px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
  img{
    width: 100%;
    height: 100%;
    }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
   }
  }
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
</style>
