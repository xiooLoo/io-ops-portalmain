<template>
  <div class="unitAdd dept">
    <PageHeader :message="message" class="page-header-tip" />
    <div class="add-form-box">
      <div class="add-form-box-tip"><span>部门信息</span></div>
      <to-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="96px"
        class="ruleForm"
      >
        <to-form-item label="归属单位" prop="enterpriseCode">
          <SelectSearch
            type="unit"
            :model-value.sync="ruleForm.enterpriseCode"
            label="name"
            :area-code="ruleForm.areaCode"
            value="enterpriseCode"
            placeholder="请选择归属单位"
          />
        </to-form-item>
        <to-form-item label="部门名称" prop="deptName">
          <to-input
            v-model.trim="ruleForm.deptName"
            placeholder="请输入部门名称"
            clearable
            type="text"
            :validate-event="false"
            maxlength="30"
          />
        </to-form-item>
        <to-form-item label="部门级别" prop="deptLevel">
          <to-select v-model="ruleForm.deptLevel" placeholder="请选择部门级别">
            <to-option
              v-for="item in deptLevelLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <PageFooter :form-name="formName" @submitForm="submitForm('ruleForm')" />
      </to-form>
    </div>
  </div>
</template>
<script>
import './css/agency.scss'
import { DeptDetails, DeptEdit, verytyDept } from '../../api/setting'
import { deptLevelLists } from './config'
import SelectSearch from '../../components/SelectSearch'
import PageFooter from '../../components/PageFooter'
import PageHeader from '../../components/PageHeader'
import { UserModule } from '@/store/modules/user'

export default {
  components: {
    SelectSearch,
    PageHeader,
    PageFooter
  },
  data() {
    let uniqueCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入部门名称'))
      } else {
        let patrn = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
        if (!patrn.test(value)) {
          callback(new Error('部门名称只能输入中文、英文、数字'))
        } else {
          let data = this.handleBlur()
          data.then(res => {
            if (res.data.length > 0) {
              let result = res.data.filter(item => { return item.id != this.ruleForm.id })
              if (result.length > 0) {
                callback(new Error('部门名称重复'))
              } else {
                callback()
              }
            } else {
              callback()
            }
          })
        }
      }
    }
    return {
      unitAreaCode: '', // 单位code
      parentCodeLists: [], // 单位列表
      deptLevelLists: deptLevelLists, // 部门级别列表
      formName: 'ruleForm',
      message: '编辑部门信息',
      id: '',
      ruleForm: {
        enterpriseCode: '',
        deptName: '',
        deptLevel: '',
        id: ''
      },
      rules: {
        enterpriseCode: [
          { required: true, message: '请选择归属单位', trigger: 'change' }
        ],
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: uniqueCheck, trigger: 'blur' }
        ],
        deptLevel: [
          { required: true, message: '请选择部门级别', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    areaCode() {
      return UserModule.userData.additionalInformation.areaCode
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  mounted() {
    this.getDeptDetails()
  },
  methods: {
    // 部门名称校验
    async handleBlur() {
      if (this.ruleForm.deptName) {
        const res = await verytyDept({
          deptName: this.ruleForm.deptName,
          enterpriseCode: this.ruleForm.enterpriseCode
        })
        return res
      }
    },
    // 详情
    async getDeptDetails() {
      const res = await DeptDetails({ id: this.id })
      this.ruleForm = res.data
    },
    async DeptSubmit() {
      const res = await DeptEdit(this.ruleForm)
      if (res.code == 0) {
        this.$message({ type: 'success', message: '部门编辑成功' })
        this.$router.go(-1)
      }
    },
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.DeptSubmit()
        } else {
          return false
        }
      })
    }
  }
}
</script>
