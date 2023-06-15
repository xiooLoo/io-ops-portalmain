<template>
  <to-descriptions
    class="detail-info"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(data, i) in detailItem">
      <to-descriptions-item :key="'row' + i" class="item-title" :label="data.label">
        <template v-if="data.type == 'tag'">
          <to-tag v-for="(tag, i) in parseData(data.value)" :key="'tag-'+ i" size="small" class="detail-tag"> {{ tag }} </to-tag>
        </template>
        <template v-else> {{ data.value }} </template>
        <span v-if="data.slot"><slot :name="data.slot"></slot></span>
      </to-descriptions-item>
    </template>
  </to-descriptions>
</template>
<script>

export default {
  name: 'DetailInfo',
  props: {
    detailItem: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    parseData() {
      return function(value) {
        if (!value) return []
        if (!value instanceof Array) {
          return [value]
        }
        return value
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.detail-info {
  background: #fff;
  ::v-deep.to-descriptions__header {
    font-weight: 500;
    font-size: 16px;
    color: rgba(20,32,59,0.90);
    padding: 15px 32px;
    border-bottom: 1px solid #EDEEF0;
  }
  ::v-deep.to-descriptions__body {
    font-weight: 400;
    font-size: 14px;
    color: #2B364E;
  }
  .detail-tag {
    margin-right: 8px;
  }
}
</style>
