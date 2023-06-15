<template>
  <div class="setting-down">
    <to-dropdown
      class="right-menu-item hover-effect"
      id="setting-down-item"
      trigger="click"
    >
      <span :class="mixin_getCurrentIconfont('shezhi')"></span>
      <to-dropdown-menu slot="dropdown">
        <template v-for="item in downList">
          <to-dropdown-item v-if="item.meta.isMenu" :key="item.path">
            <span style="display: block" @click="toNext(item)">{{ $t(item.meta.title) }}</span>
          </to-dropdown-item>
        </template>
      </to-dropdown-menu>
    </to-dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { settingRouters } from '../../router/settingRouters'
import theme_mixin from '@/mixin/theme_mixin'

@Component({
  name: 'SettingDown',
  mixins: [theme_mixin]
})
export default class SettingDown extends Vue {
  [x: string]: any
  public downList = [...settingRouters]

  created() {
    this.$httpDic([
      'DICT_USER_STATUS', 'DICT_USER_IS_DRIVER', 'DICT_SERVICERS_TYPE', 'DICT_SERVICERS_STATUS', 'DICT_DRIVER_LICENSE_TYPE',
      'DICT_AGENCY_PROPERTIES', 'DICT_AGENCY_GRADE', 'DICT_DEPT_LEVEL',
      'DICT_AGENCY_FUNDS_SOURCE', 'DICT_AGENCY_ADMINISTRATIVE_RANK', 'DICT_AGENCY_TRADE', 'DICT_AGENCY_BUDGET_LEVEL'
    ]).then(() => {})
  }

  toNext(item) {
    this.$router.push({ path: `/setting/${item.path}` })
  }
}
</script>

<style lang="scss" scoped>
.setting-down {
  height: 100%;
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>
