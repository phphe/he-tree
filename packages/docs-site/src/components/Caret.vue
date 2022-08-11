<template>
  <VIconMDI :icon="mdiArrowDropDown" class="relative -bottom-1" />
</template>

<script lang="ts">
  import { mdiArrowDropDown } from 'mdi-js/filled'
  import VIconMDI from './VIconMDI.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    components: { VIconMDI },
    data() {
      return {
        mdiArrowDropDown,
      }
    },
  })
</script>

<style lang="scss"></style>
