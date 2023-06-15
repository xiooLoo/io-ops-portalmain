<template>
  <div class="accountManagement-box">
    <div class="top-serch">
      <MyForm
        class="my-form"
        :form-items="accountItems"
        :form-key="searchForm"
        :row-span="4"
        :actions="handleActions"
        @getFormValues="getOrResetForm"
        @resetForm="getOrResetForm"
      />
    </div>
    <div class="accountManagement-box-btn">
      <div class="row-possit-left">
        <MyInlineBtns :left-btns="allUnitsBtns" :actions="inlineActions" @on-success="queryAccount" />
      </div>
    </div>
    <BaseTable
      ref="filterTable"
      class="PublicTable-box"
      :table-data="tableData"
      :table-columns="tableColumn"
      :rowbtns="rowbtns"
      :show-action="true"
      :actions="tableActions"
      :zero-types="zeroTypes"
      :pagination-config="paginationConfig"
    >
      <template slot-scope="scope">
        <!-- v-if="$has('front_employee_manage_all:enable_disable')" -->
        <to-button
          type="text"
          size="small"
          class="changeAccount-box"
          @click.native.prevent="changeAccount(scope.$index, scope.row)"
        >
          {{ scope.row.status==1?"停用":"启用" }}
        </to-button>
      </template>
      <template v-slot:isscope="scope">
        <to-button v-if="scope.item.key='userName'" type="text">{{ scope.row.userName }}</to-button>
      </template>
    </BaseTable>
    <!-- 详情抽屉 -->
    <to-drawer
      :visible.sync="drawer"
      :append-to-body="true"
      :with-header="false"
      size="464px"
    >
      <AccountManagementDetail v-if="drawer" :pid="pid" @goback="goback" />
    </to-drawer>
  </div>
</template>
<script>
import { UserModule } from '@/store/modules/user'
import { getAccountLists, getCorporateListsByName } from '../../api/setting'
import { isDriverLists, resetBtnListObJ, accountManagementColumnObj, accountItems, allUnitsBtns, importConfig, exportConfig } from './config'
import mixinCommon from './mixin/mixinCommon'

export default {
  name: 'AllUnit',
  mixins: [mixinCommon],
  data() {
    return {
      compName: 'AllUnit',
      isActivated: false,
      rightConfig: {
        isShowSearch: true
      },
      accountItems,
      drawer: false, // 抽屉
      disabled: true,
      selectIds: [], // 选中id
      selectLists: [], // 选中列表
      singleSelectId: [], // 单选id
      areaCode: '',
      pid: 0,
      isDriverList: isDriverLists,
      enterpriseList: [],
      resetBtnList: resetBtnListObJ,
      //* *---公共table开始-- */
      // table数据数组
      tableData: [],
      // table头部参数
      tableColumn: accountManagementColumnObj,
      //* *---公共table结束-- */
      accountfrom: {
        userName: '',
        mobile: '',
        position: '',
        status: '',
        name: '',
        deptName: '',
        isDriver: '',
        type: '',
        startTime: '',
        crtTime: '',
        startName: '',
        crtName: ''
      },
      mixin_pageSign: 'accountManagement',
      allUnitsBtns,
      mixin_configItems: importConfig,
      mixin_is_need_concat: true,
      export_configItems: exportConfig,
      paginationConfig: {
        align: 'right',
        hasBackground: true,
        currentPage: 1, // 当前页
        currentSize: 10, // 共多少页
        pageSizes: [10, 20, 30, 40, 50],
        total: 0, // 总条数
        layout: 'prev, pager, next, sizes, jumper'
      },
      rowbtns: [
        // { label: '编辑', value: 'edit', type: 'text', code: this.$has('front_employee_manage_all:edit') },
        // { label: '详情', value: 'det', type: 'text', code: this.$has('front_employee_manage_all:detail') },
        // { label: '删除', value: 'del', type: 'text', code: this.$has('front_employee_manage_all:delete') }
        { label: '编辑', value: 'edit', type: 'text', code: true },
        { label: '详情', value: 'det', type: 'text', code: true },
        { label: '删除', value: 'del', type: 'text', code: true }
      ]
    }
  },
  computed: {
    userInfo() {
      return UserModule.userData.additionalInformation
    }
  },
  created() {
    this.areaCode = (this.userInfo && this.userInfo.areaCode) || this.$store.getters.loginInfo.areaCode
    const { page, rows } = this.searchForm
    this.paginationConfig.currentPage = page
    this.paginationConfig.currentSize = rows
    this.queryAccount()
    this.queryEnterprises()
  },
  methods: {
    inlineActions(btn) {
      this.heandleActions(btn, 'all')
    },
    tableActions(query) {
      this.handleTableActions(query, 'all')
    },
    handleActions(query) {
      if (query.key === 'enterpriseName') {
        this.queryEnterprises(query.value)
      }
      if (query.key === 'selectChange' && query.id === 'enterpriseName') {
        this.searchForm.enterpriseName = query.option
        this.searchForm.enterpriseCode = this.enterpriseList.filter(v => v.label === query.option)[0].enterpriseCode
        this.getOrResetForm({ enterpriseCode: this.searchForm.enterpriseCode })
      }
    },
    // 查询单位(前50条)
    async queryEnterprises(name) {
      await getCorporateListsByName({ name }).then(res => {
        const arr = []
        if (res && res.data.length) {
          res.data.map(item => {
            const obj = {
              ...item,
              label: item.name,
              value: item.name
            }
            arr.push(obj)
          })
        }
        this.enterpriseList = arr
        this.searchForm.enterpriseName = name

        const tempFormItems = []
        this.accountItems.forEach(item => {
          let single = {}
          if (item.id === 'enterpriseName') {
            single = {
              ...item,
              arr
            }
          } else {
            single = { ...item }
          }
          tempFormItems.push(single)
        })
        this.accountItems = tempFormItems
      })
    },
    // 获取账户列表接口
    async queryAccount() {
      await getAccountLists({
        ...this.searchData,
        areaCode: this.areaCode
      }).then(res => {
        if (res.code == 0) {
          if (res.data.list.length > 0) {
            this.tableData = res.data.list
          } else {
            this.tableData = []
            if (this.paginationConfig.currentPage != 1) {
              this.paginationConfig.currentPage -= 1
              this.searchForm.page -= 1
              this.changeActions(this.searchForm)
              this.queryAccount()
            }
          }
          this.paginationConfig.total = res.data.total || 0
        }
      })
    }
  }
}
</script>
