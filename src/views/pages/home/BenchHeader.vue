<template>
  <div class="bench-header">
    <div class="bench-header-contain">
      <div class="welcome-txt">欢迎进入机关事务智慧管理平台～</div>
      <div class="welcome-dep">{{ enterpriseName }}</div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'BenchHeader'
})
export default class BenchHeader extends Vue {
  get enterpriseName() {
    return (UserModule.userData.additionalInformation && UserModule.userData.additionalInformation?.workOrgList[0].enterpriseName) || '海南省机关事务管理局'
  }
}
</script>

<style lang='scss' scoped>
.bench-header {
  background: url('https://pic.imgdb.cn/item/647eabe71ddac507cc452155.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 220px;
  position: absolute;
  top: -60px;
  &-contain {
    padding: calc(60px + 16px) calc(10% + 20px) 16px;
    .welcome-txt {
      font-size: 16px;
      font-weight: 600px;
      color: $yxt-color-text-1;
    }
    .welcome-dep {
      font-size: 14px;
      color: $yxt-color-text-2;
      padding-top: 8px;
    }
  }
}
</style>
