<script setup lang="ts">
import Base from "./examples/Base.vue";
import WithOpenAndCheckBox from "./examples/WithOpenAndCheckBox.vue";
import Virtualization from "./examples/Virtualization.vue";
import Draggable from "./examples/Draggable.vue";
import CrossDrag from "./examples/CrossDrag.vue";
import TableTree from "./examples/TableTree.vue";
import MaterialDesign from "./examples/MaterialDesign.vue";
import Other1 from "./examples/Other1.vue";
import Other2 from "./examples/Other2.vue";
import Other3 from "./examples/Other3.vue";
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
      <MaterialDesign />
      <Other1 />
      <Other2 />
      <Other3 />
    </div>
  </div>
</template>

<style>
.examples {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}

.examples>div {
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
}

/* 定义滚动条的样式 */
::-webkit-scrollbar {
  width: 8px;
}

/* 定义滚动条轨道的样式 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
}

/* 定义滚动条滑块在 hover 状态下的样式 */
::-webkit-scrollbar-thumb:hover {
  background: #7f7f7f;
}
</style>
