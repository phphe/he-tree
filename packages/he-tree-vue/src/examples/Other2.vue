<template>
  <div>
    <h3>he-tree</h3>
    <DraggableTree class="mtl-tree mystyle" v-model="data" ref="tree" virtualization style="height: 500px">
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

<style lang="scss">
.mystyle {
  .tree-node {
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
  }

  .drag-placeholder {
    background: #22ff004c;
    border: 1px dashed #18b618;
    height: 40px;
    // margin-left: 60px;
  }

  .mtl-checkbox {
    width: 18px;
    height: 18px;
  }
}
</style>
