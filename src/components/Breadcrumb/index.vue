<template>
  <to-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <to-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' ||
              index === breadcrumbs.length - 1 ||
              item.redirect === $route.path
          "
          class="no-redirect"
        >{{ $t(item.meta.title) }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{
          $t(item.meta.title)
        }}</a>
      </to-breadcrumb-item>
    </transition-group>
  </to-breadcrumb>
</template>

<script lang="ts">
import * as pathToRegexp from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteRecord, Route } from 'vue-router'

@Component({
  name: 'Breadcrumb'
})
export default class extends Vue {
  public breadcrumbs: RouteRecord[] = [];

  @Watch('$route')
  public onRouteChange(route: Route) {
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getBreadcrumb()
  }

  created() {
    this.getBreadcrumb()
  }

  public getBreadcrumb() {
    const _this = this
    let matched = this.$route.matched.filter(item => item.meta && _this.$t(item.meta.title))
    const first = matched[0]
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }

  public pathCompile(path: string) {
    const { params } = this.$route
    console.log(pathToRegexp)
    const toPath = pathToRegexp.compile(path)
    return toPath(params)
  }

  public handleLink(item: any) {
    const { redirect, path } = item
    // 当前已经是重定向的页面了
    if (redirect === this.$route.path) {
      return
    }
    if (redirect) {
      this.$router.push(redirect)
      return
    }
    this.$router.push(this.pathCompile(path))
  }
}
</script>

<style lang="scss" scoped>
.to-breadcrumb__inner,
.to-breadcrumb__inner a {
  font-weight: 400 !important;
  color: $menuText !important;
  transition: all 0.1s linear;
  user-select: none;
}

::v-deep .to-breadcrumb__inner > a:hover {
  color: $menuActiveText !important;
  transition: all 0.1s linear;
}
.app-breadcrumb.to-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: $navbarH;
  margin-left: 8px;

  .no-redirect {
    color: $menuText !important;
    cursor: pointer;
    user-select: none;
  }
}
</style>
