<template>
  <div class="tree-comp">
    <div class="tree-comp-top">
      <to-input  prefix-icon="to-icon-search" placeholder="输入关键字进行过滤" v-model="filterText" />
      <i class="to-icon-s-fold" @click="handleClick" />
    </div>
    <to-tree
      ref="tree"
      class="filter-tree"
      default-expand-all
      node-key="keyCode"
      :props="props"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :data="treeData"
      @node-click="changeNode"
    />
  </div>
</template>
<script>

export default {
  name: 'TreeComp',
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'hasChild'
      },
      filterText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleClick() {
      this.$emit('onRetract')
    },
    changeNode(data) {
      this.$emit('changeNode', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-comp-top {
  display: flex;
  .to-icon-s-fold {
    cursor: pointer;
    font-size: 24px;
    color: #898F9D;
    margin: 8px;
  }
}
</style>
