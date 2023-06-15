<template>
  <div class="base-pagination-box">
    <div>
      <div v-if="isShowTotal" class="pagination-box-totalbox">
        共 {{ paginationConfig.total }} 条记录&nbsp;第{{ paginationConfig.currentPage }}/{{ Math.ceil(paginationConfig.total/paginationConfig.currentSize) }}页
      </div>
    </div>
    <to-pagination
      :background="paginationConfig.hasBackground"
      :current-page="paginationConfig.currentPage"
      :page-sizes="paginationConfig.pageSizes"
      :page-size="paginationConfig.currentSize"
      :layout="paginationConfig.layout"
      :total="paginationConfig.total"
      :class="'my-pagi-' + paginationConfig.align"
      :pager-count="paginationConfig.pagerCount"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </div>
</template>
<script>
export default {
  name: 'BasePagination',
  props: {
    /**
     * 是否显示总数，格式如：共 28 条记录 第1/3页
     */
    isShowTotal: {
      type: Boolean,
      default: true
    },
    /**
     * 分页组件配置内容
     */
    paginationConfig: {
      type: Object,
      default: function() {
        return {
          align: 'right',
          hasBackground: true,
          currentPage: 1, // 当前页
          currentSize: 10, // 共多少页
          pageSizes: [10, 20, 30, 40, 50],
          total: 0, // 总条数
          pagerCount: 5,
          layout: 'prev, pager, next, sizes, jumper'
        }
      }
    },
    /**
     * 所有@click 事件，通过key区分事件具体类型
     */
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSizeChange(size) {
      let query = {
        key: 'handleSizeChange',
        size
      }
      this.actions(query)
    },
    handlePageChange(page) {
      let query = {
        key: 'handlePageChange',
        page
      }
      this.actions(query)
    }
  }
}
</script>
<style lang="scss" scoped>
.base-pagination-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.my-pagi-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.my-pagi-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

</style>
