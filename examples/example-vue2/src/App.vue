<template>
  <div>
    <Draggable v-model="data" ref="tree" virtualization style="height: 500px">
      <template #default="{ node, stat }">
        <span v-if="stat.children.length" @click="stat.open = !stat.open">
          {{ stat.open ? "-" : "+" }}
        </span>
        <!-- <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="checkbox" v-model="stat.checked" /> -->
        {{ node.text }}
      </template>
    </Draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Draggable } from "@he-tree/vue/vue2";
import data from "./data.json";

@Component({
  components: { Draggable },
})
export default class App extends Vue {
  data = data;
}
</script>

<style>
.he-tree--rtl {
  direction: rtl;
}
.he-tree .drag-placeholder {
  background: #ddf2f9;
  border: 1px dashed #00d9ff;
  height: 22px;
}
</style>
