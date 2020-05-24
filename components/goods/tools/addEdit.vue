<!--
   User: liuyin
   Date: 2019/12/13 10:18 上午
   Description:新增编辑物品
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
      label-position="left"
    >
      <el-form-item label="工具名称：" prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入工具名称"
        />
      </el-form-item>
      <el-form-item label="工具地址：" prop="address">
        <el-input
          v-model.trim="formData.address"
          placeholder="请输入地址"
        />
      </el-form-item>
      <el-form-item label="备注：" prop="note">
        <el-input
          v-model.trim="formData.note"
          placeholder="请输入备注"
          type="textarea"
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
        note: '',
        // 1是耗材
        type: 2
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
  mounted () {
    if (this.rowId) {
      this.$axios.get(`${this.urls.goodsDetail}?_id=${this.rowId}`).then((res) => {
        this.formData = res.data
      })
    }
  },
  methods: {
    // 提交请求
    submitForm () {
      if (this.rowId) {
        this.formData._id = this.rowId
      }
      this.$axios.post(this.urls.goodsAddEdit, this.formData).then((result) => {
        if (result.code === 0) {
          this.successCallback()
          this.handleClose()
        } else {
          this.$message.error(result.message)
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
