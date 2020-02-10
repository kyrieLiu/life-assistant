<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    @open="handleOpen"
    @close="handleClose"
  >
    <sidebar-item v-for="route in menus" :key="route.path" :item="route" :base-path="route.path" />
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
import variables from '@/assets/css/variables.scss'
export default {
  components: {
    SidebarItem
  },
  data () {
    return {
      isCollapse: false,
      menus: [
        {
          path: '/',
          name: 'index',
          icon: 'el-icon-film',
          meta: { title: 'index', icon: 'example' }
        },
        {
          path: '/second',
          name: 'second',
          icon: 'el-icon-help',
          meta: { title: 'second', icon: 'example' }
        }, {
          path: '/third',
          name: 'third',
          meta: { title: 'third', icon: 'example' },
          icon: 'el-icon-picture-outline-round',
          children: [{
            path: 'forth',
            name: 'third-forth',
            icon: 'el-icon-s-order',
            meta: { title: 'forth', icon: 'example' }
          },
          {
            path: 'five',
            name: 'third-forth',
            icon: 'el-icon-s-finance',
            meta: { title: 'five', icon: 'example' }
          }
          ]
        }]
    }
  },
  computed: {
    variables () {
      return variables
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
