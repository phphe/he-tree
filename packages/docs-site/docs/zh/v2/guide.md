# 使用指南

## 安装

```sh
# Vue3
npm i --save @he-tree/vue
# Vue2
npm i --save @he-tree/vue @vue/composition-api
```

### CDN

- Vue3: [example](https://github.com/phphe/he-tree/blob/dev/examples/iife/vue3.html)
- Vue2: [example](https://github.com/phphe/he-tree/blob/dev/examples/iife/vue2.html)

## 引入

### Vue3

```ts
import { BaseTree, Draggable } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
```

### Vue2

```ts
import { BaseTree, Draggable } from '@he-tree/vue/vue2'
import '@he-tree/vue/style/default.css'
```

`BaseTree` 是基础树组件. `Draggable` 组件继承于 `BaseTree`.

## 示例

### 示例项目

- [he-tree + Vue3 + Vite + Typescript](https://github.com/phphe/he-tree/blob/dev/examples/example-vue3/)
- [he-tree + Vue2 + vue-cli + Typescript](https://github.com/phphe/he-tree/blob/dev/examples/example-vue2/)

### 基础

<!-- code & demo -->

```vue
<template>
  <BaseTree v-model="treeData" />
</template>

<script>
  import { BaseTree, Draggable, pro } from '@he-tree/vue'
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
                children: [
                  {
                    text: 'Vue',
                    children: [
                      {
                        text: 'Nuxt',
                      },
                    ],
                  },
                  {
                    text: 'React',
                    children: [
                      {
                        text: 'Next',
                      },
                    ],
                  },
                  {
                    text: 'Angular',
                  },
                ],
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
  }
</script>
```

### 折叠与勾选框

<!-- code & demo -->

```vue
<template>
  <div>
    Checked: {{ checked }}
    <BaseTree v-model="treeData" ref="tree" @check:node="onCheckNode">
      <template #default="{ node, stat }">
        <button @click="stat.open = !stat.open">
          {{ stat.open ? '-' : '+' }}
        </button>
        <input type="checkbox" v-model="stat.checked" />
        {{ node.text }}
      </template>
    </BaseTree>
  </div>
</template>

<script>
  import { BaseTree, Draggable, pro } from '@he-tree/vue'
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
                children: [
                  {
                    text: 'Vue',
                    children: [
                      {
                        text: 'Nuxt',
                      },
                    ],
                  },
                  {
                    text: 'React',
                    children: [
                      {
                        text: 'Next',
                      },
                    ],
                  },
                  {
                    text: 'Angular',
                  },
                ],
              },
              {
                text: 'Backend',
              },
            ],
          },
          { text: 'Photos' },
          { text: 'Videos' },
        ],
        checked: [],
      }
    },
    methods: {
      onCheckNode() {
        this.checked = this.$refs.tree.getChecked().map((v) => v.data.text)
      },
    },
  }
</script>
```

仅提供折叠与勾选的逻辑, 你需要通过 Vue 插槽传入你自己的样式代码. 其中`stat.checked` 有 3 个值:`true, false, null`. `null`表示子级部分选中, 你可以用其确定半选状态. 相关方法: [getChecked](api.md#getChecked), [getUnchecked](api.md#getUnchecked), [updateCheck](api.md#updateCheck), [openAll](api.md#openAll), [closeAll](api.md#closeAll), [isVisible](api.md#isVisible).

### 拖拽

<!-- code & demo -->

```vue
<template>
  <Draggable v-model="treeData" />
</template>

<script>
  import { BaseTree, Draggable, pro } from '@he-tree/vue'
  import '@he-tree/vue/style/default.css'

  export default {
    components: { Draggable },
    data() {
      return {
        treeData: [
          {
            text: 'Projects',
            children: [
              {
                text: 'Frontend',
                children: [
                  {
                    text: 'Vue',
                    children: [
                      {
                        text: 'Nuxt',
                      },
                    ],
                  },
                  {
                    text: 'React',
                    children: [
                      {
                        text: 'Next',
                      },
                    ],
                  },
                  {
                    text: 'Angular',
                  },
                ],
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
  }
</script>
```

## 节点缩进

不要用 css 设置节点缩进, 而是用 prop [indent](api.md#indent).

## 数据

数据为树形数据, 不支持平面数据. 平面数据需要你自行转换. 其中键名`children`可以通过 prop [childrenKey](api.md#childrenKey)修改, `text`可以通过 prop [textKey](api.md#textKey)修改. 例如:

```js
{
  text: 'Root',
  children: [
    {text: 'Child'}
  ]
}
```

## 数据更新(内部行为)

可以使用`v-model`绑定数据. 本组件会复制数据对象作为内部数据. 当内部数据变动时, 例如拖拽时, 有 3 种方式提交新数据到外部. 默认情况下直接修改绑定的数据对象. 通过 prop [updateBehavior](api.md#updateBehavior)设置. updateBehavior 的值:

- modify: 直接修改绑定的数据对象.
- new: 提交一个新的数据对象, 适用于 vuex.
- disabled: 不提交. 你可以使用[getData](api.md#getData)方法手动生成并获取当前数据.

## 数据修改(外部操作)

绑定的数据对象由外部改变时, 组件内部将会为每一个节点创建[stat](api.md#stat)对象, 用来存储相关信息, 如 `open`, `parent`, `children`, `level`. 可通过钩子 prop [statHandler](api.md#statHandler) 在 stat 创建之后修改每一个 stat. 相关 data: [stats](api.md#stats), [statsFlat](api.md#statsFlat).

操作数据的方法: [getStat](api.md#getStat), [has](api.md#has), [updateCheck](api.md#updateCheck), [getChecked](api.md#getChecked), [getUnchecked](api.md#getUnchecked), [openAll](api.md#openAll), [closeAll](api.md#closeAll), [isVisible](api.md#isVisible), [move](api.md#move), [add](api.md#add), [addMulti](api.md#addMulti), [remove](api.md#remove), [removeMulti](api.md#removeMulti), [iterateParent](api.md#iterateParent), [getSiblings](api.md#getSiblings), [getData](api.md#getData).

## 虚拟列表

<!-- code & demo -->

```vue
<template>
  <Draggable v-model="treeData" virtualization style="height: 500px" />
</template>

<script>
  import { BaseTree, Draggable, pro } from '@he-tree/vue'
  import '@he-tree/vue/style/default.css'

  export default {
    components: { Draggable },
    data() {
      return {
        treeData: [
          {
            text: 'Projects',
            children: [
              {
                text: 'Frontend',
                children: [
                  {
                    text: 'Vue',
                    children: [
                      {
                        text: 'Nuxt',
                      },
                    ],
                  },
                  {
                    text: 'React',
                    children: [
                      {
                        text: 'Next',
                      },
                    ],
                  },
                  {
                    text: 'Angular',
                  },
                ],
              },
              {
                text: 'Backend',
              },
            ],
          },
          { text: 'Photos' },
          { text: 'Videos' },
          ...new Array(1000).fill(1).map((v) => ({
            text: 'Node-' + Math.random().toString().substring(2, 5),
          })),
        ],
      }
    },
  }
</script>
```

使用虚拟列表时需要给树或其父元素设置高度, 否则会自动扩展高度为最大. 相关 props: [virtualization](api.md#virtualization), [virtualizationPrerenderCount](api.md#virtualizationPrerenderCount)

虚拟列表由我的另一个库`virtual-list`实现. [virtual-list](https://github.com/phphe/virtual-list).

## 默认展开所有节点

相关 props: [defaultOpen](api.md#defaultOpen)

## 从右到左显示

相关 props: [rtl](api.md#rtl)

## 从下到上显示

相关 props: [btt](api.md#btt)

<!-- code & demo -->

```vue
<template>
  <BaseTree v-model="treeData" btt />
</template>

<script>
  import { BaseTree, Draggable, pro } from '@he-tree/vue'
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
                children: [
                  {
                    text: 'Vue',
                    children: [
                      {
                        text: 'Nuxt',
                      },
                    ],
                  },
                  {
                    text: 'React',
                    children: [
                      {
                        text: 'Next',
                      },
                    ],
                  },
                  {
                    text: 'Angular',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  }
</script>
```

## 渲染为表格

<!-- code & demo -->

```vue
<template>
  <BaseTree v-model="treeData" table>
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
        <button @click="stat.open = !stat.open">
          {{ stat.open ? '-' : '+' }}
        </button>
      </td>
      <td :style="indentStyle">
        {{ node.text }}
      </td>
      <td>
        {{ stat.level }}
      </td>
    </template>
  </BaseTree>
</template>

<script>
  import { BaseTree, Draggable, pro } from '@he-tree/vue'
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
                children: [
                  {
                    text: 'Vue',
                    children: [
                      {
                        text: 'Nuxt',
                      },
                    ],
                  },
                  {
                    text: 'React',
                    children: [
                      {
                        text: 'Next',
                      },
                    ],
                  },
                  {
                    text: 'Angular',
                  },
                ],
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
  }
</script>
```

支持虚拟列表与表格同时工作. 相关 props: [table](api.md#table). 通过插槽 [prepend](api.md#prepend), [append](api.md#append) 添加表头和表底部.
表格拖拽为高级功能, 需购买[pro](../pro.md)启用.

## 拖拽相关

### 自定义触发拖拽的元素

相关 props: [triggerClass](api.md#triggerClass)

### 拖拽控制/可拖拽/可拖放

可通过节点[stat](api.md#Stat)控制每个节点. 也可通过钩子函数控制.
相关 props: [disableDrag](api.md#disableDrag), [disableDrop](api.md#disableDrop), [eachDraggable](api.md#eachDraggable), [eachDroppable](api.md#eachDroppable), [rootDroppable](api.md#rootDroppable), [maxLevel](api.md#maxLevel)

### 拖拽时限制最大层数/深度

相关 props: [maxLevel](api.md#maxLevel)

### 拖拽到节点上时打开该节点

当把节点拖动到一个折叠节点上时, 默认会打开此节点以便拖入其中. 可通过 prop [dragOpen](api.md#dragOpen)控制. 可通过 prop [dragOpenDelay](api.md#dragOpenDelay)设置等待时间. 钩子 prop: [beforeDragOpen](api.md#beforeDragOpen)

### 占位元素

拖拽时, 会生成一个元素默认淡蓝色背景, 用以标识可放置的位置. 使用插槽`placeholder`控制它, 例如添加提示文字.

拖拽时, 如果离开树, 占位元素将会被删掉, 如果此时停止拖拽, 树将恢复原状. 通过 prop [keepPlaceholder](api.md#keepPlaceholder)可使占位元素在拖拽结束前一直保留.

### 拖拽时相关信息

拖拽时相关信息不在事件或钩子函数的参数里, 而是暴露为一个对象 [dragContext](api.md#dragContext).

```ts
// vue3
import { dragContext } from '@he-tree/vue'
// vue2
import { dragContext } from '@he-tree/vue/vue2'
```

### 外部拖入

外部拖入指外部的信息通过 Drag and Drop API 拖入树内. 可以通过钩子 props: [onExternalDragOver](api.md#onExternalDragOver), [externalDataHandler](api.md#externalDataHandler) 处理这一情况. 以此可实现与任何组件通过 Drag and Drop API 互通.

## 触摸 & 移动设备

此组件基于 HTML5 Drag and Drop API, 所以在支持 Drag and Drop API 到移动设备上也能工作. 如果不支持, 可以尝试使设备兼容 Drag and Drop API 的库.

## 水印

此组件会在浏览器控制台输出一条水印信息. 可使用 prop [watermark](api.md#watermark)关闭.

## Pro

[pro](../pro.md) 有以下高级功能.

- 跨树拖拽.
- 拖拽开始时克隆原节点而不是移动原节点.
- 可拖拽表格.

  详情[请点击](../pro.md).
