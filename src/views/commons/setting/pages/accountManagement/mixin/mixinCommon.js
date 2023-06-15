import '../css/list.scss'
import { accountDetails, accountDelete, accountEnable, accountDisable, accountReset } from '../../../api/setting'
import MyForm from '../../../components/MyForm/index.vue'
import MyInlineBtns from '../../../components/MyInlineBtns/index.vue'
import BaseTable from '../../../components/BaseTable/index.vue'
import AccountManagementDetail from '../accountManagementDetail.vue'

export default {
  components: {
    AccountManagementDetail,
    MyForm,
    MyInlineBtns,
    BaseTable
  },
  props: {
    // 所有@click 事件，通过key区分事件具体类型
    actions: {
      type: Function,
      default: () => { }
    },
    searchData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      zeroTypes: [
        { label: '多选', type: 'selection', width: '50', align: 'center', fixed: 'left' },
        { label: '序号', type: 'index', width: '50', align: 'center', fixed: 'left' }
      ]
    }
  },
  computed: {
    searchForm: {
      get: function () {
        return this.searchData
      },
      set: function (newValue) {
        return newValue
      }
    }
  },
  watch: {
    searchForm: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.queryAccount()
        }
      },
      deep: true
    }
  },
  activated() {
    if (this.isActivated) {
      this.queryAccount()
      this.isActivated = false
    }
  },
  methods: {
    changeActions(newSearchData) {
      this.actions({ key: this.compName, newSearchData })
    },
    // 查询或重置 表单
    getOrResetForm(newSearchData) {
      this.paginationConfig.currentPage = 1
      this.paginationConfig.currentSize = 10
      if (newSearchData) {
        newSearchData = {
          ...this.searchForm,
          page: 1,
          rows: 10,
          ...newSearchData
        }
      }
      this.changeActions(newSearchData)
    },
    // 关闭详情抽屉
    goback(drawer) {
      this.drawer = drawer
    },
    // 左侧操作按钮
    heandleActions(btn, tag) {
      switch (btn.value) {
      case 1:
        this.isActivated = true
        // let obj = { path: 'accountManagement/accountManagementAdd' };
        // if (tag) obj.params = { tag };
        this.$router.push({ path: 'accountManagement/accountManagementAdd', query: { tag } })
        break
      case 2:
        this.deleteBtn()
        break
      case 4:
        this.passwordRestoreBtn()
        break
      case 5:
        break
      case 6:
        this.ExportBtn()
        break
      case 7:
        this.importConfig()
        break
      case 8:
        this.exportConfig()
        break
      case 9:
        // this.$fetchDownLoad(downloadExcel, this.mixin_pageSign)
        break
      default:
        break
      }
    },
    // 导出
    ExportBtn() {
      // console.log('到处参数tenantId：', this.userInfo.tenantId)
      // console.log('到处参数areacode：', this.areaCode)
      // this.$fetchDownLoad(exportExcel, this.mixin_pageSign, {
      //   ...this.searchData,
      //   tenantId: this.userInfo.tenantId || this.tenantId,
      //   areaCode: this.areaCode
      // });
    },
    handleTableActions(query, tag) {
      let key = (query && query.key) ? query.key : ''
      if (key === 'cell' && query.obj && query.obj.property === 'userName') {
        return 'my-cell-class-name'
      } else if (key === 'cellClick' && query.obj && query.obj.property === 'userName') {
        this.pid = query.obj.row.id
        this.drawer = true
      } else if (key === 'handlePageChange') {
        this.paginationConfig.currentPage = query.page
        this.searchForm.page = query.page
        this.changeActions(this.searchForm)
        this.queryAccount()
      } else if (key === 'handleSizeChange') {
        this.paginationConfig.currentSize = query.size
        this.searchForm.rows = query.size
        this.changeActions(this.searchForm)
        this.queryAccount()
      } else if (key === 'handleSelectionChange') {
        this.selectIds = []
        this.selectLists = []
        if (query.arr.length > 0) {
          query.arr.forEach(item => {
            this.selectIds.push(item.id)
            this.selectLists.push(item)
          })
          this.disabled = false
          if (tag && tag === 'all') {
            this.allUnitsBtns[1].disabled = false
            this.allUnitsBtns[2].disabled = false
          } else {
            this.mineUnitsBtns[1].disabled = false
            this.mineUnitsBtns[2].disabled = false
          }
        } else {
          this.disabled = true
          if (tag && tag === 'all') {
            this.allUnitsBtns[1].disabled = true
            this.allUnitsBtns[2].disabled = true
          } else {
            this.mineUnitsBtns[1].disabled = true
            this.mineUnitsBtns[2].disabled = true
          }
        }
      } else if (key === 'handleAction') {
        let { btn, row } = query.obj
        if (btn.value === 'edit') {
          this.isActivated = true
          let params = { id: row.id }
          if (tag) {
            params.tag = tag
          }
          this.$router.push({
            path: `accountManagement/accountManagementEditor/${row.id}`,
            query: { id: row.id, tag }
          })
        } else if (btn.value === 'det') {
          this.pid = row.id
          this.drawer = true
        } else if (btn.value === 'del') {
          this.singleSelectId = [row.id]
          let content = row.isDriver == 1 ? '当前账号为驾驶员，删除账号将同步删除驾驶员档案，请确认是否删除?' : '请确认是否删除当前账号'
          this.deleteDialog({ content, subhead: btn.label, tipIcon: 'iconic_tingyong', color: 'error' })
        }
      }
    },
    // 启用
    changeAccount(index, row) {
      this.selectIds = [row.id]
      if (row.status === 1) {
        this.deleteDialog({ content: `请确认是否停用当前账号${row.userName}`, subhead: '停用', tipIcon: 'iconic_tingyong', color: 'error' })
      } else {
        this.EnableAccount(this.selectIds)
      }
    },
    deleteBtn() {
      this.singleSelectId = []
      let result = []
      this.selectLists.forEach(ele => {
        if (ele.isDriver == 1) {
          result.push(ele.userName)
        }
      })
      let content = '请确认是否删除当前账号'
      if (result.length > 5) {
        content = `${result.slice(0, 5).join('、')} ...等${result.length}个账号为驾驶员，删除账号将同步删除驾驶员档案，请确认是否删除？`
      } else if (result.length > 0) {
        content = `${result.join('、')}共计${result.length}个账号为驾驶员，删除账号将同步删除驾驶员档案，请确认是否删除？ `
      }
      this.deleteDialog({ content, subhead: '删除', tipIcon: 'iconguanbi', color: 'error' })
    },
    passwordRestoreBtn() {
      this.deleteDialog({ content: '请确认是否还原密码(初始密码为gwyc+999+@)', subhead: '密码还原', tipIcon: 'iconzhuyidapx', color: 'warning' })
    },
    dialogFun(content, callback) {
      // TODO: 用新的 Dialog 弹框替换此弹框
      this.$baseDialog({
        isVisible: true,
        dialgData: { ...content },
        onOk: function () {
          callback('onOk', this)
        },
        onCancel: () => callback('onCancel')
      })
    },
    deleteDialog(dialogObj) {
      let subhead = dialogObj.subhead
      this.dialogFun(dialogObj, (btnType, thisDialog) => {
        thisDialog && thisDialog.$closeDialog()
        if (btnType === 'onOk') {
          subhead === '停用' && this.DisableAccount(this.selectIds)
          subhead === '删除' && this.deleteAccount(this.singleSelectId.length > 0 ? this.singleSelectId : this.selectIds)
          subhead === '密码还原' && this.resetAccount(this.selectIds)
        }
      })
    },
    // 获取账户详情接口
    async getAccountDetails(id) {
      const res = await accountDetails({ id })
      this.accountfrom = res
    },
    // 启用请求接口
    async EnableAccount(ids) {
      await accountEnable({ ids })
      this.$message({ type: 'success', message: '启用成功' })
      this.queryAccount()
    },
    // 删除
    async deleteAccount(ids) {
      const res = await accountDelete({ ids })
      if (res.code == 0) {
        this.$message({ type: 'success', message: '删除成功' })
        this.queryAccount()
        this.$refs.filterTable.clearSelection()
      }
    },
    // 密码还原
    async resetAccount(ids) {
      const res = await accountReset({ ids })
      if (res.code == 0) {
        this.$message({ type: 'success', message: '密码还原成功' })
        this.queryAccount()
      }
    },
    // 停用请求接口
    async DisableAccount(ids) {
      await accountDisable({ ids })
      this.$message({ type: 'success', message: '停用成功' })
      this.queryAccount()
    }
  }
}
