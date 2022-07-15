<script lang="ts">
import { Draggable } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";
import { reactive, defineComponent, onMounted } from "vue";
import data from "./data.json";

export default defineComponent({
  components: { Draggable },
  data() {
    return {
      data,
    };
  },
  mounted() {},
});
</script>

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

<style></style>
