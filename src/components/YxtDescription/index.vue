<template>
  <div class="my-description">
    <to-descriptions v-if="tag === 'tag'" class="global_bd_padding" :title="title" :column="column">
      <template v-for="item in comFormItems">
        <to-descriptions-item v-if="item.type === 'subtags'" :key="item.id" :label="item.label">
          <slot :name="item.id" :item="item" />
        </to-descriptions-item>
        <to-descriptions-item v-else-if="item.arr" :key="item.id" :label="item.label">
          <template v-if="item.multiple">
            <to-tag v-for="(tg, idx) in detailInfo[item.id]" :key="idx" size="small">{{ global_mixin_cmpColumnByPath(item.DIC_PATH, item.id, tg) }}</to-tag>
          </template>
          <to-tag v-else size="small">{{ global_mixin_cmpValues(item, detailInfo[item.id]) }}</to-tag>
        </to-descriptions-item>
        <to-descriptions-item v-else :key="item.id" :label="item.label">{{ global_mixin_cmpValues(item, detailInfo[item.id]) }}</to-descriptions-item>
      </template>
    </to-descriptions>
    <to-descriptions v-if="tag === 'text'" class="global_bd_padding" :title="title" :column="column">
      <template v-for="item in comFormItems">
        <to-descriptions-item v-if="item.type === 'subtags'" :key="item.id" :label="item.label">
          <slot :name="item.id" :item="item" />
        </to-descriptions-item>
        <to-descriptions-item v-else-if="item.arr" :key="item.id" :label="item.label">
          <to-tag size="small">{{ item.value }}</to-tag>
        </to-descriptions-item>
        <to-descriptions-item v-else :key="item.id" :label="item.label">{{ item.value }}</to-descriptions-item>
      </template>
    </to-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 可选值：
     * 'tag'  || 'text'
     */
    tag: {
      type: String,
      default: 'tag'
    },
    title: {
      type: String,
      default: '基础信息'
    },
    column: {
      type: Number,
      default: 2
    },
    /**
     * 基于<YxtForm>组件，动态生成的JSON数组对象，格式如：
        {
            id: 'ruleName',
            type: 'input',
            inputType: 'input',
            label: '规则名称：',
            isAlwaysShow: true,
            rules: [
                { required: false, message: '请输入规则名称', trigger: 'blur' },
            ]
        },
        {
            id: 'status',
            type: 'select',
            label: '资源状态：',
            isAlwaysShow: true,
            rules: [
                { required: false, message: '请选择资源状态', trigger: 'blur' },
            ],
            arr: [
                { label: '正常', value: 1 },
                { label: '停用', value: 2 },
            ]
        },
      */
    comFormItems: {
      type: Array,
      default: () => [

      ]
    },
    /**
     * 接口详情数据对象
     */
    detailInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.subtags-txt {
    padding: 0 24px 0 0;
}
</style>
