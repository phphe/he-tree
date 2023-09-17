<template>
  <div>
    <h3>Base Tree</h3>
    <div>
      <h3>Drop</h3>
    </div>
    <hr />
    <h4>Props</h4>
    <label>
      <input type="checkbox" v-model="defaultOpen" />
      defaultOpen
    </label>
    <label>
      <input type="checkbox" v-model="rtl" />
      rtl
    </label>
    <br />
    <label>
      <input type="checkbox" v-model="btt" />
      btt (display from bottom to top)
    </label>
    <br />
    <label>
      <input type="checkbox" v-model="table" />
      table
    </label>
    <label>
      <input type="checkbox" v-model="treeLine" />
      Tree Line
    </label>
    <div>
      indent
      <input type="number" v-model="indent" />
    </div>
    <hr />
    <Refresh :watch="defaultOpen">
      <BaseTree v-model="data" :defaultOpen="defaultOpen" :rtl="rtl" :indent="indent" :btt="btt" :table="table"
        :treeLine="treeLine" />
    </Refresh>
  </div>
</template>

<script setup lang="ts">
import BaseTree from "../components/BaseTree.vue";
import Refresh from "./Refresh.vue";
import data0 from "./data.json";
import { ref } from "vue";

const data = ref(data0);
const defaultOpen = ref(true);
const rtl = ref(false);
const indent = ref(20);
const btt = ref(false);
const table = ref(false);
const treeLine = ref(true);
</script>

<style lang="scss"></style>
