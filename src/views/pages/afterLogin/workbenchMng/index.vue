<template>
  <div>{{ content }}</div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'WorkbenchMng'
})
export default class WorkbenchMng extends Vue {
  public content = 'WorkbenchMng内容'
}
</script>

<style lang='scss' scoped>
</style>
