<!--
   User: liuyin
   Date: 2019/12/13 10:18 上午
   Description:物品列表
 -->
<template>
  <div class="router-page">
    <list-view
      v-show="!showDetail"
      :show-operate="false"
      :search-form="searchForm"
      :table-label="tableLabel"
      :table-data="tableData"
      :total="total"
      :table-button="tableButton"
      :del-url="delUrl"
      control-width="140px"
      @handleSearch="initTableData"
      @handleClick="handleClick"
    />
    <detail
      v-if="showDetail"
      :row-id="rowId"
      @handleClose="showDetail=false"
    />
  </div>
</template>

<script>
import listMixin from '../assets/js/listMixin'
import detail from '~/components/goods/detail'
export default {
  components: {
    detail
  },
  mixins: [listMixin],
  data () {
    return {
      a: '',
      tableLabel: [
        { key: 'name', title: '名称' },
        { key: 'address', title: '地址' },
        { key: 'note', title: '备注' },
        { key: 'typeName', title: '类型', width: '140px' }
      ],
      searchForm: [
        { name: '名称', placeholder: '请输入名称', type: 'input', key: 'name' }
      ],
      tableButton: [
        { name: '详情' }
      ]
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
      this.$axios.post(this.urls.goodsList, params).then((result) => {
        if (result.code === 0) {
          this.tableData = result.list
          this.tableData.forEach((item) => {
            if (item.type === 1) {
              item.typeName = '耗材'
            } else {
              item.typeName = '物品'
            }
          })
          this.total = result.total
        } else {
          this.$message.error(result.message)
        }
      }).catch((e) => {
        this.$message.error(e)
      })
    },
    handleClick (name, row) {
      this.rowId = row._id
      this.showDetail = true
    }
  }
}
</script>
