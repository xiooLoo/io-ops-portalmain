<!--
 *  功能：  可配置表单
 *  入参：
        formKey:    [必传]表单keys
        formItems:  [必传]表单数组
        rowSpan:    [非必传]一行默认显示几个Input(默认3)
 *  用法：
        import MyForm from '@/components/MyForm'
        ...
        <template>
          <MyForm :form-items="formItems" :form-key="formKey" @getFormValues="getFormValues" />
        </template>
        ...
        methods: {
          getFormValues(e) {
            console.log('获取表单值:', e)
          }
        }
-->
<template>
  <div>
    <to-form
      ref="ruleForm"
      :model="formKey"
      :label-width="labelWidth"
      class="demo-ruleForm"
      :label-position="labelPosition"
    >
      <to-row :gutter="24">
        <to-col :span="19">
          <to-row :gutter="24">
            <to-col v-for="(item, index) in formItems" :key="index + 'item.type'" :span="item.type === 'betwBtns' ? item.span : item.type === 'betwInput' ? item.span :item.type === 'betwData'?item.span: 24 / rowSpan" :style="{ display: index < count ? 'block' : 'none', padding: 0}">
              <to-form-item :label="item.label + (!!item.label.length ? '：' : '')" :prop="item.id" :rules="item.rules">
                <to-input
                  v-if="item.type === 'input'"
                  v-model.trim="formKey[item.id]"
                  size="small"
                  :type="item.inputType"
                  :rows="item.rows"
                  :show-password="item.inputType === 'password'"
                  auto-complete="new-password"
                  :placeholder="item.placeholder"
                  @input="$event => handleInput($event, item)"
                  @keyup.enter="submitForm('ruleForm')"
                />
                <to-select
                  v-else-if="item.type === 'select'"
                  v-model="formKey[item.id]"
                  size="small"
                  :type="item.inputType"
                  :filterable="item.filterable || false"
                  :remote="item.remote || false"
                  :loading="item.loading || false"
                  :remote-method="(query) => remoteMethod(query, item, index)"
                  :multiple="item.multiple || false"
                  :clearable="item.clearable || false"
                  auto-complete="new-password"
                  :placeholder="'请选择' + item.label"
                  style="width: 100%"
                  :get-popup-container="(triggerNode)=>{ return triggerNode.parentNode}"
                  :filter-method="item.hiddenFilterMethod ? null : (val) => handleFilter(item.id, val)"
                  @change="$event => selectChange($event,item)"
                >
                  <to-option v-for="(itm, subIndex) in item.arr" :key="subIndex" :label="item.arrLabelName?itm[item.arrLabelName]:itm.label" :value="item.arrValueName?itm[item.arrValueName]: itm.value" />
                </to-select>
                <to-date-picker
                  v-else-if="item.type === 'date' || item.type === 'datetime' || item.type === 'dates' || item.type === 'year' || item.type === 'month' || item.type === 'week' || item.type === 'daterange' || item.type === 'monthrange' || item.type === 'datetimerange'"
                  v-model="formKey[item.id]"
                  size="small"
                  :clearable="item.clearable"
                  :type="item.type"
                  :value-format="item.valueFormat"
                  :format="item.format"
                  :range-separator="item.rangeSeparator"
                  :placeholder="item.placeholder"
                  :start-placeholder="item.startPlc"
                  :end-placeholder="item.endPlc"
                  :default-time="item.defaultTime"
                  style="width: 100%"
                />
                <to-time-picker
                  v-else-if="item.type === 'timeRange'"
                  v-model="formKey[item.id]"
                  size="small"
                  :picker-options="item.options"
                  placeholder="请在范围内选择时间"
                  style="width: 100%"
                />
                <div v-else-if="item.type === 'switch'" style="position: absolute;">
                  <to-switch v-model="formKey[item.id]" :disabled="item.disabled" />
                </div>
                <to-checkbox-group v-else-if="item.type === 'checkbox'" v-model="checkObj[item.id]" style="display:flex;flex-flow: row wrap;" @change="changeCheckBox(item.id)">
                  <to-checkbox v-for="itm in item.arr" :key="itm.value" :label="itm.label" :value="itm.value" />
                </to-checkbox-group>
                <to-radio-group v-else-if="item.type === 'radio'" v-model="formKey[item.id]" style="display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center;height:40px;line-height:40px">
                  <to-radio
                    v-for="itm in item.arr"
                    :key="itm.value"
                    :label="itm.value"
                  >
                    {{ itm.label }}
                  </to-radio>
                </to-radio-group>
                <to-input-number
                  v-else-if="item.type === 'inputNumber'"
                  v-model="formKey[item.id]"
                  size="small"
                  :min="1"
                  :max="10"
                  label="描述文字"
                />
                <!-- <to-form-item
                  v-else-if="item.type === 'cascader'"
                  :label="item.label + '：'"
                  :prop="item.id"
                  label-position="left"
                /> -->
                <to-cascader
                  v-else-if="item.type === 'cascader'"
                  ref="cascader"
                  v-model="formKey[item.id]"
                  size="small"
                  :options="item.options"
                  :props="{ label: 'name',value:'code',checkStrictly: true }"
                  filterable
                  clearable
                  style="width: 100%"
                  @change="handleChange"
                />
                <to-form-item v-else-if="item.type === 'betwInput'" :prop="item.id">
                  <to-col :span="item.betws[0].span" class="betw-input-cola">
                    <to-input
                      v-model.trim="formKey[item.betws[0].id]"
                      size="small"
                      :type="item.betws[0].inputType"
                      :show-password="item.betws[0].inputType === 'password'"
                      :placeholder="item.betws[0].placeholder"
                      class="betw-input-sp"
                      @keyup.enter="submitForm('ruleForm')"
                    />
                  </to-col>
                  <to-col class="line" :span="1" style="text-align:center;padding:0">-</to-col>
                  <to-col :span="item.betws[1].span" class="betw-input-colb">
                    <to-input
                      v-model.trim="formKey[item.betws[1].id]"
                      size="small"
                      :type="item.betws[1].inputType"
                      :show-password="item.betws[1].inputType === 'password'"
                      :placeholder="item.betws[1].placeholder"
                      class="betw-input-sp"
                      @keyup.enter="submitForm('ruleForm')"
                    />
                  </to-col>
                  <to-col class="line sufix" :span="2">{{ item.sufix }}</to-col>
                </to-form-item>
                <to-form-item v-else-if="item.type === 'betwInputNext'" :prop="item.id">
                  <to-col :span="item.span" class="betw-input-cola">
                    <to-input
                      v-model.trim="formKey[item.id]"
                      size="small"
                      :type="item.inputType"
                      :show-password="item.inputType === 'password'"
                      :placeholder="item.placeholder"
                      class="betw-input-sp"
                      @keyup.enter="submitForm('ruleForm')"
                    />
                  </to-col>
                  <to-col class="line" :span="2">{{ item.sufix }}</to-col>
                </to-form-item>
                <to-form-item v-else-if="item.type === 'betwData'" :prop="item.id">
                  <to-col :span="item.betws[0].span" class="betw-input-cola">
                    <to-date-picker
                      v-model.trim="formKey[item.betws[0].id]"
                      style="width:100%;"
                      :type="item.betws[0].inputType"
                      size="small"
                      :value-format="item.betws[0].valueFormat"
                      :format="item.betws[0].format"
                      :placeholder="item.betws[0].placeholder"
                      @keyup.enter="submitForm('ruleForm')"
                    />
                  </to-col>
                  <to-col class="line" :span="1" style="text-align:center;padding:0">-</to-col>
                  <to-col :span="item.betws[1].span" class="betw-input-colb">
                    <to-date-picker
                      v-model.trim="formKey[item.betws[1].id]"
                      style="width:100%;"
                      size="small"
                      :format="item.betws[0].format"
                      :type="item.betws[1].inputType"
                      :value-format="item.betws[1].valueFormat"
                      :placeholder="item.betws[1].placeholder"
                      :picker-options="pickerOptions(formKey[item.betws[0].id])"
                      @keyup.enter="submitForm('ruleForm')"
                    />
                  </to-col>
                  <to-col class="line" :span="2">{{ item.sufix }}</to-col>
                </to-form-item>
                <to-form-item v-else-if="item.type === 'betwBtns'" :prop="item.id">
                  <to-row :gutter="24">
                    <to-col v-for="btn in item.btns" :key="btn.key" :span="btn.span" class="betw-input-cola">
                      <to-button
                        size="small"
                        type="text"
                        :style="{color: btn.key === currentDistance ? '#2E78FF' : '#14203B'}"
                        @click="handleDistance(btn)"
                      >
                        {{ btn.name }}
                      </to-button>
                    </to-col>
                    <to-col :span="item.betws[0].span" class="betw-input-cola">
                      <to-input
                        v-model.trim="formKey[item.betws[0].id]"
                        size="small"
                        :type="item.betws[0].inputType"
                        :show-password="item.betws[0].inputType === 'password'"
                        :placeholder="item.betws[0].placeholder"
                        @focus="onFocus"
                        @keyup.enter="submitForm('ruleForm')"
                      />
                    </to-col>
                    <to-col class="line" :span="1" style="text-align:center;padding:0">-</to-col>
                    <to-col :span="item.betws[1].span" class="betw-input-colb">
                      <to-input
                        v-model.trim="formKey[item.betws[1].id]"
                        size="small"
                        :type="item.betws[1].inputType"
                        :show-password="item.betws[1].inputType === 'password'"
                        :placeholder="item.betws[1].placeholder"
                        @focus="onFocus"
                        @keyup.enter="submitForm('ruleForm')"
                      />
                    </to-col>
                    <to-col class="line" :span="1" style="text-align:center;padding-left:12px;padding-right: 0px;">{{ item.sufix?item.sufix:'km' }}</to-col>
                  </to-row>
                </to-form-item>
              </to-form-item>
            </to-col>
            <!-- <to-col :span="4">
              <to-form-item label-width="-1">
                <to-button
                  v-show="formItems.length> 4"
                  type="text"
                  size="small"
                  :style="{ marginLeft: '8px', fontSize: '12px' }"
                  @click="toggle"
                >
                  <span class="single-blue-txt-i">{{ expand ? '收起' : '展开' }}<i :class="expand ? 'to-icon-arrow-up' : 'to-icon-arrow-down'" style="margin-left:6px" /></span>
                </to-button>
                <to-button size="small" class="global_button_i" @click="submitForm('ruleForm')">查询</to-button>
                <to-button v-if="isEmpty" size="small" class="single-button-bl" @click="resetForm('ruleForm')">重置</to-button>
                <to-button v-if="!isEmpty" size="small" class="single-button-bl" @click="resetInitialize('ruleForm')">重置</to-button>
              </to-form-item>
            </to-col> -->
          </to-row>
        </to-col>
        <to-col :span="5" class="fetch-btns-col">
          <to-form-item v-show="isShowBtns" label-width="-1" class="fetch-btns">
            <to-button
              v-show="formItems.length > rowSpan"
              type="text"
              size="small"
              :style="{ marginLeft: '8px', fontSize: '12px' }"
              @click="toggle"
            >
              <span class="single-blue-txt-i">{{ expand ? '收起' : '展开' }}<i :class="expand ? 'to-icon-arrow-up' : 'to-icon-arrow-down'" style="margin-left:6px" /></span>
            </to-button>
            <to-button v-debounce size="small" type="primary" class="btns-box-i" @click="submitForm('ruleForm')">查询</to-button>
            <to-button
              v-if="isEmpty"
              v-debounce
              size="small"
              type="normal"
              class="btns-box-i"
              @click="resetForm('ruleForm')"
            >
              重置
            </to-button>
            <to-button
              v-if="!isEmpty"
              v-debounce
              size="small"
              type="normal"
              class="btns-box-i"
              @click="resetInitialize('ruleForm')"
            >
              重置
            </to-button>
          </to-form-item>
        </to-col>
      </to-row>
    </to-form>
  </div>
</template>
<script>
import './main.scss'
export default {
  name: 'MyForm',
  props: {
    /**
     * 左侧提示文字对齐方式
     * 默认 right
     */
    labelPosition: {
      type: String,
      default: 'right'
    },
    /**
     * 表单keys
     * [必传]
     */
    formKey: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * 表单数组
     * [必传]
     */
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * label宽度
     * [非必传]
     */
    labelWidth: {
      type: String,
      default: '100px'
    },
    /**
     * 一行默认显示3个Input
     * [非必传]
     */
    rowSpan: {
      type: Number,
      default: 3
    },
    /**
     *是否清空
     * [非必传]
     */
    isEmpty: {
      type: Boolean,
      default: true
    },
    isShowBtns: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      expand: false,
      checkObj: {},
      currentDistance: '',
      comeDaterange: false
    }
  },
  computed: {
    count() {
      return this.expand ? this.formItems.length : this.rowSpan
    }
  },
  beforeMount() {
    this.formItems.map(item => {
      if (item.type === 'checkbox') {
        this.$set(this.checkObj, item.id, [])
      }
      if (item.type == 'daterange') {
        this.comeDaterange = true
      }
    })
  },
  updated() {
    let self = this
    document.onkeydown = function () {
      let key = window.event.keyCode
      if (key == 13) {
        self.submitForm('ruleForm')
      }
    }
  },
  methods: {
    handleInput(e, item) {
      this.$emit('handleInput', e, item)
    },
    selectChange(e, item) {
      this.actions({
        key: 'selectChange',
        id: item.id,
        option: e
      })
    },
    remoteMethod(query, item, index) {
      if (query !== '') {
        item.loading = true
        this.actions({
          key: 'remoteMethod',
          query: query.trim(),
          id: item.id,
          index
        })
      } else {
        item.arr = []
      }
    },
    handleFilter(key, value) {
      console.log('--------1---------')
      this.actions({ key, value })
    },
    pickerOptions(e) {
      if (e) {
        let contrastTime = getUnixTime(e)
        function getUnixTime(dateStr) {
          let newstr = dateStr.replace(/-/g, '/')
          let date = new Date(newstr)
          let time_str = date.getTime().toString()
          return time_str.substr(0, 10) * 1000
        }
        return {
          disabledDate(time) {
            return time.getTime() < contrastTime
          }
        }
      }
    },
    toggle() {
      this.expand = !this.expand
    },
    changeCheckBox(id) {
      this.formKey[id] = this.checkObj[id]
    },
    handleChange() {},
    onFocus() {
      this.currentDistance = ''
      this.$emit('handleDistance', 'input')
    },
    handleDistance(item) {
      this.currentDistance = item.key
      this.$emit('handleDistance', item)
    },
    submitForm(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.comeDaterange) {
              // 特殊处理时间范围选择
              this.formItems.map(item => {
                if (item.type == 'daterange') {
                  this.formKey[item.startKey] = !this.formKey[item.id] ? '' : this.formKey[item.id][0]
                  this.formKey[item.endKey] = !this.formKey[item.id] ? '' : this.formKey[item.id][1]
                }
              })
            }
            this.$emit('getFormValues', this.formKey)
          } else {
            console.log('表单校验异常!')
            return false
          }
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentDistance = ''
      this.$emit('resetForm')
      const checkobjKeys = Object.keys(this.checkObj)
      if (!checkobjKeys.length) return

      checkobjKeys.forEach(key => {
        this.formKey[key] = []
        this.checkObj[key] = []
      })
      // if (JSON.stringify(this.checkObj) !== '{}') {
      //   Object.keys(this.checkObj).forEach(key => {
      //     this.formKey[key] = []
      //     this.checkObj[key] = []
      //   })
      // }
    },
    // 恢复默认值不置空对象
    resetInitialize(formName) {
      this.$refs[formName].resetFields()
      this.$emit('resetInitialize')
    }
  }
}
</script>
<style lang="scss" scoped>
.fetch-btns-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.fetch-btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
}
::v-deep .betw-input-sp > .to-input__inner {
  padding: 0 !important;
  text-align: center;
}
@media screen and (max-width: 1440px) {
  .btns-box-i {
    font-size: 8px;
    ::v-deep & > span {
      width: 100%;
      display: block;
    }
  }
  ::v-deep .to-form-item__content {
    white-space: nowrap;
  }
}

.betw-input-cola {
  padding-left: 0px !important;
}
.betw-input-colb {
  padding-right: 0px !important;
}
</style>
