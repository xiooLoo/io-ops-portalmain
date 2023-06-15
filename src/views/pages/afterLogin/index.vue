<template>
  <div>{{ content }}</div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'afterLogin'
})
export default class AfterLogin extends Vue {
  public content = 'AfterLogin/index'
}
</script>

<style lang='scss' scoped>
</style>
