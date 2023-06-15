<template>
  <to-popover
    v-bind="$attrs"
    v-model="visible"
    trigger="click"
  >
    <div class="to-popconfirm">
      <p class="to-popconfirm__main">
        <i
          v-if="!hideIcon"
          :class="icon"
          class="to-popconfirm__icon"
          :style="{color: iconColor}"
        ></i>
        {{title}}
      </p>
      <div class="to-dialog__footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
      <div v-else class="to-popconfirm__action">
        <to-button
          size="mini"
          :type="cancelButtonType"
          @click="cancel"
        >
          {{ displayCancelButtonText }}
        </to-button>
        <to-button
          size="mini"
          :type="confirmButtonType"
          @click="confirm"
        >
          {{ displayConfirmButtonText }}
        </to-button>
      </div>
    </div>
    <slot name="reference" slot="reference"></slot>
  </to-popover>
</template>
<script>
export default {
  name: 'YxtPopconfirm',
  props: {
    title: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButtonType: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'to-icon-question'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    displayConfirmButtonText() {
      return this.confirmButtonText || '确定'
    },
    displayCancelButtonText() {
      return this.cancelButtonText || '取消'
    }
  },
  methods: {
    confirm() {
      this.visible = false
      this.$emit('confirm')
    },
    cancel() {
      this.visible = false
      this.$emit('cancel')
    },
    closeVisible() {
      this.visible = false
    }
  }
}
</script>
