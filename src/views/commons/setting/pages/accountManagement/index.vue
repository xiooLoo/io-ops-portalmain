<template>
  <div class="accountManagement">
    <YxtTabs class="accountManagement-tabs" :arr="tabs" :actions="handleTabs" :current="currentView" />
    <MySpecialTransiton active-name="slide-fade">
      <div :is="currentView" :search-data="nowSearchData" :actions="getSearchData" />
    </MySpecialTransiton>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MySpecialTransiton from '../../components/MySpecialTransiton/index.vue'
import ThisUnit from './thisUnit.vue'
import AllUnit from './allUnit.vue'

@Component({
  name: 'accountManagement',
  components: {
    ThisUnit,
    AllUnit,
    MySpecialTransiton
  }
})
export default class extends Vue {
  [x: string]: any
  public tabs: any[] = [
    { id: '0', label: '全部', value: 'AllUnit', badgeValue: 0, icon: '', code: this.$has('front_portal_user_acount_manage') },
    { id: '1', label: '本单位', value: 'ThisUnit', badgeValue: 0, icon: '', code: this.$has('front_portal_user_acount_manage:query') }
  ]

  public currentView = ''
  public nowSearchData = {}
  public currSearchData = {}
  public tempNames: string[] = ['AllUnit', 'ThisUnit']
  public tempByCode: {} = {
    front_portal_user_acount_manage: 'AllUnit',
    'front_portal_user_acount_manage:query': 'ThisUnit'
  }

  created() {
    this.viewTemp()
  }

  viewTemp() {
    const _this = this
    Object.keys(_this.tempByCode).forEach(code => {
      if (_this.currentView) return
      if (_this.$has(code)) {
        _this.currentView = _this.tempByCode[code]
      }
    })
    this.tempNames.forEach(name => {
      this.currSearchData[name] = { ...this.initSearchData() }
    })
    this.searchDataFun()
  }

  initSearchData() {
    return {
      userName: '',
      name: '',
      mobile: '',
      enterpriseCode: '',
      enterpriseName: '',
      status: '',
      page: 1,
      rows: 10
    }
  }

  handleTabs(params) {
    this.currentView = params.obj.value
    this.searchDataFun()
  }

  searchDataFun() {
    this.nowSearchData = this.currentView ? this.currSearchData[this.currentView] : { ...this.initSearchData() }
  }

  getSearchData({ key, newSearchData }) {
    this.currSearchData[key] = newSearchData || { ...this.initSearchData() }
    this.searchDataFun()
  }
}
</script>
