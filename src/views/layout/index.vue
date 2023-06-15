<template>
  <AsMode :asMode="asMode">
    <template slot="content">
      <div v-show="hasQKApps" id="appContainer" :style="{width: '100%', height: '100%',background:'#fff'}" />
      <app-main v-show="!hasQKApps" :style="{width: '100%'}" />
    </template>
  </AsMode>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { AsMode, AppMain } from './components'
import { start } from 'qiankun'
import { microApps, qkConfig } from '@/qk'
import { LayoutconfModule } from '@/store/modules/layoutconf'

@Component({
  name: 'Layout',
  components: {
    AsMode,
    AppMain
  }
})
export default class extends Vue {
  public microApps = microApps

  get hasQKApps() {
    let hasNames = this.microApps.map(item => item.name)
    let routeNames = this.$route.path.split('/')
    let has = hasNames.filter(item => routeNames.includes(item))
    return !!has.length
  }

  /**
   *  import { AsModeEnum } from '@/store/types'
   *  枚举类 AsModeEnum
   *
   *  门户布局模式： F-Mode（默认） | FI-Mode | T-Mode | Z-Mode
   */
  get asMode() {
    return LayoutconfModule.asMode
  }

  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start(qkConfig)
    }
  }
}
</script>
