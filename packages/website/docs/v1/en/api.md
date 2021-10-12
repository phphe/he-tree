# API

## BaseTree

### props

#### idKey

```ts
{ type: String, default: "id" }
```

#### parentIdKey

```ts
{ type: String, default: "parent_id" }
```

#### childrenKey

```ts
{ type: String, default: "children" }
```

#### textKey

```ts
{ type: String, default: "text" }
```

#### flatData

```ts
{
  type: Array
}
```

#### treeData

```ts
{
  type: Array
}
```

#### indent

```ts
{ type: Number, default: 20 }
```

#### gap

```ts
{
  type: Number
}
```

#### rtl

```ts
{ type: Boolean, default: false }
```

#### virtualization

```ts
{ type: Boolean, default: false }
```

#### virtualizationPrerender

```ts
{ type: Number, default: 20 }
```

#### childrenLazyLoading

```ts
{ type: Boolean, default: false }
```

#### childrenLoader

```ts
(
  node: Node,
  vm: ComponentPublicInstance
) => Promise<Node[]>;
```

#### defaultFolded

```ts
{ type: Boolean, default: false }
```

### data

#### nodes

```ts
Node[]
```

#### nodesByID

```ts
Record<string, Node>
```

#### trees

```ts
{[treeID:string]: Node}
```

#### dragging

```ts
boolean
```

#### treeID

```ts
string
```

#### tree

vm of tree

```ts
this
```

### computed

#### visibleNodes

```ts
Node[]
```

### events

#### fold

```ts
(node: Node)
```

#### unfold

```ts
(node: Node)
```

#### load-children

For children lazy load. Start to load children

```ts
(node: Node)
```

#### load-children-success

For children lazy load

```ts
(node: Node)
```

#### load-children-error

For children lazy load. Get error by `node.$childrenLoadStaus.error`.

```ts
(node: Node)
```

### methods

#### countChildren

```ts
(node: Node | undefined): number
```

#### addNode

```ts
(node: obj, parentId: number | string | null, index?: number): void;
```

#### moveNode

```ts
(node: Node, parentId: number | string | null, index?: number): void;
```

#### removeNode

```ts
(node: Node): void;
```

#### outputNestedData

```ts
(parent: Node | null, ignoreKeys?: string[], _returnFlat?: boolean | undefined): obj[];
```

#### outputFlatData

```ts
(parent: Node | null, ignoreKeys?: string[]): Record<string, unknown>[];
```

#### isNodeParentFolded

```ts
(node: Node): boolean;
```

#### isNodeVisible

```ts
(node: Node): boolean;
```

#### foldAll

```ts
(): void;
```

#### unfoldAll

```ts
(node?: Node | undefined): Promise<void> | undefined;
```

#### unfold

```ts
(node: Node): void | Promise<void>;
```

#### toggleFold

```ts
(node: Node): void | Promise<void>;
```

#### updateChecked

```ts
(node: Node): void;
```

#### getAllCheckedNodes

```ts
(): Node[];
```

## Draggable

The draggable tree component. It extends BaseTree.

### props

#### triggerClass

```ts
{ type: String, default: "tree-node" }
```

#### triggerBySelf

```ts
Boolean
```

#### draggable

```ts
{ type: Boolean, default: true }
```

#### droppable

```ts
{ type: Boolean, default: true }
```

#### eachDraggable

```ts
{
  type: [Boolean, Function]
}
```

Function type is [eachDraggableFunc](#eachDraggableFunc)

#### eachDroppable

```ts
{
  type: [Boolean, Function]
}
```

Function type is [eachDraggableFunc](#eachDraggableFunc)

#### rootDraggable

```ts
{ type: Boolean, default: true }
```

#### rootDroppable

```ts
{ type: Boolean, default: true }
```

#### ondragstart

```ts
{
  type: Function as PropType<(store: Store3) => boolean>
}
```

**`ondragend` supports promise, but `ondragstart` does not.**

#### ondragend

```ts
{
  type: Function as PropType<(store: Store3) => boolean>
}
```

**`ondragend` supports promise, but `ondragstart` does not.**

#### afterPlaceholderCreated

```ts
(placeholder: HTMLElement, store: Store3) => void
```

#### placeholderMaxHeight

```ts
{ type: Number, default: 100 }
```

#### unfoldWhenDragover

```ts
{ type: Boolean, default: true }
```

#### unfoldWhenDragoverDelay

```ts
{ type: Number, default: 80 }
```

#### isNodeUnfoldable

```ts
{
type: Function as PropType<(store: Store3) => boolean>,
}
```

#### draggingNodePositionMode

```ts
{
type: String as PropType<PositionMode>,
default: "top_left_corner",
}
```

#### preventTextSelection

```ts
{ type: Boolean, default: true }
```

#### edgeScroll

```ts
{
  type: Boolean
}
```

#### edgeScrollTriggerMargin

```ts
{ type: Number, default: 50 }
```

#### edgeScrollSpeed

```ts
{ type: Number, default: 0.35 }
```

#### edgeScrollTriggerMode

```ts
{
type: String as PropType<PositionMode>,
default: "top_left_corner",
}
```

#### edgeScrollSpecifiedContainerX

```ts
HTMLElement | ((store: Store3) => HTMLElement)
```

#### edgeScrollSpecifiedContainerY

```ts
HTMLElement | ((store: Store3) => HTMLElement)
```

### data

#### draggingNode

```ts
Node | null
```

#### store

Runtime data of drag and drop.

```ts
Store3 | null
```

### events

#### drag

Emit when drag start.

```ts
(store: Store3)
```

#### before-first-move

Same with `drag`

```ts
(store: Store3)
```

#### drop

Emit when drag end. Emit to drag start/source tree.

```ts
(store: Store3)
```

#### drop-into

Emit when drag end. Emit to drag end/target tree.

```ts
(store: Store3)
```

#### drop-change

Emit when the tree changed by drag. Emit to both drag start and end tree.

```ts
(store: Store3)
```

### methods

#### isParentDragging

```ts
(node: Node): boolean;
```

## Other

### Draggable

The Vue instance(vm) of the Draggable component.

### eachDraggableFunc

```ts
;(node: Node | undefined, store: Store3, options: Options2, vm: Draggable) =>
  boolean | undefined
```

### PositionMode

```ts
'top_left_corner' | 'mouse'
```

### Store3

Runtime data of drag and drop.

```ts
interface {
  // Store
  movedCount: number;
  listenerElement: HTMLElement;
  directTriggerElement: HTMLElement;
  triggerElement: HTMLElement;
  startEvent: MouseOrTouchEvent;
  moveEvent: MouseOrTouchEvent;
  endEvent: MouseOrTouchEvent;
  mouse: EventPosition;
  initialMouse: EventPosition;
  move: EventPosition2;
  movedOrClonedElement: HTMLElement;
  movedElement: HTMLElement;
  initialPosition: EventPosition2;
  initialPositionRelativeToViewport: EventPosition2;
  updateMovedElementStyle: () => void;
  _isMovingElementCloned: boolean;
  // Store2
  startTreeEl: HTMLElement;
  targetTreeEl: HTMLElement;
  placeholder: HTMLElement;
  // Store3
  startTree: Draggable;
  targetTree: Draggable;
  draggingNode: Node;
  startPath: {
      tree: Draggable;
      parent?: Node;
      index: number;
  };
  targetPath: Store3["startPath"]; // same to startPath
  placeholderLevel: number;
  placeholderPrevNode?: Node;
  placeholderPrevNodeInTree?: Node;
  dragChanged?: boolean;
  isCloned?: boolean;
}
```

### EventPosition

```ts
{
  x: number, y: number,
  pageX: number,
  pageY: number,
  clientX: number,
  clientY: number,
  screenX: number,
  screenY: number
}
```

### EventPosition2

```ts
{
  x: number
  y: number
}
```

### obj

```ts
{
  string: unknown
}
```

### BaseNode

```ts
{
    $id: string | number;
    $pid?: string | number;
    $level: number;
    $hidden?: boolean;
    $folded?: boolean;
    $checked?: boolean | 0;
    $children: Node[];
    $childrenLoading?: boolean;
    $childrenLoadStaus?: {
      status: 'success'|'error',
      error: Error
    };
    $draggable?: boolean;
    $droppable?: boolean;
    $nodeStyle?: string | Record<string, string> | unknown;
    $nodeClass?: string | unknown;
    $outerStyle?: string | Record<string, string> | unknown;
    $outerClass?: string | unknown;
}
```

### Node

```ts
obj & BaseNode
```
