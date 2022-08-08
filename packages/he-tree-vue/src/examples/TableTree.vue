<template>
  <div style="max-width: unset">
    <h3>Table Tree</h3>
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
    <DraggableTree
      v-model="data"
      ref="tree"
      table
      class="table-tree"
      :rtl="rtl"
      :btt="btt"
      virtualization
      style="height: 400px"
    >
      <template #prepend="{ tree }">
        <thead>
          <tr>
            <th v-if="!tree.dragOvering">action</th>
            <th>Text</th>
            <th>Level</th>
          </tr>
        </thead>
      </template>
      <template #append="{ tree }">
        <tfoot>
          <tr>
            <th v-if="!tree.dragOvering">action</th>
            <th>Text</th>
            <th>Level</th>
          </tr>
        </tfoot>
      </template>
      <template #default="{ node, stat, indentStyle, tree }">
        <td v-if="!tree.dragOvering">
          <input type="checkbox" v-model="stat.checked" />
          <button v-if="stat.children.length" @click="stat.open = !stat.open">
            {{ stat.open ? "-" : "+" }}
          </button>
        </td>
        <td :style="indentStyle">
          {{ node.text }}
        </td>
        <td>
          {{ stat.level }}
        </td>
      </template>
    </DraggableTree>
  </div>
</template>

<script setup lang="ts">
import DraggableTree from "../components/DraggableTree";
import data0 from "./data.json";
import { ref } from "vue";
import * as hp from "helper-js";
const data = ref([...hp.cloneObject(data0)]);
const rtl = ref(false);
const btt = ref(false);
</script>

<style>
.table-tree td {
  border: 1px solid #ccc;
}
</style>
