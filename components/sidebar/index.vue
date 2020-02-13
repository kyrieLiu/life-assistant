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
    ...mapGetters('app', [
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
</style>
