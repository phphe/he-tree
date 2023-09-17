<template>
  <div>
    <h3>Material Design</h3>
    <DraggableTree class="mtl-tree" v-model="data" ref="tree" virtualization style="height: 500px">
      <template #default="{ node, stat }">
        <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click.native="stat.open = !stat.open" />
        <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input class="mtl-checkbox mtl-mr" type="checkbox" v-model="stat.checked" />
        <span class="mtl-ml">{{ node.text }}</span>
      </template>
    </DraggableTree>
  </div>
</template>

<script setup lang="ts">
import DraggableTree from "../components/DraggableTree";
import OpenIcon from "../components/OpenIcon.vue";
import "../assets/material-design.css";

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

<style></style>
