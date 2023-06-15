<template>
  <div class="sidebar-index">
    <div v-if="['F-Mode'].includes(asMode)">
      <sidebar-logo v-show="isLogo" :collapse="isCollapse" />
    </div>
    <to-scrollbar wrap-class="scrollbar-wrapper">
      <to-menu
        :unique-opened="true"
        :collapse-transition="false"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="paletteColor"
        :mode="menuMode"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </to-menu>
      <div>
        <hamburger
          v-if="isShowHamburger && ['F-Mode', 'FI-Mode'].includes(asMode)"
          id="hamburger-container"
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
      </div>
    </to-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import variables from '@/styles/variables.scss'
import { UserModule } from '@/store/modules/user'
import { AppModule } from '@/store/modules/app'
import { ThemeconfModule } from '@/store/modules/themeconf'
import { LayoutconfModule } from '@/store/modules/layoutconf'

enum MenuModeFace {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarLogo,
    Hamburger
  }
})
export default class extends Vue {
  @Prop({ default: 'vertical' }) public menuMode!: MenuModeFace

  get paletteColor() {
    return ThemeconfModule.theme.color
  }

  get isLogo() {
    return LayoutconfModule.asConf.logo.isShow
  }

  /**
   * 获取动态路由
   */
  get routes() {
    return UserModule.routeList
  }

  /**
   * 获取菜单栏状态
   */
  get sidebar() {
    return AppModule.sidebar
  }

  /**
   * 获取scss变量
   */
  get variables() {
    return variables
  }

  /**
   * 获取当前激活菜单
   */
  get activeMenu() {
    const route = this.$route
    const { meta, path, name } = route

    // 切换菜单的时候存入tab
    AppModule.SaveTab({ name: name as string, path: path, title: meta?.title })

    if (meta?.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  /**
   * 获取当前菜单是否关闭
   */
  get isCollapse() {
    return !this.sidebar.opened
  }

  get asMode() {
    return LayoutconfModule.asMode
  }

  get isShowHamburger() {
    return LayoutconfModule.asConf.isShowHamburger
  }

  public toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }
}
</script>
<style lang="scss">
  .to-scrollbar {
    height: 100%;
    border-right: 1px dashed rgba(201, 211, 213, 0.7) !important;
    box-sizing: border-box;
    .to-scrollbar__wrap {
      overflow-x: hidden !important;
      overflow-y: auto !important;
    }
    .to-scrollbar__view {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: calc(100% - $navbarH);
      overflow-x: hidden;
    }
  }
.sidebar-index {
}
</style>
<style lang="scss" scoped>
.sidebar-index {
  height: 100%;
  .hamburger-container {
    line-height: 20px;
    height: 20px;
    float: left;
    left: 200px;
    padding: 0 16px;
    margin: 12px 0;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
