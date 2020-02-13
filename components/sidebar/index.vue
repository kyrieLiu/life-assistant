<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    @open="handleOpen"
    @close="handleClose"
  >
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { routes } from '@/static/routes-menu'
import variables from '@/assets/css/variables.scss'
export default {
  components: {
    SidebarItem
  },
  data () {
    return {
    }
  },
  computed: {
    variables () {
      return variables
    },
    routes () {
      return routes
    },
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
  }
}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
