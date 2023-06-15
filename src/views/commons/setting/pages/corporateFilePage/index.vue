<template>
  <div>
    <div class="unit">
      <PlatformTree
        is-need-curr
        :curr-action="handleCurrNodeClick"
        :currentkey-id="currentkeyId"
        @node-click="handleNodeClick"
        @changeShowTree="changeShowTree"
        @handleCurrentTab="handleCurrentTab"
      />
      <div class="unit-right">
        <div class="search-form">
          <MyForm
            v-show="isSearch"
            class="my-form"
            :form-items="formItems"
            :form-key="formKey"
            :row-span="3"
            @getFormValues="getFormValues"
            @resetForm="resetBtn"
          />
        </div>
        <div class="unit-right-btn">
          <div class="action-btns-inline">
            <!-- v-if="$has('front_enterprise_info:add')" -->
            <to-button
              v-show="showAdd"
              class="global_button_i"
              type="primary"
              @click="AddBtn"
            >
              新增
            </to-button>
            <!-- v-if="$has('front_enterprise_info:batch_delete')" -->
            <to-button
              :class="disabled?'global_button_iii':'global_button_i'"
              :disabled="disabled"
              @click="deleteBtn"
            >
              删除
            </to-button>
            <!-- v-if="$has('front_enterprise_info:import')" v-if="$has('front_enterprise_info:export')" v-if="$has('front_enterprise_info:import')" v-if="$has('front_enterprise_info:export')" v-if="$has('front_enterprise_info:template_download')" -->

            <!-- <MyFileUpload :url-suffix="urlSuffix" @on-success="handleSuccess">
              <to-button
                slot="btn"
                class="single-button-bl"
              >
                导入
              </to-button>
            </MyFileUpload> -->
            <!-- <to-button class="single-button-bl" @click="ExportBtn">导出</to-button> -->
            <!-- <to-button class="single-button-bl" @click="importConfig">导入设置</to-button> -->
            <!-- <to-button class="single-button-bl" @click="exportConfig">导出设置</to-button> -->
            <!-- <to-button class="single-button-bl" @click="downloadTemplateBtn">模板下载</to-button> -->
          </div>
          <div class="special-btn-box">
            <to-tooltip effect="dark" :content="'搜索'" placement="top">
              <div class="special-btn" @click="HideSearchBtn"><i class="iconfont  iconyincangsousuo" /></div>
            </to-tooltip>
            <to-tooltip effect="dark" :content="'刷新'" placement="top">
              <div class="special-btn" @click="refreshBtn"><i class="iconfont  iconshuaxin" /></div>
            </to-tooltip>
            <!-- <to-tooltip effect="dark" :content="'表单设置'" placement="top">
              <div class="special-btn" @click="formSetting"><i class="iconfont  icona-set02iconset021" /></div>
            </to-tooltip> -->
          </div>
        </div>
        <div class="unit-table">
          <BaseTable
            ref="filterTable"
            class="PublicTable-box"
            :table-data="tableData"
            :table-columns="tableColumn"
            :rowbtns="tableBtns"
            :show-action="true"
            :zero-types="zeroTypes"
            :pagination-config="paginationConfig"
            :actions="handleTableActions"
            :is-loading="listLoading"
            @isBtnShowFun="isBtnShowFun"
          />
        </div>
      </div>
      <!-- 详情抽屉 -->
      <to-drawer
        :visible.sync="drawer"
        :append-to-body="true"
        :with-header="false"
        size="640px"
      >
        <CorporateFilePageDetail v-if="drawer" :pid="pid" @goback="goback" />
      </to-drawer>
      <!-- <MyTransferDialog
        ref="myTransferDialog"
        :source-list="sourceList"
        :target-list="targetList"
        :set-config="setConfig"
        :actions="handleSettingAction"
      /> -->
    </div>
  </div>
</template>
<script>
import {
  getCorporateListsPage, CorporateBatchDelete, CorporateDelete,
  confirmUnitDelete, queryEnterpriseLevel,
  downloadExcel, exportExcel
} from '../../api/setting'
import MyForm from '../../components/MyForm/index.vue'
import BaseTable from '../../components/BaseTable/index.vue'
import PlatformTree from '../../components/PlatformTree/index.vue'
import CorporateFilePageDetail from './corporateFilePageDetails'
import { formItems, enterpriseList, propertyLists, levelLists, importConfig, tableColumn, zeroTypes } from './config'
// import MyFileUpload from '../../components/MyFileUpload/index.vue'

export default {
  components: {
    BaseTable,
    PlatformTree,
    CorporateFilePageDetail,
    MyForm
    // MyFileUpload
  },
  data() {
    return {
      zeroTypes: zeroTypes,
      paginationConfig: {
        currentPage: 1,
        currentSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        total: 0,
        layout: 'prev, pager, next, sizes,jumper'
      },
      formItems,
      formKey: {},
      showAdd: true,
      urlSuffix: 'unitFile',
      currentkeyId: '',
      isSearch: true,
      hasVehicleLists: [{ value: 0, label: '否' }, { value: 1, label: '是' }],
      propertyLists: propertyLists, // 单位性质
      levelLists: levelLists, // 单位级别
      disabled: true,
      selectIds: [], // 选中id
      id: '',
      pid: '',
      filterText: '',
      searchForm: {
        enterpriseCode: '',
        showChild: false// 是否显示子集
      },
      //* *---公共table开始-- */
      tableHeight: '580',
      listLoading: true, // 是否显示加载特效
      drawer: false, // 抽屉
      // table数据数组
      tableData: [],
      // table头部参数
      tableColumn,
      unitAreaCode: '', // 树选中areaCode
      // table操作列按钮
      paginationLayout: 'prev, pager, next, sizes,jumper',
      btnList: enterpriseList,
      tableBtns: [
        {
          label: '编辑',
          value: 'edit',
          needSkip: true,
          type: 'text',
          btnAuthorityFun: 'isBtnAcountSet',
          code: true // this.$has('front_enterprise_info:edit')
        },
        {
          label: '详情',
          value: 'det',
          needSkip: true,
          type: 'text',
          code: true // this.$has('front_enterprise_info:detail')
        },
        {
          label: '删除',
          value: 'del',
          needSkip: false,
          type: 'text',
          btnAuthorityFun: 'isBtnAcountSet',
          code: true // this.$has('front_enterprise_info:delete')
        }
      ],
      page: 1, // table分页器默认页数
      rows: 10, // table分页器默认每页条数
      paginationTotal: 20, // table分页器总条数
      //* *---公共table结束-- */
      mixin_pageSign: 'unitFile',
      showAdminTree: false,
      dictProperty: [],
      mixin_configItems: importConfig,
      mixin_is_need_concat: true
    }
  },
  computed: {
    areaCode() {
      return this.$store.getters.areaCode || this.$store.getters.loginInfo.areaCode
    },
    userInfo() {
      return this.$store.getters.loginInfo.additionalInformation
    },
    currentPage() {
      return this.$store.getters.currentPage
    },
    currentRows() {
      return this.$store.getters.currentRows
    },
    searchList() {
      return this.$store.getters.searchList
    },
    isBtnAcountSet() {
      return function(rowData) {
        if (rowData.dataSource !== 2) {
          return true
        }
        return false
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    // this.$httpDic([
    //   'DICT_USER_STATUS', 'DICT_USER_IS_DRIVER', 'DICT_SERVICERS_TYPE', 'DICT_SERVICERS_STATUS', 'DICT_DRIVER_LICENSE_TYPE',
    //   'DICT_AGENCY_PROPERTIES', 'DICT_AGENCY_GRADE', 'DICT_DEPT_LEVEL',
    //   'DICT_AGENCY_FUNDS_SOURCE', 'DICT_AGENCY_ADMINISTRATIVE_RANK', 'DICT_AGENCY_TRADE', 'DICT_AGENCY_BUDGET_LEVEL'
    // ]).then(() => {
    //   })
    this.initForm()
  },
  activated() {
    this.queryCorporateListsPages()
  },
  methods: {
    // table右侧操作栏按钮权限控制，btnObj来自配置文件tableBtnArr，具体各个方法写在computed里
    isBtnShowFun(row, btnObj, callback) {
      let { orderStatus, btnAuthorityFun } = btnObj
      callback(this[btnAuthorityFun](row, orderStatus))
    },
    handleCurrentTab(dictData) {
      debugger
      this.dictProperty = (dictData && dictData.length) ? dictData.split(',') : []
      this.queryCorporateListsPages()
    },
    // 表格功能事件
    handleTableActions(query) {
      if (query.key === 'handleSelectionChange') {
        this.handleSelectionChange(query.arr)
      } else if (query.key === 'handleAction') {
        switch (query.obj.btn.value) {
        case 'edit':
          this.$router.push({
            path: 'corporateFilePage/corporateFilePageEditor',
            query: { areaCode: this.unitAreaCode, id: query.obj.row.id }
          })
          // this.$router.push({
          //   name: 'corporateFilePageEditor',
          //   params: {
          //     id:query.obj.row.id,
          //     areaCode:this.unitAreaCode
          //   }
          // });
          break
        case 'det':
          this.pid = query.obj.row.id
          this.drawer = true
          break
        case 'del':
          this.id = query.obj.row.id
          this.DeleteConfirmUnits([this.id], '请确认是否删除当前单位?', true)
          break
        default:
          break
        }
      } else if (query.key === 'handlePageChange') {
        this.paginationConfig.currentPage = query.page
        this.queryCorporateListsPages()
      } else if (query.key === 'handleSizeChange') {
        this.paginationConfig.currentSize = query.size
        this.queryCorporateListsPages()
      }
    },
    // showAdminTree判断是否需要显示下级
    changeShowTree(val) {
      this.showAdminTree = val
    },
    getFormValues(e) {
      let obj = JSON.parse(JSON.stringify(e))
      this.formKey = obj
      this.searchForm = obj
      this.page = 1
      this.rows = 10
      this.queryCorporateListsPages()
    },
    initForm() {
      let keyObj = {}
      this.formItems.forEach(i => {
        if (i.betws && i.betws.length) {
          i.betws.forEach(item => {
            keyObj[item.id] = ''
          })
        } else {
          keyObj[i.id] = ''
        }
      })
      this.formKey = keyObj
      this.queryCorporateListsPages()
    },
    //* *---记录5条最新历史记录开始--- */
    querySearch(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      const noRoNameHistory = JSON.parse(localStorage.getItem('corporate'))
      if (noRoNameHistory) {
        const results = queryString ? noRoNameHistory.filter(this.createFilter(queryString)) : noRoNameHistory
        cb(results)
      } else {
        const results = []
        cb(results)
      }
    },
    createFilter(queryString) {
      return noRoNameHistory => {
        return (noRoNameHistory.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    setIntoStorage() {
      const noArr = []// 历史记录数组
      const value = this.searchForm.name
      const cnoOrName = 'corporate'
      noArr.push({ value: value, type: cnoOrName })
      if (JSON.parse(localStorage.getItem(cnoOrName))) {
        // 判断是否已有xxx查询记录的localStorage
        if (localStorage.getItem(cnoOrName).indexOf(value) > -1) { // 判断是否已有此条查询记录，若已存在，则不需再存储
          return
        }
        if (JSON.parse(localStorage.getItem(cnoOrName)).length >= 5) {
          const arr = JSON.parse(localStorage.getItem(cnoOrName))
          arr.pop()
          localStorage.setItem(cnoOrName, JSON.stringify(arr))
        }
        localStorage.setItem(cnoOrName, JSON.stringify(noArr.concat(JSON.parse(localStorage.getItem(cnoOrName)))))
      } else { // 首次创建
        localStorage.setItem(cnoOrName, JSON.stringify(noArr))
      }
    },
    //* *---记录5条最新历史记录结束--- */
    // 查询展示与否
    HideSearchBtn() {
      this.isSearch = !this.isSearch
    },
    // 刷新
    refreshBtn() {
      this.queryCorporateListsPages()
    },
    // 获取当前单位层级
    async getEnterpriseLevel(data) {
      let res = await queryEnterpriseLevel(data)
      if (res.code == 0 && res.data > 2) {
        this.showAdd = false
      } else {
        this.showAdd = true
      }
    },
    sameNode(data, tag) {
      if (data.type === 1) {
        this.unitAreaCode = data.code
        this.searchForm.enterpriseCode = ''
        if (tag === 'oth') {
          this.searchForm.showChild = false
        }
      } else if (data.type === 2) {
        this.unitAreaCode = data.parentId
        if (data.areaCode) {
          this.unitAreaCode = data.areaCode
        }
        this.searchForm.enterpriseCode = data.code
        this.getEnterpriseLevel(data.code)
        if (tag === 'oth') {
          this.searchForm.showChild = true
        }
      }
      // 数据字典性质
      this.currentkeyId = data.id
      this.page = 1
      this.rows = 10
      this.queryCorporateListsPages()
      this.tableData = []
      this.disabled = true
      this.$refs.filterTable.clearSelection()
      this.selectIds = []
    },
    handleCurrNodeClick(data) {
      this.searchForm.showChild = false
      this.sameNode(data, 'curr')
      this.fetchListByParams(this.formKey)
    },
    handleNodeClick(data) {
      this.sameNode(data, 'oth')
    },
    // 获取单位分页列表接口
    async queryCorporateListsPages() {
      let areaCode = this.unitAreaCode
      if (areaCode.slice(-4) === '0000') {
        areaCode = areaCode.slice(0, 2)
      }
      const data = {
        ...this.formKey,
        // page:this.page,
        // rows:this.rows,
        page: this.paginationConfig.currentPage,
        rows: this.paginationConfig.currentSize,
        areaCode: areaCode,
        enterpriseCode: this.searchForm.enterpriseCode,
        showChild: this.searchForm.showChild,
        propertyList: this.dictProperty
      }
      const res = await getCorporateListsPage(data)
      this.tableData = res.data.list
      this.paginationTotal = res.data.total
      this.paginationConfig.total = res.data.total
      this.listLoading = false
    },
    // 重置查询
    resetBtn() {
      this.page = 1
      this.rows = 10
      this.queryCorporateListsPages()
    },
    // 页数改变
    handlePage(page) {
      this.page = page
      this.queryCorporateListsPages()
    },
    // 条数改变
    handleSize(rows) {
      this.rows = rows
      this.queryCorporateListsPages()
    },
    // 新增
    AddBtn() {
      this.$router.push({
        path: 'corporateFilePage/corporateFilePageAdd',
        query: { areaCode: this.unitAreaCode, enterpriseCode: this.searchForm.enterpriseCode, currentkeyId: this.currentkeyId }
      })
      // this.$router.push({
      //   name: 'corporateFilePageAdd',
      //   params: {
      //     areaCode:this.unitAreaCode,
      //     enterpriseCode:this.searchForm.enterpriseCode
      //   },
      //   query:{
      //     currentkeyId:this.currentkeyId
      //   }
      // });
    },
    // 导出
    ExportBtn() {
      let areaCode = this.unitAreaCode
      if (areaCode.slice(-4) === '0000') {
        areaCode = areaCode.slice(0, 2)
      }
      const data = Object.assign(this.searchForm, {
        areaCode: areaCode,
        showChild: this.searchForm.showChild,
        propertyList: this.dictProperty
      })
      this.$fetchDownLoad(exportExcel, 'unitFile', data)
    },
    // 模板下载
    downloadTemplateBtn() {
      this.$fetchDownLoad(downloadExcel, 'unitFile')
    },
    // 勾选操作
    handleSelectionChange(val) {
      this.selectIds = []
      if (val.length > 0) {
        val.forEach(item => {
          this.selectIds.push(item.id)
        })
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    // 列表按钮操作跳转页面
    RoutingHop(val, vals) {
      if (val.btntitle === '详情') {
        this.drawer = true
        this.pid = vals.id
      } else if (val.btntitle === '编辑') {
        this.$router.push({
          path: 'corporateFilePage/corporateFilePageEditor',
          query: { areaCode: this.unitAreaCode, id: vals.id }
        })
        // this.$router.push({
        //   name: 'corporateFilePageEditor',
        //   params: {
        //     id:vals.id,
        //     areaCode:this.unitAreaCode
        //   }
        // });
      }
    },
    // 关闭详情抽屉
    goback(val) {
      this.drawer = val
    },
    // 获取单位确认删除
    async DeleteConfirmUnits(ids, content, isOneDelete) {
      await confirmUnitDelete({ ids }).then(res => {
        if (!res.data && res.code === '20004') {
          this.$message({ message: res.msg, type: 'warning' })
        } else {
          this.deleteDialog({ content, subhead: '删除', tipIcon: 'iconguanbi', color: 'error' }, isOneDelete)
        }
        // !res.data ? (res.code === '20004' ? '' : this.$message({ message: res.msg, type: 'warning' })) : this.deleteDialog({ content, subhead: '删除', tipIcon: 'iconguanbi', color: 'error' }, isOneDelete)
      })
    },
    // 列表按钮操作不跳转页面
    notJumpTo(val, vals) {
      this.id = vals.id
      this.DeleteConfirmUnits([this.id], '请确认是否删除当前单位?', true)
    },
    deleteBtn() {
      this.DeleteConfirmUnits(this.selectIds, '请确认是否删除该单位?', false)
    },
    dialogFun(content, callback) {
      this.$baseDialog({
        isVisible: true,
        dialgData: { ...content },
        onOk: function() {
          callback('onOk', this)
        },
        onCancel: () => callback('onCancel')
      })
    },
    deleteDialog(dialogObj, isOneDelete) {
      let subhead = dialogObj.subhead
      this.dialogFun(dialogObj, (btnType, thisDialog) => {
        thisDialog && thisDialog.$closeDialog()
        if (btnType === 'onOk' && subhead === '删除') {
          isOneDelete ? this.deleteCorporate(this.id) : this.deleteCorporateBatch(this.selectIds)
        }
      })
    },
    // 批量删除
    async deleteCorporateBatch(ids) {
      const res = await CorporateBatchDelete({ ids })
      this.$message({ type: !res.data ? 'error' : 'success', message: !res.data ? res.msg : '删除成功' })
      this.queryCorporateListsPages()
      this.selectIds = []
      this.$refs.filterTable.clearSelection()
    },
    // 单个删除
    async deleteCorporate(id) {
      const res = await CorporateDelete({ id })
      this.$message({ type: !res.data ? 'error' : 'success', message: !res.data ? res.msg : '删除成功' })
      this.queryCorporateListsPages()
      this.selectIds = []
      this.$refs.filterTable.clearSelection()
    },
    // 文件上传成功
    handleSuccess() {
      this.$message({ message: '导入成功', type: 'success' })
      this.queryCorporateListsPages()
    }
  }
}
</script>
<style lang="scss" scoped>
@import './css/agency.scss'
</style>
