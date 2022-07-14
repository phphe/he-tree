<script setup lang="ts">
import Base from "./examples/Base.vue";
import WithOpenAndCheckBox from "./examples/WithOpenAndCheckBox.vue";
import Virtualization from "./examples/Virtualization.vue";
import Draggable from "./examples/Draggable.vue";
import CrossDrag from "./examples/CrossDrag.vue";
import TableTree from "./examples/TableTree.vue";
</script>

<template>
  <div class="app">
    <h1>he-tree Examples</h1>
    <div class="examples">
      <Base />
      <WithOpenAndCheckBox />
      <Virtualization />
      <Draggable />
      <CrossDrag />
      <TableTree />
    </div>
  </div>
</template>

<style>
body {
  width: 2000px;
}
.examples {
  display: flex;
}
.examples > div {
  border: 1px solid #ccc;
  padding: 5px;
  margin-left: 10px;
  max-width: 240px;
  border-radius: 5px;
}
</style>
