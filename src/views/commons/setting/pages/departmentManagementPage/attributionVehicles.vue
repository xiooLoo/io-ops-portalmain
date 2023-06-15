<template>
  <PublicTable
    ref="filterTable"
    :list-loading="listLoading"
    :is-selection="isSelection"
    :is-showbtn="isShowbtn"
    :table-height="tableHeight"
    :table-data="tableData"
    :table-column="tableColumn"
    :current-page4="page"
    :page-sizes-list="pageSizesList"
    :pagination-size="rows"
    :pagination-total="paginationTotal"
    @handlePage="handlePage"
    @handleSize="handleSize"
  />
</template>
<script>
import PublicTable from '../../components/PublicTable'
import { fetchList } from '../../api/setting'

export default {
  name: 'attributionVehicles',
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
    let self = this
    return {
      //* *---公共table开始-- */
      listLoading: true, // 是否显示加载特效
      isSelection: false, // 是否显示多选框
      isShowbtn: false,
      tableHeight: '500',
      // table数据数组
      tableData: [],
      vehicleStatusLists: [], // 车辆状态列表
      // table头部参数
      tableColumn: [
        {
          title: '车牌号码',
          key: 'vehicleNum'
        },
        {
          title: '车辆类型',
          key: 'vehicleModel',
          formatter(value, column) {
            if (value.vehicleModel) {
              return self.$fetchKey.findName('DICT_VEHICLE_TYPE', value.vehicleModel)
            } else {
              return ''
            }
          }
        },
        {
          title: '车辆性质',
          key: 'vehicleProperty',
          formatter(value, column) {
            if (value.vehicleProperty) {
              return self.$fetchKey.findName('DICT_VEHICLE_PROPERTIES', value.vehicleProperty)
            } else {
              return '无'
            }
          }
        },
        {
          title: '动力类型',
          key: 'vehiclePowerType',
          formatter(value, column) {
            if (value.vehiclePowerType) {
              return self.$fetchKey.findName('DICT_VEHICLE_POWER_TYPE', value.vehiclePowerType)
            } else {
              return '无'
            }
          }
        },
        {
          title: '状态',
          key: 'vehicleStatus',
          formatter(value, column) {
            if (value.vehicleStatus) {
              let data
              self.vehicleStatusLists.forEach(ele => {
                if (ele.value === value.vehicleDailyStatus) {
                  data = ele.label
                }
              })
              return data
            } else {
              return '无'
            }
            // if(value.vehicleStatus){
            //   return self.$fetchKey.findName('DICT_VEHICLE_STATUS',value.vehicleStatus)
            // }else{
            //   return '无'
            // }
          }
        },
        {
          title: '座位数',
          key: 'vehicleCarrierNum'
        }
      ],
      // table操作列按钮
      page: 1, // table分页器默认页数
      pageSizesList: [10, 20, 30, 40], // table分页器条数数组
      rows: 10, // table分页器默认每页条数
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
        this.queryVehicle()
      }
    }
  },
  mounted() {
    if (this.deptCode) {
      this.queryVehicle()
    }
    this.vehicleStatusLists = this.$fetchKey.formatCustomDicLabelValue(this.$store.getters.vehicleStatus)
  },
  methods: {
    // 获取车辆列表接口
    async queryVehicle() {
      const data = {
        page: this.page,
        rows: this.rows,
        deptCode: this.deptCode
        // enterpriseCode:this.enterpriseCode,
        // tenantId:this.userInfo.tenantId
      }
      const res = await fetchList(data)
      this.tableData = res.data.list
      this.paginationTotal = res.data.total
    },
    // 页数改变
    handlePage(page) {
      this.page = page
      this.queryVehicle()
    },
    // 条数改变
    handleSize(rows) {
      this.rows = rows
      this.queryVehicle()
    }
  }
}
</script>
