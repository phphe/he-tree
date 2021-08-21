<template lang="pug">
.loading-mask.absolute.w-full.h-full.top-0.left-0.bg-white.flex.items-center.justify-center.opacity-70
  LoadingIcon.loading-mask-img
</template>

<script lang="ts">
  import LoadingIcon from './LoadingIcon.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: { LoadingIcon },
    // data() {
    //   return {}
    // },
    // computed: {},
    // watch: {},
    // methods: {},
    // created() {},
    // mounted() {},
  })
</script>

<style lang="scss">
  // .loading-mask {
  //   position: absolute;
  //   $side: 100%;
  //   width: $side;
  //   height: $side;
  //   top: 0;
  //   left: 0;
  //   background: rgba(255, 255, 255, 0.8);
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }
  // .loading-mask-img {
  //   width: 2em;
  // }
</style>
