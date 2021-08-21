<template lang="pug">
.badge.inline-block.relative
  slot
  .badge-count.text-center.inline-flex.rounded-full.h-3.w-3.bg-pink-500.absolute.-right-1.-top-1 {{text}}
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    // components: {},
    props: {
      text: { type: String },
    },
    // data() {
    //   return {}
    // },
    // computed: {},
    // watch: {},
    // methods: {},
    // created() {},
    // mounted() {}
  })
</script>

<style lang="scss">
  .badge {
    // display: inline-block;
    // position: relative;
  }
  .badge-count {
    // min-width: 14px;
    // text-align: center;
    // line-height: 14px;
    // display: inline-block;
    // position: absolute;
    // right: -9px;
    // top: -9px;
    // background: red;
    // color: #fff;
    // border-radius: 17px;
    // padding: 6px;
    // font-size: 16px;
    // transform: scale(0.7);
    // font-family: Tahoma;
  }
</style>
