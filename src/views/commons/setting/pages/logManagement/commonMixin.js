export default {
  props: {},
  data() {
    return {
      drawerInfo: {
        title: '审核信息',
        size: '30%',
        targetComp: 'approval',
        btns: [
          { label: '取消', value: 'cancel', type: 'normal' },
          { label: '驳回', value: 'reject', type: 'primary' },
          { label: '同意', value: 'agree', type: 'primary' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.resetForm()
  },
  methods: {
    // 初始化form
    initForm() {
      const keyData = {}
      this.formItems.forEach(i => {
        keyData[i.id] = ''
      })
      this.formKey = keyData
    },
    resetPage() {
      this.paginationConfig.currentPage = 1
      this.getList()
    },
    // 重置表单
    resetForm() {
      this.initForm()
      this.resetPage()
    },
    // 获取搜素条件
    getFormValues(e) {
      this.formKey = e
      this.resetPage()
    },
    showMessge(type, message) {
      this.$message({ type, message })
    },
    isBtnShowFun(row, btnObj, callback) {
      let { status, btnAuthorityFun } = btnObj
      callback(this[btnAuthorityFun](row, status))
    },
    // table操作插槽 按钮点击事件的总入口
    rowBtnsActions({ obj: { btn, row } }) {
      this.tableBtnHandler(btn.onclick, row, btn)
    },
    tableBtnHandler(onClick, row, btn) {
      this[onClick](row, onClick === 'handleDialog' ? btn.label : btn)
    },
    copy(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
