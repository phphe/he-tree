<template>
  <div>
    <h3>Virtual List</h3>
    <BaseTree v-model="data" ref="tree" virtualization style="height: 500px">
      <template #default="{ node, stat }">
        <button v-if="stat.children.length" @click="stat.open = !stat.open">
          {{ stat.open ? "-" : "+" }}
        </button>
        <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="checkbox" v-model="stat.checked" />
        {{ node.text }}
      </template>
    </BaseTree>
  </div>
</template>

<script setup lang="ts">
import BaseTree from "../components/BaseTree.vue";
import data0 from "./data.json";
import { ref } from "vue";
import * as hp from "helper-js";
const data = ref([
  ...hp.cloneObject(data0),
  ...hp.cloneObject(data0),
  ...hp.cloneObject(data0),
  ...hp.cloneObject(data0),
  ...hp.cloneObject(data0),
]);
</script>

<style lang="scss"></style>
