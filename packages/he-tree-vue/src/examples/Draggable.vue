<template>
  <div>
    <h3>Draggable</h3>
    <hr />
    <h4>Props</h4>
    <label>
      <input type="checkbox" v-model="enableEachDraggable" />
      enableEachDraggable (make level 1 undraggable)
    </label>
    <br />
    <label>
      <input type="checkbox" v-model="enableEachDroppable" />
      enableEachDroppable (make only level 1 droppable)
    </label>
    <br />
    <label>
      <input type="checkbox" v-model="rootDroppable" />
      rootDroppable
    </label>
    <br />
    <label>
      <input type="checkbox" v-model="disableDrag" />
      disableDrag
    </label>
    <label>
      <input type="checkbox" v-model="disableDrop" />
      disableDrop
    </label>
    <label>
      <input type="checkbox" v-model="keepPlaceholder" />
      keepPlaceholder
    </label>
    <br />
    <label>
      <input type="checkbox" v-model="useMouseAsMovePoint" />
      useMouseAsMovePoint
    </label>
    <div>
      <label>
        <input type="checkbox" v-model="dragOpen" />
        dragOpen </label
      ><br />
      dragOpenDelay<input type="number" v-model="dragOpenDelay" />
    </div>
    <div>maxLevel<input type="number" v-model="maxLevel" /></div>
    <br />
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
    <Refresh
      :watch="[
        enableEachDraggable,
        enableEachDroppable,
        rootDroppable,
        disableDrag,
        disableDrop,
        dragOpen,
        dragOpenDelay,
        maxLevel,
        keepPlaceholder,
      ]"
    >
      <DraggableTree
        v-model="data"
        ref="tree"
        virtualization
        :statHandler="statHandler"
        :eachDraggable="eachDraggable"
        :eachDroppable="eachDroppable"
        :rootDroppable="rootDroppable"
        :disableDrag="disableDrag"
        :disableDrop="disableDrop"
        :dragOpen="dragOpen"
        :dragOpenDelay="dragOpenDelay"
        :maxLevel="maxLevel"
        :beforeDragOpen="beforeDragOpen"
        :keepPlaceholder="keepPlaceholder"
        :resolveMovePoint="useMouseAsMovePoint ? 'mouse' : 'top_left'"
        :rtl="rtl"
        :btt="btt"
        style="height: 500px"
      >
        <template #default="{ node, stat }">
          <span v-if="stat.children.length" @click="stat.open = !stat.open">
            {{ stat.open ? "-" : "+" }}
          </span>
          <!-- <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="checkbox" v-model="stat.checked" /> -->
          {{ node.text }}
        </template>
      </DraggableTree></Refresh
    >
  </div>
</template>

<script setup lang="ts">
import DraggableTree, {
  PropDraggable,
  BeforeDragOpen,
  context,
} from "../components/DraggableTree.vue";
import Refresh from "./Refresh.vue";
import data0 from "./data.json";
import { reactive, ref } from "vue";
import * as hp from "helper-js";
const data = ref([
  ...hp.cloneObject(data0),
  ...hp.cloneObject(data0),
  ...hp.cloneObject(data0),
  ...hp.cloneObject(data0),
  ...hp.cloneObject(data0),
]);
function statHandler(stat: any) {
  if (["Vue", "React"].includes(stat.data.text)) {
    stat.data.text += " undroppable";
  }
  if (["Nuxt"].includes(stat.data.text)) {
    stat.data.text += " droppable";
  }
  if (["Movie"].includes(stat.data.text)) {
    stat.data.text += " undraggable";
  }
  if (stat.data.text?.includes("undroppable")) {
    stat.droppable = false;
  }
  if (stat.data.text?.includes("undraggable")) {
    stat.draggable = false;
  }
  if (stat.data.text?.includes(" droppable")) {
    stat.droppable = true;
  }
  return stat;
}

const enableEachDraggable = ref(false);
const eachDraggable: PropDraggable = (stat) => {
  return enableEachDraggable.value ? stat.level !== 1 : null;
};
const enableEachDroppable = ref(false);
const eachDroppable: PropDraggable = (stat) => {
  return enableEachDroppable.value ? stat.level === 1 : null;
};
const rootDroppable = ref(true);
const disableDrag = ref(false);
const disableDrop = ref(false);
const dragOpen = ref(true);
const dragOpenDelay = ref(500);
const maxLevel = ref(0);
const keepPlaceholder = ref(false);
const useMouseAsMovePoint = ref(false);
const rtl = ref(false);
const btt = ref(false);

const beforeDragOpen: BeforeDragOpen = (stat) => {
  if (stat.data.text === "Animals" && stat.children.length === 1) {
    context.targetTree!.addMulti(
      [{ text: "add 1" }, { text: "add 2" }, { text: "add 3" }],
      stat
    );
  }
};
</script>

<style lang="scss"></style>
