<template lang="pug">
button.back-to-top.w-10.h-10.absolute.bottom-10.right-10.flex.items-center.justify-center.pointer.bg-gray-200(class="hover:bg-gray-300 focus:outline-none" v-show="visible" title="Back to Top" @click="backToTop")
  Icon(name="expand_less" :size="25")
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
  import * as hp from 'helper-js'

  export default defineComponent({
    // components: {},
    props: {
      el: { type: String }, // selector
    },
    setup(props) {
      const visible = ref(false)
      onMounted(() => {
        const el = document.querySelector(props.el!)! as HTMLElement
        const computeVisible = () => {
          visible.value = el.scrollTop > 500
        }
        computeVisible()
        hp.onDOM(el, 'scroll', computeVisible, { passive: true })
        onUnmounted(() => {
          hp.offDOM(el, 'scroll', computeVisible, { passive: true })
        })
      })
      const backToTop = () => {
        const el = document.querySelector(props.el!)! as HTMLElement
        el.scrollTo(el.scrollLeft, 0)
      }
      return { visible, backToTop }
    },
  })
</script>

<style lang="scss"></style>
