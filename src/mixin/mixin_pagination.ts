export default {
  data() {
    return {
      paginationConfig: {
        currentPage: 1,
        currentSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      drawerPaginationConfig: {
        currentPage: 1,
        currentSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  }
}
