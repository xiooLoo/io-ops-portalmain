<template>
  <div class="navbar">
    <div v-if="['F-Mode'].includes(asMode)" class="f-mode-nav">
      <breadcrumb v-if="isShowBreadcrumb" id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div v-if="['FI-Mode'].includes(asMode)" class="f-fi-mode-nav">
      <div >
        <sidebar-logo v-show="isLogo" :collapse="isCollapse" />
      </div>
      <breadcrumb v-if="isShowBreadcrumb" id="breadcrumb-container" class="breadcrumb-container-fi" />
    </div>
    <div v-else-if="['T-Mode'].includes(asMode)" class="f-fi-mode-nav">
      <div>
        <sidebar-logo v-show="isLogo" :collapse="false" />
      </div>
    </div>
    <div class="right-menu">
      <template v-for="item in getNavbarItems">
        <div v-if="item.id === 'lang' && item.isShow" :key="item.id" class="zh-box">
          <svg-icon class="zh-box-svg" name="language" @click="toChangeLanguage"/>
          <sub :style="{ color: currenTheme }">{{ currentLang }}</sub>
        </div>
        <div v-if="item.id === 'setting' && item.isShow" :key="item.id" class="setting-down-box">
          <SettingDown />
        </div>
        <div v-if="item.id === 'theme' && item.isShow" :key="item.id" class="change-theme-pre">
          <ThemePicker ref="themePicker" />
        </div>
      </template>

      <to-dropdown
        class="avatar-container right-menu-item hover-effect"
        id="personal-center"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <span class="user-name-text">{{ userName }}</span>
          <div :class="mixin_getCurrentIconfont('zhankai')" class="zhankai-down" />
        </div>
        <to-dropdown-menu slot="dropdown">
          <router-link to="/personal/profile">
            <to-dropdown-item> {{ $t('message.portal.router.personalCenter') }} </to-dropdown-item>
          </router-link>
          <to-dropdown-item divided>
            <span style="display: block" @click="logout">{{ $t('message.portal.logout') }}</span>
          </to-dropdown-item>
        </to-dropdown-menu>
      </to-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import { ThemeconfModule } from '@/store/modules/themeconf'
import { LayoutconfModule } from '@/store/modules/layoutconf'
import ThemePicker from '@/components/ThemePicker/index.vue'
import SettingDown from '@/views/commons/setting/components/SettingDown/index.vue'
import router from '@/router'
import theme_mixin from '@/mixin/theme_mixin'
import sidebar_mixin from '../sidebar_mixin'
import SidebarLogo from '../Sidebar/SidebarLogo.vue'

@Component({
  name: 'Navbar',
  mixins: [theme_mixin, sidebar_mixin],
  components: {
    Breadcrumb,
    Hamburger,
    ThemePicker,
    SettingDown,
    SidebarLogo
  }
})
export default class extends Vue {
  [x: string]: any
  @Ref('themePicker') readonly themePickerRef!: any

  public userName: string = UserModule.userData.additionalInformation.name || UserModule.userData.additionalInformation.userName || '未知用户'

  public langs: any[] = [
    { value: 'zh-CN', label: '中' },
    { value: 'zh-EN', label: '英' }
  ]

  public currentLang = this.langs.find(la => la.value === this.$i18n.locale).label
  get currenTheme() {
    return ThemeconfModule.theme.color
  }

  get getNavbarItems() {
    return LayoutconfModule.asConf.navbar.items
  }

  get isShowHamburger() {
    return LayoutconfModule.asConf.isShowHamburger
  }

  get isShowBreadcrumb() {
    return LayoutconfModule.asConf.isShowBreadcrumb
  }

  get asMode() {
    return LayoutconfModule.asMode
  }

  get sidebar() {
    return AppModule.sidebar
  }

  get avatar() {
    return require('@/assets/gifs/avatar.gif')
  }

  toChangeLanguage() {
    if (this.currentLang === '中') {
      this.currentLang = '英'
    } else {
      this.currentLang = '中'
    }
    this.$i18n.locale = this.langs.find(la => la.label === this.currentLang).value
    ThemeconfModule.setLang(this.$i18n.locale)
  }

  public toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }

  public logout() {
    UserModule.logout().then(() => {
      router.replace('/login')
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar-tmode {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.navbar {
  width: 100%;
  height: $navbarH;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);

  .f-mode-nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 12px;
  }

  .f-fi-mode-nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 12px;
  }

  .hamburger-container {
    line-height: $navbarH;
    height: 100%;
    float: left;
    left: 200px;
    padding: 0 16px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .breadcrumb-container-fi {
    float: left;
    padding: 0 24px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $navbarH;
    display: flex;
    align-items: center;

    .theme-cnt {
      margin: 12px 10px 0 0;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 12px 0 0;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      // margin-right: 12px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        .user-name-text {
          color: $yxt-color-text-2;
          font-size: $yxt-font-size-body-2;
          padding: 0 0 0 16px;
        }

        .zhankai-down {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }

    .change-theme-pre {
      width: auto;
      margin: 0 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .setting-down-box {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .zh-box {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      .zh-box-svg {
        margin: 4px;
      }
    }
  }
}
</style>
