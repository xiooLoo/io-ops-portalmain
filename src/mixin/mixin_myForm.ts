export default {
    data() { 
        return {
            // Form表单一
            queryFormItems: [],
            queryForm: {},
            queryFormConfig: {
                rowSpan: 4,
                labelWidth: '100px',
            },
            // Form表单二
            drawerQueryFormItems: [],
            drawerQueryForm: {},
            drawerQueryFormConfig: {
                rowSpan: 2,
                labelWidth: '120px',
            },
        }
    },
    methods: {
        // Form表单一
        queryFormSubmit(e) {
            this._fetchList(e)
        },
        resetForm() {
            this.paginationConfig.currentPage = 1
            this.paginationConfig.currentSize = 10
            this.queryForm = {}
            this._fetchList()
        },

        // Form表单二
        drawerQueryFormSubmit(e) {
            this._drawerFetchList(e)
        },
        drawerResetForm() {
            this.drawerPaginationConfig.currentPage = 1
            this.drawerPaginationConfig.currentSize = 10
            this.drawerQueryForm = {}
            this._drawerFetchList()
        },
        
    },
}