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

折叠节点时触发.

```ts
(node: Node)
```

#### unfold

打开节点时触发.

```ts
(node: Node)
```

#### load-children

针对子节点延迟加载. 加载子节点时触发.

```ts
(node: Node)
```

#### load-children-success

针对子节点延迟加载. 加载子节点成功时触发.

```ts
(node: Node)
```

#### load-children-error

针对子节点延迟加载. 加载子节点失败时触发. 通过`node.$childrenLoadStaus.error`获取错误信息.

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

拖拽树组件. 继承于 BaseTree.

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

方法类型是 [eachDraggableFunc](#eachDraggableFunc)

#### eachDroppable

```ts
{
  type: [Boolean, Function]
}
```

方法类型是 [eachDraggableFunc](#eachDraggableFunc)

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

**`ondragend` 支持 promise, 但 `ondragstart` 不支持.**

#### ondragend

```ts
{
  type: Function as PropType<(store: Store3) => boolean>
}
```

**`ondragend` 支持 promise, 但 `ondragstart` 不支持.**

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

拖拽过程中的相关数据.

```ts
Store3 | null
```

### events

#### drag

拖拽开始时触发.

```ts
(store: Store3)
```

#### before-first-move

与`drag`相同并同时触发.

```ts
(store: Store3)
```

#### drop

拖拽结束时触发. 触发到拖拽开始树.

```ts
(store: Store3)
```

#### drop-into

拖拽结束时触发. 触发到拖拽目标树(如果拖拽开始的树和结束的不是同一颗树, 即跨树).

```ts
(store: Store3)
```

#### drop-change

拖拽结束时触发. 同时触发到拖拽开始和目标树.

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

Draggable 组件的 Vue 实例(vm).

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

拖拽过程中的相关数据.

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
