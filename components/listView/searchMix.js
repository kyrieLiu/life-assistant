
/**
 * User: liuyin
 * Date: 2019/12/13 10:18 上午
 * Description: 搜索混入
 */

export default {
  props: {

    /* 搜索条件 */
    searchForm: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      // 搜索条件请求表单
      condition: {},
      // 是否展示更多搜索
      isOpen: false,
      // 上一次的浏览器宽度 默认1920
      lastBrowserWidth: 1920,
      // 控件适配浏览器左右放大缩小的分界限
      BOUND_WIDTH: 1200,
      // 每一个搜索条件控件的高度
      SINGLE_ITEM_HEIGHT: 60,
      // 单行展示的个数
      SINGLE_LINE_NUM: 3,
      // 上下内部间距各为10px
      VERTICAL_PADDING: 10,
      // 容器高度过渡时间
      HEIGHT_TRANSITION_TIME: 0.3
    }
  },
  created () {
    /* 初始化数据,增加条件默认值 */
    this.searchForm.forEach((item, index) => {
      this.$set(item, 'vModel', '')
      if (index < this.SINGLE_LINE_NUM) {
        item.isVisibility = true
      } else {
        item.isVisibility = false
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      // 根据浏览器宽度 初始化样式
      const browserWidth = window.innerWidth
      this.calculateParentHeight(browserWidth)

      /* 监听浏览器宽度变化 */
      window.addEventListener('resize', this.resizeBrowser, false)
    })
  },

  methods: {
    // select 事件
    handleSelectChange (v, k, arg) {
      this.$emit('handleSelectChange', v, k)
    },

    handleTimeChange (time, item) {
      // 选择的是开始时间
      if (item.node === 'startTime') {
        const endTime = this.searchForm.find(item => item.node === 'endTime')
        if (!time) {
          endTime.vModel = ''
          endTime.disabled = true
        } else {
          endTime.disabled = false
          if (endTime.vModel && time > endTime.vModel) {
            this.$message.warning('开始时间不可以大于结束时间!')
            item.vModel = ''
          }
        }
      } else if (item.node === 'endTime') {
        // 选的是结束时间
        if (time) {
          const startTime = this.searchForm.find(item => item.node === 'startTime')
          if (startTime.vModel && startTime.vModel > time) {
            this.$message.warning('结束时间不可以晚于开始时间!')
            item.vModel = ''
          }
        }
      }
    },

    // 处理浏览器变化
    resizeBrowser (argument) {
      const browserWidth = argument.target.innerWidth
      // 浏览器由宽变窄并越过分界线
      if (browserWidth <= this.BOUND_WIDTH && this.lastBrowserWidth > this.BOUND_WIDTH) {
        this.lastBrowserWidth = browserWidth
        this.calculateParentHeight(browserWidth)
      }
      // 浏览器由窄变宽并越过分界线
      if (this.lastBrowserWidth <= this.BOUND_WIDTH && browserWidth > this.BOUND_WIDTH) {
        this.lastBrowserWidth = browserWidth
        this.calculateParentHeight(browserWidth)
      }
    },

    // 根据数据内容长度调整条件区域的宽度
    getContentWidth () {
      if (this.searchForm.length >= this.SINGLE_LINE_NUM) {
        return '87%'
      } else {
        return (this.searchForm.length * 29) + '%'
      }
    },
    // 打开或关闭更多搜索区域
    openOrClose () {
      if (this.isOpen) {
        this.searchForm.forEach((item, index) => {
          if (index < this.SINGLE_LINE_NUM) {
            item.isVisibility = true
          } else {
            item.isVisibility = false
          }
        })
      } else {
        this.searchForm.forEach((item, index) => {
          item.isVisibility = true
        })
      }
      this.isOpen = !this.isOpen

      /* 设置控件样式 */
      const browserWidth = window.innerWidth
      this.calculateParentHeight(browserWidth)
    },

    /**
     * 根据当前浏览器宽度计算外层应有的高度
     * @param browserWidth 当前浏览器的宽度
     */
    calculateParentHeight (browserWidth) {
      const array = document.getElementsByClassName('search-item-parent')
      const elParent = document.getElementsByClassName('container')[0]
      if (browserWidth > this.BOUND_WIDTH) {
        // 当视口为较宽状态
        elParent.style.transition = 'height ' + this.HEIGHT_TRANSITION_TIME + 's'
        if (this.isOpen) {
          const size = this.searchForm.length
          // 获取当前展开的所有条目所占的行数  容器高度=单行高度*行数+上下内间距
          const lineNum = size % this.SINGLE_LINE_NUM > 0 ? parseInt(size / this.SINGLE_LINE_NUM + 1) : parseInt(size / this.SINGLE_LINE_NUM)
          elParent.style.height = this.SINGLE_ITEM_HEIGHT * lineNum + this.VERTICAL_PADDING * 2 + 'px'
        } else {
          elParent.style.height = this.SINGLE_ITEM_HEIGHT + this.VERTICAL_PADDING * 2 + 'px'
        }
        // 设置单个搜索条件的宽度
        for (let i = 0; i < array.length; i++) {
          const item = array[i]
          if (this.searchForm.length >= this.SINGLE_LINE_NUM) {
            item.style.width = 100 / this.SINGLE_LINE_NUM + '%'
          } else {
            item.style.width = 100 / this.searchForm.length + '%'
          }
        }
      } else {
        // 当视口为较窄状态
        elParent.style.transition = 'initial'
        if (this.isOpen) {
          const size = this.searchForm.length
          elParent.style.height = this.SINGLE_ITEM_HEIGHT * size + this.VERTICAL_PADDING * 2 + 'px'
        } else {
          // 容器高度=单行高度*行数+上下内间距
          const lineNum = this.searchForm.length >= this.SINGLE_LINE_NUM ? this.SINGLE_LINE_NUM : this.searchForm.length % this.SINGLE_LINE_NUM
          elParent.style.height = this.SINGLE_ITEM_HEIGHT * lineNum + this.VERTICAL_PADDING * 2 + 'px'
        }
        // 设置单个搜索条件的宽度
        for (let i = 0; i < array.length; i++) {
          const item = array[i]
          item.style.width = '100%'
        }
      }
    },
    // 生成接口对应的数据结构进行搜索
    handleSearch () {
      this.condition = {}
      if (this.searchForm) {
        this.searchForm.forEach((item, index) => {
          const key = item.key
          const value = this.searchForm[index].vModel
          if (value === 0 || value) {
            this.condition[key] = value
          }
        })
      }
      this.currentPage = 1
      this.$emit('handleSearch', 1, this.condition)
    },
    // 重置搜索条件
    resetSearchForm () {
      this.searchForm.forEach((item) => {
        item.vModel = ''
        if (item.node === 'endTime') {
          item.disabled = true
        }
      })
      this.currentPage = 1
      this.condition = {}
      this.$emit('resetForm')
      this.$emit('handleSearch', 1, {})
    },

    /**
     * 清空key对应value的绑定值
     * @param key
     */
    clearValue (key) {
      const searchItem = this.searchForm.find(item => item.key === key)
      if (searchItem) {
        searchItem.vModel = ''
      }
    },

    /**
     * 获取key对应value的绑定值
     * @param key
     */
    getValue (key) {
      const searchItem = this.searchForm.find(item => item.key === key)
      if (searchItem) {
        return searchItem.vModel
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeBrowser)
  }
}
