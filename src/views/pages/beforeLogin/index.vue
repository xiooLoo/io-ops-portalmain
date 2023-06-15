<template>
  <div>{{ content }}</div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'BeforeLogin'
})
export default class BeforeLogin extends Vue {
  public content = 'BeforeLogin内容'
}
</script>

<style lang='scss' scoped>
</style>
