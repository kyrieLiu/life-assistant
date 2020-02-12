<!--
    User: 刘隐
    Date:  2019年7月16日15:10:48
    Description:  工作动态详情
 -->
<template>
  <article class="detail">
    <section class="detail-top">
      <span class="el-icon-arrow-left"> 返回</span>
      <h2 class="detail-title">
        标题
      </h2>
    </section>
    <section class="detail-content">
      <dl class="detail-content-block" style="margin-top: 20px">
        <div class="detail-content-item">
          <dt class="detail-key">
            备注：
          </dt>
          <dd class="detail-value">
            内容
          </dd>
        </div>
      </dl>
    </section>
    <!--    <section class="detail-bottom">
      <el-button
        type="primary"
        class="detail-bottom-button"
      >
        编辑
      </el-button>
    </section>-->
  </article>
</template>
<script>

export default {
  data () {
    return {
      comment: ''
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
