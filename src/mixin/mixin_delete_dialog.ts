/**
 * 首先在dom中写入以下dom:
 *  <MyDialog ref="deleteDialogRef" :is-append-to-body="true" :actions="handleDialogActions" :dialog-info="deleteDialogInfo">
      <span>{{ deleteDialogInfo.content }}</span>
    </MyDialog>
 */
import MyDialog from '@/components/MyDialog'
export default {
  components: {
    MyDialog
  },
  data() {
    return {
      deleteDialogInfo: {
        btns: [
          { label: '取消', value: 'cancel', type: 'normal' },
          { label: '确定', value: 'sure', type: 'primary' },
        ],
        tipIcon: 'to-icon-error',
        title: '删除',
        isIds: false,
        content: '即将删除所选资源，请确认是否删除？'
      },
      deleteConnectDialogInfo: {
        btns: [
          { label: '取消', value: 'cancel', type: 'normal' },
          { label: '确定', value: 'sure-conn', type: 'primary' },
        ],
        tipIcon: 'to-icon-error',
        title: '删除',
        isIds: false,
        content: '即将删除所选资源，请确认是否删除？'
      },
      deleteId: '',
      deleteIds: [],
      nextDeleteId: '',
      nextDeleteIds: [],
      drawerDeleteIds: [],
      drawerDeleteItems: [],
    }
  },
  created() {
    this.deleteIds = []
  },
  methods: {
    // 弹框操作事件
    handleDialogActions(btn) {
      if (btn.value === 'sure') {
        // 确认
        if (this.deleteDialogInfo.isIds) {
          this.fetchDelItems(this.deleteIds)
        } else {
          this.fetchDelItem(this.deleteId)
        }
      } else if (btn.value === 'sure-save') {
        // 保留
        if (this.deleteDialogInfo.isIds) {
          this.fetchDelItemSureSaves(this.deleteIds)
        } else {
          this.fetchDelItemSureSave(this.deleteId)
        }
      } else if (btn.value === 'sure-nosave') {
        // 不保留
        if (this.deleteDialogInfo.isIds) {
          this.fetchDelItemSureNoSaves(this.deleteIds)
        } else {
          this.fetchDelItemSureNoSave(this.deleteId)
        }
      } else if (btn.value === 'sure-conn') {
        // 同要给页面存在多个列表进行【删除】操作
        if (this.deleteConnectDialogInfo.isIds) {
          this.fetchDelItemsNext(this.nextDeleteIds)
        } else {
          this.fetchDelItemNext(this.nextDeleteId)
        }
      }
      this.$refs.deleteDialogRef.openOrClose()
    },
  },
}

