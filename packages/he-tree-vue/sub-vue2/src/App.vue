<script lang="ts">
import vList from "../../../core/src/components/v-list.vue";
import {
  ref,
  reactive,
  defineComponent,
  onMounted,
  isVue2,
  computed,
} from "vue-demi";
import * as hp from "helper-js";
console.log("isVue2", isVue2);

export default defineComponent({
  components: { "v-list": vList },
  data() {
    return {
      items: new Array(1000).fill(1).map((v) => ({
        text: hp.randString(3),
        lineHeight: 20 + hp.randInt(1, 10) + "px",
        width: 100 + hp.randInt(1, 30) + "px",
      })),
    };
  },
});
</script>

<template>
  <div>
    <!-- horizontal -->
    <v-list
      ref="list"
      :items="items"
      :first-render="10"
      style="width: 1000px"
      horizontal
    >
      <template #default="{ item, index }">
        <h2 style="border: 1px solid #ccc" :style="{ width: item.width }">
          ITEM: {{ index }} - {{ item["text"] }}
        </h2>
      </template>
    </v-list>
    <!-- vertical -->
    <v-list ref="list" :items="items" :first-render="10" style="height: 600px">
      <template #default="{ item, index }">
        <h2
          style="border: 1px solid #ccc"
          :style="{ lineHeight: item.lineHeight }"
        >
          ITEM: {{ index }} - {{ item["text"] }}
          <input />
        </h2>
      </template>
    </v-list>
    <v-list ref="list" :items="items" :first-render="10" style="height: 600px">
      <template #default="{ item, index }">
        <h2
          style="border: 1px solid #ccc"
          :style="{ lineHeight: item.lineHeight }"
        >
          ITEM: {{ index }} - {{ item["text"] }}
        </h2>
      </template>
    </v-list>
  </div>
</template>

<style></style>
