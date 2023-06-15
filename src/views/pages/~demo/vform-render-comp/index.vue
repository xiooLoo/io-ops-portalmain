<template>
  <div class="vform-render-box">
    <v-form-render
      style="width:100%;height:100%"
      :apiRequets="apiRequets"
      :key="renderKey"
      :form-json="formJson"
      :form-data="formData"
      :globalData="globalData"
      :option-data="optionData"
      @appendButtonClick="testOnAppendButtonClick"
      @buttonClick="testOnButtonClick"
      @formAction="handleFormChange"
      ref="vFormRef"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import mixin_vform_render from './mixin_vform_render'


@Component({
  name: 'VFormRenderComp',
  mixins: [mixin_vform_render]
})
export default class VFormRenderComp extends Vue {
  [x: string]: any
}
</script>
<style lang="scss" scoped>
.vform-render-box {
  height: 100%;
  width: 100%;
}
</style>
