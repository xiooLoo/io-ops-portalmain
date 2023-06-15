<template>
  <div class="accountManagementDetail">
    <div class="accountManagementDetail-top">
      <p>{{ message }}</p>
      <div class="clone-btn-box"><i class="iconfont iconclose" @click="goback" /></div>
    </div>
    <div class="accountManagementDetail-scoll">
      <!-- 账号信息 -->
      <div class="accountManagementDetail-center">
        <div class="">
          <p>账号信息</p>
        </div>
        <table class="table-column">
          <tr>
            <td>{{ '账号：' | NAME_SPACE_FORMAT }}</td>
            <td>{{ accountfrom.userName }}</td>
          </tr>
          <tr>
            <td>手机号：</td>
            <td>{{ accountfrom.mobile }}</td>
          </tr>
          <tr>
            <td>是否驾驶员：</td>
            <td>{{ $fetchKey.findName('DICT_USER_IS_DRIVER',accountfrom.isDriver) }}</td>
          </tr>
          <tr>
            <td>{{ '状态：' | NAME_SPACE_FORMAT }}</td>
            <td>{{ $fetchKey.findName('DICT_USER_STATUS',accountfrom.status) }}</td>
          </tr>
          <tr>
            <td>用户姓名：</td>
            <td>{{ accountfrom.name }}</td>
          </tr>
          <tr>
            <td>单位/部门：</td>
            <td>{{ accountfrom.enterpriseName }}</td>
          </tr>
          <tr>
            <td>{{ '角色：' | NAME_SPACE_FORMAT }}</td>
            <td>{{ accountfrom.roleGroupNameList && accountfrom.roleGroupNameList.toString() }}</td>
          </tr>
        </table>
      </div>
      <!-- 驾照信息 -->
      <div class="accountManagementDetail-center">
        <div class="accountManagementDetail-center-title">
          <p>驾照信息</p>
        </div>
        <table class="table-column">
          <tr>
            <td>驾照类型：</td>
            <td>{{ $fetchKey.findName('DICT_DRIVER_LICENSE_TYPE',accountfrom.licenseType) }}</td>
          </tr>
          <tr>
            <td>驾照编号：</td>
            <td>{{ accountfrom.licenseNum }}</td>
          </tr>
        </table>
      </div>
      <!-- 操作日志 -->
      <div class="accountManagementDetail-center">
        <div class="accountManagementDetail-center-title">
          <p>操作日志</p>
        </div>
        <table class="table-column">
          <tr>
            <td>更新时间：</td>
            <td>{{ accountfrom.updTime }}</td>
          </tr>
          <tr>
            <td>创建时间：</td>
            <td>{{ accountfrom.crtTime }}</td>
          </tr>
          <tr>
            <td>更新人：</td>
            <td>{{ accountfrom.updUserName }}</td>
          </tr>
          <tr>
            <td>创建人：</td>
            <td>{{ accountfrom.crtUserName }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  accountDetails, accountEdit, getRoleLists,
  getDeptLists, getCorporateLists
} from '../../api/setting'
import { isAccont, isPassword, isName, isPhone, isLicenseNum } from '../../utils/index'

export default {
  components: {
  },
  props: {
    pid: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      id: '',
      accountfrom: {},
      parentCodeLists: [], // 单位列表
      deptLists: [], // 部门列表
      footertext: '关闭',
      rolesLists: [],
      isAccont: isAccont, // 账号验证
      isPassword: isPassword, // 密码验证
      isName: isName, // 姓名验证
      isPhone: isPhone, // 手机号验证
      isLicenseNum: isLicenseNum, // 驾照编号
      formName: 'ruleForm',
      message: '详情',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ruleForm: {
        userName: '',
        password: '',
        name: '',
        moblie: '',
        tenantId: '',
        areaCode: '',
        enterpriseCode: '',
        deptCode: '',
        status: '1',
        roleGroupIds: [],
        position: '',
        isDriver: '0'
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 0, max: 18, message: '长度在0 到 18 个字符', trigger: 'blur' },
          { validator: isAccont, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到 10 个字符', trigger: 'blur' },
          { validator: isName, trigger: 'blur', required: true }
        ],
        mobile: [
          { validator: isPhone, trigger: 'blur' }
        ],
        licenseNum: [
          { validator: isLicenseNum, trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '请选择平台', trigger: 'change' }
        ],
        enterpriseCode: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        roleGroupIds: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        isDriver: [
          { required: true, message: '请选择是否司机', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    pid: {
      handler(pid) {
        this.id = pid
      },
      deep: true,
      immediate: true
    }
  },
  // created(){
  //   this.id=this.pid
  // },
  mounted() {
    this.getAccountDetails()
  },
  methods: {
    // 返回
    goback() {
      this.$emit('goback', false)
    },
    // 获取账户详情接口
    async getAccountDetails() {
      const data = {
        id: this.id
      }
      const res = await accountDetails(data)
      let enterpriseCode = (res && res.data && res.data.workOrgList && res.data.workOrgList.length) ? res.data.workOrgList[0].enterpriseCode : ''
      let deptName = (res && res.data && res.data.workOrgList && res.data.workOrgList.length) ? res.data.workOrgList[0].deptName : ''
      let unitStr = ''
      if (res && res.data && res.data.workOrgList && res.data.workOrgList.length) {
        res.data.workOrgList.forEach((i, idx, arr) => {
          if (idx != arr.length - 1) {
            unitStr += `${i.enterpriseName || '-'}／${i.deptName || '-'}，`
          } else {
            unitStr += `${i.enterpriseName || '-'}／${i.deptName || '-'}`
          }
        })
      }

      let reMake = {
        ...res.data,
        enterpriseCode,
        enterpriseName: unitStr,
        deptName
      }
      this.ruleForm = reMake
      console.log('xxxxxxxxxxx:', res.data)
      this.accountfrom = reMake
      this.ruleForm.isDriver = 2
      this.queryCorporateLists()
      if (enterpriseCode) {
        this.queryDeptLists()
        this.queryRoleLists()
      }
    },
    // 选择单位后
    handleChange() {
      this.queryRoleLists()
      this.queryDeptLists()
    },
    // 角色选中项事件
    handleSelectChane(val) {
      if (val.length === 5) {
        this.$message({ message: '同一个账号，角色不能超过5个', type: 'warning' })
      }
    },
    // 获取单位列表不分页接口
    async queryCorporateLists() {
      const res = await getCorporateLists({
        areaCode: this.ruleForm.areaCode
      })
      this.parentCodeLists = res.data
    },
    // 获取部门列表不分页接口
    async queryDeptLists() {
      const res = await getDeptLists({
        enterpriseCode: this.ruleForm.enterpriseCode
      })
      this.deptLists = res.data
    },
    /** ---获取角色列表--- */
    async queryRoleLists() {
      const res = await getRoleLists({
        // tenantId:this.ruleForm.tenantId,
        // areaCode:this.ruleForm.areaCode,
        // deptId:this.ruleForm.deptId
        enterpriseCode: this.ruleForm.enterpriseCode,
        originRoleGroupIdList: this.ruleForm.roleGroupIds,
        editFlag: true
      })
      this.rolesLists = res.data
    },
    /** ---账户新增--- */
    async accountSubmit() {
      await accountEdit(this.ruleForm)
      this.$message({ message: '保存成功', type: 'success' })
      this.$router.go(-1)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.status = 1
          console.log('提交信息', this.ruleForm)
          this.accountSubmit()
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning' })
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './css/detail.scss'
</style>
