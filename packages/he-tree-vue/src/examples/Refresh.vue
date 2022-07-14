<template>
  <div :key="key">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({
  watch: {},
});
const key = ref(0);
watch(
  () => props.watch,
  () => {
    key.value = Math.random();
  }
);
</script>
