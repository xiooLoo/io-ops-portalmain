<template>
  <div class="theme-picker-box">
    <div class="palette-color" :style="{backgroundColor: paletteColor}" @click="toOpenDrawer"></div>
    <yxt-drawer ref="yxtDrawerRef" :title="$t('message.portal.theme.themeTool')" size="320px" :dialog-info="dialogInfo" isDestroyOnClose :actions="handleAction">
      <template slot="content">
        <div class="drawer-content">
          <div class="settings-box">
            <span class="tip">{{ $t('message.portal.theme.iconfont') }}</span>
            <div class="settings-box-items">
              <div v-for="(iconfont, index) in iconfonts" :key="iconfont.iconfont_id" class="settings-box-item" @click="toChangeIconfont(iconfont)">
                <to-button type="normal" size="small" :style="{ fontSize: '14px', color: iconfont.isActive ? paletteColor : '#8F9399' }">Icon [{{ index + 1 }}]</to-button>
                <span :style="{ color: iconfont.isActive ? paletteColor : '#8F9399' }">•</span>
              </div>
            </div>
          </div>
          <div class="settings-box">
            <span class="tip">{{ $t('message.portal.theme.ttf') }}</span>
            <div class="settings-box-items">
              <div v-for="ttf in ttfs" :key="ttf.ttf_id" class="settings-box-item" @click="toChangeTTF(ttf)">
                <to-button type="normal" size="small" :style="{ fontSize: '14px', color: ttf.isActive ? paletteColor : '#8F9399' }">{{ ttf.ttf_family_name }}</to-button>
                <span :style="{ color: ttf.isActive ? paletteColor : '#8F9399' }">•</span>
              </div>
            </div>
          </div>
          <div class="settings-box">
            <span class="tip">{{ $t('message.portal.theme.overallStyle') }}</span>
            <div class="settings-box-items">
              <div v-for="setting in $preThemeList" :key="setting.id" class="settings-box-item" @click="toChangeSetting(setting)">
                <div :style="{backgroundColor: setting.color, width: '30px', height: '30px'}"></div>
                <span :style="{ color: setting.isActive ? paletteColor : '#8F9399' }">•</span>
              </div>
            </div>
          </div>
          <div class="settings-box">
            <span class="tip">{{ $t('message.portal.theme.themeStyle') }}</span>
            <div class="settings-box-items">
              <div v-for="io in ioThemes" :key="io.id" class="settings-box-item" @click="toChangeIoTheme(io)">
                <div class="io-item" :style="{color: io.isActive ? paletteColor : '#8F9399'}">
                  <to-tooltip :content="io.name" placement="top">
                    <span :class="mixin_getCurrentIconfont(io.iconName)"></span>
                  </to-tooltip>
                </div>
                <span :style="{ color: io.isActive ? paletteColor : '#8F9399' }">•</span>
              </div>
            </div>
          </div>
          <to-divider></to-divider>
          <div class="settings-box">
            <span class="tip">{{ $t('message.portal.theme.navigationMode') }}</span>
            <div class="settings-box-items">
              <div v-for="setting in asModeList" :key="setting.id" class="settings-box-item" @click="toChangeNav(setting)">
                <to-tooltip :content="setting.name" placement="top">
                  <div class="settings-box-item-as">
                    <div class="placement-img" :class="mixin_getCurrentIconfont(setting.iconName)"></div>
                    <div class="placement-point" :style="{ color: setting.isActive ? paletteColor : '#8F9399' }">•</div>
                  </div>
                </to-tooltip>
              </div>
            </div>
            <!-- <div class="settings-box">
              <span class="tip">{{ $t('message.portal.theme.contentLayoutMode') }}</span>
              <div class="settings-box-items">
                <div v-for="lay in contentLayoutList" :key="lay.id" class="settings-box-item" @click="toChangeContentLayout(lay)">
                  <to-tooltip :content="lay.label" placement="top">
                    <div class="lay-box-item-as">
                      <to-button size="mini" class="placement-label" plain>{{ lay.label }}</to-button>
                      <div class="placement-point" :style="{ color: lay.isActive ? paletteColor : '#8F9399' }">•</div>
                    </div>
                  </to-tooltip>
                </div>
              </div>
            </div> -->
            <!-- <div class="settings-box-lines">
              <div class="is-top">
                <span>{{ $t('message.portal.theme.topup') }}</span>
                <to-switch v-model="isTop" :active-color="paletteColor" inactive-color="#8F9399"></to-switch>
              </div>
            </div> -->
            <div v-if="['F-Mode', 'FI-Mode'].includes(asMode)" class="settings-box-lines">
              <div class="is-top">
                <span>{{ $t('message.portal.theme.showBreadcrumb') }}</span>
                <to-switch v-model="isShowBreadcrumb" :active-color="paletteColor" inactive-color="#8F9399"></to-switch>
              </div>
            </div>
            <!-- <div class="settings-box-lines">
              <div class="is-top">
                <span>{{ $t('message.portal.theme.showRefresh') }}</span>
                <to-switch v-model="isShowReload" :active-color="paletteColor" inactive-color="#8F9399"></to-switch>
              </div>
            </div> -->
          </div>
          <to-divider></to-divider>
          <div v-if="['F-Mode', 'FI-Mode'].includes(asMode)" class="settings-box">
            <span class="tip">{{ $t('message.portal.theme.otherSetting') }}</span>
            <div class="settings-box-lines">
              <div class="is-top">
                <span>{{ $t('message.portal.theme.isMultitab') }}</span>
                <to-switch v-model="isShowMoreTab" :active-color="paletteColor" inactive-color="#8F9399"></to-switch>
              </div>
            </div>
          </div>
        </div>
      </template>
    </yxt-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { changeTheme } from '@/qk/changeTheme'
import { ThemeconfModule } from '@/store/modules/themeconf'
import { LayoutconfModule } from '@/store/modules/layoutconf'
import theme_mixin from '@/mixin/theme_mixin'
import asmode_mixin from '@/mixin/asmode_mixin'
import { asModeListCompare } from '@/store/types'
import { EventBus } from '@/utils/event-bus'

@Component({
  name: 'ThemePicker',
  mixins: [theme_mixin, asmode_mixin]
})
export default class ThemePicker extends Vue {
  @Ref('yxtDrawerRef') readonly yxtDrawerRef!: any
  [x: string]: any
  public paletteColor = ThemeconfModule.theme.color
  public currentTheme = ThemeconfModule.theme
  public isTop = false
  public isShowBreadcrumb = LayoutconfModule.asConf.isShowBreadcrumb
  public isShowReload = true
  public isShowMoreTab = LayoutconfModule.asConf.tab.isShow
  public asModeList = asModeListCompare()
  public contentLayoutList = LayoutconfModule.asConf.contentLayout.items
  public ioThemes: any[] = [
    { id: 'light', name: this.$t('message.portal.theme.lightTheme'), color: '#F6BD16', iconName: 'shezhi', isActive: false },
    { id: 'dark', name: this.$t('message.portal.theme.darkTheme'), color: '#726AFC', iconName: 'shezhi', isActive: false }
  ]

  public dialogInfo = {
    btns: [
      { label: this.$t('message.base.cancel'), value: 'cancel', type: 'normal' },
      { label: this.$t('message.base.confirm'), value: 'sure', type: 'primary' }
    ]
  }

  public vmconfig: any = {}
  public iconfonts: any[] = []
  public ttfs: any[] = []

  get asMode() {
    return LayoutconfModule.asMode
  }

  mounted() {
    EventBus.$on('togglefloatbtn', msg => {
      this.toOpenDrawer()
    })

    this.init()
  }

  beforeDestroy() {
    EventBus.$off('togglefloatbtn')
  }

  init() {
    /** 初始化iconfont配置 */
    let files = require.context('../../assets/iconfont', true, /.json$/)
    this.vmconfig.iconfont = this.mixin_currentIconfont
    files.keys().forEach(path => {
      let iconfont = files(path)
      this.iconfonts.push({
        iconfont_id: iconfont.id,
        iconfont_family_name: iconfont.font_family,
        iconfont_glyphs_zero: 'dianzan',
        isActive: this.mixin_currentIconfont === iconfont.font_family
      })
    })

    /** 初始化ttf配置 */
    let ttfs = require.context('../../assets/ttfs', true, /.ttf$/)
    this.vmconfig.ttf = this.mixin_currentTTF
    ttfs.keys().forEach(path => {
      let ttf = ttfs(path)
      const matches = ttf.match(/(?<=\/fonts\/).*?(?=\.(\w{8})\.ttf)/)
      this.ttfs.push({
        ttf_family_name: matches[0].slice(0, matches[0].length <= 10 ? matches[0].length : 10),
        ttf_id: matches[1],
        isActive: this.mixin_currentTTF === matches[0]
      })
    })

    /** 初始化io亮/暗模式 */
    this.vmconfig.ioTheme = this.mixin_currentIoTheme
    let tempIos: any[] = []
    this.ioThemes.forEach(io => {
      tempIos.push({
        ...io,
        isActive: this.mixin_currentIoTheme === io.id
      })
    })
    this.ioThemes = tempIos

    /** 初始化布局模式asMode */
    this.vmconfig.asMode = this.mixin_asMode
    this.asModeList.map((i: any) => {
      if (i.id === this.vmconfig.asMode) {
        i.isActive = true
      } else {
        i.isActive = false
      }
      return i
    })

    /** 初始化内容区布局模式currentContentLayout */
    this.contentLayoutList.map(i => {
      if (i.id === this.vmconfig.currentContentLayout) {
        i.isActive = true
      } else {
        i.isActive = false
      }
      return i
    })
  }

  public toOpenDrawer() {
    this.yxtDrawerRef.openOrClose()
  }

  toChangeSetting(setting) {
    this.$preThemeList.map(i => {
      if (i.current === setting.current) {
        i.isActive = true
      } else {
        i.isActive = false
      }
      return i
    })
    this.currentTheme = this.$preThemeList.find(i => i.color === setting.color)
    this.paletteColor = this.currentTheme.color
  }

  toChangeIoTheme(ioItem) {
    this.ioThemes.map(i => {
      if (i.id === ioItem.id) {
        i.isActive = true
      } else {
        i.isActive = false
      }
      return i
    })
    this.vmconfig.ioTheme = this.ioThemes.find(i => i.color === ioItem.color).id
  }

  toChangeNav(navItem) {
    this.asModeList.map(i => {
      if (i.id === navItem.id) {
        i.isActive = true
      } else {
        i.isActive = false
      }
      return i
    })
    this.vmconfig.asMode = navItem.id
  }

  toChangeIconfont(item) {
    this.vmconfig.iconfont = item.iconfont_family_name
    this.iconfonts.map(i => {
      if (i.iconfont_id === item.iconfont_id) {
        i.iconfont_family_name = item.iconfont_family_name
        i.isActive = true
      } else {
        i.isActive = false
      }
      return i
    })
  }

  toChangeTTF(item) {
    this.vmconfig.ttf = item.ttf_family_name
    this.ttfs.map(i => {
      if (i.ttf_id === item.ttf_id) {
        i.ttf_family_name = item.ttf_family_name
        i.isActive = true
      } else {
        i.isActive = false
      }
      return i
    })
  }

  async toChangeContentLayout(lay) {
    this.contentLayoutList.map(i => {
      if (i.id === lay.id) {
        i.isActive = true
      } else {
        i.isActive = false
      }
      return i
    })
    this.vmconfig.currentContentLayout = lay.id

    /** 切换内容区布局模式currentContentLayout */
    const layoutConfig = await LayoutconfModule.getAsConf()
    layoutConfig.contentLayout.current = JSON.stringify(lay.content)
    LayoutconfModule.setAsConf(layoutConfig)
  }

  handleAction(btn) {
    if (btn.value === 'sure') {
      /** 切换主题色 */
      this.$changeTheme(this.currentTheme)
      changeTheme(this.currentTheme.color)

      /** 切换iconfont库 */
      this.mixin_currentIconfont = this.vmconfig.iconfont
      ThemeconfModule.setIconfontConf({ current: this.vmconfig.iconfont })

      /** 切换ttf库 */
      this.mixin_currentTTF = this.vmconfig.ttf
      ThemeconfModule.setTtfConf({ current: this.vmconfig.ttf })

      /** 切换亮/暗模式 */
      ThemeconfModule.setIoTheme({ current: this.vmconfig.ioTheme })
      window.document.documentElement.setAttribute('data-theme', this.vmconfig.ioTheme)

      /** 切换布局模式asMode */
      LayoutconfModule.setAsMode(this.vmconfig.asMode)

      /** 切换其他单项配置：是否显示面包屑？开启多标签页？ */
      const asConf = LayoutconfModule.asConf
      const tab = LayoutconfModule.asConf.tab
      LayoutconfModule.setAsConf({
        ...asConf,
        isShowBreadcrumb: this.isShowBreadcrumb,
        tab: { ...tab, isShow: this.isShowMoreTab }
      })
    }
    this.toOpenDrawer()
  }
}
</script>

<style lang="scss" scoped>
.theme-picker-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .palette-color {
    cursor: pointer;
    width: 30px;
    height: 30px;
    // margin-right: 24px;
  }
}
.drawer-content {
  padding: 24px;
  .settings-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .tip {
      padding: 12px 0;
      font-weight: 600;
    }
    .settings-box-items {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .settings-box-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-right: 12px;
        &-as {
          width: 30px;
          height: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          & > .placement-img {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 70%;
          }
          & > .placement-point {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 30%;
            text-align: center;
          }
          & > .placement-label {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 70%;
          }
        }
        & > .io-item {
          width: 30px;
          line-height: 30px;
          text-align: center;
          vertical-align: middle;
        }
        & > span {
          font-size: 16px;
        }
        .lay-box-item-as {
          // width: 30px;
          // height: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          & > .placement-point {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 30%;
            text-align: center;
          }
          & > .placement-label {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 70%;
          }
        }
      }
    }
    .settings-box-lines {
      width: 100%;
      padding-top: 24px;
      .is-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    }
  }
}
</style>
