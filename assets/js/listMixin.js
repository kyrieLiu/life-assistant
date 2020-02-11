/**
 * @author Liu Yin
 * @date 2020/2/11
 * @Description: 列表页面混入
 */
export default {
  data () {
    return {
      showDialog: false,
      pageTotal: null,
      dialogTitle: '',
      tableData: []
    }
  },
  mounted () {
    this.initTableData(1)
  }
}
