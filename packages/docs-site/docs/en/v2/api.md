# API

`he-tree` exports 2 components: BaseTree, Draggable. BaseTree is the base tree component. Draggable extends BaseTree, it includes drag functions. Follow API is simply divided into two parts because of this.

`Stat<never>`, `Stat<unknown>` in below are TypeScript format. `unknown`, `never`, `any` represent the node data of user. `Stat<never>` and `Stat<unknown>` are same, they mean the [stat](#Stat) of a node.

The origin of all coordinates below is the upper left corner of the window. Such as the return value of `Element.getBoundingClientRect()`.

## BaseTree

### props

#### updateBehavior

The way of emit new data when inner data changed.

- modify: default. Modify binded data.
- new: emit a new data, suits for for vuex.
- disabled: do nothing. You can use [getData](api.md#getData) to generate and get current data.

#### childrenKey

```js
{ type: String, default: "children" }
```

Replace `children` key in data.

#### textKey

```js
{ type: String, default: "text" }

```

Replace `text` key in data. It is only used in default slot. If you provide your ui code, it may be unused.

#### indent

```js
{ type: Number, default: 20 }
```

Node indent in `px`.

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

#### defaultOpen

```js
{ type: Boolean, default: true }
```

Open all nodes by default.

#### statHandler

```js
{ type: (stat: Stat<any>) => Stat<any> }
```

Hook method. Handle each [stat](#Stat) after each stat created.

#### rtl

```js
{ type: Boolean, default: false }
```

Display from right to left.

#### btt

```js
{ type: Boolean, default: false }
```

Tree start from bottom to top.

#### table

```js
{ type: Boolean, default: false }
```

Render as table.

#### watermark

```js
{ type: Boolean, default: true }
```

Print a watermark information to browser console.

#### nodeKey

Use`index` or return a unique value as key for Vue loop.

```js
{ type:  "index" | ((stat: Stat<any>, index: number) => any), default: 'index' }
```

### data

#### stats

All stats, tree structure.

#### statsFlat

All stats, flat structure.

#### dragNode

The dragging node stat.

#### dragOvering

The tree is being drag overing.

#### self

Tree instance.

### methods

#### getStat

```ts
(nodeData: unknown): Stat<unknown>
```

Get `stat` by node data.

#### has

```ts
(nodeData: unknown): boolean
```

Detect the tree if has the stat of given node data.

#### getChecked

```ts
(withDemi?: boolean | undefined): Stat<unknown>[]
```

Get all checked nodes. Param `withDemi` means including half checked.

#### getUnchecked

```ts
(withDemi?: boolean | undefined): Stat<unknown>[]
```

Get all unchecked nodes. Param `withDemi` means including half checked.

#### updateCheck

```ts
(): void
```

Recalculate `checked` state of all nodes from end to root.

#### openAll

```ts
(): void
```

Open all nodes.

#### closeAll

```ts
(): void
```

Close all nodes.

#### isVisible

```ts
(statOrNodeData: Stat<unknown>|unknown): boolean;
```

Detect if node is visible. When parent invisible or closed, children are invisible. Param `statOrNodeData` can be node data or stat.

#### move

```ts
(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): boolean;
```

Move node. parent is null means root.

#### add

```ts
(nodeData: unknown, parent?: Stat<unknown> | null | undefined, index?: number | null | undefined): void;
```

Add node. parent is null means root.

#### addMulti

```ts
(
  dataArr: any[],
  parent?: Stat<any> | null,
  startIndex?: number | null
): void;
```

Add multiple continuously nodes. parent is null means root.

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

#### batchUpdate

```ts
(task: () => any | Promise<any>): void;
```

Merge multiple data update actions, to make it only emit new data once.

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

#### getSiblings

```ts
(stat: Stat<never>): Stat<never>[];
```

Get all siblings of a node including it self.

#### getData

```ts
(filter?: ((data: never) => never) | undefined, root?: Stat<never> | undefined): never[];
```

Generate and get current data without stat. Param `filter` can handle each node data.

#### getRootEl

```ts
(): HTMLElement;
```

Get the root element of the tree component.

### events

#### click:node

Parameters: stat. Triggered when click node.

#### open:node

Parameters: stat. Triggered when open node.

#### close:node

Parameters: stat. Triggered when close node.

#### check:node

Parameters: stat. Triggered when node `checked` changed.

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

#### triggerClass

```js
{
  type: [String, Array]
} // string | string[]
```

The trigger element css class. Default is the node self. Can be child element of node. A node can has multiple trigger elements.

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

#### rootDroppable

```ts
boolean | () : boolean
```

Hook method. If the tree root is droppable. Default is `true`.

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

#### beforeDragOpen

```ts
(stat: Stat<any>) : void | Promise<void>
```

Hook method. Call before open node when drag over it. Promise supported.

#### resolveStartMovePoint

```ts
"mouse" | "default" | ((dragElement: HTMLElement) : Point)
```

The dragging node is think as a point. This means how to get the point. `default` is to get the top left of node . `mouse` is get mouse position. Or you can pass a method to return a coordinate: `{x:number,y:number}`.

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

#### externalDataHandler

```ts
(event: DragEvent) : any
```

Call when external something dropped to the tree with Drag and Drop API. Tree will call it to create new node data.

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

#### enter

Parameters: DragEvent. Triggered when drag enter.

#### leave

Parameters: DragEvent. Triggered when drag leave.

#### after-drop

Parameters: nothing. Triggered after drop. Only triggered on dropped tree.

#### change

Parameters: nothing. Triggered after changed by drop. Triggered on both 2 trees when drag cross trees.

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
  checked: boolean | null // If checked. null mean just some children checked.
  draggable: boolean | null // null means inherit parent.
  droppable: boolean | null // null means inherit parent.
  style: any // Customize node style. Vue's style format.
  class: any // Customize node class name. Vue's class format.
}
```

### dragContext

Runtime info when drag. including: startInfo, targetInfo, dragNode, startTree, targetTree. Import:

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
