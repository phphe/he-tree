<!-- google/material-design-icons - https://github.com/google/material-design-icons Apache-2.0 License - https://github.com/google/material-design-icons/blob/master/LICENSE -->

<!-- "\u200b" is ZWSP(zero-width space) -->

<template>
  <span class="IconMDI" :class="$style.icon" :style="{ width: computedSize }">
    <span data-nosnippet>{{ '\u200b' }}</span>
    <svg v-bind="icon.attrs" :class="$style.svg" v-html="icon.html"></svg>
  </span>
</template>

<script lang="tsx">
  // for svg, image
  import { computed, PropType, defineComponent } from 'vue-demi'
  import { Icon } from 'mdi-js/filled'

  export const config = {
    defaultSize: '1.2em',
  }

  export default defineComponent({
    props: {
      icon: { type: Object as PropType<Icon>, required: true },
      size: { type: [String, Number], default: () => config.defaultSize },
    },
    setup(props) {
      const computedSize = computed(() =>
        typeof props.size === 'number' ? props.size + 'px' : props.size
      )
      return { computedSize }
    },
  })
</script>

<style lang="scss" module>
  .icon {
    display: inline-flex;
    align-items: center;
  }
  .svg {
    width: 100%;
    height: auto;
    fill: currentColor;
    margin-top: -1px; // Fine-tune icon position
  }
</style>
