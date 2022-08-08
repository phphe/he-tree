<template lang="pug">
.v-heading.relative(v-is="'h'+level")
  slot
  a(v-if="level > 1" v-anchor :href="'#'+$attrs.id") #
</template>

<script>
  export default {
    // components: {},
    props: {
      level: { type: Number },
    },
    // data() {
    //   return {}
    // },
    // computed: {},
    // watch: {},
    // methods: {},
    // created() {},
    // mounted() {}
  }
</script>

<style lang="scss">
  .v-heading {
    a {
      @apply absolute -left-4  text-primary-500 no-underline;
      bottom: -1px;
      display: none;
      width: 18px;
      &:hover {
        @apply underline visible;
      }
    }
    &:hover {
      a {
        display: inline-block;
      }
    }
  }
</style>
