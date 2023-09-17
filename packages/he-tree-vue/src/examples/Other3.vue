<template>
  <div style="max-width: unset">
    <h3>Table Tree Material Design</h3>
    <hr />
    <h4>Props</h4>
    <label>
      <input type="checkbox" v-model="rtl" />
      rtl(display from right to left)
    </label>
    <br />
    <label>
      <input type="checkbox" v-model="btt" />
      btt(display from bottom to top)
    </label>
    <hr />
    <DraggableTree v-model="data" ref="tree" table class="mtl-tree" :rtl="rtl" :btt="btt" virtualization
      style="height: 400px">
      <template #prepend="{ tree }">
        <thead>
          <tr>
            <th v-if="!tree.dragOvering" width="50"></th>
            <th class="mtl-text-left">Text</th>
            <th class="mtl-text-right">Level</th>
            <th class="mtl-text-right" width="100">Letters</th>
          </tr>
        </thead>
      </template>
      <template #default="{ node, stat, indentStyle, tree }">
        <td v-if="!tree.dragOvering">
          <input type="checkbox" v-model="stat.checked" />
          <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click.native="stat.open = !stat.open" />
        </td>
        <td :style="indentStyle">
          {{ node.text }}
        </td>
        <td class="mtl-text-right">
          {{ stat.level }}
        </td>
        <td class="mtl-text-right">
          {{ node.text.length }}
        </td>
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
const rtl = ref(false);
const btt = ref(false);
</script>

<style></style>
