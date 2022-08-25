<template lang="pug">
span.icon.inline-flex.items-center
  //- ZWSP(zero-width space)
  | #{'\u200b'}
  span.icon-icon.material-icons(:style="{'font-size': size+'px'}") {{$props.name}}
</template>

<script lang="ts">
  // suitable for google material design icons that imported by css
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      name: { type: String },
      size: { type: Number, default: 20 },
    },
    // components: {},
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

<style lang="scss"></style>
