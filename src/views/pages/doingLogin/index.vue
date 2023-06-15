<template>
  <div>{{ content }}</div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'doingLogin'
})
export default class DoingLogin extends Vue {
  public content = 'DoingLogin'
}
</script>

<style lang='scss' scoped>
</style>
