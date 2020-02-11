/**
 * @author Liu Yin
 * @date 2020/2/11
 * @Description: 弹窗混入
 */
export default {
  props: {
    dialogTitle: {
      require: true
    }
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
