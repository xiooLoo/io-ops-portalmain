<template>
  <div class="roleManagementAdd-bottom">
    <to-form-item>
      <to-button
        v-if="isGoback"
        type="normal"
        @click="goback"
      >
        取消
      </to-button>
      <to-button
        v-if="isSub"
        v-debounce
        type="primary"
        :loading="loading"
        @click="sub"
      >
        保存
      </to-button>
    </to-form-item>
  </div>
</template>
<script>

export default {
  name: 'PageFooter',
  props: {
    /**
     *  按钮名称
     * 【非必传】
     */
    loading: {
      type: Boolean,
      default: false
    },
    // 是否显示保存
    isSub: {
      type: Boolean,
      default: true
    },
    // 是否显示保存
    isGoback: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 返回
    goback() {
      this.$router.go(-1)
    },
    sub() {
      this.$emit('submitForm')
    }
  }
}
</script>
<style lang="scss" scoped>
.roleManagementAdd-bottom{
  display: flex;
  justify-content: flex-end;
  ::v-deep .to-form-item__content{
    text-align:right;
  }
  .goback-class{
      background: #ffffff;
      border: 1px solid #4371E5;
      color: #4371E5;
  }
}
</style>
