<template lang="pug">
.aspect-box.bg-center.bg-cover(:style="style")
  slot
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Broadcast from './Broadcast'

  export default defineComponent({
    mixins: [Broadcast],
    props: {
      src: { type: String },
      aspect: { type: Number, required: true },
      borderFix: { type: Boolean }, // required if has border in browsers which don't support aspect-ratio
      fixedHeight: { type: Boolean }, // if you don't want use aspect-ratio or padding-bottom
    },
    // components: {},
    data() {
      return {
        elWidth: null,
        height: null,
      }
    },
    computed: {
      style() {
        const r = {}
        const setHeight = () => {
          // @ts-ignore
          r.height = this.elWidth * this.aspect + 'px'
        }
        if (this.src) {
          // @ts-ignore
          r['background-image'] = `url("${this.src}")`
        }
        //
        const isServer = false // process.server
        if (isServer) {
          // @ts-ignore
          r['aspect-ratio'] = this.aspect
        } else if (this.fixedHeight) {
          setHeight()
          // eslint-disable-next-line no-prototype-builtins
        } else if (document.body.style.hasOwnProperty('aspectRatio')) {
          // @ts-ignore
          r['aspect-ratio'] = this.aspect
        } else if (this.borderFix) {
          setHeight()
        } else {
          // if border exists and using padding-bottom, the height will be border width * 2 greater than the expected value. So set fixed height to fix it
          // @ts-ignore
          r['padding-bottom'] = (1 / this.aspect) * 100 + '%'
        }
        return r
      },
    },
    // created() {},
    mounted() {
      this.updateElWidth()
    },
    // watch: {},
    methods: {
      updateElWidth() {
        this.elWidth = this.$el.offsetWidth
      },
      // @ts-ignore
      on_broadcast_render(event) {
        this.updateElWidth()
        event.propagate()
      },
    },
  })
</script>

<style lang="scss"></style>
