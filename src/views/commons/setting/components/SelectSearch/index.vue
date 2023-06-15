<!--
 *  功能：  远程搜索查询
 *  入参：
        modelValue:    [必传]需要绑定的值
        areaCode:      [非必传]区域code
        type:          [非必传]区分那种类型搜索
 *  用法：
        import SelectSearch from '@/components/SelectSearch'
        ...
        <template>
            <SelectSearch
              type="unit"
              :model-value.sync="ruleForm.enterpriseCode"
              label="name"
              :area-code="ruleForm.areaCode"
              value="enterpriseCode"
              placeholder="请选择单位"
              @on-change="handleChange"
            />
        </template>
        ...
        methods: {
         handleChange(val){
             console.log(val)
          }
        }
-->
<template>
  <div>
    <to-select
      v-model="dateValue"
      size="small"
      :placeholder="$attrs.placeholder"
      filterable
      remote
      clearable
      :filter-method="handleFilter"
      @change="handleChange"
      @clear="queryLists"
    >
      <to-option
        v-for="(item,index) in dataLists"
        :key="index"
        :label="item[$attrs.label]"
        :value="item[$attrs.value]"
      />
    </to-select>
  </div>
</template>
<script>
import { getCorporateListsByName, getAllCorporateListsByName } from '../../api/setting'
export default {
  name: 'SelectSearch',
  components: {
  },
  props: {
    /**
     * 需要绑定的值 等于 v-model
     * 【必传】
     */
    modelValue: {
      type: String || Number,
      default: ''
    },
    /**
     *  区域code
     * 【非必传】
     */
    areaCode: {
      type: String,
      default: () => {
        return ''
      }
    },
    /**
     *  查询格式
     * 【非必传】
     */
    type: {
      type: String,
      default: ''
    },
    /**
     *  是否需要数据权限，all不需要
     * 【非必传】
     */
    tag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dataLists: [], // 数据源
      editFlag: null

    }
  },
  computed: {
    dateValue: {
      get: function () {
        return this.modelValue
      },
      set: function (value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  watch: {
    areaCode(newValue) {
      if (newValue) {
        this.queryLists()
      }
    },
    enterpriseCode(newValue) {
      if (newValue) {
        this.queryLists()
      }
    }
  },
  created() {
    if (this.areaCode) {
      this.queryLists()
    }
  },
  methods: {
    handleFilter(query) {
      this.queryLists(query)
    },
    // 获取列表不分页接口
    async queryLists(query) {
      let result
      if (this.type == 'unit') {
        if (this.modelValue) {
          result = await getCorporateListsByName({
            areaCode: this.areaCode,
            name: query,
            editFlag: true,
            originEnterpriseCode: this.modelValue
          })
        } else if (this.tag == 'all') {
          result = await getAllCorporateListsByName({
            areaCode: this.areaCode,
            name: query
          })
        } else {
          result = await getCorporateListsByName({
            areaCode: this.areaCode,
            name: query
          })
        }
      }
      this.dataLists = result.data
    },
    handleChange(val) {
      this.$emit('on-change', val)
    }
  }
}
</script>
