/**
 * @author Liu Yin
 * @date 2020/2/12
 * @Description: 详情混入
 */
export default {
  props: {
    rowId: ''
  },
  data () {
    return {
      detailData: {}
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
