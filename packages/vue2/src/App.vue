<template lang="pug">
#app: .row
  .col-2
    h3 Base
    button(@click="$refs.tree1.unfoldAll()") unfold all
    button(@click="$refs.tree1.foldAll()") fold all
    BaseTree(:treeData="treeData1" ref="tree1")
      template(v-slot="{node, index, tree}")
        b(v-if="node.$children.length > 0" @click="node.$folded=!node.$folded") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
  .col-2
    h3 Flat Data
    BaseTree(:flatData="flatData1")
      template(v-slot="{node, index, tree}")
        b(v-if="node.$children.length > 0" @click="node.$folded=!node.$folded") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
    h3 Virtualization
    BaseTree(:treeData="treeData2" virtualization style="height:400px;overflow:auto" ref="tree2")
      template(v-slot="{node, index, tree}")
        b(v-if="node.$children.length > 0" @click="node.$folded=!node.$folded") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
    h3 Children Lazy Loading
    button(@click="$refs.tree3.unfoldAll()") unfold all
    button(@click="$refs.tree3.foldAll()") fold all
    BaseTree(:treeData="treeData3" virtualization style="height:200px;overflow:auto" :childrenLoader="childrenLoader" childrenLazyLoading  ref="tree3")
      template(v-slot="{node, index, tree}")
        b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
  .col-2
    h3 Drag &amp; Drop
    Draggable(:treeData="treeData4" virtualization style="height:200px;overflow:auto" :childrenLoader="childrenLoader" childrenLazyLoading)
      template(v-slot="{node, index, tree}")
        b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}{{node.$childrenLoading ? '-loading' : ''}}
    h3 Edge Scroll
    Draggable(:treeData="treeData5" virtualization style="height:200px;overflow:auto" edgeScroll)
      template(v-slot="{node, index, tree}")
        b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
    h3 RTL
    Draggable(:treeData="treeData5" virtualization style="height:200px;overflow:auto" edgeScroll rtl :gap="6")
      template(v-slot="{node, index, tree}")
        b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
  .col-3
    h3 Style
    Draggable.tree6(:treeData="treeData6" virtualization style="height:200px;overflow:auto" edgeScroll :gap="6")
      template(v-slot="{node, index, tree}")
        b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
    br
    Draggable.tree7(:treeData="treeData7" virtualization style="height:200px;overflow:auto" edgeScroll :gap="6")
      template(v-slot="{node, index, tree}")
        b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
    h3 Custome Trigger
    Draggable.tree8(:treeData="treeData8" virtualization style="height:500px;overflow:auto"  triggerClass="drag-trigger" edgeScroll :gap="6")
      template(v-slot="{node, index, tree}")
        button.drag-trigger(style="margin-right:.5em") drag
        b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        | &nbsp;
        span {{node.text}}
  //- .col-3
  //-   h3 Pro
  //-   DraggablePro.tree6(:treeData="treeData6" virtualization style="height:200px;overflow:auto" edgeScroll crossTree)
  //-     template(v-slot="{node, index, tree}")
  //-       b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
  //-       input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
  //-       | &nbsp;
  //-       span {{node.text}}
  //-   hr
  //-   DraggablePro.tree6(:treeData="treeData6" virtualization style="height:200px;overflow:auto" edgeScroll crossTree)
  //-     template(v-slot="{node, index, tree}")
  //-       b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
  //-       input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
  //-       | &nbsp;
  //-       span {{node.text}}
  //-   hr
  //-   h4 clone when drag
  //-   DraggablePro.tree6(:treeData="treeData6" virtualization style="height:200px;overflow:auto" edgeScroll crossTree cloneWhenDrag)
  //-     template(v-slot="{node, index, tree}")
  //-       b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
  //-       input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
  //-       | &nbsp;
  //-       span {{node.text}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseTree from "./BaseTree.vue";
import Draggable from "./draggable/Draggable.vue";
// import DraggablePro from "./draggable/DraggablePro.vue";
import * as hp from "helper-js";
import { obj } from "./types";

@Component({
  components: {
    BaseTree,
    Draggable,
    // DraggablePro,
  },
})
export default class App extends Vue {
  data() {
    const genTreeData = () => [
      {
        text: "node 1",
        children: [
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
        ],
      },
      {
        text: "node 2",
        children: [
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
          { text: "node 1-1" },
          { text: "node 1-2" },
        ],
      },
      { text: "node 3" },
      { text: "node 4" },
      { text: "node 4", droppable: false },
      {
        text: "node 5",
        children: [
          { text: "node 1" },
          {
            text: "node 2",
            children: [{ text: "node 3" }, { text: "node 4" }],
          },
          {
            text: "node 2",
            droppable: false,
            children: [{ text: "node 3" }, { text: "node 4" }],
          },
          {
            text: "node 2",
            children: [
              { text: "node 3" },
              { text: "node 4", droppable: false },
            ],
          },
          { text: "node 3" },
          { text: "node 4" },
          { text: "node 3" },
          { text: "node 4" },
          { text: "node 3" },
          { text: "node 4" },
          { text: "node 3" },
          { text: "node 4" },
        ],
      },
    ];
    return {
      treeData1: genTreeData(),
      treeData2: [
        ...genTreeData(),
        ...genTreeData(),
        ...genTreeData(),
        ...genTreeData(),
      ],
      flatData1: [
        { text: "node 1", id: 1, parent_id: 2 },
        { text: "node 2", id: 2 },
        { text: "node 3", id: 3, parent_id: 2 },
        { text: "node 233" },
        { text: "node 233" },
        { text: "node 233" },
        { text: "node 233" },
      ],
      treeData3: [{ text: "node 3", $folded: true }],
      treeData4: [{ text: "node 4", $folded: true }],
      treeData5: genTreeData(),
      treeData6: genTreeData(),
      treeData7: genTreeData(),
      treeData8: genTreeData(),
      childrenLoader: async (node: obj) => {
        await hp.waitTime(hp.randInt(100, 1000));
        if (node.$level === 3) {
          return [];
        }
        let len = hp.randInt(2, 5);
        const r = [];
        for (let index = 0; index < len; index++) {
          r.push({ text: `node_${hp.randString(3).toLowerCase()}` });
        }
        return r;
      },
    };
  }
}
</script>

<style lang="scss">
@import "./assets/simple-grid.scss";

.tree6 .tree-node {
  border: 1px solid #ccc;
  padding: 0 5px;
}
.tree7:not(.he-tree-dragging) .tree-node-outer:hover {
  background: #ccc;
}
.tree7:not(.he-tree-dragging)
  .tree-node-outer:hover
  .tree-node:not(.tree-placeholder) {
  background: #ccc;
  border-color: #ccc;
}
.tree7 .tree-node {
}
.tree7 .tree-node:not(.tree-placeholder) {
  border: 1px solid #ccc;
  padding: 3px 10px;
  background: #ffbe00;
}
.tree8 .tree-node {
  border: 1px solid #ccc;
  padding: 2px 5px;
}
</style>
