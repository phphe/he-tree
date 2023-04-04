# API

`he-tree`导出两个组件, [BaseTree](#basetree) 和 [Draggable](#draggable). BaseTree 是基础组件. Draggable 继承于前者, 包含拖拽功能. 下文中的内容根据此粗略地分成了两部分.

下文中的`Stat<never>`, `Stat<unknown>`是 TypeScript 的类型格式. 其中的`unknown`, `never`, `any`基本都是指使用者提供的节点数据类型. `Stat<never>`和`Stat<unknown>`是一样的, 表示使用者的节点数据的[stat](#Stat).

下文中的所有坐标原点是窗口左上角. 如`Element.getBoundingClientRect()`返回的坐标.

## BaseTree

### props

#### btt

```js
{ type: Boolean, default: false }
```

由下向上显示.

#### childrenKey

```js
{ type: String, default: "children" }
```

指定数据中的`children` key

#### defaultOpen

```js
{ type: Boolean, default: true }
```

默认展开所有节点.

#### indent

```js
{ type: Number, default: 20 }
```

节点缩进像素.

#### nodeKey

使用 index 或者返回一个唯一值作为 Vue 循环的 key。

```js
{ type:  "index" | ((stat: Stat<any>, index: number) => any), default: 'index' }
```

#### rtl

```js
{ type: Boolean, default: false }
```

由右向左显示.

#### statHandler

```js
{ type: (stat: Stat<any>) => Stat<any> }
```

钩子函数. 数据初始时处理每一个[stat](#Stat).

#### table

```js
{ type: Boolean, default: false }
```

渲染为表格.

#### textKey

```js
{ type: String, default: "text" }

```

指定数据中的`text` key. 默认模板会显示它. 如果你通过插槽自定义了节点, 这个可能就不需要了.

#### updateBehavior

当内部数据变动时, 更新到外部的方式.

- modify: 默认. 直接修改绑定的数据对象.
- new: 提交一个新的数据对象, 适用于 vuex.
- disabled: 不提交. 你可以使用[getData](api.md#getData)方法手动生成并获取当前数据.

#### virtualization

```js
{ type: Boolean, default: false }
```

启用虚拟列表.

#### virtualizationPrerenderCount

```js
{ type: Number, default: 20 }
```

虚拟列表初始渲染数量.用于 SSR(服务端渲染).

#### watermark

```js
{ type: Boolean, default: true }
```

向浏览器控制台输出一条水印信息.

### data

#### dragNode

拖拽时的节点 stat.

#### dragOvering

有东西拖拽到了此树上.

#### self

此树实例, 即`this`.

#### stats

```ts
type 类型 = Stat<你的节点类型>[]
```

所有 stats, 树形结构.

#### statsFlat

```ts
type 类型 = Stat<你的节点类型>[]
```

所有 stats, 扁平结构.

### computed

#### rootChildren

```ts
type 类型 = Stat<你的节点类型>[]
```

树的第一级节点的数组的 stats。可以看作不存在的根节点的子集。

### methods(方法)

#### methods examples

一些方法的例子，点击右上角图标查看源码。

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
        alert(`已经输出结果到浏览器控制台，请检查`)
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

增加节点. parent 为 null 时代表根节点. [示例](#methods-examples)

#### addMulti

```ts
(
  dataArr: any[],
  parent?: Stat<any> | null,
  startIndex?: number | null
): void;
```

增加多个连续节点. parent 为 null 时代表根节点. [示例](#methods-examples)

#### batchUpdate

```ts
(task: () => any): void;
```

操作数据时, 会导致组件内部提交整个树的新数据. 此方法可以合并多个操作, 从而只提交一次. [示例](#methods-examples)

#### closeAll

```ts
(): void
```

折叠所有节点. [示例](#methods-examples)

#### getChecked

```ts
(withDemi?: boolean | undefined): Stat<unknown>[]
```

获取所有勾选的节点 stat. 参数`withDemi`表示是否包含半选的节点(后代节点未完全选中). [示例](#methods-examples)

#### getData

```ts
(filter?: ((data: never) => never) | undefined, root?: Stat<never> | undefined): never[];
```

生成并获取当前树的树形数据. 移除了 stat. 参数`filter`可以对每个数据进行处理. [示例](#methods-examples)

#### getRootEl

```ts
(): HTMLElement;
```

获取当前树的根元素.

#### getSiblings

```ts
(stat: Stat<never>): Stat<never>[];
```

获取一个节点的同级.

#### getStat

```ts
(nodeData: unknown): Stat<unknown>
```

根据节点数据获取节点的`stat`.

#### getUnchecked

```ts
(withDemi?: boolean | undefined): Stat<unknown>[]
```

获取所有未勾选的节点 stat. 参数`withDemi`表示是否包含半选的节点(后代节点未完全选中).

#### has

```ts
(nodeData: unknown): boolean
```

判断此树是否包含对应节点数据的`stat`.

#### isVisible

```ts
(statOrNodeData: Stat<unknown>|unknown): boolean;
```

判断节点是否可见. 如果父级折叠, 则后代不可见. 参数可以是节点数据或 stat.

#### iterateParent

```ts
(stat: Stat<unknown>, opt?: {
    withSelf: boolean;
} | undefined): Generator<Stat<unknown>, void, unknown>;
```

遍历节点的父级. 参数`opt.withSelf`表示是否包含该节点. 例:

```ts
for (const parentStat of tree.iterateParent(nodeStat, { withSelf: false })) {
  //
}
```

#### move

```ts
(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): boolean;
```

移动节点. parent 为 null 时代表根节点. 参考`add`的例子：[示例](#methods-examples)

#### openAll

```ts
(): void
```

展开所有节点. [示例](#methods-examples)

#### remove

```ts
(stat: Stat<unknown>): boolean;
```

删除节点.

#### removeMulti

```ts
(dataArr: any[]): boolean;
```

删除多个节点.

#### updateCheck

```ts
(): void
```

从末端到根, 重新计算每个节点的勾选状态.

### events(事件)

#### check:node

参数: stat. 节点勾选状态改变时触发.

#### click:node

参数: stat. 点击节点时触发.

#### close:node

参数: stat. 折叠节点时触发.

#### open:node

参数: stat. 展开节点时触发.

### slots(插槽)

#### default(默认插槽)

用来自定义节点样式. 参数:

- node: 节点数据
- stat: 节点内部信息
- indentStyle: 节点缩进样式. 仅当渲染为表格时需要使用者将其应用到某列上, 一般是第一列.
- tree: 树的实例.

#### placeholder

占位元素内部. 可以用来添加提示性文字. 参数:

- tree: 树的实例.

#### prepend

树的根元素内开始处. 仅用于渲染为表格时添加表头(thead). 参数:

- tree: 树的实例.

#### append

树的根元素内结束前. 仅用于渲染为表格时添加表底部(tfoot). 参数:

- tree: 树的实例.

## Draggable

### props

#### beforeDragOpen

```ts
(stat: Stat<any>) : void | Promise<void>
```

钩子函数. 拖动到节点上层时打开节点前执行. 可以返回 Promise.

#### disableDrag

```js
{
  type: Boolean
}
```

禁用此树的**拖出**功能.

#### disableDrop

```js
{
  type: Boolean
}
```

禁用此树的**拖入**功能.

#### dragOpen

```js
{ type: Boolean, default: true }
```

拖动到节点上层时是否打开节点.

#### dragOpenDelay

```js
{ type: Number, default: 0 }
```

拖动到节点上层时打开节点前的等待的毫秒.

#### eachDraggable

```ts
(stat: Stat<any>) : boolean | null
```

钩子函数. 设置每个节点是否可**拖动**. 子级如果没有指定, 会继承父级的值.

#### eachDroppable

```ts
(stat: Stat<any>) : boolean | null
```

钩子函数. 设置每个节点是否可**拖入**. 子级如果没有指定, 会继承父级的值.

#### externalDataHandler

```ts
(event: DragEvent) : any
```

当外部使用 Drag and Drop API 拖拽到树上层并结束拖拽时发生. 用来告知树此次拖拽应该接收的数据.

#### keepPlaceholder

```ts
{ type: Boolean, default: false }
```

拖拽离开树时是否保留占位元素.

#### maxLevel

```ts
{
  type: Number
}
```

拖拽时的最大层级数. 如果拖拽将导致树超过此层数, 则会阻止**拖放**.

#### onExternalDragOver

```ts
(event: DragEvent) : boolean
```

当外部使用 Drag and Drop API 拖拽到树上层时发生. 参数 event 是 Drag and Drop API 原生事件`dragover`的事件对象. 返回布尔值判断是否处理该事件.

#### resolveStartMovePoint

```ts
"mouse" | "default" | ((dragElement: HTMLElement) : Point)
```

拖动节点将被看做一个点. 拖动开始时如何获取拖动点的坐标. 默认获取节点的左上角. `mouse`表示使用鼠标坐标. 或者传入函数返回自定义坐标: `{x:number,y:number}`.

#### rootDroppable

```ts
boolean | () : boolean
```

钩子函数. 设置最高级(根)是否可**拖入**. 默认`true`.

#### triggerClass

```js
{
  type: [String, Array]
} // string | string[]
```

触发拖拽的元素样式. 默认是节点本身. 可以设置成节点的某个子元素. 支持多个样式.

### methods(方法)

#### getNodeByElement

```ts
(el: HTMLElement): Stat<any> | null
```

根据 HTML 元素获取节点 stat.

#### isDraggable

```ts
(node: Stat<any>): boolean
```

判断节点是否可拖动.

#### isDroppable

```ts
(node: Stat<any>): boolean
```

判断节点是否可**拖入**.

### events(事件)

#### after-drop

参数: 无. 拖拽完成时触发. 跨树时, 仅在**拖入**的树触发.

#### change

参数: 无. 拖拽完成且造成改变时触发. 跨树时, 两棵树都会触发.

#### enter

参数: DragEvent. 拖拽进入树元素边界时触发.

#### leave

参数: DragEvent. 拖拽离开树元素边界时触发.

## Others

### Stat

组件内部将会为每一个节点创建 stat 对象, 用了存储运行时数据.

```ts
{
  [x: string]: any // 可以向stat附加任何键值
  data: T // 指向对应的节点数据
  open: boolean // 是否展开
  parent: Stat<T> | null // 父级节点stat
  children: Stat<T>[] // 子级节点
  level: number // 层级. 层级从1开始.
  isStat: boolean // 是否是stat对象
  hidden: boolean // 是否隐藏
  checked: boolean | 0 // 是否勾选. 0表示后代节点部分勾选
  draggable: boolean | null // 是否可拖动. null表示继承父级.
  droppable: boolean | null // 是否可拖入. null表示继承父级.
  style: any // 自定义样式. 支持Vue的style格式.
  class: any // 自定义样式类. 支持Vue的class格式.
}
```

### dragContext

拖拽时的相关信息对象，[例子](#example---dragcontext). 包括属性: startInfo, targetInfo, dragNode, startTree, targetTree. 引入:

```ts
// vue3
import { dragContext } from '@he-tree/vue'
// vue2
import { dragContext } from '@he-tree/vue/vue2'
```

#### startInfo

类型: [StartInfo](#StartInfo). 拖拽开始的信息.

#### targetInfo

类型: [StartInfo](#StartInfo). 拖拽的目标的信息.

#### dragNode

类型: [Stat](#Stat). 拖拽的节点.

#### startTree

Draggable 组件实例. 拖拽的起始树.

#### targetTree

Draggable 组件实例. 拖拽的目标树.

#### Example - dragContext

在[eachDroppable](#eachdroppable)中通过 dragContext 获取 dragNode，达成效果：奇数节点只接收奇数节点，偶数节点只接收偶数节点。

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
  tree: DraggableTreeType; // Draggable组件的实例
  dragNode: Stat<any>; // 拖拽节点
  parent: Stat<any> | null; // 拖拽节点父级
  siblings: Stat<any>[]; // 拖拽节点同级
  indexBeforeDrop: number; // 拖拽节点在拖拽结束前的索引
}
```
