<template>
  <PublicTable
    ref="filterTable"
    :list-loading="listLoading"
    :is-selection="isSelection"
    :is-showbtn="isShowbtn"
    :table-height="tableHeight"
    :table-data="tableData"
    :table-column="tableColumn"
    :current-page4="currentPage4"
    :is-pagination="true"
    :pagination-size="paginationSize"
    :pagination-total="paginationTotal"
    @handlePage="handlePage"
    @handleSize="handleSize"
  />
</template>
<script>
import PublicTable from '../../components/PublicTable'
import { getAccountLists } from '../../api/setting'
import { handleMobile } from '../../utils/index'
import { UserModule } from '@/store/modules/user'

export default {
  name: 'attributionPersonnel',
  components: {
    PublicTable
  },
  props: {
    enterpriseCode: {
      type: String,
      default: ''
    },
    deptCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      //* *---公共table开始-- */
      listLoading: true, // 是否显示加载特效
      isSelection: false, // 是否显示多选框
      isShowbtn: false,
      tableHeight: '500',
      // table数据数组
      tableData: [],
      // table头部参数
      tableColumn: [
        {
          title: '用户姓名',
          key: 'name'
        },
        {
          title: '手机号码',
          key: 'mobile',
          width: '130',
          formatter(value, column) {
            let mobile = value.mobile || ''
            return handleMobile(mobile)
          }
        },
        // {
        //   title: '职务',
        //   key: '',
        // },
        {
          title: '角色名称',
          key: 'roleGroupNameList',
          formatter(value, column) {
            return value.roleGroupNameList.toString()
          }
        },
        {
          title: '状态',
          key: 'status',
          width: 120,
          formatter(value, column) {
            if (value.status == 1) {
              return '启用'
            } else {
              return '禁用'
            }
          }
        }, {
          title: '是否司机',
          key: 'isDriver',
          width: 120,

          formatter(value, column) {
            if (value.isDriver == 1) {
              return '是'
            } else {
              return '否'
            }
          }
        }
      ],
      page: 1, // table分页器默认页数
      rows: 10, // table分页器默认每页条数
      // table操作列按钮
      currentPage4: 1, // table分页器默认页数
      paginationSize: 10, // table分页器默认每页条数
      paginationTotal: 20 // table分页器总条数
      //* *---公共table结束-- */
    }
  },
  computed: {
    userInfo() {
      return UserModule.userData.additionalInformation
    }
  },
  watch: {
    deptCode(val) {
      if (val) {
        this.queryAccount()
      }
    }
  },
  mounted() {
    if (this.deptCode) {
      this.queryAccount()
    }
  },
  methods: {
    // 获取账户列表接口
    async queryAccount() {
      const data = {
        page: this.page,
        rows: this.rows,
        enterpriseCode: this.enterpriseCode,
        deptCode: this.deptCode,
        tenantId: this.userInfo.tenantId
      }
      const res = await getAccountLists(data)
      this.tableData = res.data.list
      this.paginationTotal = res.data.total
    },
    // 页数改变
    handlePage(page) {
      this.page = page
      this.queryAccount()
    },
    // 条数改变
    handleSize(rows) {
      this.rows = rows
      this.queryAccount()
    }
  }
}
</script>
