
/**
 * User: liuyin
 * Date: 2019/12/13 10:18 上午
 * Description: 列表混入
 */
import bus from '~/utils/bus'
export default {
  props: {
    // table顶部head列表
    tableLabel: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    // table数据列表
    tableData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    // 按钮列表
    tableButton: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否展示上移下移
    showMove: {
      type: Boolean,
      default: false
    },
    // 总条数
    total: {
      type: Number,
      default: null
    },
    // 默认操作项居右展示
    fixed: {
      type: String,
      default: 'right'
    },
    // 操作列的宽度
    controlWidth: {
      default: 140
    },
    // 是否要展示操作列
    showOperateColumn: {
      type: Boolean,
      default: true
    },
    // 删除接口地址
    delUrl: {
      type: String
    },
    // 删除操作传ID方式  默认ID为数组方式
    delParamType: {
      type: String,
      default: ''
    },

    // 操作按钮插槽名称
    btnJurisdiction: {
      type: Boolean,
      default: false
    },
    // 是否展示上方提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 是否固定高度
    fixHeight: {
      type: Boolean,
      default: false
    },
    // 是否展示页面操作按钮
    showOperate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  created () {
    bus.$on('initPage', () => {
      this.currentPage = 1
    })
  },
  methods: {

    /** 根据权限code和业务字段判断是否要展示对应的操作按钮
     * */
    isShowButton (buttonInfo, tableItem) {
      // if (buttonInfo.icodeHide) {
      //   const isHaveCode = this.vertifyOperateCode(buttonInfo.code)
      //   // 根据业务数据条件判断是否显示按钮
      //   if (tableItem.operateButton !== undefined) {
      //     return isHaveCode && tableItem.operateButton === 1
      //   } else {
      //     return isHaveCode
      //   }
      // } else {
      //   return true
      // }
      return true
    },

    // 操作按钮点击事件
    handleTableClick (name, row) {
      if (name === '删除') {
        this.handleRemoveItem(row.id, row)
      } else {
        this.$emit('handleClick', name, row)
      }
    },
    // 分页
    handleCurrentChange (pageIndex) {
      this.$emit('handleSearch', pageIndex, this.searchValue)
    },

    // 删除
    handleRemoveItem (id, row) {
      if (row.isDefault === 1) {
        this.$message.warning('系统预制不可操作！')
      } else {
        this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteItem(id)
        })
      }
    },
    // 删除数据
    async deleteItem (id) {
      let param
      if (this.delParamType === 'ids') {
        param = { ids: id }
      } else if (this.delParamType === 'id') {
        param = { id }
      } else {
        param = [id]
      }

      const result = await this.$axios.post(this.delUrl, param)
      if (result) {
        if (result.code === 0) {
          if (this.tableData.length > 1 || this.currentPage === 1) {
            this.handleCurrentChange(this.currentPage)
          } else {
            this.handleCurrentChange(
              this.currentPage > 1 ? this.currentPage - 1 : this.currentPage
            )
          }
        } else {
          this.$message.error(result.message)
        }
      } else {
        this.$message.error('删除失败')
      }
    },
    // 新增
    handleAddClick () {
      this.$emit('handleClick', '新增')
    }

  },

  computed: {
    // table高度
    tableHeight: {
      get () {
        if (this.fixHeight) {
          if (this.showOperate) {
            return this.$store.getters['app/getTableHeight']
          } else {
            return this.$store.getters['app/getTableHeight'] + 40
          }
        } else {
          return -1
        }
      }
    }
  },
  beforeDestroy () {
    bus.$off('initPage')
  }
}
