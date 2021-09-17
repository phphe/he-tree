# Guide

**使用 Vue2 时把下面文档的 3 替换为 2.**

## 安装

```sh
# Vue3
npm i -P @he-tree/vue3
# Vue2
npm i -P @he-tree/vue2
```

## 引入

```ts
import { BaseTree, Draggable, obj, BaseNode, Node } from '@he-tree/vue3'
import '@he-tree/vue3/dist/he-tree-vue3.css'
```

## 不要给节点设置外边距

你可能需要设置节点之间的距离, 不要使用`margin-bottom`来实现. 否则组件不能得到节点的真实高度. 使用 prop `gap` 替代.

## treeData 或 flatData

该组件可以传入树形数据或扁平数据. 传入树形数据(treeData)时, 需指定 `childrenKey`. 传入扁平数据(flatData)时, 需指定 `idKey`, `parentIdKey`.

`treeData` 示例:

```ts
treeData = [
  {
    text: 'node1',
    children: [{ text: 'node1-1' }, { text: 'node1-2' }, { text: 'node1-3' }],
  },
  { text: 'node2' },
]
```

`flatData` 示例:

```ts
flatData = [
  { text: 'node1', id: 1 },
  { text: 'node2', id: 2 },
  { text: 'node1-1', id: 3, pid: 1 },
  { text: 'node1-2', id: 3, pid: 1 },
  { text: 'node1-3', id: 3, pid: 1 },
]
```

## HTML 结构

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

**该组件渲染为列表而不是树形结构. 不同层级的节点有不同的 `padding-left`.** 参考此结构, 你可以做下面的事:

- 设置 `node.$outerClass` 和 `node.$outerStyle`来控制 tree-node-outer 元素 的 class 和 style.
- 设置 `node.$nodeClass` 和 `node.$nodeStyle`来控制 tree-node 元素 的 class 和 style.
- 使用默认插槽来定制节点外观. 该插槽参数: node, tree.

## 使用

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

## 输出数据

使用方法 `outputNestedData` 和 `outputFlatData` 以获得树形数据或扁平数据.

## 折叠和展开

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

## 按需加载子节点

展开节点时加载其子节点数据. 例如通过 Ajax. 使用 prop `childrenLazyLoading` 启用. prop `childrenLoader` 是加载时调用的方法, 可以返回 `Promise`, 返回的数据只能是树形数据.

## 默认折叠所有节点

使用 prop `defaultFolded` 控制.

## 勾选框

使用方法 `getAllCheckedNodes` 以获得所有勾选的节点.

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

从右到左显示. 使用 prop `rtl` 控制.

## 虚拟列表

此功能可以在有许多节点时提高渲染性能. 使用 prop `virtualization` 启用. 使用 prop `virtualizationPrerender` 设置开始时显示的节点数量.

## 拖拽

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

## 拖拽触发

使用 prop `triggerClass` 指定触发拖拽的元素的 css class. 当 prop `triggerBySelf` 为 true 时, 它的子元素将不能触发拖拽.

## 阻止拖拽

- 当 prop `draggable` 为 false, 此树的任一节点不能被拖拽.
- 使用 prop `eachDraggable` 在拖拽开始时.
- 当 prop `rootDraggable` 为 false, 顶级节点(level 1) 不能被拖拽.
- 使用 prop `ondragstart` 在拖拽开始时.
- 设置 `node.$draggable` 为 false 控制单个节点是否可拖拽.
- 当父节点不可拖拽而子节点可拖拽时, 例如设置 子节点的 `$draggable` 为 true, 子节点可以拖拽.

## 阻止放入

- 当 prop `droppable` 为 false, 任一节点不能放入这棵树.
- 使用 prop `eachDroppable` 当拖动到一节点上时.
- 当 prop `rootDroppable` 为 false, 被拖拽的节点不能成为顶级节点.
- 使用 prop `ondragend` 在拖拽结束时, 若返回 false, 则恢复拖拽前的原状.
- 设置 `node.$droppable` 为 false 控制单个节点是否可放入.
- 当父节点不可放入而子节点可放入时, 例如设置子节点的 `$droppable` 为 true, 则此子节点可放入.

## 拖拽过程中的运行时数据

参考 [`tree.store`](api.md#store)

## 占位元素

拖拽时, 会生成一个元素默认淡青色背景, 用以标识可放置的位置. 使用 prop `afterPlaceholderCreated` 修改它. 如果想操作此元素比如添加文字, 只能通过原生 js 操作.

## 拖拽到节点上时打开该节点

当把节点拖动到一个折叠节点上时, 默认会打开此节点以便拖入其中. 可通过 prop `unfoldWhenDragover`控制. 相关 prop: [unfoldWhenDragoverDelay](api.md#unfoldWhenDragoverDelay)

## 拖拽节点的定位

默认使用拖拽节点的左上角坐标来定位, 也可以设置使用鼠标位置来定位. [draggingNodePositionMode](api.md#draggingNodePositionMode)

## 边缘滚动

这是属于拖拽插件的功能. 如果树处在一个滚动框中, 拖拽到其边缘时需要自动滚动. 此项默认关闭, 使用 prop`edgeScroll`开启. 相关 prop: [edgeScrollTriggerMargin](api.md#edgeScrollTriggerMargin), [edgeScrollSpeed](api.md#edgeScrollSpeed), [edgeScrollTriggerMode](api.md#edgeScrollTriggerMode).

## 触摸

支持触摸设备. 触摸拖拽时将会阻止默认行为, 但是有时无效. 所以请添加如下 css 阻止触摸时的默认行为例如滚动屏幕. css 目标是触发拖拽的元素. 如果未特别指定触发拖拽的元素, 则由`tree-node`触发.

```css
touch-action: none;
```

## Pro 插件(需购买)

[pro 插件](/pro-plugin) 有以下高级功能.

- 跨树拖拽.
- 拖拽开始时克隆原节点而不是移动原节点.

## 通过 script 标签引入

从 npm 下载最新版本, 上传 `dist` 文件夹到你的服务器.

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

通过全局变量 `heTreeVue3` 或 `heTreeVue2` 访问此库.
