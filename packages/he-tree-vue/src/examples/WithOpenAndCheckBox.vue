<template>
  <div>
    <h3>With open button and checkbox</h3>
    <div v-if="checked"><b>Checked:</b> {{ checked }}</div>
    <BaseTree
      v-model="data"
      ref="tree"
      @check:node="checked = $refs.tree.getChecked().map((v) => v.data.text)"
    >
      <template #default="{ node, stat }">
        <button v-if="stat.children.length" @click="stat.open = !stat.open">
          {{ stat.open ? "-" : "+" }}
        </button>
        <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="checkbox" v-model="stat.checked" />
        {{ node.text }}
      </template>
    </BaseTree>
  </div>
</template>

<script setup lang="ts">
import BaseTree from "../components/BaseTree.vue";
import data0 from "./data.json";
import { ref } from "vue";
const data = ref(data0);
const checked = ref<string[]>();
</script>

<style lang="scss"></style>
