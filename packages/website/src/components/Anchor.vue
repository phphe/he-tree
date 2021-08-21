<template lang="pug">
a.anchor.cursor-pointer(v-bind="props.bind" v-is="props.is" :class="underline ? 'hover:underline focus:underline' : 'no-underline'" @click="onclick")
  slot
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import * as hp from 'helper-js'

  export const config = {
    i18n: null,
  } as {
    i18n: null | boolean
  }

  export default defineComponent({
    inheritAttrs: false,
    props: {
      external: { type: Boolean, default: null },
      underline: { type: Boolean },
      i18n: { type: Boolean, default: true }, // auto covert to current locale url
      smooth: { type: Boolean, default: true }, // for anchor scroll to view
      storeState: { type: Boolean, default: true }, // for anchor
    },
    emits: {
      resolved: null,
    },
    // data() {
    //   return {
    //   }
    // },
    computed: {
      isExternal(): boolean {
        if (this.external != null) {
          return Boolean(this.external)
        }
        // @ts-ignore
        const { to } = this.$attrs
        return Boolean(hp.isString(to) && to.match(/^(http(s)?:)?\/\//))
      },
      i18nEnabled() {
        if (config.i18n != null) {
          return Boolean(config.i18n)
        }
        if (this.$i18n) {
          return this.i18n
        }
        return false
      },
      // @ts-ignore
      props() {
        // @ts-ignore
        const r = {
          // @ts-ignore
          bind: { ...this.$attrs },
          is: 'a',
          onlyHash: false,
        }
        const attrTo = this.$attrs.to || this.$attrs.href
        if (this.isExternal) {
          r.bind.href = attrTo
        } else if (attrTo) {
          let to = attrTo as any
          if (hp.isString(to) && to[0] === '#') {
            r.bind.href = to
            r.onlyHash = true
          } else if (hp.isString(to) && to.match(/^[\w-_]+:/)) {
            // such as mailto:
            r.bind.href = to
          } else {
            if (
              this.i18nEnabled &&
              this.$i18n.locale !== this.$i18n.fallbackLocale
            ) {
              // get locale route by meta.alternate
              let t = this.$router.resolve(to)
              if (t.meta.alternate) {
                to = {
                  path: t.meta.alternate[this.$i18n.locale],
                  params: t.params,
                  query: t.query,
                  hash: t.hash,
                }
              } else {
                let to0 = to
                if (!to0.name) {
                  to0 = hp.objectOnly(this.$router.resolve(to0), [
                    'name',
                    'query',
                    'hash',
                    'params',
                  ])
                }
                if (!to0.name.match(/\.i18n(\b|$)/)) {
                  to = {
                    ...to0,
                    name: to0.name + '.i18n',
                    params: { ...to0.params, locale: this.$i18n.locale },
                    query: { ...(to0.query || {}) },
                  }
                }
              }
              r.bind.to = to
            }
            if (this.$attrs.target === '_blank') {
              // @ts-ignore
              r.bind.href = this.$router.resolve(this.$attrs.to).href
            } else {
              r.is = 'router-link'
            }
          }
        }
        if (r.is === 'a') {
          delete r.bind.to
        }
        return r
      },
    },
    watch: {
      props: {
        immediate: true,
        handler(props) {
          this.$emit('resolved', props)
        },
      },
    },
    methods: {
      onclick(e) {
        if (this.props.onlyHash) {
          const href = this.props.bind.href

          let targetEl = document.getElementById(href.substr(1)) // by ID
          if (!targetEl) {
            targetEl = document.getElementsByName(href.substr(1))[0]
          }
          if (targetEl && targetEl.scrollIntoView != null) {
            if (this.smooth) {
              e.preventDefault()
              targetEl.scrollIntoView({
                behavior: 'smooth',
              })
            }
            if (this.storeState) {
              history.pushState(null, '', href)
            }
          }
        }
      },
    },
    // created() {},
    // mounted() {},
  })
</script>

<style lang="scss"></style>
