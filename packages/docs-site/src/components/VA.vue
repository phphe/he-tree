<template>
  <component :is="is" v-bind="vBind" class="A Hyperlink">
    <slot />
  </component>
</template>

<script lang="ts">
  import {
    defineComponent,
    watchEffect,
    ref,
    reactive,
    getCurrentInstance,
  } from 'vue-demi'

  export const config = {
    component: 'router-link',
  } as { component: 'nuxt-link' | 'router-link' }

  export default defineComponent({
    props: {
      to: { type: [String, Object] },
      external: { type: Boolean }, // force external
    },
    setup(props, { attrs }) {
      const is = ref('')
      const vBind = reactive({})
      watchEffect(() => {
        // reset
        is.value = 'a'
        delete vBind['href']
        delete vBind['to']
        // is external
        let external: Boolean
        if (props.external) {
          external = true
        } else {
          external = Boolean(
            typeof props.to === 'string' && props.to.match(/^(\w+:|\/\/)/)
          )
        }
        //
        if (external) {
          vBind['href'] = props.to
        } else if (props.to != null) {
          // to existing
          if (attrs.target === '_blank') {
            const vm = getCurrentInstance()
            vBind['href'] = vm['$router'].resolve(props.to).href
          } else {
            is.value = config.component
            vBind['to'] = props.to
          }
        }
      })
      return { is, vBind }
    },
  })
</script>
