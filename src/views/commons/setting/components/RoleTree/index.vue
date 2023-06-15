<template>
  <div>
    <to-tree
      ref="roleTree"
      v-loading="loading"
      class="role_tree"
      :data="treeData"
      :show-checkbox="showCheckbox"
      node-key="id"
      :props="defaultProps"
      :expand-on-click-node="true"
      @node-click="handleNodeClick"
      @check-change="checkChange"
    />
  </div>
</template>
<script>
export default {
  name: 'RoleTree',
  props: {
    /**
     * tree数据
     * 【必传】
     */
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     *  tree基础配置
     * 【非必传】
     */
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      }
    },
    /**
     *  是否显示选择框
     * 【非必传】
     */
    showCheckbox: {
      type: Boolean,
      default: true
    },
    /**
     *  选中数据id
     * 【非必传】
     */
    checkeys: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loading: true,
      levelArray: [] // 一级数组
    }
  },
  watch: {
    checkeys(val) {
      if (val.length > 0) {
        this.$nextTick(() => {
          this.echoData(val)
        })
      }
    },
    treeData: {
      handler(n, o) {
        let result = []
        n.forEach(ele => {
          result.push(ele.id)
          this.levelArray = result
        })
        this.$nextTick(() => {
          this.handleExpanded()
        })
      },
      immediate: true, // 刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  },
  mounted() {},
  methods: {
    // 设置第一个父节点展开
    handleExpanded() {
      if (this.treeData.length > 0) {
        // 设置第一个父节点展开
        this.treeData.forEach((i, n, arr) => {
          let node = this.$refs.roleTree.getNode(i)
          this.$set(node, 'expanded', false)
          if (n === 0) {
            let nodes = this.$refs.roleTree.getNode(i)
            this.$set(nodes, 'expanded', true)
            this.loading = false
          }
        })
      } else {
        this.loading = false
      }
    },
    // 编辑数据回显
    echoData(data) {
      data.forEach((i, n) => {
        let node = this.$refs.roleTree.getNode(i)
        if (node.isLeaf) {
          this.$refs.roleTree.setChecked(node, true)
        }
      })
    },
    // 收缩一级节点
    handleShrink(val) {
      this.levelArray.forEach(ele => {
        let data = this.$refs.roleTree.getNode(ele)
        if (ele != val) {
          this.$set(data, 'expanded', false)
        } else {
          this.$set(data, 'expanded', true)
        }
      })
    },
    // 节点本身点击时，设置其不收缩
    handleNodeClick(val, node) {
      let self = this
      if (this.levelArray.includes(val.id)) {
        this.handleShrink(val.id)
        if (node.childNodes.length > 0) {
          this.$set(node, 'expanded', true)
          node.childNodes.forEach(ele => {
            this.$set(ele, 'expanded', true)
            if (ele.childNodes.length > 0) {
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              expanded(ele.childNodes)
            }
          })
        } else {
          for (
            let i = 0;
            i < this.$refs.roleTree.store._getAllNodes().length;
            i++
          ) {
            this.$refs.roleTree.store._getAllNodes()[i].expanded = false
          }
        }
      } else if (node.childNodes.length > 0) {
        this.$set(node, 'expanded', true)
        node.childNodes.forEach(ele => {
          this.$set(ele, 'expanded', true)
          if (ele.childNodes) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            expanded(ele.childNodes)
          }
        })
      }
      function expanded() {
        val.forEach(ele => {
          self.$set(ele, 'expanded', true)
          if (ele.childNodes.length > 0) {
            expanded(ele.childNodes)
          }
        })
      }
    },
    /** ---tree树选中事件--- */
    checkChange() {
      let checkedEquipments = []
      checkedEquipments = [
        ...this.$refs.roleTree.getCheckedKeys(),
        ...this.$refs.roleTree.getHalfCheckedKeys()
      ]
      let checkedNodes = this.$refs.roleTree.getCheckedNodes()
      this.$emit('checkChange', checkedEquipments, checkedNodes)
    }
  }
}
</script>
<style lang="scss" scoped>
.role_tree {
  width: calc(100% - 3px);
  position: relative;
  height: inherit;
  overflow: hidden;
  border: solid 1px $yxt-color-border-1;
  min-height: 300px;
  ::v-deep .to-tree-node {
    width: 16%;
  }
  ::v-deep .to-tree-node > .to-tree-node__content {
    width: 100%;
    justify-content: left;
    align-items: center;
    height: 40px;
    padding-bottom: 8px;
    border-top: none;
    border-left: none;
    border-bottom: none;
    padding-left: 16px !important;
    .to-tree-node__expand-icon {
      display: none;
    }
  }
  ::v-deep.to-tree-node.is-current > .to-tree-node__content {
    background-color: $yxt-color-primary-3;
    color: $yxt-color-primary-8;
  }
  ::v-deep .to-tree-node.is-current > .to-tree-node__content {
    background-color: transparent !important;
    color: #2e78ff;
  }
  ::v-deep .to-tree-node:nth-last-child(3) > .to-tree-node__content {
    border-bottom: none !important;
  }
  ::v-deep .to-tree-node > .to-tree-node__children {
    width: calc(84% - 40px);
    height: auto;
    max-height: 100%;
    overflow-y: auto;
    position: absolute;
    display: flex;
    flex-flow: wrap;
    top: 5px;
    left: calc((100% - 84%) + 24px);
    .to-tree-node {
      width: 100%;
      height: auto;
      .to-tree-node {
        width: 100%;
        .to-tree-node__children {
          .to-tree-node {
            width: auto;
            float: left;
            margin-left: 0;
            .to-tree-node__content {
              background-color: transparent;
            }
            .to-tree-node {
              width: auto;
              height: auto;
              float: left;
              margin-left: 0;
            }
          }
        }
      }
      .to-tree-node__children {
        .to-tree-node {
          width: auto;
          float: left;
        }
      }
    }
    .to-tree-node__content {
      .to-tree-node__expand-icon {
        display: block;
      }
      border: none;
      float: none;
      width: 100%;
      justify-content: left;
      background-color: $yxt-color-white-1;
    }
    .to-tree-node__children {
      width: calc(100% - 24px);
      border: none;
      float: none;
      position: static;
      height: auto;
      margin-left: 22px;
    }
  }
}
.role_tree::after {
  content: "";
  position: absolute;
  left: calc(16% + 16px);
  top: 0;
  width: 1px;
  height: 100%;
  background-color: $yxt-color-text-6;
}
</style>
