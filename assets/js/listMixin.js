/**
 * @author Liu Yin
 * @date 2020/2/11
 * @Description: 列表页面混入
 */
export default {
  data () {
    return {
      // 是否展示弹窗
      showDialog: false,
      // 弹窗标题
      dialogTitle: '',
      // table列表数据
      tableData: [],
      // 查询总条数
      total: 0,
      // 条目数据
      rowData: '',
      // 条目数据ID
      rowId: '',
      // 展示详情
      showDetail: false
    }
  },
  mounted () {
    // 初始化列表数据
    this.initTableData(1)
  }
}
