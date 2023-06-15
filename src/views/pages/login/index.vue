<template>
  <yxt-biss-login :actions="toLogin" mode="B"/>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'LoginPage'
})
export default class LoginPage extends Vue {
  toLogin(e: any) {
    if (e.key === 'toLoginNext') {
      const params: any = e.obj
      UserModule.login(params)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
