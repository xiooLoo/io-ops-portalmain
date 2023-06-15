<template>
  <section class="app-main-box" :style="{ height: global_mixin_layoutHeight() }">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive v-if="!$route.meta.noCache">
        <router-view :key="key" />
      </keep-alive>
      <router-view v-else :key="key" />
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  get key() {
    return this.$route.path
  }
}
</script>

<style lang="scss" scoped>
.app-main-box {
  /* 50= navbar  50  */
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  @include background_color_main('background_color_main');
}


</style>
