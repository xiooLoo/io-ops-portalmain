<template>
  <div>
    <to-table
      ref="baseTableRef"
      v-loading="isCustomLoading"
      class="base-table-content"
      :header-cell-style="headerCellStyle"
      :element-loading-text="loadingConfig.loadingText"
      :element-loading-spinner="loadingConfig.loadingSpinner"
      :element-loading-background="loadingConfig.loadingBackground"
      :data="tableData"
      style="width: 100%;"
      :row-class-name="rowClassName"
      :border="tableBorder"
      :cell-class-name="cellClassName"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-sort="defaultSort"
      @select="clickSelect"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @cell-click="handleCellClick"
      @filter-change="handleFilterChange"
      :show-summary="showSummary"
      :summary-method="getSummaries"
    >
      <!--
        实现表格的折叠，需要用此插槽：slot='expand'，使用方式如下：
        <div slot="expand">
          <to-table-column
            type="expand"
            width="100"
            label="hh"
            align="left"
            :fixed="false"
          >
            <span>展开内容区...</span>
          </to-table-column>
        </div>
      -->
      <slot name="expand"/>
      <to-table-column
        v-for="item in zeroTypes"
        :key="item.type"
        :type="item.type"
        :width="item.width"
        :label="item.label"
        :align="item.align"
        :fixed="item.fixed"
        :selectable="selectable"
      />
      <template v-for="item in tableColumns">
        <to-table-column
          v-if="item.filters"
          :key="item.key"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          :align="item.align"
          :fixed="item.fixed"
          :formatter="item.formatter"
          :column-key="item.columnKey"
          :filters="item.filters?item.filters: []"
          :filter-multiple="item.filtermultiple"
          :filter-method="filterTag"
          :min-width="item.minWidth"
          :sortable="item.sortable"
          :sort-method="(item.sortable && sortway === 'method') ? sortMethod : null"
          :sort-by="(item.sortable && sortway === 'by') ? sortBy : null"
          :show-overflow-tooltip="item.tooltip"
          :filter-placement="item.filterPlacement"
        >
          <slot
            slot-scope="scope"
            name="isscope"
            :row="scope.row"
            :rowKey="item.key"
            :item="item"
            :index="scope.$index"
          />
        </to-table-column>
        <to-table-column
          v-else-if="item.isscope"
          :key="item.key"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          :align="item.align"
          :fixed="item.fixed"
          :column-key="item.columnKey"
          :min-width="item.minWidth"
          :sortable="item.sortable"
          :sort-method="(item.sortable && sortway === 'method') ? sortMethod : null"
          :sort-by="(item.sortable && sortway === 'by') ? sortBy : null"
          :formatter="item.formatter"
          :show-overflow-tooltip="item.tooltip"
          :filter-placement="item.filterPlacement"
        >
          <slot
            slot-scope="scope"
            name="isscope"
            :rowKey="item.key"
            :row="scope.row"
            :item="item"
            :index="scope.$index"
          />
        </to-table-column>
        <to-table-column
          v-else
          :key="item.key"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          :align="item.align"
          :fixed="item.fixed"
          :column-key="item.columnKey"
          :min-width="item.minWidth"
          :sortable="item.sortable"
          :sort-method="(item.sortable && sortway === 'method') ? sortMethod : null"
          :sort-by="(item.sortable && sortway === 'by') ? sortBy : null"
          :formatter="item.formatter"
          :show-overflow-tooltip="item.tooltip"
          :filter-placement="item.filterPlacement"
        />
      </template>

      <to-table-column
        v-if="showAction"
        :label="actionQuery.label"
        :width="actionQuery.width"
        :min-width="actionQuery.minWidth"
        :align="actionQuery.align"
        :fixed="actionQuery.fixed"
      >
        <div slot-scope="scope" class="actions-btns-box">
          <template v-for="btn in rowbtns">
            <template v-if="btn.isIcon">
              <to-tooltip
                v-show="btn.code"
                :key="btn.value"
                :effect="tooltipConfig.effect"
                :content="btn.label"
                :placement="tooltipConfig.placement"
              >
                <span class="table-action-icon" :class="[btn.icon]" @click="handleAction(btn, scope.row)" />
              </to-tooltip>
            </template>
            <template v-else>
              <to-button
                v-if="isBtnShowFun(scope.row, btn)"
                :key="btn.value"
                :style="{display: btn.code? btn.isshow ? scope.row[btn.isshow] : 'block' : 'none'}"
                :type="btn.type"
                size="mini"
                :class="btn.type === 'primary' ? 'yxt-base-button-type-lightblue' : btn.type === 'normal' ? 'yxt-base-button-type-normal' : btn.type === 'text' ? '' : 'yxt-base-button-type-primary'"
                :disabled="btn.disabled"
                @click="handleAction(btn, scope.row)"
              >
                {{ btn.label }}
              </to-button>
            </template>
          </template>
          <slot :row="scope.row" :index="scope.$index" />
        </div>
      </to-table-column>
    </to-table>
    <div v-if="showPagination" class="table-pagination-box">
      <BasePagination :paginationConfig="paginationConfig" :actions="paginationAction"/>
    </div>
  </div>
</template>
<script>
import BasePagination from '../BasePagination/index.vue'
export default {
  name: 'BaseTable',
  components: {
    BasePagination
  },
  props: {
    /**
     * 默认选中数组
     */
    defaultSelect: {
      type: Array,
      default: () => []
    },
    /**
     * 默认的排序列的 prop 和顺序。
     * 它的prop属性指定默认的排序的列，order指定默认排序的顺序
     */
    defaultSort: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * 空数据时显示的文本内容，也可以通过 slot="empty" 设置
     */
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    tableColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    headerCellStyle: {
      type: Object,
      default: () => {
        return {
          background: '#fafafa',
          color: '#606266'
        }
      }
    },
    /**
     * table第一列设置
     *
     * index      下标
       selection  选择框
     */
    zeroTypes: {
      type: Array,
      default: () => {
        return [
          /* { label: '多选', type: 'selection', width: '50', align: 'center', fixed: 'left' },
          { label: '序号', type: 'index', width: '50', align: 'center', fixed: 'left' },*/
        ]
      }
    },
    /**
     * 排序方式设置
     * by:      指定数据按照哪个属性进行排序
     * method:  自定义函数排序
     */
    sortway: {
      type: String,
      default: 'by'
    },
    /**
     * table是否显示操作列？？？
     */
    showAction: {
      type: Boolean,
      default: false
    },
    /**
     * table操作列按钮数组
     */
    rowbtns: {
      type: Array,
      default: () => [
        /* { label: '新增', value:'add', type: 'normal' },
          { label: '删除', value:'del', type: 'primary', disabled: false },
          { label: '编辑', value:'edit', isIcon: true, icon: 'to-icon-warning' }*/
      ]
    },
    /**
     * table操作列默认配置，可在外部自定义
     */
    actionQuery: {
      type: Object,
      default: function() {
        return {
          label: '操作',
          width: '200',
          minWidth: '120',
          align: 'left',
          fixed: 'right'
        }
      }
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
    actions: {
      type: Function,
      default: () => ({})
    },
    /**
     * table是否显示边框线？？？
     */
    tableBorder: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示分页组件？？？
     */
    showPagination: {
      type: Boolean,
      default: true
    },
    paginationConfig: {
      type: Object,
      default: function() {
        return {
          align: 'right',
          hasBackground: true,
          currentPage: 1, // 当前页
          currentSize: 10, // 共多少页
          pageSizes: [10, 20, 30, 40, 50],
          total: 0, // 总条数
          pagerCount: 5,
          layout: 'prev, pager, next, sizes, jumper'
        }
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    loadingConfig: {
      type: Object,
      default: function() {
        return {
          loadingText: '加载中...',
          loadingSpinner: 'to-icon-loading',
          loadingBackground: 'rgba(0, 0, 0, 0.2)'
        }
      }
    },
    /**
     *  特殊样式分页器1处理
     * 【非必传】
     */
    onlyOnePagination: {
      type: Boolean,
      default: true
    },
    /**
     * 是否需要设置禁选，配合actions使用
     */
    isSelectable: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    /**
     * 是否显示合计
     */
    showSummary: {
      type: Boolean,
      default: false
    }
  },
  created() {
    setTimeout(() => {
      this.isCustomLoading = false
    }, 100000)
    if (this.defaultSelect && this.defaultSelect.length > 0) {
      this.defaultSelectFun()
    }
  },
  watch: {
    defaultSelect(newTab) {
      if (newTab && newTab.length > 0) {
        this.defaultSelectFun()
      }
    }
  },
  computed: {
    isCustomLoading: {
      get() {
        return this.isLoading
      },
      set() {
        return !this.isLoading
      }
    }
  },
  methods: {
    defaultSelectFun() {
      this.defaultSelect.forEach(ele => {
        this.toggleSelection(ele, true)
      })
    },
    // 处理禁选
    selectable(row) {
      if (this.isSelectable) {
        let query = {
          key: 'selectable',
          obj: { row }
        }
        return this.actions(query)
      } else {
        return true
      }
    },
    // 表格的筛选条件发生变化的时候会触发该事件
    handleFilterChange(val) {
      let query = {
        key: 'filterChange',
        obj: {
          columnKey: Object.keys(val)[0],
          codes: val[Object.keys(val)[0]]
        }
      }
      this.actions(query)
    },
    filterTag() {
      return true
      // const property = column['property'];
      // return row[property] === value;
    },
    sortChange(obj) {
      this.actions({ key: 'sortChange', obj })
    },
    // 处理某列特殊样式问题
    cellClassName({ row, column }) {
      let property = column.property
      let query = {
        key: 'cell',
        obj: { row, property }
      }
      return this.actions(query)
    },
    rowClassName({ row }) {
      let query = {
        key: 'row',
        obj: { row }
      }
      return this.actions(query)
    },
    // 某个单元格被点击
    handleCellClick(row, column) {
      let property = column.property
      let query = {
        key: 'cellClick',
        obj: { row, property }
      }
      return this.actions(query)
    },
    sortMethod(val1, val2) {
      let query = {
        key: 'sortMethod',
        obj: { val1, val2 }
      }
      return this.actions(query)
    },
    sortBy() {
      let query = {
        key: 'sortBy',
        obj: {}
      }
      return this.actions(query)
    },
    handleAction(btn, row) {
      let query = {
        key: 'handleAction',
        obj: {
          btn,
          row
        }
      }
      this.actions(query)
    },
    handleSizeChange(size) {
      let query = {
        key: 'handleSizeChange',
        size
      }
      this.actions(query)
    },
    handlePageChange(page) {
      let query = {
        key: 'handlePageChange',
        page
      }
      this.actions(query)
    },
    /**
     * 分页
     */
    paginationAction(query) {
      this.actions(query)
    },
    handleSelectionChange(selectItems) {
      let query = {
        key: 'handleSelectionChange',
        arr: selectItems,
        oneSeclect: this.oneSeclect
      }
      this.actions(query)
    },
    oneSeclect(row) {
      this.clearSelection()
      this.toggleSelection(row, true)
    },
    toggleSelection(rows, boolean) {
      this.$nextTick(() => {
        this.$refs.baseTableRef.toggleRowSelection(rows, boolean)
      })
    },
    clearSelection() {
      this.$refs.baseTableRef.clearSelection()
    },
    clickSelect(selection, row) {
      let query = {
        key: 'clickSelect',
        row,
        selection
      }
      this.actions(query)
    },
    // 取消排序
    toggleSortthiscolumn() {
      this.$refs.baseTableRef.clearSort()
    },
    // 清除表头过滤
    toggleclearFilter() {
      this.$refs.baseTableRef.clearFilter()
    },
    clearFilterAndSort() {
      this.$refs.baseTableRef.clearSort()
      this.$refs.baseTableRef.clearFilter()
    },
    /**
     * 自定义是否主动关闭Loading
     * @time: 延时时间长度
     * @isTimeout 是否开启延时关闭Loading， true:开启， false:关闭
     */
    isloadingTime(time = 2000, isTimeout) {
      let _this = this
      if (isTimeout) {
        setTimeout(() => {
          _this.isCustomLoading = !_this.isCustomLoading
        }, time)
      } else {
        _this.isCustomLoading = !_this.isCustomLoading
      }
    },
    isBtnShowFun(row, btnObj) {
      if (btnObj.btnAuthorityFun) {
        let isShow = true
        this.$emit('isBtnShowFun', row, btnObj, type => {
          isShow = type
        })
        return isShow
      } else {
        return true
      }
    },
    // 求和
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
.actions-btns-box {
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .to-button {
    margin: 0 12px 0 0;
  }
}

.table-action-icon {
  cursor: pointer;
  color: #2e78ff;
  font-size: 20px;
  margin-left: 10px;
}

.table-pagination-box {
  display: flex;
  width: 100%;
  text-align: right;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  .onlyOnePagination {
    font-size: 14px;
    color: #586073;
  }

  .pagination-box-totalbox {
    font-size: 14px;
    color: #586073;
  }

  .to-pagination {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
