<template>
  <div class="as-mode">
    <div v-if="asMode === 'F-Mode'" :class="classObj" class="layout-mode-f">
      <Sidebar class="layout-mode-f-sidebar" />
      <div class="layout-mode-f-main" :style="{ height: global_mixin_layoutHeight() }">
        <Navbar v-show="isShowNavbar" />
        <Tab v-show="isShowTab"/>
        <slot name="content"></slot>
      </div>
    </div>
    <div v-else-if="asMode === 'FI-Mode'" :class="classObj" class="layout-mode-fi">
      <Navbar v-show="isShowNavbar" />
      <div class="layout-mode-fi-main" :style="{ height: global_mixin_layoutHeight() }">
        <Sidebar class="layout-mode-fi-sidebar" />
        <Tab v-show="isShowTab" />
        <slot name="content"></slot>
      </div>
    </div>
    <div v-else-if="asMode === 'T-Mode'" :class="classObj" class="layout-mode-t">
      <Navbar v-show="isShowNavbar" />
      <div class="layout-mode-t-main" :style="{ height: global_mixin_layoutHeight() }">
        <slot name="content"></slot>
      </div>
    </div>
    <div v-else-if="asMode === 'Z-Mode'" :class="classObj" class="layout-mode-z">
      <Navbar v-show="false" />
      <div class="layout-mode-z-main" :style="{ height: global_mixin_layoutHeight() }">
        <slot name="content"></slot>
      </div>
    </div>
    <YxtFloatButton v-if="asMode === 'Z-Mode'" :form="floatBtnForm"/>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import YxtFloatButton from '@/components/YxtFloatButton/index.vue'
import { Navbar, Sidebar, Tab } from '../index'
import { AppModule } from '@/store/modules/app'
import { AsModeEnum } from '@/store/types'
import { LayoutconfModule } from '@/store/modules/layoutconf'

@Component({
  name: 'AsMode',
  components: {
    YxtFloatButton,
    Navbar,
    Sidebar,
    Tab
  }
})
export default class extends Vue {
  @Prop({ default: LayoutconfModule.asMode }) public asMode!: AsModeEnum
  @Prop({ default: () => function() {} }) public actions!: Function
  public floatBtnForm: any = {
    themeColor: {
      hsl: { h: 200, s: 0, l: 0, a: 1 },
      hex: '#000000',
      hex8: '#000000FF',
      rgba: { r: 0, g: 0, b: 0, a: 1 },
      hsv: { h: 200, s: 0, v: 0, a: 1 },
      oldHue: 200,
      source: 'hex',
      a: 1
    },
    fontSize: 28
  }

  get isShowNavbar() {
    return LayoutconfModule.asConf.navbar.isShow
  }

  get isShowTab() {
    return LayoutconfModule.asConf.tab.isShow
  }

  /**
   * 获取侧边栏状态
   */
  get sidebar() {
    return AppModule.sidebar
  }

  /**
   * 绑定类名
   */
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation
    }
  }
}
</script>

<style lang="scss" scoped>
.as-mode {
  height: 100%;
}

.layout-mode-f {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &-sidebar {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    @include background_color('background_color');
  }
  &-main {
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
  }
}

.layout-mode-fi {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &-sidebar {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: $navbarH;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    @include background_color('background_color');
  }
  &-main {
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
  }
}

.layout-mode-t {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &-main {
    transition: margin-left 0.28s;
    position: relative;
  }
}

.layout-mode-z {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &-main {
    transition: margin-left 0.28s;
    position: relative;
  }
}

.hideSidebar {
  .layout-mode-f-sidebar, .layout-mode-fi-sidebar {
    width: 54px !important;
  }
  .layout-mode-f-main, .layout-mode-fi-main {
    margin-left: 54px;
  }
}

.withoutAnimation {
  .layout-mode-f-sidebar, .layout-mode-fi-sidebar,
  .layout-mode-f-main, .layout-mode-fi-main {
    transition: none;
  }
}

</style>

