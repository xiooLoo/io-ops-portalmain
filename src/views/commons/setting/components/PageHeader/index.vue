<template>
  <div class="roleManagementAdd-top">
    <p>{{ message }}</p>
    <to-button class="botton-class" type="primary" size="small" @click="goback">{{ backText }}</to-button>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props: {
    /**
     * 页面标题
     * 【必传】
     */
    message: {
      type: String,
      default: '标题'
    },
    /**
     *  按钮名称
     * 【非必传】
     */
    backText: {
      type: String,
      default: '返回'
    },
    /**
     *  需特殊处理返回
     * 【非必传】
     */
    isHandle: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {

    }
  },
  watch: {
  },
  mounted() {

  },
  methods: {
    // 返回
    goback() {
      if (this.isHandle) {
        this.$emit('goback')
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.roleManagementAdd-top {
  width: 100%;
  background-color: #fff;
  height: 56px;
  font-weight: 600;
  font-size: $yxt-font-size-title-1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $yxt-color-white-1;
  z-index: 999;
  p {
    font-size: $yxt-font-size-title-1;
    font-family: PingFang SC;
    font-weight: bold;
    color: $yxt-color-text-1;
    margin: 10px 0;
    padding-left: 24px;
  }
  .botton-class {
    display: inline-block;
    height: 32px;
    line-height: 0px;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    width: 64px;
    margin-right:24px ;
  }
}
</style>
