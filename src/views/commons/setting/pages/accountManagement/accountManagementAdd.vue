<template>
  <!-- 账号新增 -->
  <div class="accountManagementAdd">
    <PageHeader :message="message" class="page-header-tip" />
    <div class="accountManagementAdd-bottom">
      <div class="accountManagementAdd-bottom-form">
        <to-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="110px"
          class="demo-ruleForm"
        >
          <to-form-item :label="'账户：' | NAME_SPACE_FORMAT" prop="userName">
            <to-input
              v-model.trim="ruleForm.userName"
              size="small"
              type="text"
              placeholder="请输入账号"
              clearable
              maxlength="18"
              :validate-event="false"
            />
          </to-form-item>
          <to-form-item :label="'密码：' | NAME_SPACE_FORMAT" prop="password">
            <to-input
              v-model.trim="ruleForm.password"
              size="small"
              placeholder="请输入密码"
              show-password
              clearable
              type="text"
              :maxlength="16"
            />
          </to-form-item>
          <to-form-item :label="'姓名：' | NAME_SPACE_FORMAT" prop="name">
            <to-input
              v-model.trim="ruleForm.name"
              size="small"
              placeholder="请输入姓名"
              type="text"
              clearable
              maxlength="10"
            />
          </to-form-item>
          <to-form-item label="手机号码：" prop="mobile">
            <to-input
              v-model.trim="ruleForm.mobile"
              size="small"
              placeholder="请输入手机号码"
              type="text"
              clearable
              maxlength="11"
              :validate-event="false"
            />
          </to-form-item>
          <!-- v-show="tag ==='all'" -->
          <to-form-item
            v-if="tag==='all'"
            label="所属区域："
            prop="areaCodeValue"
            :rules="{required:tag ==='all'?true:false, message: '请选择所属区域', trigger: 'change'}"
          >
            <to-cascader
              ref="cascader"
              v-model="ruleForm.areaCodeValue"
              size="small"
              :options="areaTreeData"
              :props="{ label: 'name',value:'code' }"
              filterable
              clearable
              @change="handleChangeArea"
            />
          </to-form-item>
          <to-form-item
            label="单位/部门："
            prop="enterpriseCode"
            class="form_column"
          >
            <SelectSearch
              type="unit"
              :model-value.sync="ruleForm.enterpriseCode"
              label="name"
              :area-code="ruleForm.areaCode"
              value="enterpriseCode"
              placeholder="请选择单位"
              @on-change="handleChange"
            />
          </to-form-item>
          <to-form-item prop="deptCode" class="form_columns">
            <to-select
              v-model="ruleForm.deptCode"
              size="small"
              placeholder="请选择部门"
              :disabled="!ruleForm.enterpriseCode"
              clearable
            >
              <to-option
                v-for="item in deptLists"
                :key="item.deptCode"
                :label="item.deptName"
                :value="item.deptCode"
              />
            </to-select>
          </to-form-item>
          <!-- <div class="clearFloat" /> -->
          <!-- <to-form-item label="状态">
        <to-radio-group v-model="ruleForm.status" placeholder="请选择状态">
          <to-radio label="正常" />
          <to-radio label="未激活" />
        </to-radio-group>
      </to-form-item> -->
          <to-form-item :label="'角色：' | NAME_SPACE_FORMAT" prop="roleGroupIds" class="form_tip">
            <to-select
              v-model="ruleForm.roleGroupIds"
              size="small"
              multiple
              placeholder="请选择角色"
              :multiple-limit="5"
              :disabled="!ruleForm.enterpriseCode"
              @change="handleSelectChane"
            >
              <to-option
                v-for="item in rolesLists"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              />
            </to-select>
            <!-- <span v-show="ruleForm.roleGroupIds.length>0" class="roleAuthorization" @click="roleAuthorizationBtn">角色预览</span> -->
          </to-form-item>
          <to-form-item label="是否驾驶员：" prop="isDriver">
            <to-radio-group v-model="ruleForm.isDriver" placeholder="请选择是否驾驶员">
              <to-radio
                v-for="item in isDriverList"
                :key="item.value"
                :label="item.value"
              >
                {{ item.labelZhCh }}
              </to-radio>
            </to-radio-group>
          </to-form-item>
          <to-form-item
            label="驾照信息："
            prop="licenseType"
            class="form_column"
          >
            <to-select v-model="ruleForm.licenseType" size="small" placeholder="请选择驾照类型" clearable>
              <to-option
                v-for="item in licenseLists"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </to-select>
          </to-form-item>
          <to-form-item label="" prop="licenseNum" class="form_columns">
            <to-input
              v-model.trim="ruleForm.licenseNum"
              size="small"
              placeholder="请输入驾照编号"
              clearable
              maxlength="12"
              minlength="12"
            />
          </to-form-item>
          <div class="clearFloat" />
          <PageFooter class="accountManagementAdd-btn" :form-name="formName" :loading="btnLoading" @submitForm="submitForm('ruleForm')" />
        </to-form>
      </div>
    </div>
    <!-- 选择弹窗 -->
    <to-drawer
      title="我是标题"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      :with-header="false"
      size="640px"
    >
      <span class="drawer-box">
        <div class="drawer-box-top">
          <p>角色预览</p>
          <p @click="dialogVisible = !dialogVisible"><i class="to-icon-close" /></p>
        </div>
        <div class="drawer-center">
          <RoleTree :tree-data="treeData" :show-checkbox="false" />
        </div>
      </span>
    </to-drawer>
  </div>
</template>
<script>
import {
  userAreaTree,
  accountAdd, verytyAccount, verytyPhone,
  getPreviewMenus, getRoleLists,
  getDeptLists
} from '../../api/setting'
import { isAccont, isPassword, isName, isPhone, isLicenseNum, areaCodeValEcho } from '../../utils/index'
import { isDriverLists, rankListObj, resetBtnListObj, treeDataObj, licenseLists } from './config'
import RoleTree from '../../components/RoleTree/index.vue'
import SelectSearch from '../../components/SelectSearch'
import PageFooter from '../../components/PageFooter'
import PageHeader from '../../components/PageHeader'
import { UserModule } from '@/store/modules/user'

export default {
  components: {
    RoleTree,
    SelectSearch,
    PageFooter,
    PageHeader
  },
  data() {
    let uniqueCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号名称'))
      } else {
        const data = this.handleBlur()
        data.then(res => {
          if (res === true || res.data === true) {
            callback(new Error('账号名称重复'))
          } else {
            callback()
          }
        })
      }
    }
    let uniquePhone = (rule, value, callback) => {
      if (value) {
        const data = this.handleUniquePhone()
        data.then(res => {
          if (res === true || res.data === true) {
            callback(new Error('手机号码重复'))
          } else {
            callback()
          }
        })
      } else {
        callback()
      }
    }
    return {
      btnLoading: false,
      licenseLists: licenseLists, // 驾照类型
      parentCodeLists: [], // 单位列表
      deptLists: [], // 部门列表
      isDriverList: isDriverLists,
      footertext: '关闭',
      rolesLists: [],
      isAccont: isAccont, // 账号验证
      isPassword: isPassword, // 密码验证
      isName: isName, // 姓名验证
      isPhone: isPhone, // 手机号验证
      isLicenseNum: isLicenseNum, // 驾照编号
      formName: 'ruleForm',
      message: '新增前台账号',
      rankList: rankListObj,
      resetBtnList: resetBtnListObj,
      mattersindex: -1,
      treeData: treeDataObj,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ruleForm: {
        areaCodeValue: [],
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
        isDriver: '2'
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 0, max: 18, message: '长度在0 到 18 个字符', trigger: 'blur' },
          { validator: isAccont, trigger: 'blur' },
          { validator: uniqueCheck, trigger: 'blur' }
        ],
        password: [
          { validator: isPassword, trigger: 'blur', required: true }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到 10 个字符', trigger: 'blur' },
          { validator: isName, trigger: 'blur', required: true }
        ],
        mobile: [
          { validator: isPhone, trigger: 'blur' },
          { validator: uniquePhone, trigger: 'blur' }
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
      },
      dialogVisible: false,
      areaCode: '',
      tag: '', // 本单位或全部
      areaTreeData: [], // 区域树
      driverId: null
    }
  },
  computed: {
    userInfo() {
      return UserModule.userData.additionalInformation
    }
  },
  created() {
    this.tag = this.$route.query.tag
  },
  mounted() {
    this.ruleForm.tenantId = this.userInfo.tenantId
    this.ruleForm.areaCode = this.userInfo.areaCode
    this.ruleForm.enterpriseCode = (this.userInfo.workOrgList && this.userInfo.workOrgList.length) ? this.userInfo.workOrgList[0].enterpriseCode : ''
    this.getTreeData()
    const curCode = this.ruleForm.areaCode
    this.ruleForm.areaCodeValue = areaCodeValEcho(curCode, this.ruleForm.areaCodeValue)
    if (this.ruleForm.areaCodeValue.length > 0 && this.ruleForm.enterpriseCode) {
      this.queryRoleLists()// 获取角色列表
      this.queryDeptLists()// 获取部门列表
    }
  },
  methods: {
    // 账号名称校验
    async handleBlur() {
      if (this.ruleForm.userName) {
        const res = await verytyAccount({
          userName: this.ruleForm.userName
          // tenantId:this.ruleForm.tenantId
        })
        return res.data
      }
    },
    // 手机名称校验
    async handleUniquePhone() {
      if (this.ruleForm.mobile) {
        const res = await verytyPhone({
          mobile: this.ruleForm.mobile
          // tenantId:this.ruleForm.tenantId
        })
        return res.data
      }
    },
    // 获取区域树
    async getTreeData() {
      const res = await userAreaTree()
      this.areaTreeData = res.data.tree
    },
    // 区域选中
    handleChangeArea(val) {
      if (val.length > 0) {
        this.ruleForm.areaCode = this.ruleForm.areaCodeValue[
          this.ruleForm.areaCodeValue.length - 1
        ]
        this.ruleForm.enterpriseCode = ''
      }
    },
    // 获取部门列表不分页接口
    async queryDeptLists() {
      const res = await getDeptLists({
        enterpriseCode: this.ruleForm.enterpriseCode
      })
      this.deptLists = res.data
    },
    // 选择单位后
    handleChange() {
      this.rolesLists = []
      this.ruleForm.roleGroupIds = []
      this.queryRoleLists()
      this.queryDeptLists()
    },
    // 角色选中项事件
    handleSelectChane(val) {
      if (val.length === 5) {
        this.$message({ type: 'warning', message: '同一个账号，角色不能超过5个' })
      }
    },
    /** ---获取菜单权限列表--- */
    async queryPreviewMenus(data) {
      const res = await getPreviewMenus({
        ids: data
      })
      this.treeData = res.data.tree
    },
    /** ---获取角色列表--- */
    async queryRoleLists() {
      const res = await getRoleLists({
        // tenantId:this.ruleForm.tenantId,
        // areaCode:this.ruleForm.areaCode,
        enterpriseCode: this.ruleForm.enterpriseCode
      })
      // this.rolesLists = res.data.map(v => ({ id: v.id, roleName: `${ v.roleName } - ${ this.fmtCreateScope(v.label) }` }));
      this.rolesLists = res.data.map(v => ({ id: v.id, roleName: `${v.roleGroupName}` }))
    },
    fmtCreateScope(scope) {
      return scope == 1 ? '默认角色' : scope == 2 ? '本单位角色' : scope == 3 ? '上级单位角色' : '-'
    },
    // 查看角色权限
    roleAuthorizationBtn() {
      this.dialogVisible = true
      this.queryPreviewMenus(this.ruleForm.roleGroupIds)
    },
    // 关闭/取消公共弹窗
    handleClose(val) {
      this.dialogVisible = val
    },
    /** ---账户新增--- */
    async accountSubmit() {
      await accountAdd(this.ruleForm).then(res => {
        if (res) {
          this.$message({ type: 'success', message: '保存成功' })
          if (res.data.driverId) {
            this.driverId = res.data.driverId
            this.deleteDialog({ content: '该账号驾驶员账号已创建成功，请确认是否去驾驶员档案中完善其他信息？', subhead: '提示', tipIcon: 'iconzhuyidapx', color: 'warning' })
          } else {
            this.$router.go(-1)
          }
        }
        this.btnLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          this.accountSubmit()
        } else {
          return false
        }
      })
    },
    dialogFun(content, callback) {
      this.$baseDialog({
        isVisible: true,
        dialgData: { ...content },
        onOk: function() {
          callback('onOk', this)
        },
        onCancel: function() {
          callback('onCancel', this)
        }
      })
    },
    deleteDialog(dialogObj) {
      this.dialogFun(dialogObj, (btnType, thisDialog) => {
        thisDialog && thisDialog.$closeDialog()
        if (btnType === 'onOk') {
          this.$router.push({ path: `/driverCenter/driverFile/edit/${this.driverId}` })
        }
        btnType === 'onCancel' && this.$router.go(-1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './css/add.scss'
</style>
