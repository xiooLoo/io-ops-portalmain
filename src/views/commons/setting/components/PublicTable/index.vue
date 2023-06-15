<!--
 *  功能：公共表格
 *  入参：
        tableBorder:        [非必传]是否显示边框
        listLoading:        [非必传]是否显示加载特效
        isSelection:        [非必传]是否显示多选框
        isRadio:            [非必传]是否显示单选框
        isShowbtn:          [非必传]是否显示操作列
        isShowAlign:        [非必传]操作列对齐方式
        isShowbtnWidth:     [非必传]操作列宽度
        tableData:          [必传]table数据数组
        tableColumn:        [必传]table头部参数;参数->title:表头名称,
                                              参数->key:表头对应key,
                                              参数->sortable:'custom'是否排序按钮,
                                              参数->fixed:'left'是否固定(left\right),
                                              参数->width:每列宽度,
                                              参数->align:每列对其方式,
                                              参数->filtermultiple:表头过滤是否多选,
                                              参数->tooltip:显示弹出框,
                                              参数->filterStatus:表头过滤数组,
        btnList:            [非必传]table操作列按钮;参数->btntitle:按钮名称,参数->needSkip:true是否跳转页面
        isPagination:       [非必传]table分页器是否显示
        currentPage4:       [非必传]table分页器默认页数
        paginationLayout:   [非必传]table分页器格式,例如'total, sizes, prev, pager, next, jumper'
        pageSizesList:      [非必传]table分页器条数数组,例如[ 10, 20, 30, 40 ]
        paginationSize:     [非必传]table分页器默认每页条数
        paginationTotal:    [必传]table分页器总条数
 *  用法：
        import PublicTable from '@/components/PublicTable'
        ...
        <template>
            <PublicTable
            ref="filterTable"
            :table-border="tableBorder"
            :list-loading="listLoading"
            :is-selection="isSelection"
            :is-radio="isRadio"
            :highlight-current-row="highlightCurrentRow"
            :is-showbtn="isShowbtn"
            :table-data="tableData"
            :table-column="tableColumn"
            :btn-list="btnList"
            :is-pagination="isPagination"
            :current-page4="currentPage4"
            :pagination-layout="paginationLayout"
            :page-sizes-list="pageSizesList"
            :pagination-size="paginationSize"
            :pagination-total="paginationTotal"
            @handleSelectionChange="handleSelectionChange"
            @CurrentChange="CurrentChange"
            @sortthiscolumn="sortthiscolumn"
            @RoutingHop="RoutingHop"
            @notJumpTo="notJumpTo"/>
        </template>
        ...
        methods: {
            //勾选操作
            handleSelectionChange(val,SelectionVsRadio){
              if(SelectionVsRadio==='1'){
                console.log('val-单勾选问题-',val)
              }else{
                console.log('val-多勾选问题-',val)
              }
            },
            //取消勾选
            toggleSelection(){
            this.$refs.filterTable.clearSelect();
            },
            //排序操作
            sortthiscolumn(val){
            console.log('val-排序问题-',val)
            },
            //取消排序
            toggleSortthiscolumn(){
            this.$refs.filterTable.clearSortThisColumn();
            },
            //单选问题
            CurrentChange(val){
            console.log('val-单选问题-',val)
            },
            //取消单选
            toggleCurren(){
            this.$refs.filterTable.setCurrent();
            },
            //列表按钮操作跳转页面
            RoutingHop(val,vals){
            console.log('val-列表按钮操作跳转页面-',val,vals)
            },
            //列表按钮操作不跳转页面
            notJumpTo(val,vals){
            console.log('val-列表按钮操作不跳转页面-',val,vals)
            },
        }
-->
<template>
  <div class="table-box">
    <div :class="isRadio ? 'tabale-top tabale-top-isRadio' : 'tabale-top'">
      <!-- :max-height="tableHeight" -->
      <to-table
        ref="tables"
        :header-cell-style="{ background: '#FAFAFA', color: '#606266' }"
        :loading="listLoading"
        :data="tableData"
        :border="tableBorder"
        :highlight-current-row="highlightCurrentRow"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :cell-class-name="cell"
        :row-class-name="tableRowClassName"
        :row-key="
          (row) => {
            return row.id;
          }
        "
        @select="selectRadio"
        @selection-change="handleSelectionChange"
        @current-change="CurrentChange"
        @sort-change="sortthiscolumn"
        @cell-click="handleCellClick"
        @filter-change="filterChange"
        @row-click="rowClick"
        @setCurrent="setCurrent"
      >
        <to-table-column
          v-if="isSelection || isRadio"
          type="selection"
          width="50"
          row-key="index"
          align="center"
          fixed="left"
          :reserve-selection="true"
          :selectable="selectable"
        />
        <to-table-column
          v-if="showIndex"
          type="index"
          width="50"
          label="序号"
          align="center"
          fixed="left"
        />
        <template v-for="val in tableColumn">
          <to-table-column
            v-if="!val.popover"
            :key="val.key"
            :width="val.width"
            :prop="val.key"
            :label="val.title | NAME_SPACE_FORMAT"
            :fixed="val.fixed"
            :sortable="val.sortable"
            :align="val.align"
            :filter-multiple="val.filtermultiple"
            :show-overflow-tooltip="val.tooltip"
            :filters="val.filterStatus"
            :filter-method="val.filterTag"
            :column-key="val.columnkey"
            :formatter="val.formatter"
          />
          <to-table-column
            v-else
            :key="val.key"
            :width="val.width"
            :label="val.title"
            :fixed="val.fixed"
            :prop="val.prop"
            :filters="val.filterStatus"
            :filter-multiple="val.filtermultiple"
            :filter-method="val.filterTag"
            :column-key="val.columnkey"
            :formatter="val.formatter"
          >
            <template slot-scope="scope">
              <slot
                :row="scope.row"
                :row1="val.key"
                :index="scope.$index"
                name="column"
              />
            </template>
          </to-table-column>
        </template>

        <to-table-column
          v-if="isShowbtn"
          :label="'操作' | NAME_SPACE_FORMAT"
          :align="isShowAlign"
          :width="isShowbtnWidth"
          :fixed="isBtnfixed"
        >
          <template slot-scope="scope">
            <div class="btn-icon-box-big">
              <template v-for="(item, index) in btnList">
                <to-button
                  v-if="$has(item.code) && scope.row.userId != userId"
                  :key="index"
                  :style="{ display: scope.row[item.tag] }"
                  type="text"
                  size="mini"
                  @click="handleEdit(item, scope.row)"
                >
                  {{ item.btntitle }}
                </to-button>
                <!-- 账号除过自身 -->
                <to-button
                  v-else-if="
                    $has(item.code) &&
                      scope.row.userId === userId &&
                      item.btntitle != '删除'
                  "
                  :key="index"
                  :style="{ display: scope.row[item.tag] }"
                  type="text"
                  size="mini"
                  @click="handleEdit(item, scope.row)"
                >
                  {{ item.btntitle }}
                </to-button>
              </template>
              <slot :row="scope.row" :index="scope.$index" />
            </div>
          </template>
        </to-table-column>
      </to-table>
    </div>
    <div class="tabale-bottom">
      <div>
        <div v-if="onlyOnePagination" class="onlyOnePagination">
          共 {{ paginationTotal }} 条&nbsp;第{{ currentPage4 }}/{{
            Math.ceil(paginationTotal / paginationSize)
          }}页
        </div>
        <div v-if="onlyOnePagination1" class="onlyOnePagination">
          共 {{ paginationTotal }} 条
        </div>
      </div>
      <to-pagination
        v-if="isPagination"
        :small="small"
        background
        :pager-count="pagerCount"
        :current-page="currentPage4"
        :page-sizes="pageSizesList"
        :page-size="paginationSize"
        :layout="paginationLayout"
        :total="paginationTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PublicTable',
  props: {
    /**
     *  table边框
     * 【非必传】
     */
    tableBorder: {
      type: Boolean,
      default: true
    },
    /**
     *  序号是否显示
     * 【非必传】
     */
    showIndex: {
      type: Boolean,
      default: true
    },
    /**
     *  table高度
     * 【非必传】
     */
    tableHeight: {
      type: String,
      default: '500'
    },
    /**
     *  table加载动效
     * 【非必传】
     */
    listLoading: {
      type: Boolean,
      default: false
    },
    /**
     *  table是否可以多勾选
     * 【非必传】
     */
    isSelection: {
      type: Boolean,
      default: true
    },
    /**
     *  table是否可以单勾选
     * 【非必传】
     */
    isRadio: {
      type: Boolean,
      default: false
    },
    /**
     *  table是否要高亮点击当前行
     * 【非必传】
     */
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    /**
     *  table是否显示操作列
     * 【非必传】
     */
    isShowbtn: {
      type: Boolean,
      default: true
    },
    /**
     *  table是否固定操作列
     * 【非必传】
     */
    isBtnfixed: {
      type: String,
      default: 'right'
    },
    /**
     *  table操作列表头对齐方式
     * 【非必传】
     */
    isShowAlign: {
      type: String,
      default: 'left'
    },
    /**
     *  table操作列宽度
     * 【非必传】
     */
    isShowbtnWidth: {
      type: Number,
      default: 260
    },
    /**
     *  table数组
     * 【必传】
     */
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     *  table头部参数
     * 【必传】
     */
    tableColumn: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     *  table按钮参数数组
     * 【非必传】
     */
    btnList: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     *  table分页器是否显示
     * 【非必传】
     */
    isPagination: {
      type: Boolean,
      default: true
    },
    /**
     *  table页码
     * 【非必传】
     */
    currentPage4: {
      type: Number,
      default: 1
    },
    /**
     *  table分页器完整功能
     * 【非必传】
     */
    paginationLayout: {
      type: String,
      default: 'prev, pager, next, sizes'
    },
    /**
     *  table分页器分页条数数组
     * 【非必传】
     */
    pageSizesList: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    },
    /**
     *  table分页器分页条数
     * 【非必传】
     */
    paginationSize: {
      type: Number,
      default: 10
    },
    /**
     *  table分页器总条数
     * 【必传】
     */
    paginationTotal: {
      type: Number,
      default: 10
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
     *  特殊样式分页器2处理
     * 【非必传】
     */
    onlyOnePagination1: {
      type: Boolean,
      default: false
    },
    /**
     *  特殊样式处理
     * 【非必传】
     */
    tipIndex: {
      type: Number,
      default: 0
    },
    /**
     *  设置分页类型
     * 【非必传】
     */
    small: {
      type: Boolean,
      default: false
    },
    /**
     * 选中数组，设置选中
     * 【非必传】
     */
    selectTions: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 所有@click 事件，通过key区分事件具体类型
     */
    // eslint-disable-next-line vue/require-default-prop
    actions: {
      type: Function
    },
    /**
     * 是否需要设置禁选，配合actions使用
     */
    isSelectable: {
      type: Boolean,
      default: false
    },
    /**
     * 页码按钮的数量，当总页数超过该值时会折叠
     * 必须为：大于等于 5 且小于等于 21 的奇数
     */
    pagerCount: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      checkList: [],
      userId: ''
    }
  },
  computed: {
    userInfo() {
      const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo')) || {}
      const userMsg = JSON.parse(localStorage.getItem('userMsg')) || {}
      return {
        ...this.$store.getters.userInfo,
        ...userMsg,
        ...tenantInfo
      }
    }
  },
  watch: {
    selectTions(newV) {
      if (newV) {
        this.selectItem(newV)
      }
    }
    // columns (columns) {
    //   this.handleColumns(columns)
    //   this.setDefaultSearchKey()
    // },
    // value (val) {
    //   this.handleTableData()
    //   this.handleSearch()
    // }
  },
  updated() {},
  created() {},
  mounted() {
    // 修复固定列文字错乱
    setTimeout(() => {
      this.$forceUpdate()
      this.$refs.tables.doLayout()
    }, 200)
    this.userId = this.userInfo.userId
    // if(this.selectTions.length>0){
    //   this.$nextTick(() => {
    //     this.selectItem(this.selectTions)
    //   })
    // }
  },
  methods: {
    // 列添加索引
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    // 头部过滤
    filterChange(filters) {
      this.$emit('filterChange', filters)
    },
    clearFilter() {
      this.$refs.tables.clearFilter()
    },
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
    rowClick(row, column, event) {
      this.$emit('rowClick', row, column, event)
    },
    // 某个单元格被点击
    handleCellClick(row, column, event, cell) {
      this.$emit('handleCellClick', row, column, event, cell)
    },
    // 某列样式调整
    cell({ row, columnIndex }) {
      // cell({ row, column, rowIndex, columnIndex }) {
      if (this.tipIndex) {
        if (columnIndex === this.tipIndex && row.diffNum && row.diffNum.indexOf('空编') !== -1) {
          // if (columnIndex === this.tipIndex && row.diffNum > 0) {
          return 'emptyDiff'
        } else if (columnIndex === this.tipIndex && row.diffNum && row.diffNum.indexOf('超编') !== -1) {
          // } else if (columnIndex === this.tipIndex && row.diffNum < 0) {
          return 'overDiff'
        } else if (columnIndex === this.tipIndex) {
          return 'account'
        }
      }
    },
    handleRepeatSelect(val) {
      let data = this.$refs.tables.selection
      let newArr = []
      val.forEach(item => {
        let isExist = false
        data.forEach(m => {
          if (item.id == m.id) {
            isExist = true
            return false
          }
        })
        if (!isExist) {
          newArr.push(item)
        }
      })
      newArr.forEach(ele => {
        this.$refs.tables.toggleRowSelection(ele, true)
      })
    },
    // 选中问题
    selectItem(val) {
      let data = this.$refs.tables.selection
      if (val.length > 0) {
        if (data && data.length > 0) {
          this.handleRepeatSelect(val)
        } else {
          val.forEach(ele => {
            this.$refs.tables.toggleRowSelection(ele, true)
          })
        }
      }
    },
    toggleSelection(rows, boolean) {
      this.$nextTick(() => {
        this.$refs.tables.toggleRowSelection(rows, boolean)
      })
    },
    // 单选勾选问题
    selectRadio(selection, row) {
      if (this.isRadio) {
        this.$refs.tables.clearSelection()
        if (selection.length === 0) return
        this.$refs.tables.toggleRowSelection(row, true)
      }
      this.$emit('clickSelect', row)
    },
    // 勾选问题
    handleSelectionChange(val) {
      let SelectionVsRadio = ''
      if (this.isSelection) {
        SelectionVsRadio = '2'
        this.$emit('handleSelectionChange', val, SelectionVsRadio)
      }
      if (this.isRadio) {
        if (val.length > 1) {
          this.$refs.tables.clearSelection()
          this.$refs.tables.toggleRowSelection(val.pop())
        } else {
          // eslint-disable-next-line no-lonely-if
          if (val.length > 0) {
            this.$emit('handleSelectionChange', val, SelectionVsRadio)
          }
        }
      }
    },
    // 取消勾选
    clearSelect() {
      this.$refs.tables.clearSelection()
    },
    // 排序
    sortthiscolumn(column) {
      this.$emit('sortthiscolumn', column)
    },
    // 清除排序
    clearSortThisColumn() {
      this.$refs.tables.clearSort()
    },
    // 单选问题
    CurrentChange(val) {
      this.$emit('CurrentChange', val)
    },
    // 取消单选
    setCurrent() {
      this.$refs.tables.setCurrentRow()
    },
    // 条数
    handleSizeChange(val) {
      this.$emit('handleSize', val)
    },
    // 页码
    handleCurrentChange(val) {
      this.$emit('handlePage', val)
    },
    // 列表按钮操作
    handleEdit(val, vals) {
      if (val.needSkip) {
        this.$emit('RoutingHop', val, vals)
      } else {
        this.$emit('notJumpTo', val, vals)
      }
    },
    clearFilterAndSort() {
      this.$refs.tables.clearSort()
      this.$refs.tables.clearFilter()
    }
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  .tabale-top {
    width: 100%;
    height: 100%;
  }
  .tabale-top-isRadio {
    ::v-deep .to-table
      .to-table__header
      .to-table-column--selection
      .cell
      .to-checkbox {
      display: none;
    }
  }
  .btn-icon-box-big {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .to-button {
      margin: 0 12px 0 0;
    }
  }
  .tabale-bottom {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 22px;
    .onlyOnePagination {
      font-size: 14px;
      color: $yxt-color-dark-3;
    }
    .to-pagination {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
::v-deep .account {
  .cell {
    color: #1890ff !important;
    text-decoration: underline;
    cursor: pointer;
  }
}
::v-deep .overDiff {
  .cell {
    color: $yxt-color-danger-9 !important;
    cursor: pointer;
  }
}
::v-deep .emptyDiff {
  .cell {
    color: $yxt-color-primary-8 !important;
    cursor: pointer;
  }
}
</style>
<style>
.atooltip {
  background: #4371e5 !important;
}
</style>
