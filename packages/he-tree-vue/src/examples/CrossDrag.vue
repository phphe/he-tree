<template>
  <div>
    <h3>Cross(pro)</h3>
    <DraggableTree
      v-model="data"
      ref="tree"
      class="cross-drag-tree"
      :defaultOpen="false"
    >
      <template #default="{ node, stat }">
        <span v-if="stat.children.length" @click="stat.open = !stat.open">
          {{ stat.open ? "-" : "+" }}
        </span>
        <!-- <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <input type="checkbox" v-model="stat.checked" /> -->
        {{ node.text }}
      </template>
    </DraggableTree>
    <hr />
    <h3>Empty Tree</h3>
    <DraggableTree
      v-model="dataEmpty"
      ref="tree2"
      class="cross-drag-tree-empty"
      :defaultOpen="false"
      style="border: 1px solid #ccc; padding: 10px"
    >
      <template #default="{ node, stat }">
        <span v-if="stat.children.length" @click="stat.open = !stat.open">
          {{ stat.open ? "-" : "+" }}
        </span>
        {{ node.text }}
      </template>
    </DraggableTree>
    <hr />
    <h3>Drag Copy</h3>
    <DraggableTree v-model="data2" ref="tree3" :defaultOpen="false" dragCopy>
      <template #default="{ node, stat }">
        <span v-if="stat.children.length" @click="stat.open = !stat.open">
          {{ stat.open ? "-" : "+" }}
        </span>
        {{ node.text }}
      </template>
    </DraggableTree>
  </div>
</template>

<script setup lang="ts">
import DraggableTree, {
  PropDraggable,
  BeforeDragOpen,
  DraggableTreeType,
} from "../components/DraggableTree";
import { pro } from "../index";
import data0 from "./data.json";
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import * as hp from "helper-js";
const data = ref([...hp.cloneObject(data0)]);
const dataEmpty = ref([]);
const data2 = ref([...hp.cloneObject(data0)]);
onMounted(() => {
  const vm = getCurrentInstance()!;
  const tree3 = vm.refs.tree3 as DraggableTreeType;
  const testAdd = { text: "test" };
  tree3.add(testAdd);
  tree3.getStat(reactive(testAdd));
});
</script>

<style>
.cross-drag-tree .drag-placeholder {
  background: #f6e7cd;
  border: 1px dashed #ffbf00;
}
.cross-drag-tree-empty .drag-placeholder {
  background: #b6ffe7;
  border: 1px dashed #00ff40;
}
</style>
