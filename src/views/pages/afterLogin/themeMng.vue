<template>
  <div>{{ content }}</div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'themeMng'
})
export default class ThemeMng extends Vue {
  public content = 'ThemeMng'
}
</script>

<style lang='scss' scoped>
</style>
