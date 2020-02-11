<template>
  <div>
    <list-view
      :show-operate="true"
      :search-form="searchForm"
      :table-label="tableLabel"
      :table-data="tableData"
      :total-page="pageTotal"
      :table-button="tableButton"
      :del-url="delUrl"
      control-width="160px"
      @handleSearch="initTableData"
      @handleClick="handleClick"
    />
    <add-edit-dialog v-if="showDialog" :dialog-title="dialogTitle" @close="showDialog=false" />
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
      tableLabel: [
        { key: 'name', title: '名称', minWidth: 130 },
        { key: 'address', title: '地址', minWidth: 120 }

      ],
      searchForm: [
        { name: '耗材类型', placeholder: '请选择耗材类型', data: [], type: 'select', key: 'type' },
        { name: '耗材用途', placeholder: '请选择耗材用途', data: [], type: 'select', key: 'address' }
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
    initTableData (current, searchForm) {
      this.$axios.post('/goods/list').then((result) => {
        if (result.data.code === 0) {
          this.tableData = result.data.list
        } else {
          this.$message.error(result.data.message)
        }
      }).catch((e) => {
        this.$message.error(e)
      })
    },
    handleClick (val) {
      switch (val) {
        case '新增':
          this.showDialog = true
          this.dialogTitle = '新增'
          break
        case '编辑':
          break
      }
    }
  }
}
</script>

<style>
</style>
