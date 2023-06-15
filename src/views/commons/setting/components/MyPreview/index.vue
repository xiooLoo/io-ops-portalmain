<template>
  <to-dialog
    :visible.sync="isVisible"
    width="38%"
    top="28vh"
    :modal-append-to-body="isAppendBody"
    append-to-body
    :show-close="isShowClose"
    custom-class="my-preview-dialog"
  >
    <to-carousel
      ref="carousel"
      class="my-carousel"
      :autoplay="false"
      :arrow="previewList.length>1?'always':'never'"
      :initial-index="initialIndex"
      @change="carouselChange"
    >
      <to-carousel-item v-for="item in previewList" :key="item.id">
        <img class="my-preview-img" :src="item.filePath" alt="">
      </to-carousel-item>
    </to-carousel>
  </to-dialog>
</template>
<script>
export default {
  name: 'MyPreview',
  props: {
    isAppendBody: {
      type: Boolean,
      default: false
    },
    isShowClose: {
      type: Boolean,
      default: false
    },
    previewList: {
      type: Array,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isVisible: false,
      currentObj: {}
    }
  },
  watch: {
    previewList(arr) {
      this.currentObj = arr[0]
    },
    initialIndex(newV) {
      this.initialIndex = newV
      if (this.$refs.carousel) {
        this.$refs.carousel.setActiveItem(newV)
      }
    }
  },
  methods: {
    openOrClose() {
      this.isVisible = !this.isVisible
    },
    carouselChange(currIdx) {
      this.currentObj = this.previewList.find((item, index) => index === currIdx)
    },
    downloadImg() {

      /**
       * TODO- 后期所有附件下载，都需要修改为以下地址：
      window.open(this.currentObj.filePath);
       */
      // window.open(`${ process.env.VUE_APP_URL }/oss/download/file/${ this.currentObj.fileSign }`)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .my-preview-dialog {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: none;
  .my-preview-img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    background-color:rgba(51,51,51,1.0);
  }
  .my-carousel {
    width: 100%;
    overflow-y: hidden;
  }
}
::v-deep .to-dialog__body {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.download-btn {
  margin-top: 9px;
}
</style>
