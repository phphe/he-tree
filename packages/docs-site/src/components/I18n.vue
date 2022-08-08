<template lang="pug">
teleport(to="head")
  link(v-for="item in hrefItems" rel="alternate" :href="item.href" :hreflang="item.locale")
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { i18n, getRouteByLocale } from '../i18n'

  export default defineComponent({
    // components: {},
    props: {},
    data() {
      return {
        locales: i18n.global.availableLocales.slice(),
      }
    },
    computed: {
      hrefItems() {
        if (
          this.$route.name &&
          this.$route.meta.i18n !== false &&
          Object.keys(this.$route.meta.alternate).length > 1
        ) {
          return this.locales.map((v: string) => ({
            locale: v,
            href:
              location.origin +
              this.$router.resolve(getRouteByLocale(this.$route, v)).href,
          }))
        } else {
          return []
        }
      },
    },
    // watch: {},
    // methods: {},
    // created() {},
    mounted() {
      const updateHTMLLang = () => {
        if (document.documentElement) {
          document.documentElement.setAttribute('lang', i18n.global.locale)
        }
      }
      updateHTMLLang()
      this.$watch(() => i18n.global.locale, updateHTMLLang)
    },
  })
</script>

<style lang="scss"></style>
