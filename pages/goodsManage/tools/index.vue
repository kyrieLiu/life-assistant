<!--
   User: liuyin
   Date: 2019/12/13 10:18 上午
   Description:物品列表
 -->
<template>
  <div class="router-page">
    <list-view
      v-show="!showDetail"
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
    <add-edit
      v-if="showDialog"
      :dialog-title="dialogTitle"
      :row-id="rowId"
      @close="showDialog=false"
      @submitSuccess="initTableData(1)"
    />
    <detail
      v-if="showDetail"
      :row-id="rowId"
      @handleClose="showDetail=false"
    />
  </div>
</template>

<script>
import listMixin from '../../../assets/js/listMixin'
import addEdit from '../../../components/goods/tools/addEdit'
import detail from '../../../components/goods/detail'
export default {
  components: {
    addEdit,
    detail
  },
  mixins: [listMixin],
  data () {
    return {
      tableLabel: [
        { key: 'name', title: '名称' },
        { key: 'address', title: '地址' },
        { key: 'note', title: '备注' }

      ],
      searchForm: [
        { name: '名称', placeholder: '请输入名称', type: 'input', key: 'keyword' }
      ],
      tableButton: [
        { name: '编辑' },
        { name: '删除' },
        { name: '详情' }
      ],
      delUrl: '/goods/delete'
    }
  },
  methods: {
    // 初始化数据
    initTableData (current, condition) {
      if (!condition) { condition = {} }
      // 2是物品
      condition.type = 2
      const params = {
        page: current,
        size: 10,
        condition
      }
      this.$axios.post(this.urls.goodsList, params).then((result) => {
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
          this.rowId = null
          this.dialogTitle = '新增工具'
          this.showDialog = true
          break
        case '编辑':
          this.rowId = row._id
          this.dialogTitle = '编辑工具'
          this.showDialog = true
          break
        case '详情':
          this.rowId = row._id
          this.showDetail = true
          break
      }
    }
  }
}
</script>
