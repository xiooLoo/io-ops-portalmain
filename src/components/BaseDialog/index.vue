<template>
  <to-dialog
    :custom-class="customClass"
    :visible.sync="isVisible"
    :width="width"
    :center="center"
    :modal="modal"
    :top="top"
    :z-index="zIndex"
    :modal-append-to-body="modalAppendToBody"
    :destroy-on-close="isDestroyOnClose"
    :append-to-body="isAppendToBody"
    :close-on-press-escape="isCloseOnPressEscape"
    :show-close="isShowClose"
    :close-on-click-modal="isModalclose"
    :before-close="needBeforeClose ? handleClose : null"
    @opened="dialogOpened"
    @close="dialogClose"
  >
    <div slot="title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div v-if="dialgData.tipIcon || dialgData.content" class="dialog-box">
      <div v-if="dialgData.tipIcon" slot="title" class="promit-title">
        <span
          :class="[
            mixin_getCurrentIconfont(dialgData.tipIcon),
            cmpTipColor(dialgData.color)
          ]"
        />
      </div>
      <div class="dialog-box-i">
        <span v-if="dialgData.subhead" class="promit-tip">{{
          dialgData.subhead
        }}</span>
        <slot name="content" />
        <div v-if="dialgData.content" class="slot-content">
          {{ dialgData.content }}
          <slot />
        </div>
      </div>
    </div>
    <slot v-else name="content" />
    <span slot="footer" class="dialog-footer">
      <to-button
        v-for="btn in dialgBtns"
        v-debounce
        :key="btn.value"
        :type="btn.type"
        :loading="btn.loading || false"
        size="mini"
        :class="
          btn.type === 'primary'
            ? 'global_button_i'
            : btn.type === 'normal'
              ? 'global_button_iii'
              : btn.type === 'text'
                ? ''
                : 'global_button_ii'
        "
        :disabled="btn.disabled"
        @click="handleActions(btn)"
      >{{ btn.label }}</to-button
      >
    </span>
  </to-dialog>
</template>
<script>
import theme_mixin from '@/mixin/theme_mixin'
export default {
  name: 'BaseDialog',
  mixins: [theme_mixin],
  props: {
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: String,
      default: '1000'
    },
    customClass: {
      type: String,
      default: 'my-dialog-default'
    },
    top: {
      type: String,
      default: '32vh'
    },
    width: {
      type: String,
      default: '480px'
    },
    center: {
      type: Boolean,
      default: false
    },
    isDestroyOnClose: {
      type: Boolean,
      default: false
    },
    isAppendToBody: {
      type: Boolean,
      default: false
    },
    isShowClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    /**
     *  公共弹窗是否可以通过点击 modal 关闭 Dialog
     * 【非必传】
     */
    isModalclose: {
      type: Boolean,
      default: true
    },
    isCloseOnPressEscape: {
      type: Boolean,
      default: false
    },
    btns: {
      type: Array,
      default: () => [
        { label: '取消', value: 'onCancel', type: 'normal', loading: false },
        { label: '确定', value: 'onOk', type: 'primary', loading: false }
      ]
    },
    dialogConfig: {
      type: Object,
      default: function () {
        return {
          subhead: '',
          tipIcon: '',
          content: ''
        }
      }
    },
    /**
     *  是否需要在关闭前调用回调函数
     *  关闭前的回调，会暂停 Dialog 的关闭
     */
    needBeforeClose: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      isVisible: false,
      // dialgData: this.dialogConfig,
      customBtns: []
    }
  },
  computed: {
    title() {
      return this.dialogConfig.title
    },
    dialgBtns() {
      return this.customBtns.length > 0 ? this.customBtns : this.btns
    }
    // dialgData() {
    //   return this.dialogConfig
    // }
  },
  methods: {
    openOrClose() {
      this.isVisible = !this.isVisible
    },
    cmpTipColor(color) {
      switch (color) {
      case 'error':
        return 'error-icon'
      default:
        return 'warning-icon'
      }
    },
    handleActions(btn) {
      if (this.onCancel) {
        if (btn.value == 'onCancel') {
          this.onCancel()
          this.$closeDialog()
        } else {
          // this.onOk(btn);
          this[btn.value](btn)
        }
      }
      this.actions(btn)
    },
    dialogClose() {
      if (this.onCancel) {
        this.onCancel()
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$emit('close', true)
    },
    dialogOpened() {
      this.$emit('opened')
    },
    $closeDialog() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    // 关闭/取消公共弹窗
    handleClose(done) {
      this.$emit('handleClose', done)
    }
  }
}
</script>
<style lang="scss" scoped>
.my-dialog-default {
  ::v-deep .to-dialog__wrapper {
    z-index: 2100;
  }
  .to-dialog__header {
    padding: 24px 24px 0px;
    font-size: 1em;
    color: #14203B;
    font-weight: 500;
  }
  .to-dialog__footer {
    padding:24px;
  }
}
 .to-button--medium {
  padding: 0px;
  font-size: 14px;
  width: 60px;
  height: 32px;
  border-radius: 2px;
}
.dialog-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100px;
  max-height: 50vh;
  overflow-y: auto;
  .iconfont {
    font-size: 22px;
  }
}
.dialog-box-i {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .promit-tip {
    font-size: 1em;
    color: #14203B;
    font-weight: 600;
    margin-bottom: 8px;
  }
}
.warning-icon {
  color: #FA9513;
}
.error-icon {
  color: #F5242C;
}
.slot-content {
  width: 100%;
  color: #586073;
  font-size: 14px;
}
.yxt-icon {
  margin: 0 12px 0 0;
}
.promit-title {
  padding-right: 12px;
}
</style>
