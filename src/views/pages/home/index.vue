<template>
  <div class="home">
    <div class="home-contain">
      <BenchHeader class="bench-header-box"></BenchHeader>
      <div class="grid-viewer-box">
        <yxt-grid-viewer class="viewer-contain" :layouts="layouts" :requestConfig="requestConfig"></yxt-grid-viewer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { LayoutconfModule } from '@/store/modules/layoutconf'
import { UserModule } from '@/store/modules/user'
import BenchHeader from './BenchHeader.vue'

@Component({
  name: 'Home',
  components: {
    BenchHeader
  }
})
export default class Home extends Vue {
  [x: string]: any

  get requestConfig() {
    const { tenantId, enterpriseCode } = (UserModule.userData.additionalInformation && UserModule.userData.additionalInformation?.workOrgList[0]) || {}
    return {
      requestUrl: process.env.NODE_ENV === 'production' ? `${window.location.origin}/api` : process.env.VUE_APP_BASE_API,
      accessToken: UserModule.token,
      roleId: '34',
      tenantId,
      enterpriseCode,
      applicationCode: '001',
      applicationId: '1'
    }
  }

  get layouts() {
    return JSON.parse(LayoutconfModule.asConf.contentLayout.current)
  }

  set layouts(nval) {}
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100% + 220px);
  overflow-y: auto;
  overflow-x: hidden;
  .home-contain {
    width: 100%;
    height: 100%;
  }
  .grid-viewer-box {
    background-image: url('https://pic1.imgdb.cn/item/646f383bf024cca1739ba4d2.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    .viewer-contain {
      position: absolute;
      width: 80%;
      left: 10%;
      top: 60px;
    }
  }
}
</style>
