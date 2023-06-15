<template>
  <div class="deptDetail">
    <div class="deptDetail-top">
      <p>{{ message }}</p>
      <div class="clone-btn-box"><i class="iconfont iconclose" @click="goback" /></div>
    </div>
    <div class="dept-center">
      <div class="dept-title">
        <p>部门信息</p>
      </div>
      <table class="table-top">
        <tr>
          <td>归属单位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</td>
          <td>{{ ruleForm.enterpriseName }}</td>
        </tr>
        <tr>
          <td>部门名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</td>
          <td>{{ ruleForm.deptName }}</td>
        </tr>
        <tr>
          <td>部门级别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</td>
          <td>{{ $fetchKey.findName('DICT_DEPT_LEVEL', ruleForm.deptLevel ) }}</td>
        </tr>
      </table>
    </div>
    <div class="dept-center">
      <to-tabs v-model="activeName" @tab-click="handleClick">
        <to-tab-pane label="归属人员" name="first" />
        <to-tab-pane label="归属车辆" name="second" />
      </to-tabs>
      <div v-if="activeName==='first'">
        <attributionPersonnel ref="myordernum" :table-first="tableFirst" :enterprise-code="enterpriseCode" :dept-code="deptCode" />
      </div>
      <div v-else>
        <attributionVehicles :table-second="tableSecond" :enterprise-code="enterpriseCode" :dept-code="deptCode" />
      </div>
    </div>
  </div>
</template>
<script>
import './css/agency.scss'
import { DeptDetails } from '../../api/setting'
import attributionPersonnel from './attributionPersonnel'
import attributionVehicles from './attributionVehicles'

export default {
  name: 'DepartmentDetail',
  components: {
    attributionPersonnel,
    attributionVehicles
  },
  props: {
    pid: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      message: '详情',
      id: '',
      activeName: 'first',
      ruleForm: {
      },
      tableFirst: [],
      tableSecond: [],
      enterpriseCode: '',
      deptCode: ''
    }
  },
  created() {
    this.id = this.pid
  },
  mounted() {
    this.getDeptDetails()
  },
  methods: {
    // 详情
    async getDeptDetails() {
      const res = await DeptDetails({ id: this.id })
      this.ruleForm = res.data
      this.enterpriseCode = this.ruleForm.enterpriseCode
      this.deptCode = this.ruleForm.deptCode
      this.tableFirst = res.data.personList
      this.tableSecond = res.data.vehicleList
    },
    // 返回
    goback() {
      this.$emit('goback', false)
    },
    handleClick(val) {
      this.activeName = val.name
      this.enterpriseCode = this.ruleForm.enterpriseCode
    }
  }
}
</script>

