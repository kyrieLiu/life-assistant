<template>
  <div>
    <list-view
      :show-operate="true"
      :search-form="searchForm"
      :table-label="tableLabel"
      :table-data="tableData"
      :total="total"
      :table-button="tableButton"
      :del-url="delUrl"
      control-width="160px"
      @handleSearch="initTableData"
      @handleClick="handleClick"
    />
    <add-edit-dialog
      v-if="showDialog"
      :dialog-title="dialogTitle"
      :item-id="itemId"
      @close="showDialog=false"
      @submitSuccess="initTableData(1)"
    />
  </div>
</template>

<script>
import listMixin from '../../../assets/js/listMixin'
import addEditDialog from './addEditDialog'
export default {
  components: {
    addEditDialog
  },
  mixins: [listMixin],
  data () {
    return {
      a: '',
      tableLabel: [
        { key: 'name', title: '名称', minWidth: 130 },
        { key: 'address', title: '地址', minWidth: 120 }

      ],
      searchForm: [
        { name: '名称', placeholder: '请输入名称', type: 'input', key: 'name' }
      ],
      tableButton: [
        { name: '编辑' },
        { name: '删除' }
      ],
      delUrl: ''
    }
  },
  methods: {
    // 初始化数据
    initTableData (current, condition) {
      const params = {
        page: current,
        size: 10,
        condition
      }
      this.$axios.post('/goods/list', params).then((result) => {
        if (result.code === 0) {
          this.tableData = result.list
          this.total = result.total
        } else {
          this.$message.error(result.message)
        }
      }).catch((e) => {
        this.$message.error(e)
      })
    },
    handleClick (name, row) {
      switch (name) {
        case '新增':
          this.showDialog = true
          this.dialogTitle = '新增耗材'
          break
        case '编辑':
          this.itemId = row._id
          this.dialogTitle = '编辑耗材'
          this.showDialog = true
          break
      }
    }
  }
}
</script>
