<template lang="pug">
component.v-heading.relative(:is="'h'+level" ref="root")
  slot
  a(v-if="level > 1" v-anchor :href="'#'+$attrs.id") #
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, useAttrs } from 'vue-demi'
import { state } from '../store'
import * as hp from "helper-js";

export default {
  // components: {},
  props: {
    level: { type: Number },
  },
  setup() {
    const root = ref(null)
    const attrs = useAttrs()
    // update currentAnchor when visible changed by scroll
    onMounted(() => {
      let intersectionObserver = new IntersectionObserver((entries) => {
        // If intersectionRatio is 0, the target is out of view
        // and we do not need to do anything.
        if (entries[0].intersectionRatio <= 0) {
          hp.arrayRemove(state.currentAnchors, attrs.id)
        } else {
          state.currentAnchors.push(attrs.id as string)
        };
      });
      // start observing
      intersectionObserver.observe(root.value!);
      onUnmounted(() => {
        intersectionObserver.disconnect()
        hp.arrayRemove(state.currentAnchors, attrs.id)
      })
    })
    return { root }
  },
  // data() {
  //   return {}
  // },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {
  // }
}
</script>

<style lang="scss">
.v-heading {
  a {
    @apply absolute -left-4 text-primary-500 no-underline;
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
