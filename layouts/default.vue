<template>
  <div class="root">
    <sidebar class="sidebar-container" />
    <div id="main-container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/index'
export default {
  components: {
    Sidebar
  },
  mounted () {
    const mainHeight = document.getElementById('main-container').offsetHeight
    this.getTableHeight(mainHeight)
    window.addEventListener('resize', this.resizeBrowser)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeBrowser)
  },
  methods: {
    // 处理浏览器变化
    resizeBrowser () {
      const mainHeight = document.getElementById('main-container').offsetHeight
      this.getTableHeight(mainHeight)
    },
    // 计算table应有的高度  高度=容器高度-其他控件占有的控件高度
    getTableHeight (mainHeight) {
      const tableHeight = mainHeight - 220
      this.$store.dispatch('app/setTableHeight', tableHeight)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/variables.scss";
  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  #main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left:$sideBarWidth;
    position: relative;
  }
  .root{
  }
</style>
