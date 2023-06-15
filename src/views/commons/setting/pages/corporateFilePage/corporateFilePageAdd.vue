<template>
  <div class="unitAdd">
    <PageHeader :message="message" class="page-header-tip" />
    <div class="add-form-box">
      <div class="add-form-box-tip"><span>基础信息</span></div>
      <to-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="150px"
        class="ruleForm"
      >
        <to-form-item label="所属区域：" prop="areaCodeValue">
          <to-cascader
            ref="cascader"
            v-model="ruleForm.areaCodeValue"
            :options="treeData"
            :props="{ label: 'name',value:'code',checkStrictly: true }"
            filterable
            clearable
            @change="handleChange"
          />
        </to-form-item>
        <to-form-item label="单位名称：" prop="name">
          <to-input
            v-model.trim="ruleForm.name"
            type="text"
            placeholder="请输入单位名称"
            clearable
            maxlength="30"
            :validate-event="false"
          />
        </to-form-item>
        <to-form-item label="单位简称：">
          <to-input
            v-model.trim="ruleForm.shortName"
            type="text"
            maxlength="10"
            placeholder="请输入单位简称"
            clearable
          />
        </to-form-item>
        <to-form-item label="单位性质：" prop="property">
          <to-select v-model="ruleForm.property" placeholder="请选择单位性质" :disabled="!ruleForm.areaCode" clearable>
            <to-option
              v-for="item in propertyLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="单位级别：" prop="level">
          <to-select
            v-model="ruleForm.level"
            placeholder="请选择单位级别"
            :disabled="!ruleForm.areaCode"
            clearable
          >
            <to-option
              v-for="item in levelLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="车辆编制数：" prop="vehiclePlanNum">
          <to-input
            v-model.number="ruleForm.vehiclePlanNum"
            type="number"
            oninput="if( this.value.length >5)  this.value = this.value.slice(0,5)"
            onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0]: ''"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            placeholder="请输入车辆编制数"
            clearable
            @mousewheel.native.prevent
          />
        </to-form-item>
        <to-form-item label="人员编制数：" prop="personPlanNum">
          <to-input
            v-model.number="ruleForm.personPlanNum"
            type="number"
            oninput="if( this.value.length >5)  this.value = this.value.slice(0,5)"
            onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0]: ''"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            placeholder="请输入人员编制数"
            clearable
            @mousewheel.native.prevent
          />
        </to-form-item>
        <to-form-item label="联系人：">
          <to-input
            v-model.trim="ruleForm.contacts"
            type="text"
            placeholder="请输入联系人"
            maxlength="10"
            clearable
          />
        </to-form-item>
        <to-form-item label="联系电话：" prop="contactsTel">
          <to-input
            v-model.number="ruleForm.contactsTel"
            type="number"
            oninput="if( this.value.length >11)  this.value = this.value.slice(0,11)"
            onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0]: ''"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            placeholder="请输入联系电话"
            clearable
            @mousewheel.native.prevent
          />
        </to-form-item>
        <to-form-item label="排序值：" prop="weight">
          <to-input
            v-model.number="ruleForm.weight"
            type="number"
            oninput="if( this.value.length >6)  this.value = this.value.slice(0,6)"
            onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0]: ''"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            placeholder="请输入排序值"
            clearable
            @mousewheel.native.prevent
          />
        </to-form-item>
        <div class="add-form-box-tip"><span>详细信息</span></div>
        <!--  :disabled="userInfo.userType == 2 ||!ruleForm.areaCode" -->
        <to-form-item label="上级单位：" prop="parentEnterpriseCode">
          <to-select
            v-model="ruleForm.parentEnterpriseCode"
            filterable
            placeholder="请选择上级单位"
            clearable
            :filter-method="handleFilter"
            @clear="queryCorporateLists"
          >
            <to-option
              v-for="item in parentCodeLists"
              :key="item.enterpriseCode"
              :label="item.name"
              :value="item.enterpriseCode"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="统一社会信用代码：" prop="orgCode">
          <to-input
            v-model="ruleForm.orgCode"
            type="text"
            placeholder="请输入统一社会信用代码"
            clearable
            @mousewheel.native.prevent
          />
        </to-form-item>
        <to-form-item label="财政经费来源：">
          <to-select v-model="ruleForm.capitalSource" :disabled="!ruleForm.areaCode" placeholder="请选择财政经费来源" clearable>
            <to-option
              v-for="item in capitalSourceLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="行政级别：">
          <to-select v-model="ruleForm.administrativeRank" :disabled="!ruleForm.areaCode" placeholder="请选择行政级别" clearable>
            <to-option
              v-for="item in administrativeRankLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="行业：">
          <to-select v-model="ruleForm.trade" :disabled="!ruleForm.areaCode" placeholder="请选择所属行业" clearable>
            <to-option
              v-for="item in tradeLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="预算级次：">
          <to-select v-model="ruleForm.budgetLevel" :disabled="!ruleForm.areaCode" placeholder="请选择预算级次" clearable>
            <to-option
              v-for="item in budgetLevelLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="座机：" prop="telephone">
          <to-input
            v-model="ruleForm.telephone"
            type="tel"
            onkeyup="value=value.replace(/[^\d\-\d]/g,'')"
            maxlength="12"
            placeholder="请输入座机"
            clearable
          />
        </to-form-item>
        <to-form-item label="邮政编码：" prop="postCode">
          <to-input
            v-model.number="ruleForm.postCode"
            type="number"
            oninput="if( this.value.length >6 )  this.value = this.value.slice(0,6)"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            placeholder="请输入邮政编码"
            clearable
            @mousewheel.native.prevent
          />
        </to-form-item>
        <to-form-item label="邮箱：" prop="email">
          <to-input
            v-model.trim="ruleForm.email"
            type="text"
            maxlength="32"
            placeholder="请输入邮箱"
            clearable
          />
        </to-form-item>
        <to-form-item label="传真：" prop="fax">
          <to-input
            v-model="ruleForm.fax"
            maxlength="12"
            onkeyup="value=value.replace(/[^\d\-\d]/g,'')"
            type="tel"
            placeholder="请输入传真"
            clearable
          />
        </to-form-item>
        <to-form-item label="单位地址：">
          <to-input
            v-model.trim="ruleForm.address"
            show-word-limit
            type="textarea"
            placeholder="请输入单位地址"
            maxlength="100"
            clearable
          />
        </to-form-item>
        <to-form-item />
        <to-form-item label="电子印章：">
          <PhotoUpload :photo-limit="photoLimit" @on-success="handleSuccess" @on-remove="handleRemove" />
        </to-form-item>
      </to-form>
    </div>
    <div class="postion-btn-box">
      <div class="postion-btn">
        <to-button class="goback-class global_button_iii" @click="goback">取消</to-button>
        <to-button v-debounce class="global_button_i" @click="submitForm">提交</to-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  userAreaTree, CorporateAdd, verytyUnit, getParentUnitLists
} from '../../api/setting'
import { propertyLists, levelLists, capitalSourceLists, administrativeRankLists, budgetLevelLists, tradeLists } from './config'
import { isPhone, isEmail, areaCodeValEcho } from '../../utils/index'
import PhotoUpload from '../../components/PhotoUpload/index.vue'
import PageHeader from '../../components/PageHeader/index.vue'
import { UserModule } from '@/store/modules/user'

export default {
  components: {
    PhotoUpload,
    PageHeader
  },
  data() {
    let uniqueCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入单位名称'))
      } else {
        let patrn = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
        if (!patrn.test(value)) {
          callback(new Error('单位名称只能输入中文、英文、数字'))
        } else {
          let data = this.handleBlur()
          data.then(res => {
            if (res.length > 0) {
              callback(new Error('单位名称重复'))
            } else {
              callback()
            }
          })
        }
      }
    }
    return {
      parentCodeLists: [], // 上级单位列表
      propertyLists: propertyLists, // 单位性质
      levelLists: levelLists, // 单位级别
      capitalSourceLists: capitalSourceLists, // 财政经费来源
      administrativeRankLists: administrativeRankLists, // 行政级别
      budgetLevelLists: budgetLevelLists, // 预算级次列表
      tradeLists: tradeLists, // 行业列表
      message: '新建单位档案',
      photoLimit: 1, // 电子印章上传个数
      treeData: [], // 级联选择数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ruleForm: {
        areaCodeValue: [],
        areaCode: '',
        name: '',
        shortName: '',
        property: '',
        level: '',
        vehiclePlanNum: 0,
        personPlanNum: 0,
        contacts: '',
        contactsTel: '',
        weight: 0,
        name10: '',
        parentEnterpriseCode: '',
        orgCode: '',
        capitalSource: '',
        administrativeRank: '',
        telephone: '',
        postCode: '',
        fax: '',
        address: '',
        email: '',
        elecSeal: []
      },
      rules: {
        areaCodeValue: [
          { required: true, message: '请选择区域', trigger: 'change' }
          // { validator: isAreaCode, trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          { validator: uniqueCheck, trigger: 'change' }
        ],
        property: [
          { required: true, message: '请选择单位性质', trigger: 'change' }
        ],
        parentEnterpriseCode: [
          { required: false, message: '请选择上级单位', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请选择单位级别', trigger: 'change' }
        ],
        vehiclePlanNum: [
          { required: true, message: '请输入车辆编制数', trigger: 'blur' }
        ],
        personPlanNum: [
          { required: true, message: '请输入人员编制数', trigger: 'blur' }
        ],
        contactsTel: [{ validator: isPhone, trigger: 'blur' }],
        weight: [
          { required: true, message: '请输入排序值', trigger: 'blur' }
        ],
        email: [{ validator: isEmail, trigger: 'blur' }],
        orgCode: [
          { required: process.env.NODE_ENV == 'shaanxi', message: '请输入统一社会信用代码', trigger: 'blur' },
          { max: 20, message: '请输入小于20位的统一社会信用代码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    areaCode() {
      return UserModule.userData.additionalInformation.areaCode
    },
    userInfo() {
      return UserModule.userData.additionalInformation
    }
  },
  mounted() {
    if (this.$route.query.enterpriseCode) {
      this.ruleForm.parentEnterpriseCode = this.$route.query.enterpriseCode
    }
    if (this.$route.query.areaCode || this.areaCode) {
      let curCode = this.$route.query.areaCode || this.areaCode
      this.ruleForm.areaCode = curCode
      this.ruleForm.areaCodeValue = areaCodeValEcho(curCode, this.ruleForm.areaCodeValue)
      this.vertifyAreaCode()
    }
    if (this.userInfo.type == 2) {
      this.getTreeData()
      this.ruleForm.areaCode = this.userInfo.areaCode
    } else {
      this.getTreeData()
    }
  },
  methods: {
  // 校验区域是否存在
    vertifyAreaCode() {
      this.$refs.ruleForm.validateField('areaCodeValue', valid => {
        if (!valid) {
          this.$refs.ruleForm.clearValidate('areaCodeValue')
          this.queryCorporateLists()
          this.ruleForm.areaCode = this.$route.query.areaCode || this.areaCode
        } else {
          this.$refs.ruleForm.validateField('areaCodeValue')
        }
      })
    },
    // 文件删除
    handleRemove(val) {
      let picArray = this.ruleForm.elecSeal
      this.ruleForm.elecSeal.splice(picArray.indexOf(val), 1)
    },
    // 文件上传成功
    handleSuccess(val) {
      this.ruleForm.elecSeal.push(val)
    },
    // 单位名称校验
    async handleBlur(val) {
      if (this.ruleForm.name) {
        const res = await verytyUnit({
          name: this.ruleForm.name
        })
        return res
      }
    },
    handleFilter(query) {
      this.queryCorporateLists(query)
    },
    // 获取单位列表不分页接口
    async queryCorporateLists(query) {
      const res = await getParentUnitLists({
        areaCode: this.ruleForm.areaCode,
        enterpriseCode: this.ruleForm.parentEnterpriseCode,
        name: query
      })
      this.parentCodeLists = res.data
      // if(res.length>0){
      //   if(!this.ruleForm.parentEnterpriseCode){
      //     this.ruleForm.parentEnterpriseCode = res[0].enterpriseCode;
      //   }
      // }
    },
    // 区域选中
    handleChange(val) {
      this.ruleForm.areaCode = this.ruleForm.areaCodeValue[
        this.ruleForm.areaCodeValue.length - 1
      ]
      this.ruleForm.parentEnterpriseCode = ''
      this.queryCorporateLists()
    },
    // 获取树数据
    async getTreeData() {
      let res = await userAreaTree()
      this.treeData = res.data.tree
    },
    // 顶部提交
    submitTop() {
      this.submitForm()
    },
    async CorporateSubmit() {
      const res = await CorporateAdd(this.ruleForm)
      if (res.code == 0) {
        this.$message({ type: 'success', message: '保存成功' })
        this.$router.go(-1)
      }
    },
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.areaCode = this.ruleForm.areaCodeValue[
            this.ruleForm.areaCodeValue.length - 1
          ]
          if (this.ruleForm.elecSeal) {
            this.ruleForm.elecSeal = this.ruleForm.elecSeal.join(',')
          }
          if (this.ruleForm.parentEnterpriseCode === '') {
            this.ruleForm.parentEnterpriseCode = 0
          }
          this.CorporateSubmit()
        } else {
          return false
        }
      })
    },
    // 返回
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './css/agency.scss';

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button{
  -webkit-appearance: none !important;
  margin: 0;
}
::v-deep input[type="number"]{-moz-appearance:textfield ;}
</style>
