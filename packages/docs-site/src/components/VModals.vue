<template>
  <Teleport to="body" v-if="ready">
    <div :id="id"></div>
  </Teleport>
</template>

<script lang="ts" setup>
import { getCurrentInstance, watchEffect, ref } from "vue-demi";
import { config } from "./vModal.vue";

const ready = ref(false); // to stop teleport inserted before other html such as nuxt
setTimeout(() => {
  ready.value = true;
}, 0);

const vm = getCurrentInstance();
const id = ref<string>();
watchEffect(() => {
  id.value = `Modals_${vm.uid}`;
  config.renderTarget = "#" + id.value;
});
</script>
