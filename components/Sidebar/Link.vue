
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
const routeReg = /^(https?:|mailto:|tel:)/
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps (url) {
      if (routeReg.test(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'nuxt-link',
        to: url
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
</style>
