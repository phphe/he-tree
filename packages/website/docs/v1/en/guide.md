# Guide

**Replace 3 to 2 for Vue2 in follow doc.**

## Installation

```sh
# Vue3
npm i -P @he-tree/vue3
# Vue2
npm i -P @he-tree/vue2
```

## Import

```ts
import { BaseTree, Draggable, obj, BaseNode, Node } from '@he-tree/vue3'
import '@he-tree/vue3/dist/he-tree-vue3.css'
```

## Don't use margin out of node

You may want to use `margin-bottom` to set the space between two nodes, that is not allowed. If so, it can't get the correct height of node. Use prop `gap` to do that.

## treeData or flatData

The tree is able to receive both tree data and flat data as initial data. When use `treeData`, tree need `childrenKey`. When use `flatData`, it need `idKey`, `parentIdKey`.

`treeData` example:

```ts
treeData = [
  {
    text: 'node1',
    children: [{ text: 'node1-1' }, { text: 'node1-2' }, { text: 'node1-3' }],
  },
  { text: 'node2' },
]
```

`flatData` example:

```ts
flatData = [
  { text: 'node1', id: 1 },
  { text: 'node2', id: 2 },
  { text: 'node1-1', id: 3, pid: 1 },
  { text: 'node1-2', id: 3, pid: 1 },
  { text: 'node1-3', id: 3, pid: 1 },
]
```

## Structure

```pug
.he-tree(:id="treeID" :class="{'he-tree-dragging':dragging, 'he-tree-rtl': rtl}")
  .vl-items
    .tree-node-outer(:data-id="node.$id" :class="node.$outerClass" :style="node.$outerClass")
      .tree-node(:class="node.$nodeClass" :style="node.$nodeStyle")
        slot(:node="node" :tree="tree") {{node[textKey]}}
    .tree-node-outer(:data-id="node.$id" :class="node.$outerClass" :style="node.$outerClass")
      .tree-node(:class="node.$nodeClass" :style="node.$nodeStyle")
        slot(:node="node" :tree="tree") {{node[textKey]}}
    ...
```

**It is rendered as a flat list, not nested tree. Different level node has different `padding-left`.** Refer to the structure above, you can do:

- Set outer element class and style by set `node.$outerClass` and `node.$outerStyle`
- Set node element class and style by set `node.$nodeClass` and `node.$nodeStyle`
- Use default slot to customize node render. The slot has props: node, tree.

## Usage

```vue
<template>
  <BaseTree :flatData="flatData" idKey="id" parentIdKey="pid" />
</template>
<script>
  import '@he-tree/vue3/dist/he-tree-vue3.css'
  import { BaseTree } from '@he-tree/vue3'

  export default {
    components: { BaseTree },
    data() {
      return {
        flatData: [
          { text: 'node1', id: 1 },
          { text: 'node2', id: 2 },
          { text: 'node1-1', id: 3, pid: 1 },
          { text: 'node1-2', id: 3, pid: 1 },
          { text: 'node1-3', id: 3, pid: 1 },
        ],
      }
    },
  }
</script>
```

## Ouput

Use methods `outputNestedData` or `outputFlatData` to get converted data without runtime properties. In order to get the changed data when drag, they should be executed in the [`drop`](api.md#drop) or [`drop-change`](api.md#drop-change) event.

## Fold & Expand

```vue
<template>
  <BaseTree :flatData="flatData" idKey="id" parentIdKey="pid">
    <template v-slot="{ node, tree }">
      <b @click="tree.toggleFold(node)">{{ node.$folded ? '+' : '-' }}</b>
      <span>{{ node.text }}</span>
    </template>
  </BaseTree>
</template>
<script>
  import '@he-tree/vue3/dist/he-tree-vue3.css'
  import { BaseTree } from '@he-tree/vue3'

  export default {
    components: { BaseTree },
    data() {
      return {
        flatData: [
          { text: 'node1', id: 1 },
          { text: 'node2', id: 2 },
          { text: 'node1-1', id: 3, pid: 1 },
          { text: 'node1-2', id: 3, pid: 1 },
          { text: 'node1-3', id: 3, pid: 1 },
        ],
      }
    },
  }
</script>
```

## Lazy Load

Load children data when unfold a node. Such as by Ajax. Use prop `childrenLazyLoading` to enable. Use function prop `childrenLoader` to load data, it can return `Promise` and must return tree data, nested data.

## Folde all nodes by default

Use prop `defaultFolded`.

## Checkbox

Use method `getAllCheckedNodes` to get all checked nodes.

```vue
<template>
  <BaseTree :flatData="flatData" idKey="id" parentIdKey="pid">
    <template v-slot="{ node, tree }">
      <input
        type="checkbox"
        v-model="node.$checked"
        @change="tree.updateChecked(node)"
      />
      <span>{{ node.text }}</span>
    </template>
  </BaseTree>
</template>
<script>
  import '@he-tree/vue3/dist/he-tree-vue3.css'
  import { BaseTree } from '@he-tree/vue3'

  export default {
    components: { BaseTree },
    data() {
      return {
        flatData: [
          { text: 'node1', id: 1 },
          { text: 'node2', id: 2 },
          { text: 'node1-1', id: 3, pid: 1 },
          { text: 'node1-2', id: 3, pid: 1 },
          { text: 'node1-3', id: 3, pid: 1 },
        ],
      }
    },
  }
</script>
```

## RTL

Use prop `rtl` to enable.

## Virtualization

Improve performance when there are a lot of nodes. Use prop `virtualization` to enable. Use prop `virtualizationPrerender` to define render length at start.

## Draggable

```vue
<template>
  <Draggable :flatData="flatData" idKey="id" parentIdKey="pid" />
</template>
<script>
  import '@he-tree/vue3/dist/he-tree-vue3.css'
  import { Draggable } from '@he-tree/vue3'

  export default {
    components: { Draggable },
    data() {
      return {
        flatData: [
          { text: 'node1', id: 1 },
          { text: 'node2', id: 2 },
          { text: 'node1-1', id: 3, pid: 1 },
          { text: 'node1-2', id: 3, pid: 1 },
          { text: 'node1-3', id: 3, pid: 1 },
        ],
      }
    },
  }
</script>
```

## Drag Trigger

Use prop `triggerClass` to specify the css name of the element that triggers the drag. When prop `triggerBySelf` true, the child element can't trigger drag.

## Prevent Drag

- When prop `draggable` false, the tree's any nodes can't be drag.
- Use prop `eachDraggable` before drag start.
- When prop `rootDraggable` false, the root nodes(level 1) can't be dragged.
- Use hook prop `ondragstart` before drag start.
- Set `node.$draggable` false to handle single node.
- When parent node is not draggable, child node is draggable, such as set `$draggable` as true of child node, then this child node is draggable.

## Prevent Drop

- When prop `droppable` false, any nodes can't be dropped in to the tree.
- Use prop `eachDroppable` when drag over a node.
- When prop `rootDroppable` false, the root (level 1) can't be dropped.
- Use hook prop `ondragend` before drop end. `ondragend` supports promise.
- Set `node.$droppable` false to handle single node.
- When parent node is not droppable, child node is droppable, such as set `$droppable` as true of child node, then this child node is droppable.

## Runtime data in drag and drop process

Check [`tree.store`](api.md#store)

## Placeholder

When dragging, an element will be generated with a default light cyan background to identify the place where can be dropped. Use hook prop `afterPlaceholderCreated` to handle it. If you want to manipulate this element such as adding text, you can only use native JS operations.

## Open folded node when dragging

When dragging a node over a collapsed node, this node is opened by default for dragging into it. It can be controlled by prop `unfoldWhenDragover`. Related prop: `unfoldWhenDragoverDelay`, `isNodeUnfoldable`

## How to locate the dragging node

The top left corner of dragging node is used by default. Mouse position is also supported. [`draggingNodePositionMode`](api.md#draggingNodePositionMode)

## Edge Scroll

This function belongs to Draggable plugin. If the tree is in a scroll box, it needs to be automatically scrolled when dragged to its edge. This prop is diabled by default. Use prop `edgeScroll` control that. Related prop: [edgeScrollTriggerMargin](api.md#edgeScrollTriggerMargin), [edgeScrollSpeed](api.md#edgeScrollSpeed), [edgeScrollTriggerMode](api.md#edgeScrollTriggerMode).

## Touch

It works in touch devices. It will prevent default action when touch by drag, but sometimes that does not work. Use follow css to prevent default touch action such as scroll. The css target is the drag trigger element. If no drag trigger, it is `.tree-node`.

```css
touch-action: none;
```

## Max Level

To limit the max level of the tree when drag. Use prop `eachDroppable`. Follow example code works in Vue2 and Vue3.

```html
<Draggable :eachDroppable="eachDroppable" />
```

```js
data() {
  return {
    eachDroppable: (node, store, options, startTree) => {
      const maxLevel = 3; // change it by your requirement
      let draggingNodeMaxLevel = 0;
      hp.walkTreeData(
        store.draggingNode,
        (childNode) => {
          if (childNode.$level > draggingNodeMaxLevel) {
            draggingNodeMaxLevel = childNode.$level;
          }
        },
        "$children"
      );
      draggingNodeMaxLevel = draggingNodeMaxLevel - store.draggingNode.$level;
      if (node.$level + draggingNodeMaxLevel >= maxLevel) {
        return false;
      }
    },
  }
}
```

## Pro Plugin

The [pro plugin](/pro-plugin) has advanced features.

- Cross tree. Drag from a tree to another tree.
- Clone. Clone node when drag start.

## Import by script tag

Download the latest version from npm, upload `dist` folder to your server. You can access the library through gloabl variable `heTreeVue3` or `heTreeVue2`.

```html
<!-- replace vue3 to vue2 if use Vue2 -->
<script src="yourpath/dist/he-tree-vue3.min.js" charset="utf-8"></script>
<link rel="stylesheet" href="yourpath/dist/he-tree-vue3.css" />
<!-- usage -->
<script type="text/javascript">
  var Tree = heTreeVue3.BaseTree;
  var Fold = heTreeVue3.Draggable;
  ...
</script>
```
