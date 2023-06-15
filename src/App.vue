<template>
  <div id="app" :class="currentTTF" @click="toClickBg">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import NProgress from 'nprogress'
import { ThemeconfModule } from '@/store/modules/themeconf'
import { EventBus } from '@/utils/event-bus'

@Component({
  name: 'app'
})
export default class extends Vue {
  public isLoading = true
  get currentTTF() {
    return ThemeconfModule.ttf.current
  }

  @Watch('isLoading')
  onChangeValue(val: string) {
    if (val) {
      NProgress.start()
    } else {
      this.$nextTick(() => {
        NProgress.done()
      })
    }
  }

  created() {
    /**
     * 每次F5 刷新页面时同步主题
     *
     * 初始化-系统主题
     * 初始化-亮/暗模式
     */
    Vue.prototype.$changeTheme(ThemeconfModule.theme)
    window.document.documentElement.setAttribute('data-theme', ThemeconfModule.ioTheme.current)
  }

  toClickBg() {
    EventBus.$emit('to_clear_grid', null)
  }
}
</script>
<style lang="scss" scoped>
// 本地引用iconfont库
@import 'assets/iconfont/iconfont_1/iconfont.css';
@import 'assets/iconfont/iconfont_2/iconfont.css';
// CDN引用iconfont库
// @import '//at.alicdn.com/t/c/font_3898965_4v7xcjm2cn.css'; // iconfont_1
// @import '//at.alicdn.com/t/c/font_3899100_teb3a1yzl0q.css'; // iconfont_2
</style>
