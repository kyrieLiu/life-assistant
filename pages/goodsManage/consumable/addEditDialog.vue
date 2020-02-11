<!--
   User: liuyin
   Date: 2019/12/13 10:18 上午
   Description:新增编辑耗材
 -->
<template>
  <el-dialog
    :title="dialogTitle"
    width="750px"
    :visible="true"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="耗材名称：" prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入耗材名称"
        />
      </el-form-item>
      <el-form-item label="耗材地址：" prop="address">
        <el-input
          v-model.trim="formData.address"
          placeholder="请输入地址"
        />
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button @click="handleClose">
        取消
      </el-button>
      <el-button type="primary" :disabled="disabled" @click="validateForm()">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import dialogMixin from '../../../assets/js/dialogMixin'
export default {
  mixins: [dialogMixin],
  data () {
    return {
      formData: {
        name: '',
        address: '',
        type: '厨具'
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交请求
    submitForm () {
      this.$axios.post('/goods/addGoods', this.formData).then((result) => {
        if (result.data.code === 0) {
          this.handleClose()
        } else {
          this.$message.error(result.data.message)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>
<style scoped>
</style>
