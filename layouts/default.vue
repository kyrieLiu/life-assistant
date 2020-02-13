<template>
  <div class="root app-wrapper" :class="classObj">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':true}">
        <navbar />
      </div>
      <nuxt id="nuxt-container" />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/index'
import Navbar from '@/components/navbar/index'
export default {
  middleware: 'checkLogin',
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    sidebar () {
      return this.$store.getters['app/sidebar']
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
        // withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  mounted () {
    const mainHeight = document.getElementById('nuxt-container').offsetHeight
    this.getTableHeight(mainHeight)
    window.addEventListener('resize', this.resizeBrowser)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeBrowser)
  },
  methods: {
    // 处理浏览器变化
    resizeBrowser () {
      const mainHeight = document.getElementById('nuxt-container').offsetHeight
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
  @import "../assets/css/mixin.scss";
  #nuxt-container {
    height: 100%;
    transition: margin-left .28s;
    padding-top: 50px;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
 /* .root{
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
  }*/
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
</style>
