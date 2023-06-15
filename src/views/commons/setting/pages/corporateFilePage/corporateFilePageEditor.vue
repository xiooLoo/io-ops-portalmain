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
            v-model="ruleForm.areaCodeValue"
            :options="treeData"
            filterable
            clearable
            :props="{ label: 'name', value: 'code', checkStrictly: true }"
            @change="handleChange"
          />
        </to-form-item>
        <to-form-item label="单位名称：" prop="name">
          <to-input
            v-model.trim="ruleForm.name"
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
          <to-select
            v-model="ruleForm.property"
            placeholder="请选择单位性质"
            clearable
          >
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
          <to-col :span="hasFormationCode ? 23 : 24">
            <to-input
              v-model.number="ruleForm.vehiclePlanNum"
              type="number"
              oninput="if( this.value.length >5)  this.value = this.value.slice(0,5)"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
              placeholder="请输入车辆编制数"
              clearable
              disabled
              @mousewheel.native.prevent
            />
          </to-col>
          <to-col v-if="hasFormationCode" :span="1">
            <to-tooltip effect="dark" content="去单位编制修改" placement="top">
              <to-button type="text" icon="iconfont icona-bianzu5" @click="toUnitChangeNum"></to-button>
            </to-tooltip>
          </to-col>
        </to-form-item>

        <to-form-item label="人员编制数：" prop="personPlanNum">
          <to-input
            v-model.number="ruleForm.personPlanNum"
            type="number"
            oninput="if( this.value.length >5)  this.value = this.value.slice(0,5)"
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
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            placeholder="请输入排序值"
            clearable
            @mousewheel.native.prevent
          />
        </to-form-item>
        <div class="add-form-box-tip"><span>详细信息</span></div>
        <to-form-item label="上级单位：" prop="parentEnterpriseCode">
          <to-select
            v-model="ruleForm.parentEnterpriseCode"
            filterable
            placeholder="请选择上级单位"
            clearable
            :filter-method="handleFilter"
            @clear="handleClear"
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
          <to-select
            v-model="ruleForm.capitalSource"
            placeholder="请选择财政经费来源"
            clearable
          >
            <to-option
              v-for="item in capitalSourceLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="行政级别：">
          <to-select
            v-model="ruleForm.administrativeRank"
            placeholder="请选择行政级别"
            clearable
          >
            <to-option
              v-for="item in administrativeRankLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="行业：">
          <to-select
            v-model="ruleForm.trade"
            :disabled="!ruleForm.areaCode"
            placeholder="请选择所属行业"
            clearable
          >
            <to-option
              v-for="item in tradeLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </to-select>
        </to-form-item>
        <to-form-item label="预算级次：">
          <to-select
            v-model="ruleForm.budgetLevel"
            :disabled="!ruleForm.areaCode"
            placeholder="请选择预算级次"
            clearable
          >
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
          <PhotoUpload
            :photo-limit="photoLimit"
            :photo-list="photoList"
            @on-remove="handleRemove"
            @on-success="handleSuccess"
          />
        </to-form-item>
      </to-form>
    </div>
    <div class="postion-btn-box">
      <div class="postion-btn">
        <to-button class="goback-class global_button_iii" @click="goback">
          取消
        </to-button>
        <to-button v-debounce class="global_button_i" @click="submitForm">
          提交
        </to-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  userAreaTree,
  CorporateEdit,
  CorporateDetails,
  verytyUnit,
  getParentUnitLists
} from '../../api/setting'
import {
  propertyLists,
  levelLists,
  capitalSourceLists,
  administrativeRankLists,
  budgetLevelLists,
  tradeLists
} from './config'
import PhotoUpload from '../../components/PhotoUpload/index.vue'
import PageHeader from '../../components/PageHeader/index.vue'
import { isPhone, isEmail, areaCodeValEcho } from '../../utils/index'
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
        const patrn = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
        if (!patrn.test(value)) {
          callback(new Error('单位名称只能输入中文、英文、数字'))
        } else {
          const data = this.handleBlur()
          data.then(res => {
            if (res.length > 0) {
              const result = res.filter(item => {
                return item.id != this.ruleForm.id
              })
              if (result.length > 0) {
                callback(new Error('单位名称重复'))
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
      verytyUnitStatus: true, // 单位校验是否成功
      photoList: [],
      parentCodeLists: [], // 上级单位列表
      propertyLists: propertyLists, // 单位性质
      levelLists: levelLists, // 单位级别
      capitalSourceLists: capitalSourceLists, // 财政经费来源
      administrativeRankLists: administrativeRankLists, // 行政级别
      budgetLevelLists: budgetLevelLists, // 预算级次列表
      tradeLists: tradeLists, // 行业列表
      message: '编辑单位档案',
      photoLimit: 1, // 电子印章上传个数
      id: '',
      treeData: [], // 级联选择数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      elecSealList: [],
      ruleForm: {
        areaCodeValue: [],
        areaCode: '',
        name: '',
        shortName: '',
        property: '',
        level: '',
        vehiclePlanNum: '',
        personPlanNum: '',
        contacts: '',
        contactsTel: '',
        weight: '',
        name10: '',
        parentEnterpriseCode: '',
        orgCode: '',
        capitalSource: '',
        administrativeRank: '',
        telephone: '',
        postCode: '',
        fax: '',
        address: '',
        email: ''
      },
      rules: {
        areaCodeValue: [
          { required: true, message: '请选择区域', trigger: 'change' }
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
        weight: [{ required: true, message: '请输入排序值', trigger: 'blur' }],
        email: [{ validator: isEmail, trigger: 'blur' }],
        orgCode: [
          {
            required: process.env.NODE_ENV == 'shaanxi',
            message: '请输入统一社会信用代码',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '请输入小于20位的统一社会信用代码',
            trigger: 'blur'
          }
          // { pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/, message: '请输入符合规范的统一社会信用代码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userInfo() {
      return UserModule.userData.additionalInformation
    },
    hasFormationCode() {
      return true // this.$has('front_enterprise_formation:save')
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  mounted() {
    if (this.$route.query.areaCode) {
      this.areaCode = this.$route.query.areaCode
    }
    this.getTreeData()
    this.getCorporateDetails()
  },
  methods: {
    // 清除上级单位
    handleClear() {
      this.ruleForm.parentEnterpriseCode = ''
      this.ruleForm.parentEnterpriseName = ''
      this.queryCorporateLists()
    },
    // 文件删除
    handleRemove(val) {
      let picArray = this.elecSealList
      this.elecSealList.splice(picArray.indexOf(val), 1)
    },
    // 文件上传成功
    handleSuccess(val) {
      this.elecSealList.push(val)
    },
    // 单位名称校验
    async handleBlur() {
      if (this.ruleForm.name) {
        const res = await verytyUnit({
          name: this.ruleForm.name
        })
        return res
      }
    },

    // 区域选中
    handleChange() {
      this.ruleForm.areaCode = this.ruleForm.areaCodeValue[this.ruleForm.areaCodeValue.length - 1]
      this.queryCorporateLists()
      this.ruleForm.parentEnterpriseCode = ''
    },
    handleFilter(query) {
      this.queryCorporateLists(query)
    },
    // 获取单位列表不分页接口
    async queryCorporateLists(query) {
      let self = this
      const res = await getParentUnitLists({
        areaCode: this.ruleForm.areaCode,
        parentEnterpriseCode: this.ruleForm.parentEnterpriseCode,
        editFlag: true,
        name: query
      })
      let manArr = res.data.filter(function(obj) {
        return obj.enterpriseCode !== self.ruleForm.enterpriseCode
      })
      if (manArr.length < 1) {
        this.parentCodeLists = [
          {
            name: '无',
            enterpriseCode: '0'
          }
        ]
      } else {
        this.parentCodeLists = manArr
      }
    },
    // 详情
    async getCorporateDetails() {
      const res = await CorporateDetails({ id: this.id })
      this.ruleForm = res.data
      const curCode = this.ruleForm.areaCode
      let areaCodeValue
      areaCodeValue = areaCodeValEcho(curCode, areaCodeValue)
      this.$set(this.ruleForm, 'areaCodeValue', areaCodeValue)
      this.queryCorporateLists()
      if (this.ruleForm.elecSealFiles) {
        this.ruleForm.elecSealFiles.forEach(ele => {
          this.photoList.push({
            name: ele.fileName,
            url: ele.filePath,
            fileSign: ele.fileSign
          })
          this.elecSealList.push(ele.fileSign)
        })
      }
      if (!res.data.parentEnterpriseCode) {
        this.$set(this.ruleForm, 'parentEnterpriseCode', '0')
      }
    },
    // 获取树数据
    async getTreeData() {
      const res = await userAreaTree()
      this.treeData = res.data.tree
      // let res = await queryArea(this.areaCode,{
      //   areaCode:this.areaCode
      // })
      // this.treeData = res.data.tree[0].children;
    },
    // 顶部提交
    submitTop() {
      this.submitForm()
    },
    async CorporateSubmit() {
      const res = await CorporateEdit(this.ruleForm)
      if (res.code == 0) {
        this.$message({ type: 'success', message: '保存成功' })
        this.$router.go(-1)
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.verytyUnitStatus) {
            this.ruleForm.areaCode =
              this.ruleForm.areaCodeValue[
                this.ruleForm.areaCodeValue.length - 1
              ]
            this.ruleForm.elecSeal = this.elecSealList.join(',')
            if (this.ruleForm.parentEnterpriseCode === '') {
              this.ruleForm.parentEnterpriseCode = 0
            }
            this.CorporateSubmit()
          } else {
            this.$message({
              type: 'error',
              message: '账号名称重复,请修改账号名称'
            })
          }
        } else {
          return false
        }
      })
    },
    goback() {
      this.$router.go(-1)
    },
    toUnitChangeNum() {
      this.$router.push({ path: '/businessManagement/enterprisePlanManage/enterprisePlan', query: { name: this.ruleForm.name || '', enterpriseCode: this.ruleForm.enterpriseCode } })
      // if (this.$has('front_enterprise_formation:save')) {
      //   this.$router.push({ path: '/businessManagement/enterprisePlanManage/enterprisePlan', query: { name: this.ruleForm.name || '', enterpriseCode: this.ruleForm.enterpriseCode }})
      // } else {
      //   console.log('ffffffffffff无权限:')
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.corporateFilePageAdd {
  padding: 10px 16px;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
::v-deep input[type="number"] {
  -moz-appearance: textfield;
}

//单位列表
.unit {
  display: flex;
  width: 100%;
  height: 100%;
  &-right {
    flex: 1;
    width: 100%;
    // width: 84%;
    height: 100%;
    overflow-y: auto;
    .search-form {
      width: 100%;
      background-color: $yxt-color-white-1;
      .my-form {
        padding: 24px;
      }
    }
    .unit-right-btn {
      display: flex;
      background: $yxt-color-white-1;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      .action-btns-inline {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .special-btn-box {
        display: flex;
        .special-btn {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 4px;
          border: 1px solid transparent;
          font-size: 10px;
          padding: 4px 10px;
          color: $yxt-color-dark-3;
          i {
            font-size: 20px;
          }
        }
      }
    }
    .inline-btns {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 0 20px 20px 20px;
    }
    .row-possit-right {
      border-radius: 4px;
      border: none;
      .row-possit-right-box {
        .form-button {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 6px 16px;
          font-size: 12px;
        }
      }
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
    ::v-deep .table-box {
      height: auto;
    }
    .unit-table {
      padding: 24px;
      .empty-weave {
        .cell {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .over-staff {
        .cell {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}

//单位、部门新增
.unitAdd {
  height: calc(100% - 50px) !important;
  .page-header-tip {
    // .mixin_absolute(88px);
    width: 100%;
    z-index: 998;
    position: inherit;
    top: 88px;
  }
  .add-form-box {
    overflow-y: auto;
    margin: 24px 24px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: $yxt-color-white-1;
    height: calc(100% - 88px);
    &-tip {
      text-align: left;
      width: 100%;
      line-height: 50px;
      border-bottom: 1px solid $yxt-color-border-1;
      margin-bottom: 24px;
      font-size: $yxt-font-size-title-1;
      font-weight: bold;
      color: $yxt-color-text-1;
      clear: both;
      & > span {
        padding-left: 24px;
      }
    }
  }
  .ruleForm {
    width: 100%;
    .to-form-item {
      width: calc(50% - 48px);
      margin-bottom: 24px;
      float: left;
      padding: 0 24px;
      line-height: 32px;
      // height: 32px;
      .to-form-item__label {
        color: $yxt-color-dark-3;
      }
      .to-input__inner {
        line-height: 32px;
        height: 32px;
        color: $yxt-color-dark-3;
      }
      .to-select {
        width: 100%;
      }
      .to-cascader {
        width: 100%;
      }
    }
  }
  .postion-btn-box {
    width: 100%;
    // position: absolute;
    bottom: 0px;
    right: 0px;
    height: 50px;
    background: $yxt-color-white-1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0px -2px 2px 0px rgba(0, 0, 0, 0.03);
    .postion-btn {
      padding-right: 28px;
    }
  }
}
//部门新增
.dept {
  .add-form-box {
    height: auto;
    padding-bottom: 96px;
    .ruleForm {
      max-width: 595px;
      .to-form-item {
        width: 100%;
        float: none;
        padding: 0;
      }
    }
  }
}
//单位部门详情
.unitDetail {
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $yxt-color-text-1;
    padding: 0 10px;
    height: 50px;
    border-bottom: solid 1px $yxt-color-border-1;
    font-size: $yxt-font-size-title-1;
    p {
      margin: 10px 0;
      padding-left: 14px;
      font-weight: bold;
    }
    .clone-btn-box {
      cursor: pointer;
      i {
        font-size: 16px;
      }
    }
  }
  &-box {
    padding: 12px 24px 12px 24px;
    width: calc(100% - 48px);
    overflow: hidden;
    border-bottom: solid 1px $yxt-color-border-1;
    &-title {
      font-size: $yxt-font-size-title-1;
      color: $yxt-color-text-1;
      font-weight: bolder;
      margin-bottom: 5px !important;
      clear: both;
      width: 100%;
    }
    .to-form-item {
      width: 50%;
      float: left;
    }
    .unit-space {
      width: 100%;
    }
    .to-form-item {
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .to-form-item__label {
      text-align: left;
      line-height: 24px;
      color: $yxt-color-dark-3;
    }
    .to-form-item__content {
      color: $yxt-color-text-1;
      line-height: 24px;
      word-wrap: break-word;
    }
  }
  .no-border {
    border: none;
  }
  .ruleForm {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 50px);
  }
}
//部门详情
.deptDetail {
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $yxt-color-text-1;
    padding: 0 10px;
    height: 50px;
    border-bottom: solid 1px $yxt-color-border-1;
    font-size: $yxt-font-size-title-1;
    p {
      margin: 10px 0;
      padding-left: 14px;
      font-weight: bold;
    }
    .clone-btn-box {
      cursor: pointer;
      i {
        font-size: 16px;
      }
    }
  }
  .dept-center {
    margin: 10px 0 10px 0px;
    .dept-title {
      border-bottom: 1px solid $yxt-color-border-1;
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      font-weight: bold;
      color: $yxt-color-text-1;
      padding-left: 24px;
      margin: 10px 0;
    }
    ::v-deep .to-tabs {
      margin-left: 24px;
      .to-tabs__header {
        margin: 0;
      }
      .to-tab-pane {
        border: 0;
      }
      //修改tab选中阴影
      .to-tabs__item.is-active {
        box-shadow: none;
      }
    }
    .table-box {
      margin: 0 24px;
    }
    .table-top {
      margin: 10px 0 0 24px;
      line-height: 40px;
      font-size: 14px;
      td:nth-child(1) {
        width: 112px;
      }
    }
    .table-column {
      padding-left: 24px;
      line-height: 40px;
      font-size: 14px;
      width: 50%;
      display: inline-block;
      tr {
        td:nth-child(1) {
          color: $yxt-color-dark-3;
          margin-right: 20px;
        }
      }
    }
    .RoleTree-box {
      margin: 24px;
    }
  }
  .OrderDetails-btn-box {
    border-top: 1px solid $yxt-color-border-1;
    display: flex;
    justify-content: flex-end;
    padding-top: 8px;
    padding-right: 24px;
  }
}
</style>
