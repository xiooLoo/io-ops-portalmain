<template>
  <div class="my-inline-btns-box">
    <div class="left-btns-box">
      <template v-for="btn in leftBtns">
        <!-- code: {{ btn.code }} $has: {{ $has(btn.code) }} -->
        <to-tooltip
          v-if="btn.isIcon"
          v-show="$has(btn.code)"
          :key="btn.value"
          :effect="tooltipConfig.effect"
          :content="btn.label"
          :placement="tooltipConfig.placement"
        >
          <span class="table-action-icon" :class="[btn.icon]" @click="handleAction(btn)" />
        </to-tooltip>
        <MyFileUpload
          v-else-if="btn.isUpload"
          v-show="$has(btn.code)"
          :key="btn.value"
          :url-suffix="btn.urlSuffix"
          :limit="btn.limit"
          :type-limit="['xls','xlsx']"
          @on-success="handleUploadSuccess(btn)"
        >
          <to-button
            slot="btn"
            class="single-button-bl"
          >
            {{ btn.label || '导入' }}
          </to-button>
        </MyFileUpload>
        <to-select
          v-else-if="btn.parChar"
          v-show="$has(btn.code) && !btn.hide"
          :key="btn.value"
          v-model="btn.select"
          :type="btn.type"
          :disabled="btn.disabled"
          size="small"
          :placeholder="btn.placeholder"
          style="margin-left:10px;"
        >
          <to-option
            v-for="item in btn.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click.native="clickOption(btn)"
          />
        </to-select>
        <to-button
          v-else
          v-show="$has(btn.code) && !btn.hide"
          :key="btn.value"
          :type="btn.type"
          :class="(btn.type === 'i' && !btn.disabled ) ? 'global_button_i' : (btn.type === 'ii' && !btn.disabled ) ? 'global_button_ii' : 'mixin_button_iiii'"
          :disabled="btn.disabled"
          :loading="btn.loading || false"
          @click="handleAction(btn)"
        >
          {{ btn.label }}
        </to-button>
      </template>
    </div>
    <div class="right-btns-box">
      <template v-for="btn in rightBtns">
        <to-tooltip
          v-if="btn.isIcon"
          :key="btn.value"
          :effect="tooltipConfig.effect"
          :content="btn.label"
          :placement="tooltipConfig.placement"
        >
          <span class="table-action-icon" :class="[btn.icon]" @click="handleAction(btn)" />
        </to-tooltip>
        <MyFileUpload
          v-else-if="btn.isUpload"
          v-show="$has(btn.code)"
          :key="btn.value"
          :url-suffix="btn.urlSuffix"
          :limit="btn.limit"
          @on-success="handleUploadSuccess(btn)"
        >
          <to-button
            slot="btn"
            class="single-button-bl"
          >
            {{ btn.label || '导入' }}
          </to-button>
        </MyFileUpload>
        <to-button
          v-else
          :key="btn.value"
          :type="btn.type"
          size="mini"
          :class="btn.type === 'primary' ? 'global_button_i' : btn.type === 'normal' ? 'global_button_iii' : 'global_button_ii'"
          :disabled="btn.disabled"
          :loading="btn.loading || false"
          @click="handleAction(btn)"
        >
          {{ btn.label }}
        </to-button>
      </template>
    </div>
  </div>
</template>
<script>
import MyFileUpload from '../MyFileUpload'
export default {
  name: 'MyInlineBtns',
  components: {
    MyFileUpload
  },
  props: {
    leftBtns: {
      type: Array,
      default: () => [
        { label: '取消', value: 'cancel', type: 'normal' },
        { label: '确定', value: 'sure', type: 'primary' }
      ]
    },
    rightBtns: {
      type: Array,
      default: () => []
    },
    /**
     * 操作列为icon时，显示tooltip浮动提示
     */
    tooltipConfig: {
      type: Object,
      default: function() {
        return {
          effect: 'dark',
          placement: 'top-start'
        }
      }
    },
    /**
     * 所有@click 事件，通过key区分事件具体类型
     */
    // eslint-disable-next-line vue/require-default-prop
    actions: {
      type: Function
    }
  },
  data() {
    return {}
  },
  methods: {
    handleAction(btn) {
      this.actions(btn)
    },
    clickOption(btn) {
      this.actions(btn)
    },
    // 文件上传成功
    handleUploadSuccess(btn) {
      this.$message({ message: '导入成功', type: 'success' })
      this.$emit('on-success')
    }
  }
}
</script>
<style lang="scss" scoped>
 // 按钮样式 【i: 深蓝+白】
 .global_button_i {
  display: inline-block;
  height: 32px;
  line-height: 0px;
  font-size: 14px;
  border: none;
  border-radius: 2px;
}

// 按钮样式 【ii: 浅蓝+蓝】
.global_button_ii {
  display: inline-block;
  height: 32px;
  line-height: 0px;
  font-size: 14px;
  border: none;
  border-radius: 2px;
}
// 按钮样式 【iii: 灰色】
.global_button_iii {
  display: inline-block;
  height: 32px;
  line-height: 0px;
  font-size: 14px;
  background-color: $yxt-color-text-6;
  color: $yxt-color-text-3;
  border: none;
  border-radius: 2px;
}

.mixin_button_iiii {
  display: inline-block;
  height: 32px;
  line-height: 0px;
  font-size: 14px;
  background-color: $yxt-color-white-1;
  color: $yxt-color-text-3;
  border: none;
  border-radius: 2px;
}

.my-inline-btns-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .left-btns-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .table-action-icon {
      cursor: pointer;
      color: #2E78FF;
      font-size: 20px;
      margin-left: 10px;
    }
    .single-button-disabled-download {
      background-color: #f3f3f3;
      color: #b8bcc4;
    }
  }
  .right-btns-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
