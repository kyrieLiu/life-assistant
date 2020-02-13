<!--
    User: 刘隐
    Date:  2019年7月16日15:10:48
    Description:  物品详情
 -->
<template>
  <article class="detail">
    <section class="detail-top">
      <span class="el-icon-arrow-left" @click="handleClose"> 返回</span>
      <h2 class="detail-title">
        {{ detailData.name }}
      </h2>
    </section>
    <section class="detail-content">
      <dl class="detail-content-block" style="margin-top: 20px">
        <div v-for="(value,key) in detailData" :key="key" class="detail-content-item">
          <dt class="detail-key">
            {{ getKeyName(key) }}
          </dt>
          <dd class="detail-value">
            {{ value }}
          </dd>
        </div>
      </dl>
    </section>
    <section class="detail-bottom">
      <el-button
        type="primary"
        class="detail-bottom-button"
      >
        编辑
      </el-button>
    </section>
  </article>
</template>
<script>
import detailMixin from '../../assets/js/detailMixin'
export default {
  mixins: [detailMixin],
  computed: {
    getKeyName () {
      return function (key) {
        switch (key) {
          case 'name':
            return '名称'
          case 'address':
            return '地址'
          case 'note':
            return 'note'
        }
      }
    }
  },
  mounted () {
    if (this.rowId) {
      this.$axios.get(`${this.urls.goodsDetail}?_id=${this.rowId}`).then((res) => {
        this.detailData = res.data
      })
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
