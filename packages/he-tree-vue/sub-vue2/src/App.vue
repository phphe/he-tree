<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));gap: 20px;">
    <div>
      <h3>Base</h3>
      <BaseTree v-model="treeData1">
        <template #default="{ node, stat }">
          <button v-if="stat.children.length" @click="stat.open = !stat.open">{{ stat.open ? '-' : '+' }}</button>
          <input type="checkbox" v-model="stat.checked" />
          <span>{{ node.text }}</span>
        </template>
      </BaseTree>
    </div>
    <div>
      <h3>Styled with simple preset and draggable</h3>
      <Draggable class="mtl-tree" v-model="treeData2" treeLine>
        <template #default="{ node, stat }">
          <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click.native="stat.open = !stat.open" />
          <input class="mtl-checkbox mtl-mr" type="checkbox" v-model="stat.checked" />
          <span class="mtl-ml">{{ node.text }}</span>
        </template>
      </Draggable>
    </div>
    <div>
      <h3>Table Tree</h3>
      <Draggable v-model="treeData3" table class="table-tree">
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
      </Draggable>
    </div>
  </div>
</template>

<script>
import { BaseTree, Draggable, pro, OpenIcon } from "../../dist/v2/index.es.js";
// import "@he-tree/vue/style/default.css";
// import "@he-tree/vue/style/material-design.css";

function createData() {
  return [
    {
      text: "Projects",
      children: [
        {
          text: "Frontend",
          children: [
            {
              text: "Vue",
              children: [
                {
                  text: "Nuxt",
                },
              ],
            },
            {
              text: "React",
              children: [
                {
                  text: "Next",
                },
              ],
            },
            {
              text: "Angular",
            },
          ],
        },
        {
          text: "Backend",
        },
      ],
    },
    { text: "Photos" },
    { text: "Videos" },
  ]
}

export default {
  components: { BaseTree, Draggable, OpenIcon },
  data() {
    return {
      treeData1: createData(),
      treeData2: createData(),
      treeData3: createData(),
    };
  },
};
</script>
