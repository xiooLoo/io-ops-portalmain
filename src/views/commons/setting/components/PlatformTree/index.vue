<template>
  <div v-if="showAdminTree" id="leftclass" class="PlatformTree">
    <div v-if="!showTree" class="PlatformTree-left">
      <to-tooltip class="item" effect="dark" content="展开" placement="top">
        <to-button
          type="info"
          size="mini"
          icon="to-icon-arrow-right"
          class="right-arrow"
          @click="anPlatformTree"
        />
      </to-tooltip>
      <to-tooltip class="item" effect="dark" content="搜索" placement="top">
        <to-button type="info" size="mini" @click="anPlatformTree">
          <i class="to-icon-search" />
        </to-button>
      </to-tooltip>
      <to-tooltip class="item" effect="dark" content="展开" placement="top">
        <to-button type="info" size="mini" @click="anPlatformTree">
          <i class="to-icon-c-scale-to-original" />
        </to-button>
      </to-tooltip>
    </div>
    <div v-show="showTree" id="platHeader" class="PlatformTree-center">
      <div class="PlatformTree-icon-center">
        <to-tabs v-model="activeName" class="platform_tab" @tab-click="handleClick">
          <to-tab-pane label="全部" name="first" />
          <to-tab-pane v-for="(item,index) in tabLists" :key="index" :label="item.name" :name="item.code" />
        </to-tabs>
        <div class="PlatformTree-right">
          <to-tooltip class="item" effect="dark" content="收起" placement="top">
            <to-button
              type="primary"
              size="mini"
              plain
              icon="to-icon-arrow-left"
              @click="packUpPlatformTree"
            />
          </to-tooltip>
          <to-tooltip class="item" effect="dark" content="展开" placement="top">
            <to-button
              :disabled="showTreeNext"
              type="primary"
              plain
              size="mini"
              icon="to-icon-arrow-right"
              @click="anPlatformTreeNext"
            />
          </to-tooltip>
        </div>
      </div>
      <to-input
        v-model="filterText"
        size="small"
        placeholder="请输入关键词"
        clearable
      >
        <to-button
          v-if="activeName == 'first'"
          slot="append"
          type="success"
          size="small"
          icon="to-icon-refresh"
          @click="getTreeData"
        />
      </to-input>
    </div>
    <div v-show="showTree" class="filter-tree-box">
      <to-tree
        ref="tree"
        v-loading="loading"
        class="filter-tree"
        :data="treeData"
        node-key="id"
        highlight-current
        :current-node-key="currentkeyId"
        :default-expanded-keys="defaultExpandedkeys"
        :props="defaultProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        render-after-expand
        :render-content="isNeedCurr ? renderContent : null"
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>
<script>
import { queryEnterprise, queryDict } from '../../api/setting'
export default {
  name: 'PlatformTree',
  props: {
    currentkeyId: {
      type: String,
      default: ''
    },
    isNeedCurr: {
      type: Boolean,
      default: false
    },
    currAction: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      showTree: true, // 展开
      showTreeNext: false, // 再次展开
      loading: true,
      tabLists: [], // tab列表
      activeName: 'first',
      defaultExpandedkeys: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: [],
      dictData: '', // 数据字典节点
      screenWidth: '', // 屏幕宽度
      showAdminTree: true
    }
  },
  computed: {
    areaCode() {
      return this.$store.getters.areaCode || this.$store.getters.loginInfo.areaCode
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getInitData()
  },
  mounted() {
    this.getDict()
    this.screenWidth = document.body.clientWidth
    const headerWidth = document.getElementById('platHeader')
    headerWidth.style.width = `${(this.screenWidth / 5) - 96}px`
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        headerWidth.style.width = `${(this.screenWidth / 5) - 96}px`
      })()
    }
  },
  methods: {
    queryTreeData(data) {
      this.$refs.tree.filter(data)
    },
    // 初始化加载数据判断是否有数据权限，控制是否显示左侧树
    async getInitData() {
      this.treeData = []
      const res = await queryEnterprise({
        enterprisePro: this.dictData
      })
      if (res.code == 0) {
        this.treeData = res.data.tree
        if (res.data.tree.length > 0) {
          this.showAdminTree = true
          this.defaultExpandedkeys.push(res.data.tree[0].id)
        } else {
          this.showAdminTree = false
        }
        this.$emit('changeShowTree', this.showAdminTree)
        this.loading = false
      }
    },
    // 获取树数据
    async getTreeData() {
      this.treeData = []
      const res = await queryEnterprise({
        enterprisePro: this.dictData
      })
      if (res.code == 0) {
        this.treeData = res.data.tree
        if (res.data.tree.length > 0) {
          this.defaultExpandedkeys.push(res.data.tree[0].id)
        }
      }
      this.loading = res.code != 0
    },
    // 展示
    anPlatformTree() {
      this.showTree = !this.showTree
      this.$emit('leftTreeChange', 1)
      const headerWidth = document.getElementById('platHeader')
      const leftWidth = document.getElementById('leftclass')
      leftWidth.style.width = `${this.screenWidth / 5}px`
      headerWidth.style.width = `${(this.screenWidth / 5) - 96}px`
    },
    // 再次展开
    anPlatformTreeNext() {
      this.showTreeNext = !this.showTreeNext
      this.$emit('leftTreeChange', 2)
      const headerWidth = document.getElementById('platHeader')
      const leftWidth = document.getElementById('leftclass')
      leftWidth.style.width = `${this.screenWidth / 3.4}px`
      headerWidth.style.width = `${(this.screenWidth / 5) - 96}px`
    },
    // 收起
    packUpPlatformTree() {
      if (this.showTreeNext) {
        this.showTreeNext = false
        this.$emit('leftTreeChange', 1)
        const leftWidth = document.getElementById('leftclass')
        const headerWidth = document.getElementById('platHeader')
        leftWidth.style.width = `${this.screenWidth / 5}px`
        headerWidth.style.width = `${(this.screenWidth / 5) - 96}px`
      } else {
        this.showTree = !this.showTree
        this.$emit('leftTreeChange', 0)
        const leftWidth = document.getElementById('leftclass')
        const headerWidth = document.getElementById('platHeader')
        leftWidth.style.width = '48px'
        headerWidth.style.width = '0'
      }
    },
    // 区域树点击
    handleNodeClick(data) {
      const Selectdata = {
        ...data,
        dictData: this.dictData
      }
      this.$emit('node-click', Selectdata)
    },
    // 树查询
    filterNode(value, data, node) {
      /**
       * --【弃用】--
       * elementUI Tree组件自身bug
       * 这种写法无法显示超过3层树结构的子菜单
       if (!value) return true;
       return data.name.indexOf(value) !== -1;
       */
      if (!value) {
        return true
      }
      return this.chooseNode(value, data, node)
    },
    // 获取tab数据
    async getDict() {
      // this.tabLists = this.$store.getters.httpDic['DICT_AGENCY_PROPERTIES']
      const res = await queryDict('DICT_AGENCY_PROPERTIES')
      if (res.code == 0) {
        this.tabLists = res.data
      }
    },
    // tab点击
    handleClick(tab) {
      this.filterText = ''
      this.loading = true
      this.activeName = tab.name
      if (tab.name === 'first') {
        this.dictData = ''
        this.getTreeData()
      } else {
        const data = this.$fetchKey.formatLabelValue(tab.name)
        const result = []
        data.forEach(ele => {
          result.push(`property_${ele.value}`)
        })
        this.dictData = result.join(',')
        this.$refs.tree.filter(this.dictData)
      }
      const result = this.dictData.replaceAll('property_', '')
      this.$emit('handleCurrentTab', result)
      this.loading = false
    },
    tabChooseNode(dictData, data, node, query) {
      let bool = false
      if (data.type == 2) {
        // console.log('-property-', data.property, '-dictData-', dictData, '-includes-', dictData.includes(data.property))
        if (query.includes('property_')) {
          const result = dictData.replaceAll('property_', '')
          if (result.includes(data.property)) {
            // console.log('---', node.level, '---', query);
            bool = true
          }
        } else {
          bool = this.queryChooseNode(query, data, node)
        }
        // let dictArr = dictData.split(',');
        // if(dictArr.includes(data.property)) {
        //   if(query.split(',').length > 1) {
        //     // console.log('---', node.level, '---', query);
        //     bool = true;
        //   } else {
        //     bool = this.queryChooseNode(query, data, node);
        //   }
        // }
      }
      this.loading = false
      return bool
    },
    queryChooseNode(value, data, node) {
      const level = node.level
      if (data.name.indexOf(value) !== -1) {
        return true
      }
      // 先取当前节点的父节点
      let parentData = node.parent
      // 遍历当前节点的父节点
      let index = 0
      while (index < (level - 1)) {
        // 如果匹配到直接返回，此处name值是中文字符
        if (parentData.data.name.indexOf(value) !== -1) {
          return true
        }
        // 否则的话再往上一层做匹配
        parentData = parentData.parent
        index++
      }
      // 没匹配到返回false
      this.loading = false
      return false
    },
    chooseNode(value, data, node) {
      const level = node.level
      // 如果传入的节点本身就是一级节点就不用校验了
      if (level === 1) return false
      let bool = false
      if (this.dictData) { // dictData有值说明tab切换
        bool = this.tabChooseNode(this.dictData, data, node, value)
      } else {
        bool = this.queryChooseNode(value, data, node)
      }
      return bool
    },
    renderContent(h, { node, data }) {
      if (data && data.type == 2 && data.children && data.children.length) {
        return (
          <span class='custom-tree-node'>
            <span>{node.label}</span>
            <span class='custom-tree-node-btns'>
              <to-button
                size='mini'
                type='text'
                on-click={e => {
                  e.stopPropagation()
                  this.currAction(data)
                }}
              >
                仅看本单位
              </to-button>
            </span>
          </span>
        )
      } else {
        return (
          <span class='custom-tree-node'>
            <span>{node.label}</span>
          </span>
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.PlatformTree{
  width:calc(100% / 5);
  height: 100%;
  background-color:$yxt-color-white-1;
  margin-right:24px;

  .platform-header{
    width:100%;
    background-color:Red;
  }
.PlatformTree-left{
padding-top: 12px;
width:48px;
position: relative;
display: flex;
align-items: center;
flex-direction: column;
height:100vh;
 .to-button{
   width:32px;
   height:32px;
   display:inline-block;
   padding:0;
   margin-left:0;
   margin-top:16px;
   background-color:$yxt-color-primary-8;
   border:solid 1px $yxt-color-primary-8;
   border-radius: 2px;
   font-size:$yxt-font-size-title-1;
   i{
     font-size:$yxt-font-size-title-1;
   }
 }
 .right-arrow{
   background-color:$yxt-color-primary-3;
   border:$yxt-color-primary-3;
   color:$yxt-color-primary-8;
   font-size: $yxt-font-size-title-1x;
 }
}
.PlatformTree-center{
background: $yxt-color-white-1;
padding:0 24px;
.PlatformTree-icon-center{
  display: flex;
  align-items: center;
}
.platform_tab{
  width:calc(100% - 39px);
  ::v-deep  .to-tabs__item{
     padding:0 5px;
     color: #14203b;
     font-size: $yxt-font-size-body-2;
  }
  ::v-deep  .to-tabs__item.is-active {
    color: $yxt-color-primary-8;
  }
}
.PlatformTree-right{
  width:auto;
  display: flex;
::v-deep .to-button--mini, .to-button--mini.is-round{
padding: 0px 0px;
}
.to-button{
  margin-left: 4px;
  margin-top: -10px;
}
}
::v-deep .to-input-group__append
,.is-disabled{
  background: $yxt-color-primary-8;
  border: 1px solid $yxt-color-primary-8;
  color: $yxt-color-white-1;
}
}

}
.filter-tree-box{
  height:85%;
  overflow-y: auto;
  margin-left:17px;
  margin-top:20px;
  ::v-deep  .to-tree-node__content{
    height:30px;
    color:$yxt-color-dark-3;
  }
  ::v-deep  .to-tree>.to-tree-node>.to-tree-node__content{
    font-weight:bold;
    color:$yxt-color-text-1;
  }

}
.PlatformTree-right-anclass{
  right: 10px;
}

.PlatformTree-right-anclass-next,
  .anclass
  {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #6666;
   ::v-deep .to-button--mini, .to-button--mini.is-round{
    padding: 0px 0px;
    }
  }
::v-deep .to-tree--highlight-current .to-tree-node.is-current>.to-tree-node__content {
    background-color: transparent ;
    color:$yxt-color-primary-8;
}
::v-deep  .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 50%;
  &-btns {
    display: inline-flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
