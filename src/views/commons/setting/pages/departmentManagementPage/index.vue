<template>
  <div>
    <div class="unit">
      <PlatformTree is-need-curr :curr-action="handleCurrNodeClick" @node-click="handleNodeClick" @handleCurrentTab="handleCurrentTab" />
      <div class="unit-right">
        <div class="search-form">
          <MyForm
            v-show="isSearch"
            class="my-form"
            :form-items="deptformItems"
            :form-key="formKey"
            :row-span="3"
            @getFormValues="getFormValues"
            @resetForm="resetBtn"
          />
        </div>
        <div class="unit-right-btn">
          <div class="action-btns-inline">
            <!-- v-if="$has('front_dept_manage:add')" -->
            <to-button
              icon="-to-icon-edit-outline"
              class="global_button_i"
              type="primary"
              @click="AddBtn"
            >
              新增
            </to-button>
            <!-- v-if="$has('front_dept_manage:batch_delete')" -->
            <to-button
              icon="to-icon-delete"
              :class="disabled?'global_button_iii':'global_button_i'"
              :disabled="disabled"
              @click="deleteBtn"
            >
              删除
            </to-button>
            <!-- <MyFileUpload :url-suffix="urlSuffix" @on-success="handleSuccess">
              <to-button
                v-if="$has('front_dept_manage:import')"
                slot="btn"
                class="single-button-bl"
                @click="ImportBtn"
              >
                导入
              </to-button>
            </MyFileUpload> -->
            <!-- <to-button v-if="$has('front_dept_manage:export')" class="single-button-bl" @click="ExportBtn">导出</to-button> -->
            <!-- <to-button v-if="$has('front_dept_manage:import')" class="single-button-bl" @click="importConfig">导入设置</to-button> -->
            <!-- <to-button v-if="$has('front_dept_manage:export')" class="single-button-bl" @click="exportConfig">导出设置</to-button> -->
            <!-- <to-button v-if="$has('front_dept_manage:template_download')" class="single-button-bl" @click="DownloadTemplateBtn">模板下载</to-button> -->
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
            :show-action="true"
            :zero-types="zeroTypes"
            :rowbtns="btnListData"
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
        <DepartmentDetail v-if="drawer" :pid="pid" @goback="goback" />
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
import { deptformItems, deptList, deptLevelLists, deptImportConfig } from './config'
import MyForm from '../../components/MyForm/index.vue'
import './css/agency.scss'
import { getDeptListsPage, DeptBatchDelete, DeptDelete, downloadExcel, exportExcel } from '../../api/setting'
import BaseTable from '../../components/BaseTable/index.vue'
import PlatformTree from '../../components/PlatformTree/index.vue'
import DepartmentDetail from './departmentManagementPageDetails'
import { UserModule } from '@/store/modules/user'
// import MyFileUpload from '../../components/MyFileUpload/index.vue'


export default {
  components: {
    BaseTable,
    PlatformTree,
    DepartmentDetail,
    MyForm
    // MyFileUpload
  },
  data() {
    return {
      deptformItems,
      formKey: {},
      deptLevelLists: deptLevelLists, // 部门级别列表
      isSearch: true,
      filterText: '',
      searchForm: {
        deptName: '',
        deptLevel: '',
        enterpriseCode: ''
      },
      unitAreaCode: '', // 树选中areaCode
      disabled: true,
      pid: '',
      selectIds: [],
      //* *---公共table开始-- */
      tableHeight: '580',
      listLoading: true, // 是否显示加载特效
      isSelection: true, // 是否显示多选框
      drawer: false, // 抽屉
      // table数据数组
      tableData: [],
      // table数据数组
      zeroTypes: [
        { label: '多选', type: 'selection', width: '50', align: 'center', fixed: 'left' },
        { label: '序号', type: 'index', width: '50', align: 'center', fixed: 'left' }
      ],
      // table头部参数
      tableColumn: [
        {
          title: '部门名称',
          key: 'deptName'
        },
        {
          title: '部门级别',
          key: 'deptLevel',
          formatter(value) {
            let data
            deptLevelLists.forEach(ele => {
              if (ele.value === value.deptLevel) {
                data = ele.label
              }
            })
            return data
          }
        },
        {
          title: '归属车辆数',
          key: 'deptVehicleNum'
        },
        {
          title: '归属人数',
          key: 'deptPersonNum'
        },
        {
          title: '归属单位',
          key: 'enterpriseName'
        }
      ],
      // table操作列按钮
      paginationLayout: 'prev, pager, next, sizes,jumper',
      btnList: deptList,
      btnListData: [
        {
          label: '编辑',
          value: 'edt',
          type: 'text',
          needSkip: true,
          btnAuthorityFun: 'isBtnAcountSet',
          code: true // this.$has('front_dept_manage:edit')
        },
        {
          label: '详情',
          value: 'det',
          type: 'text',
          needSkip: true,
          code: true // this.$has('front_dept_manage:detail')
        },
        {
          label: '删除',
          value: 'del',
          type: 'text',
          needSkip: false,
          btnAuthorityFun: 'isBtnAcountSet',
          code: true // this.$has('front_dept_manage:delete')
        }
      ],
      // 分页
      paginationConfig: {
        currentPage: 1,
        currentSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      page: 1, // table分页器默认页数
      rows: 10, // table分页器默认每页条数
      paginationTotal: 20, // table分页器总条数
      //* *---公共table结束-- */
      mixin_pageSign: 'departmentFile',
      urlSuffix: 'departmentFile',
      mixin_configItems: deptImportConfig,
      mixin_is_need_concat: true,
      dictProperty: [], // 字典性质
      showChild: true
    }
  },
  computed: {
    areaCode: {
      get() {
        return UserModule.userData.additionalInformation.areaCode
      },
      set(newValue) {
        return newValue
      }
    },
    userInfo() {
      return UserModule.userData.additionalInformation
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
    /* this.unitAreaCode = this.areaCode;
    if(this.userInfo.enterpriseCode) {
      this.searchForm.enterpriseCode = this.userInfo.enterpriseCode;
    }*/
    this.$httpDic([
      'DICT_USER_STATUS', 'DICT_USER_IS_DRIVER', 'DICT_SERVICERS_TYPE', 'DICT_SERVICERS_STATUS', 'DICT_DRIVER_LICENSE_TYPE',
      'DICT_AGENCY_PROPERTIES', 'DICT_AGENCY_GRADE', 'DICT_DEPT_LEVEL',
      'DICT_AGENCY_FUNDS_SOURCE', 'DICT_AGENCY_ADMINISTRATIVE_RANK', 'DICT_AGENCY_TRADE', 'DICT_AGENCY_BUDGET_LEVEL'
    ]).then(() => {
      this.queryDeptLists()
    })
  },
  methods: {
    // table右侧操作栏按钮权限控制，btnObj来自配置文件tableBtnArr，具体各个方法写在computed里
    isBtnShowFun(row, btnObj, callback) {
      let { orderStatus, btnAuthorityFun } = btnObj
      callback(this[btnAuthorityFun](row, orderStatus))
    },
    handleCurrentTab(dictData) {
      this.dictProperty = (dictData && dictData.length) ? dictData.split(',') : []
      this.queryDeptLists()
    },
    // 列表功能
    handleTableActions(query) {
      if (query.key === 'handleSelectionChange') {
        this.handleSelectionChange(query.arr)
      } else if (query.key === 'handleAction') {
        switch (query.obj.btn.value) {
        case 'edt':
          this.$router.push({
            path: 'departmentManagementPage/departmentManagementPageEditor',
            query: {
              id: query.obj.row.id,
              areaCode: this.unitAreaCode
            }
          })
          break
        case 'det':
          this.pid = query.obj.row.id
          this.drawer = true
          break
        case 'del':
          this.id = query.obj.row.id
          this.deleteDialog({ content: '请确认是否删除当前单位?', subhead: '删除', tipIcon: 'iconguanbi', color: 'error' }, true)
          break
        default:
          break
        }
      } else if (query.key === 'handlePageChange') {
        this.paginationConfig.currentPage = query.page
        this.queryDeptLists()
      } else if (query.key === 'handleSizeChange') {
        this.paginationConfig.currentSize = query.size
        this.queryDeptLists()
      }
    },

    getFormValues(e) {
      this.searchForm = e
      this.page = 1
      this.rows = 10
      this.queryDeptLists()
    },
    //* *---记录5条最新历史记录开始--- */
    querySearch(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      const noRoNameHistory = JSON.parse(localStorage.getItem('department'))
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
      const value = this.searchForm.deptName
      const cnoOrName = 'department'
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
    // 头部过滤
    filterChange(val) {
      console.log('头部过滤', val)
    },
    // 查询展示与否
    HideSearchBtn() {
      this.isSearch = !this.isSearch
    },
    // 刷新
    refreshBtn() {
      this.queryDeptLists()
    },
    sameNode(data) {
      if (data.type === 1) {
        this.unitAreaCode = data.code
        this.searchForm.enterpriseCode = ''
      } else if (data.type === 2) {
        this.unitAreaCode = data.parentId
        if (data.areaCode) {
          this.unitAreaCode = data.areaCode
        }
        this.searchForm.enterpriseCode = data.code
      }
      this.page = 1
      this.rows = 10
      this.queryDeptLists()
    },
    handleCurrNodeClick(data) {
      this.showChild = false
      this.sameNode(data)
    },
    handleNodeClick(data) {
      this.showChild = true
      this.sameNode(data)
    },
    // 获取部门列表接口
    async queryDeptLists() {
      let areaCode = this.unitAreaCode
      if (areaCode.slice(-4) === '0000') {
        areaCode = areaCode.slice(0, 2)
      }
      const data = Object.assign(this.searchForm, {
        // page:this.page,
        // rows:this.rows,
        page: this.paginationConfig.currentPage,
        rows: this.paginationConfig.currentSize,
        areaCode: areaCode,
        propertyList: this.dictProperty,
        showChild: this.showChild
      })
      const res = await getDeptListsPage(data)
      this.listLoading = false
      if (res.data.list && res.data.list.length) {
        this.tableData = res.data.list
        this.paginationConfig.total = res.data.total
      } else if (this.page !== 1) {
        this.page -= 1
        this.queryDeptLists()
      } else {
        this.tableData = []
        this.paginationConfig.total = 0
      }
    },
    handlePage(page) {
      this.page = page
      this.queryDeptLists()
    },
    handleSize(rows) {
      this.rows = rows
      this.queryDeptLists()
    },
    // 查询
    searchBtn() {
      console.log('查询', this.searchForm)
      this.setIntoStorage()
      this.queryDeptLists()
    },
    // 重置查询
    resetBtn() {
      this.page = 1
      this.rows = 10
      this.queryDeptLists()
    },
    // 新增
    AddBtn() {
      console.log(this.unitAreaCode, '--index')
      this.$router.push({
        path: 'departmentManagementPage/departmentManagementPageAdd',
        query: {
          areaCode: this.unitAreaCode,
          enterpriseCode: this.searchForm.enterpriseCode
        }
      })
    },
    // 导入
    ImportBtn() {
      console.log('导入')
    },
    // 导出
    ExportBtn() {
      let areaCode = this.unitAreaCode
      if (areaCode.slice(-4) === '0000') {
        areaCode = areaCode.slice(0, 2)
      }
      const data = Object.assign(this.searchForm, {
        areaCode: areaCode
      })
      this.$fetchDownLoad(exportExcel, 'departmentFile', data)
    },
    // 模板下载
    DownloadTemplateBtn() {
      this.$fetchDownLoad(downloadExcel, 'departmentFile')
    },
    // 勾选操作
    handleSelectionChange(val) {
      // if(SelectionVsRadio==='1'){
      //   console.log('val-单勾选问题-',val)
      // }else{
      //   console.log('val-多勾选问题-',val)
      // }
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
          path: 'departmentManagementPage/departmentManagementPageEditor',
          query: {
            id: vals.id,
            areaCode: this.unitAreaCode
          }
        })
      }
    },
    // 关闭详情抽屉
    goback(val) {
      console.log('关闭', val)
      this.drawer = val
    },
    // 列表按钮操作不跳转页面
    notJumpTo(val, vals) {
      this.id = vals.id
      this.deleteDialog({ content: '请确认是否删除当前单位?', subhead: '删除', tipIcon: 'iconguanbi', color: 'error' }, true)
    },
    deleteBtn() {
      this.deleteDialog({ content: '请确认是否删除该单位?', subhead: '删除', tipIcon: 'iconguanbi', color: 'error' }, false)
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
          isOneDelete ? this.deleteDept(this.id) : this.deleteDeptBatch(this.selectIds)
        }
      })
    },
    // 批量删除
    async deleteDeptBatch(ids) {
      await DeptBatchDelete({ ids }).then(res => {
        if (res && res.code == 0) {
          this.$message({ message: '删除成功', type: 'success' })
          this.queryDeptLists()
        }
      })
    },
    // 单个删除
    async deleteDept(id) {
      await DeptDelete({ id }).then(res => {
        if (res && res.code == 0) {
          this.$message({ message: '删除成功', type: 'success' })
          this.queryDeptLists()
        }
      })
    },
    // 文件上传成功
    handleSuccess() {
      this.$message({ message: '导入成功', type: 'success' })
      this.queryDeptLists()
    }
  }
}
</script>

