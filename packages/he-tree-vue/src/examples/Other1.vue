<template>
  <div>
    <h3>he-tree</h3>
    <DraggableTree class="mtl-tree" v-model="data" ref="tree" treeLine>
      <template #default="{ node, stat }">
        <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click.native="stat.open = !stat.open" />
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

import { ref } from "vue";
import * as hp from "helper-js";

const data = ref([
  {
    text: 'he-tree',
    children: [
      { text: 'Vue2 & 3' },
      { text: 'draggable' },
      { text: 'TypeScript' },
      { text: 'Server side render' },
      { text: 'Virtual list' },
      { text: 'table tree' },
      { text: 'HTML5 Drag & Drop API' },

    ]
  }
]);
</script>

<style></style>
