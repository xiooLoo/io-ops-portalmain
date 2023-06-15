<template>
  <div class="unitDetail">
    <div class="unitDetail-top">
      <p>{{ message }}</p>
      <div class="clone-btn-box"><i class="iconfont iconclose" @click="goback" /></div>
    </div>

    <to-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="110px"
      class="ruleForm"
    >
      <div class="unitDetail-box">
        <div class="unitDetail-box-title">
          <p>基础信息</p>
        </div>
        <to-form-item label="所属区域：">
          {{ ruleForm.areaCodePath }}
        </to-form-item>
        <!-- <to-form-item v-show="userInfo.userType == 1" label="所属区域：">
          {{ ruleForm.areaCodePath }}
        </to-form-item> -->
        <to-form-item label="单位名称：">
          {{ ruleForm.name?ruleForm.name:'-' }}
        </to-form-item>
        <to-form-item label="单位简称：">
          {{ ruleForm.shortName?ruleForm.shortName:'-' }}
        </to-form-item>
        <to-form-item label="单位性质：">
          {{ ruleForm.property?ruleForm.property:'-' }}
        </to-form-item>
        <to-form-item label="单位级别：">
          {{ ruleForm.level?ruleForm.level:'-' }}
        </to-form-item>
        <to-form-item label="车辆编制数：">
          {{ ruleForm.vehiclePlanNum?ruleForm.vehiclePlanNum:'-' }}
        </to-form-item>
        <to-form-item label="人员编制数：">
          {{ ruleForm.personPlanNum?ruleForm.personPlanNum:'-' }}
        </to-form-item>
        <to-form-item label="联系人：">
          {{ ruleForm.contactsAddTel }}
        </to-form-item>
        <to-form-item label="排序值：">
          {{ ruleForm.weight?ruleForm.weight:'-' }}
        </to-form-item>
      </div>
      <div class="unitDetail-box no-border">
        <div class="unitDetail-box-title">
          <p>详细信息</p>
        </div>
        <to-form-item label="上级单位：">
          {{ ruleForm.parentEnterpriseName?ruleForm.parentEnterpriseName:'-' }}
        </to-form-item>
        <to-form-item label="组织机构代码：">
          {{ ruleForm.orgCode?ruleForm.orgCode:'-' }}
        </to-form-item>
        <to-form-item label="财政经费来源：">
          {{ ruleForm.capitalSource?ruleForm.capitalSource:'-' }}
        </to-form-item>
        <to-form-item label="行政级别：">
          {{ ruleForm.administrativeRank?ruleForm.administrativeRank:'-' }}
        </to-form-item>
        <to-form-item label="座机：">
          {{ ruleForm.telephone?ruleForm.telephone:'-' }}
        </to-form-item>
        <to-form-item label="邮政编码：">
          {{ ruleForm.postCode?ruleForm.postCode:'-' }}
        </to-form-item>
        <to-form-item label="行业：">
          {{ ruleForm.trade?ruleForm.trade:'-' }}
        </to-form-item>
        <to-form-item label="预算级次：">
          {{ ruleForm.budgetLevel?ruleForm.budgetLevel:'-' }}
        </to-form-item>
        <to-form-item label="邮箱：">
          {{ ruleForm.email?ruleForm.email:'-' }}
        </to-form-item>
        <to-form-item label="传真：">
          {{ ruleForm.fax?ruleForm.fax:'-' }}
        </to-form-item>
        <to-form-item label="单位地址：">
          {{ ruleForm.address?ruleForm.address:'-' }}
        </to-form-item>
        <to-form-item />
        <to-form-item label="电子印章：" class="unit-space">
          <PhotoScan :scan-list="fileList" />
        </to-form-item>
      </div>
    </to-form>
  </div>
</template>
<script>
import { queryArea, CorporateDetails } from '../../api/setting'
import { propertyLists, levelLists, capitalSourceLists, administrativeRankLists, budgetLevelLists, tradeLists } from './config'
import PhotoScan from '../../components/PhotoScan/index.vue'
import { handleMobile } from '../../utils/index'
export default {
  name: 'CorporateFilePageDetail',
  components: {
    PhotoScan
  },
  props: {
    pid: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      message: '详情',
      fileList: [],
      propertyLists: propertyLists, // 单位性质
      levelLists: levelLists, // 单位级别
      capitalSourceLists: capitalSourceLists, // 财政经费来源
      administrativeRankLists: administrativeRankLists, // 行政级别
      budgetLevelLists: budgetLevelLists, // 预算级次列表
      tradeLists: tradeLists, // 行业列表
      id: '',
      ruleForm: {
        contactsAddTel: ''
      },
      areaCodeValue: ''
    }
  },
  computed: {
    userInfo() {
      return JSON.stringify(this.$store.getters.userInfo) == '{}' ? this.$store.getters.loginInfo : this.$store.getters.userInfo
    }
  },
  created() {
    this.id = this.pid
  },
  mounted() {
    this.getCorporateDetails()
  },
  methods: {
    // 获取树数据
    async getTreeData(rootCode) {
      let res = await queryArea(rootCode)
      this.areaCodeValue = res.data.tree[0].children[0].name
    },
    // 详情
    async getCorporateDetails() {
      const res = await CorporateDetails({ id: this.id })
      this.ruleForm = res.data
      this.getTreeData(res.data.areaCode)
      // 联系人
      if (res.data.contacts && res.data.contactsTel) {
        this.ruleForm.contactsAddTel = `${res.data.contacts} ${handleMobile(res.data.contactsTel)}`
      } else if (res.data.contacts && !res.data.contactsTel) {
        this.ruleForm.contactsAddTel = res.data.contacts
      } else if (!res.data.contacts && res.data.contactsTel) {
        this.ruleForm.contactsAddTel = handleMobile(res.data.contactsTel)
      }
      // 附件
      if (this.ruleForm.elecSealFiles) {
        /* this.ruleForm.elecSealFiles.forEach(ele => {
          this.fileList.push({ name:ele.fileName,url:ele.filePath,fileSign:ele.fileSign })
        })*/
        this.fileList = this.ruleForm.elecSealFiles || []
      }
      // 单位性质
      this.propertyLists.forEach(item => {
        if (item.value === res.data.property) {
          this.ruleForm.property = item.label
        }
      })
      // 单位级别
      this.levelLists.forEach(item => {
        if (item.value === res.data.level) {
          this.ruleForm.level = item.label
        }
      })
      // 财政经费来源
      this.capitalSourceLists.forEach(item => {
        if (item.value === res.data.capitalSource) {
          this.ruleForm.capitalSource = item.label
        }
      })
      // 行政级别
      this.administrativeRankLists.forEach(item => {
        if (item.value === res.data.administrativeRank) {
          this.ruleForm.administrativeRank = item.label
        }
      })
      // 行业
      this.tradeLists.forEach(item => {
        if (item.value === res.data.trade) {
          this.ruleForm.trade = item.label
        }
      })
      // 预算级次
      this.budgetLevelLists.forEach(item => {
        if (item.value === res.data.budgetLevel) {
          this.ruleForm.budgetLevel = item.label
        }
      })
    },
    // 返回
    goback() {
      this.$emit('goback', false)
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './css/agency.scss';

.corporateFilePageAdd{
  padding: 10px 16px;
}
</style>
