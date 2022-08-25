<template>
  <vA
    class="cursor-pointer text-gray-400 hover:text-gray-600 active:text-gray-800"
    ><vIconMDI :icon="mdiClose" :size="size"
  /></vA>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import vIconMDI, { config as iconMDIConfig } from './vIconMDI.vue'
  import vA from './vA.vue'
  import { mdiClose } from 'mdi-js/filled'

  defineProps({
    size: { type: [Number, String], default: () => iconMDIConfig.defaultSize },
  })
</script>
