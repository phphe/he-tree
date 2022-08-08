<template lang="pug">
I18n
div(v-is="layout")
PageProgressBar
HTMLHead
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import default_layout from './layouts/default_layout.vue'
  import I18n from './components/I18n.vue'
  import PageProgressBar from './components/PageProgressBar.vue'
  import { api } from './http'
  import { HTMLHead } from './HTMLHead'

  export default defineComponent({
    components: { default_layout, I18n, PageProgressBar, HTMLHead },
    // props: {},
    data() {
      return {
        routeReady: false,
      }
    },
    computed: {
      layout() {
        let { layout } = this.$route.meta
        if (layout === 'unset' || !this.routeReady) {
          return 'router-view'
        } else {
          layout = layout || 'default'
          return `${layout}_layout`
        }
      },
    },
    // methods: {},
    created() {
      const cancel = this.$watch('$route', () => {
        this.routeReady = true
        cancel()
      })
    },
    mounted() {},
  })
</script>

<style lang="scss"></style>
