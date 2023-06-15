export default {
  computed: {
    /**
     * 判断当前路由是【新增】还是【编辑】
     */
    cmpAddOrEdit: {
      get() {
        return (this.$route.meta && this.$route.meta.tag) || 'add'
      },
      set(val) {
        return val
      }
    }
  },
}

