<template>
  <div class="router-page">
    <list-view
      :show-operate="true"
      :search-form="searchForm"
      :table-label="tableLabel"
      :table-data="tableData"
      :total-page="pageTotal"
      :del-url="delUrl"
      control-width="160px"
      @handleSearch="initTable"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableLabel: [
        { name: 'depTypeTitle', title: '组织类别', minWidth: 130 },
        { name: 'department', title: '单位/部门', minWidth: 120 }

      ],
      searchForm: [
        { name: '组织类别', placeholder: '请选择组织类别', data: [], type: 'select', key: 'depType' },
        { name: '单位部门', placeholder: '请选择单位/部门', data: [], type: 'select', key: 'idRbacDepartment', disabled: true }
      ],
      tableData: [],
      pageTotal: null,
      delUrl: ''
    }
  },
  methods: {
    // 初始化数据
    initTable (current, searchForm) {
      // const param = {
      //   pageable: {current: current, size: 10},
      //   entity: searchForm,
      // };
      // const result = await this.$axios.post('/user', param);
      this.tableData = [
        {
          depTypeTitle: '厨房',
          department: '测试'
        },
        {
          depTypeTitle: '厨房',
          department: '测试'
        }
      ]
    }
  }
}
</script>

<style>
</style>
