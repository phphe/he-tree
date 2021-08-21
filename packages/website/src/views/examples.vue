<template lang="pug">
.examples
  h1.text-2xl.mt-8.font-bold Examples
    a.text-sm.ml-4.text-primary-500(href="https://github.com/phphe/he-tree/blob/master/packages/website/src/views/examples.vue") source
  .grid.grid-cols-4.gap-4.mt-4
    div
      h3.text-xl Base
      button.text-primary-500( @click="$refs.tree1.unfoldAll()") unfold all
      button.text-primary-500.ml-2(@click="$refs.tree1.foldAll()") fold all
      BaseTree(:treeData="treeData1" ref="tree1")
        template(v-slot="{node, index, tree}")
          b(v-if="node.$children.length > 0" @click="node.$folded=!node.$folded") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
          | &nbsp;
          span {{node.text}}
    div
      h3.text-xl Flat Data
      BaseTree(:flatData="flatData1")
        template(v-slot="{node, index, tree}")
          b(v-if="node.$children.length > 0" @click="node.$folded=!node.$folded") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
          | &nbsp;
          span {{node.text}}
      .mt-4
      h3 Virtualization
      BaseTree(:treeData="treeData2" virtualization style="height:400px;overflow:auto" ref="tree2")
        template(v-slot="{node, index, tree}")
          b(v-if="node.$children.length > 0" @click="node.$folded=!node.$folded") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
          | &nbsp;
          span {{node.text}}
      .mt-4
      h3 Children Lazy Loading
      button.text-primary-500(@click="$refs.tree3.unfoldAll()") unfold all
      button.text-primary-500.ml-4(@click="$refs.tree3.foldAll()") fold all
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
      h3.mt-4 Edge Scroll
      Draggable(:treeData="treeData5" virtualization style="height:200px;overflow:auto" edgeScroll)
        template(v-slot="{node, index, tree}")
          b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
          | &nbsp;
          span {{node.text}}
      h3.mt-4 RTL
      Draggable(:treeData="treeData5" virtualization style="height:300px;overflow:auto" edgeScroll rtl :gap="6")
        template(v-slot="{node, index, tree}")
          b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
          | &nbsp;
          span {{node.text}}
    .col-3
      h3 Style
      Draggable.tree6(:treeData="treeData6" virtualization style="height:300px;overflow:auto" edgeScroll :gap="6")
        template(v-slot="{node, index, tree}")
          b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
          | &nbsp;
          span {{node.text}}
      br
      Draggable.tree7(:treeData="treeData7" virtualization style="height:300px;overflow:auto" edgeScroll  :gap="6")
        template(v-slot="{node, index, tree}")
          b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
          | &nbsp;
          span {{node.text}}
      h3.mt-4 Custome Trigger
      Draggable.tree8(:treeData="treeData8" virtualization style="height:500px;overflow:auto"  triggerClass="drag-trigger" edgeScroll :gap="6")
        template(v-slot="{node, index, tree}")
          button.drag-trigger(style="margin-right:.5em") drag
          b(@click="tree.toggleFold(node)") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
          | &nbsp;
          span {{node.text}}
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BaseTree, Draggable, obj } from '@he-tree/vue3'
  import '@he-tree/vue3/dist/he-tree-vue3.css'
  import * as hp from 'helper-js'
  import { useTitle } from '../HTMLHead'

  export default defineComponent({
    components: { BaseTree, Draggable },
    setup() {
      useTitle('Examples')
    },
    // props: {},
    data() {
      const genTreeData = () => [
        {
          text: 'node 1',
          children: [
            { text: 'node 1-1' },
            { text: 'node 1-2' },
            { text: 'node 1-3' },
            { text: 'node 1-4' },
            { text: 'node 1-5' },
            { text: 'node 1-6' },
            { text: 'node 1-7' },
            { text: 'node 1-8' },
            { text: 'node 1-9' },
            { text: 'node 1-10' },
            { text: 'node 1-11' },
            { text: 'node 1-12' },
          ],
        },
        {
          text: 'node 2',
          children: [
            { text: 'node 2-1' },
            { text: 'node 2-2' },
            { text: 'node 2-3' },
            { text: 'node 2-4' },
            { text: 'node 2-5' },
            { text: 'node 2-6' },
            { text: 'node 2-7' },
            { text: 'node 2-8' },
            { text: 'node 2-9' },
            { text: 'node 2-10' },
            { text: 'node 2-11' },
            { text: 'node 2-12' },
          ],
        },
        { text: 'node 3' },
        { text: 'node 4' },
        { text: 'node 4', droppable: false },
        {
          text: 'node 5',
          children: [
            { text: 'node 1' },
            {
              text: 'node 2',
              children: [{ text: 'node 3' }, { text: 'node 4' }],
            },
            {
              text: 'node 2',
              droppable: false,
              children: [{ text: 'node 3' }, { text: 'node 4' }],
            },
            {
              text: 'node 2',
              children: [
                { text: 'node 3' },
                { text: 'node 4', droppable: false },
              ],
            },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' },
          ],
        },
      ]
      return {
        treeData1: genTreeData(),
        treeData2: [
          ...genTreeData(),
          ...genTreeData(),
          ...genTreeData(),
          ...genTreeData(),
        ],
        flatData1: [
          { text: 'node 1', id: 1, parent_id: 2 },
          { text: 'node 2', id: 2 },
          { text: 'node 3', id: 3, parent_id: 2 },
          { text: 'node 233' },
          { text: 'node 233' },
          { text: 'node 233' },
          { text: 'node 233' },
        ],
        treeData3: [{ text: 'node 3', $folded: true }],
        treeData4: [{ text: 'node 4', $folded: true }],
        treeData5: genTreeData(),
        treeData6: genTreeData(),
        treeData7: genTreeData(),
        treeData8: genTreeData(),
        childrenLoader: async (node: obj) => {
          await hp.waitTime(hp.randInt(100, 1000))
          if (node.$level === 3) {
            return []
          }
          let len = hp.randInt(2, 5)
          const r = []
          for (let index = 0; index < len; index++) {
            r.push({ text: `node_${hp.randString(3).toLowerCase()}` })
          }
          return r
        },
      }
    },
    // computed: {},
    // watch: {},
    // methods: {},
    // created() {},
    // mounted() {}
  })
</script>

<style lang="scss">
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
