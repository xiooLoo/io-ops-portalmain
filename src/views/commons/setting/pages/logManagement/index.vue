<template>
  <div class="content-page">
    <YxtForm
      ref="myFormRef"
      class="my-form shadow-sm"
      :form-items="formItems"
      :form-key="formKey"
      :row-span="4"
      :isAutoFix="false"
      label-width="90px"
      size="small"
      @getFormValues="getFormValues"
      @resetForm="resetForm"
    />
    <div class="web-table-view">
      <BaseTable
        ref="filterTable"
        class="PublicTable-box"
        :table-data="tableData"
        :table-columns="tableColumn"
        :show-action="false"
        :actions="handleTableActions"
        :pagination-config="paginationConfig"
      >
      </BaseTable>
    </div>
  </div>
</template>
<script>
import { formItems, tableColumn } from './config'
import { getLogList, getLogSigns } from '../../api/setting'
import commonMixin from './commonMixin'
import BaseTable from '../../components/BaseTable/index.vue'

export default {
  data() {
    return {
      formItems,
      tableColumn,
      rowId: null,
      multipleSelection: [],
      formKey: {},
      isLoading: false,
      paginationConfig: {
        currentPage: 1,
        currentSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        total: 0,
        layout: 'prev, pager, next, sizes'
      },
      tableData: []
    }
  },
  components: {
    BaseTable
  },
  mixins: [commonMixin],
  computed: {
  },
  mounted() {
  },
  methods: {
    handleTableActions(obj) {
      console.log('handleTableActions===', obj)
      if (obj.key == 'handlePageChange') {
        this.paginationConfig.currentPage = obj.page
        this.getList()
      } else if (obj.key == 'handleSizeChange') {
        this.paginationConfig.currentSize = obj.size
        this.getList()
      }
    },
    handleTabs(el, tabValue) {
      console.log(tabValue)
      if (el && el.obj && el.obj.value) {
        this.currentView = el.obj.value
        this.paginationConfig.currentSize = this.paginationConfig.pageSizes[0]
        this.btnAddCode()
        this.resetForm()
      }
    },
    handleDrawer({ id, flowTaskId }) {
      this.draActionData = { id, flowTaskId }
      this.$refs.contentDrawer.openOrClose()
    },
    // 获取数据
    getList() {
      this.isLoading = true
      let { currentPage, currentSize } = this.paginationConfig
      let listQuery = {
        pageSize: currentSize,
        pageNo: currentPage
      }
      getLogSigns().then(res => {
        this.formItems[0].arr = res.data
      })
      getLogList({ ...listQuery, ...this.formKey }).then(response => {
        this.tableData = response.data.list
        this.paginationConfig.total = response.data.total
        setTimeout(() => {
          this.isLoading = false
        }, 1 * 500)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content-page {
  padding: 24px;
}
</style>