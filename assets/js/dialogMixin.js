/**
 * @author Liu Yin
 * @date 2020/2/11
 * @Description: 弹窗混入
 */
import bus from '~/utils/bus'
export default {
  props: {
    dialogTitle: {
      require: true
    },
    rowData: '',
    rowId: ''
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    // 关闭弹框
    handleClose () {
      this.$emit('close')
    },
    successCallback () {
      // 通知列表组件前往第一页
      bus.$emit('initPage')
      // 通知父组件刷新列表数据
      this.$emit('submitSuccess')
    },
    // 提交数据前校验表单
    validateForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm()
        } else {
          return false
        }
      })
    }
  }
}
