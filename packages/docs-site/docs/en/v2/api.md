# API

`he-tree` exports 2 components: [BaseTree](#basetree), [Draggable](#draggable). BaseTree is the base tree component. Draggable extends BaseTree, it includes drag functions. Follow API is simply divided into two parts because of this.

`Stat<never>`, `Stat<unknown>` in below are TypeScript format. `unknown`, `never`, `any` represent the node data of user. `Stat<never>` and `Stat<unknown>` are same, they mean the [stat](#Stat) of a node.

The origin of all coordinates below is the upper left corner of the window. Such as the return value of `Element.getBoundingClientRect()`.

## BaseTree

### props

#### btt

```js
{ type: Boolean, default: false }
```

Tree start from bottom to top.

#### childrenKey

```js
{ type: String, default: "children" }
```

Replace `children` key in data.

#### defaultOpen

```js
{ type: Boolean, default: true }
```

Open all nodes by default.

#### indent

```js
{ type: Number, default: 20 }
```

Node indent in `px`.

#### nodeKey

Use`index` or return a unique value as key for Vue loop.

```js
{ type:  "index" | ((stat: Stat<any>, index: number) => any), default: 'index' }
```

#### rtl

```js
{ type: Boolean, default: false }
```

Display from right to left.

#### statHandler

```js
{ type: (stat: Stat<any>) => Stat<any> }
```

Hook method. Handle each [stat](#Stat) after each stat created.

#### table

```js
{ type: Boolean, default: false }
```

Render as table.

#### textKey

```js
{ type: String, default: "text" }

```

Replace `text` key in data. It is only used in default slot. If you provide your ui code, it may be unused.

#### updateBehavior

The way of emit new data when inner data changed.

- modify: default. Modify binded data.
- new: emit a new data, suits for for vuex.
- disabled: do nothing. You can use [getData](api.md#getData) to generate and get current data.

#### virtualization

```js
{ type: Boolean, default: false }
```

Enable virtual list.

#### virtualizationPrerenderCount

```js
{ type: Number, default: 20 }
```

The number of rendered list items at start. Suits for SSR(Server Side Render).

#### treeLine

```js
{ type: Boolean, default: false }
```

Display tree line. **This feature is not valid in table mode.**

#### treeLineOffset

```js
{ type: Number, default: 8 }
```

Horizontal displacement of tree lines, unit: pixels.

#### watermark

```js
{ type: Boolean, default: false }
```

Print a watermark information to browser console.

### data

#### dragNode

The dragging node stat.

#### dragOvering

The tree is being drag overing.

#### self

Tree instance.

#### stats

```ts
type type = Stat<your_node_type>[]
```

All stats, tree structure.

#### statsFlat

```ts
type type = Stat<your_node_type>[]
```

All stats, flat structure.

### computed

#### rootChildren

```ts
type type = Stat<your_node_type>[]
```

The top-level nodes' stats. Can be considered as a subset of a non-existent root node.

### methods

#### Examples

#### methods examples

Some methods' examples. Click top right icon to view source code.

<!-- code & demo -->

```vue
<template>
  <div>
    <BaseTree ref="tree" v-model="treeData"
      ><template #default="{ node, stat }">
        <input type="checkbox" v-model="stat.checked" />
        {{ node.text }}
      </template></BaseTree
    >
    <div class="actions">
      <button @click="addAppendToFirstNode()">add: append to first node</button>
      <button @click="addAfterSecondNode()">add: after second node</button>
      <button @click="addNestedNewNodes()">add: nested new nodes</button>
      <button @click="addMulti()">addMulti</button>
      <br />
      <button @click="batchUpdate()">batchUpdate</button>
      <br />
      <button @click="$refs.tree.closeAll()">closeAll</button>
      <button @click="$refs.tree.openAll()">openAll</button>
      <button @click="getChecked()">getChecked</button>
      <button @click="getChecked(true)">getChecked(true)</button>
      <br />
      <button @click="getDataAll()">getData: all</button>
      <button @click="getDataFirstNode()">getData: first node</button>
    </div>
  </div>
</template>

<script>
  import { BaseTree } from '@he-tree/vue'
  import '@he-tree/vue/style/default.css'

  export default {
    components: { BaseTree },
    data() {
      return {
        treeData: [
          {
            text: 'Projects',
            children: [
              {
                text: 'Frontend',
              },
              {
                text: 'Backend',
              },
            ],
          },
          { text: 'Photos' },
          { text: 'Videos' },
        ],
      }
    },
    methods: {
      notify() {
        alert(`Outputed to browser console, please check`)
      },
      addAppendToFirstNode() {
        this.$refs.tree.add(
          { text: 'new node' },
          this.$refs.tree.rootChildren[0],
          this.$refs.tree.rootChildren[0].children.length
        )
      },
      addAfterSecondNode() {
        this.$refs.tree.add({ text: 'new node' }, null, 2)
      },
      addNestedNewNodes() {
        this.$refs.tree.add(
          { text: 'new parent', children: [{ text: 'new child' }] },
          null,
          2
        )
      },
      addMulti() {
        // nested new nodes supported
        this.$refs.tree.addMulti(
          [{ text: 'addMulti1' }, { text: 'addMulti2' }],
          this.$refs.tree.rootChildren[1],
          0
        )
      },
      batchUpdate() {
        this.$refs.tree.batchUpdate(() => {
          this.addAppendToFirstNode()
          this.addMulti()
        })
      },
      getChecked(withDemi) {
        console.log(this.$refs.tree.getChecked(withDemi))
        this.notify()
      },
      getDataAll() {
        console.log(this.$refs.tree.getData())
        this.notify()
      },
      getDataFirstNode() {
        console.log(
          this.$refs.tree.getData(null, this.$refs.tree.rootChildren[0])
        )
        this.notify()
      },
    },
  }
</script>
<style scoped>
  .actions {
    margin-top: 10px;
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }
  button {
    border: 1px solid #ccc;
    padding: 2px 5px;
    border-radius: 5px;
    margin-right: 8px;
    margin-bottom: 5px;
    font-size: small;
  }
</style>
```

#### add

```ts
(nodeData: unknown, parent?: Stat<unknown> | null | undefined, index?: number | null | undefined): void;
```

Add node. parent is null means root. [Example](#methods-examples)

#### addMulti

```ts
(
  dataArr: any[],
  parent?: Stat<any> | null,
  startIndex?: number | null
): void;
```

Add multiple continuously nodes. parent is null means root. [Example](#methods-examples)

#### batchUpdate

```ts
(task: () => any): void;
```

Merge multiple data update actions, to make it only emit new data once. [Example](#methods-examples)

#### closeAll

```ts
(): void
```

Close all nodes. [Example](#methods-examples)

#### getChecked

```ts
(withDemi?: boolean | undefined): Stat<unknown>[]
```

Get all checked nodes. Param `withDemi` means including half checked. [Example](#methods-examples)

#### getData

```ts
(filter?: ((data: never) => never) | undefined, root?: Stat<never> | undefined): never[];
```

Generate and get current data without stat. Param `filter` can handle each node data. [Example](#methods-examples)

#### getRootEl

```ts
(): HTMLElement;
```

Get the root element of the tree component.

#### getSiblings

```ts
(stat: Stat<never>): Stat<never>[];
```

Get all siblings of a node including it self.

#### getStat

```ts
(nodeData: unknown): Stat<unknown>
```

Get `stat` by node data.

#### getUnchecked

```ts
(withDemi?: boolean | undefined): Stat<unknown>[]
```

Get all unchecked nodes. Param `withDemi` means including half checked.

#### has

```ts
(nodeData: unknown): boolean
```

Detect the tree if has the stat of given node data.

#### isVisible

```ts
(statOrNodeData: Stat<unknown>|unknown): boolean;
```

Detect if node is visible. When parent invisible or closed, children are invisible. Param `statOrNodeData` can be node data or stat.

#### iterateParent

```ts
(stat: Stat<unknown>, opt?: {
    withSelf: boolean;
} | undefined): Generator<Stat<unknown>, void, unknown>;
```

Iterate all parents of a node. Param `opt.withSelf` means including it self. E.g.:

```ts
for (const parentStat of tree.iterateParent(nodeStat, { withSelf: false })) {
  //
}
```

#### move

```ts
(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): boolean;
```

Move node. parent is null means root. Similar to `add`, check the example of `add`: [Example](#methods-examples)

#### openAll

```ts
(): void
```

Open all nodes. [Example](#methods-examples)

#### remove

```ts
(stat: Stat<unknown>): boolean;
```

Remove node.

#### removeMulti

```ts
(dataArr: any[]): boolean;
```

Remove multiple nodes.

#### updateCheck

```ts
(): void
```

Recalculate `checked` state of all nodes from end to root.

### events

#### check:node

Parameters: stat. Triggered when node `checked` changed.

#### click:node

Parameters: stat. Triggered when click node.

#### close:node

Parameters: stat. Triggered when close node.

#### open:node

Parameters: stat. Triggered when open node.

### slots

#### default

Can be used to customize node ui. Parameters:

- node: node data
- stat: runtime info of node
- indentStyle: node indent style. Only when rendering as a table, user should apply it to a column, usually the first column.
- tree: tree instance.

#### placeholder

Can be used to customize placeholder ui. Parameters:

- tree: tree instance.

#### prepend

Start of root element inner. Used to add table head when render as table
. Parameters:

- tree: tree instance.

#### append

End of root element inner. Used to add table foot when render as table. Parameters:

- tree: tree instance.

## Draggable

### props

#### beforeDragOpen

```ts
(stat: Stat<any>) : void | Promise<void>
```

Hook method. Call before open node when drag over it. Promise supported.

#### disableDrag

```js
{
  type: Boolean
}
```

Disable drag.

#### disableDrop

```js
{
  type: Boolean
}
```

Disable drop.

#### dragOpen

```js
{ type: Boolean, default: true }
```

Open node when drag over it.

#### dragOpenDelay

```js
{ type: Number, default: 0 }
```

Wait milliseconds before open node when drag over it.

#### eachDraggable

```ts
(stat: Stat<any>) : boolean | null
```

Hook method. Control each node if is draggable. Child will inherit parent if not set.

#### eachDroppable

```ts
(stat: Stat<any>) : boolean | null
```

Hook method. Control each node if is droppable. Child will inherit parent if not set.

#### externalDataHandler

```ts
(event: DragEvent) : any
```

Call when external something dropped to the tree with Drag and Drop API. Tree will call it to create new node data.

#### keepPlaceholder

```ts
{ type: Boolean, default: false }
```

Keep placeholder when drag leave a tree.

#### maxLevel

```ts
{
  type: Number
}
```

If tree's max level will exceed this after drop, the drop will be prevented.

#### onExternalDragOver

```ts
(event: DragEvent) : boolean
```

Call when external something dragged over the tree with Drag and Drop API. Param `event` is `DragEvent` type of Drag and Drop API. Return `false` to ignore it.

#### resolveStartMovePoint

```ts
"mouse" | "default" | ((dragElement: HTMLElement) : Point)
```

The dragging node is think as a point. This means how to get the point. `default` is to get the top left of node . `mouse` is get mouse position. Or you can pass a method to return a coordinate: `{x:number,y:number}`.

#### rootDroppable

```ts
boolean | () : boolean
```

Hook method. If the tree root is droppable. Default is `true`.

#### triggerClass

```js
{
  type: [String, Array]
} // string | string[]
```

The trigger element css class. Default is the node self. Can be child element of node. A node can has multiple trigger elements.

### methods

#### getNodeByElement

```ts
(el: HTMLElement): Stat<any> | null
```

Get node stat by HTML Element.

#### isDraggable

```ts
(node: Stat<any>): boolean
```

Detect if node draggable.

#### isDroppable

```ts
(node: Stat<any>): boolean
```

Detect if node droppable.

### events

#### before-drag-start

Parameters: dragNode. Triggered before drag start.

#### after-drop

Parameters: nothing. Triggered after drop. Only triggered on dropped tree.

#### change

Parameters: nothing. Triggered after changed by drop. Triggered on both 2 trees when drag cross trees.

#### enter

Parameters: DragEvent. Triggered when drag enter a tree.

#### leave

Parameters: DragEvent. Triggered when drag leave a tree.

## Others

### Stat

Each node has a stat created by tree. It stores runtime info.

```ts
{
  [x: string]: any // You can add any other keys to a stat.
  data: T // Node data.
  open: boolean // Is opened.
  parent: Stat<T> | null // Parent stat.
  children: Stat<T>[] // Children stats.
  level: number // Level start from 1.
  isStat: boolean // Detect if is stat object.
  hidden: boolean // If hidden.
  checked: boolean | 0 // If checked. 0 mean just some children checked.
  draggable: boolean | null // null means inherit parent.
  droppable: boolean | null // null means inherit parent.
  style: any // Customize node style. Vue's style format.
  class: any // Customize node class name. Vue's class format.
}
```

### dragContext

Runtime info when drag. [Example](#example---dragcontext). including: startInfo, targetInfo, dragNode, startTree, targetTree. Import:

```ts
// vue3
import { dragContext } from '@he-tree/vue'
// vue2
import { dragContext } from '@he-tree/vue/vue2'
```

#### startInfo

Type: [StartInfo](#StartInfo). Info about drag start.

#### targetInfo

Type: [StartInfo](#StartInfo). Info about drag target.

#### dragNode

Type: [Stat](#Stat). The dragging node.

#### startTree

Draggable component instance. The tree drag start at.

#### targetTree

Draggable component instance. Drag target tree.

#### Example - dragContext

Use the dragContext to obtain the dragNode in [eachDroppable](#eachdroppable) and achieve the following effect: odd nodes only accept odd nodes, even nodes only accept even nodes.

<!-- code & demo -->

```vue
<template>
  <Draggable ref="tree" v-model="treeData" :eachDroppable="eachDroppable" />
</template>

<script>
  import { Draggable, dragContext } from '@he-tree/vue'
  import '@he-tree/vue/style/default.css'

  export default {
    components: { Draggable },
    data() {
      return {
        treeData: [
          { text: '1' },
          { text: '2' },
          { text: '3' },
          { text: '4' },
          { text: '5' },
          { text: '6' },
        ],
      }
    },
    methods: {
      eachDroppable(targetStat) {
        const isOdd = (n) => parseInt(n) % 2 === 1
        return (
          isOdd(targetStat.data.text) === isOdd(dragContext.dragNode.data.text)
        )
      },
    },
  }
</script>
```

### StartInfo

```ts
{
  tree: DraggableTreeType; // Draggable component instance.
  dragNode: Stat<any>; // The dragging node.
  parent: Stat<any> | null; // Parent of dragging node.
  siblings: Stat<any>[]; // Siblings of dragging node.
  indexBeforeDrop: number; // Index of dragging node before drop.
}
```
