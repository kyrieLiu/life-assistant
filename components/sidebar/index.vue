<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      :default-active="currentPath"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
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
      current: '/goodsManage/consumable/'
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
      // console.log(this.sidebar)
      return !this.sidebar.opened
    },
    currentPath: {
      get () {
        const route = this.$route.path
        if (route.length > 1 && route[route.length - 1] === '/') {
          return route.substring(0, route.length - 1)
        } else {
          return route
        }
      },
      set () {

      }
    }
  }
}
</script>
<style>
</style>
