# Guide

## Installation

```sh
# Vue3
npm i --save @he-tree/vue
# Vue2
npm i --save @he-tree/vue @vue/composition-api
```

## CDN

- Vue3: [example](https://github.com/phphe/he-tree/blob/dev/examples/iife/vue3.html)
- Vue2: [example](https://github.com/phphe/he-tree/blob/dev/examples/iife/vue2.html)

## Import

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

`BaseTree` is the base tree component. `Draggable` component extends `BaseTree`.

## Examples

### Example Projects

- [he-tree + Vue3 + Vite + Typescript](https://github.com/phphe/he-tree/blob/dev/examples/example-vue3/)
- [he-tree + Vue2 + vue-cli + Typescript](https://github.com/phphe/he-tree/blob/dev/examples/example-vue2/)

### Basic

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

### Fold and Checkbox

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

Only function provided, you need add your own ui by slot. `stat.checked` has 3 value:`true, false, 0`. `0` mean only some child checked. When the parent node is checked, all child nodes will be checked. When all child nodes are checked, the parent node will be checked. When some child nodes are checked, the checked value of the parent node becomes 0. If you need other checkbox logic, don't stick to the "checked" attribute. You can add another attribute to the node to achieve it. Related methods: [getChecked](api.md#getChecked), [getUnchecked](api.md#getUnchecked), [updateCheck](api.md#updateCheck), [openAll](api.md#openAll), [closeAll](api.md#closeAll), [isVisible](api.md#isVisible).

### Drag and Drop

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

## Indent

Don't set node indent by css. Use prop [indent](api.md#indent).

## Data

Follow is example data. Key `children` can be modified by prop [childrenKey](api.md#childrenKey), `text` can be modified by prop [textKey](api.md#textKey).

```js
{
  text: 'Root',
  children: [
    {text: 'Child'}
  ]
}
```

## Data update by component

`v-model` works. The component will clone data as inner data. When inner data changed, there are 3 ways to emit new data. It modifies binded data directly by default. Use prop [updateBehavior](api.md#updateBehavior) to set the new data emit behavior. Available values of updateBehavior:

- modify: modify binded data.
- new: emit new data, suit for vuex.
- disabled: don't do anything. You can use [getData](api.md#getData) method to generate and get new data when you want.

## Data update by user

The component creates [stat](api.md#stat) object for every node. It stores runtime info, such as `open`, `parent`, `children`, `level`. You can use prop [statHandler](api.md#statHandler) handle each stat after they created. Related data: [stats](api.md#stats), [statsFlat](api.md#statsFlat).

The methods to handle data: [getStat](api.md#getStat), [has](api.md#has), [updateCheck](api.md#updateCheck), [getChecked](api.md#getChecked), [getUnchecked](api.md#getUnchecked), [openAll](api.md#openAll), [closeAll](api.md#closeAll), [isVisible](api.md#isVisible), [move](api.md#move), [add](api.md#add), [addMulti](api.md#addMulti), [remove](api.md#remove), [removeMulti](api.md#removeMulti), [iterateParent](api.md#iterateParent), [getSiblings](api.md#getSiblings), [getData](api.md#getData).

## Virtual List

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

Set `height` or `max-height` fot tree or its parent, or it will not work.Related props: [virtualization](api.md#virtualization), [virtualizationPrerenderCount](api.md#virtualizationPrerenderCount)

Virtual list is implemented by another library of mine: [virtual-list](https://github.com/phphe/virtual-list).

## Iterate tree-data

Use `walkTreeData`

```js
// Vue3
import { walkTreeData } from '@he-tree/vue'
// Vue2
import { walkTreeData } from '@he-tree/vue/vue2'

walkTreeData(node, (node, index, parent) => {}, {
  childrenKey: 'children',
  reverse: false,
  childFirst: false,
})
```

Tree-data examples, `childrenKey` must be same with the data's:

```js
let treeData1 = { a: 1, children: [{ b: 1 }] }
let treeData2 = [{ a: 1, children: [{ b: 1 }] }, { c: 1 }]
let treeData3 = { a: 1, sub: [{ b: 1 }] }
```

Typescript type：

```ts
declare function walkTreeData<T extends Object>(
  obj: T | T[],
  handler: WalkTreeDataHandler<T>,
  opt?: WalkTreeDataOptions
): void
declare type WalkTreeDataHandler<T> = (
  node: T,
  index: number,
  parent: T | null,
  path: TreeDataPath
) => void | false | 'skip children' | 'skip siblings'
declare type WalkTreeDataOptions = {
  childrenKey?: string
  reverse?: boolean
  childFirst?: boolean
}
```

`WalkTreeDataHandler` return values:

- `false`: stop iterating
- `skip children`: skip current node's child nodes
- `skip siblings`: skip current node's siblings
- other values: no effect

`WalkTreeDataOptions`:

- `childrenKey`: `key` of tree-data's children, default `children`.
- `reverse`: iterate from last to first
- `childFirst`: iterate child node first

Example, find all level-2 nodes:

```js
let results = []
walkTreeData(tree.rootChildren, (stat) => {
  if (stat.level === 2) {
    results.push(stat)
    return `skip children`
  }
})
```

## Open all nodes by default

Related props: [defaultOpen](api.md#defaultOpen)

## Display from right to left

Related props: [rtl](api.md#rtl)

## Tree start from bottom to top

Related props: [btt](api.md#btt)

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

## Render as Table

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

Render as table and virtual list can work at the same time. Related props: [table](api.md#table). Use slot [prepend](api.md#prepend), [append](api.md#append) to add table head and foot.
Draggable table is pro feature, get [pro](../pro.md) to enable it.

## About Drag and Drop

### Drag Trigger Element

Related props: [triggerClass](api.md#triggerClass)

### Draggable and Droppable

Use [stat](api.md#Stat) to control draggable and droppable for each node. Also can be controled by hooks.
Related props: [disableDrag](api.md#disableDrag), [disableDrop](api.md#disableDrop), [eachDraggable](api.md#eachDraggable), [eachDroppable](api.md#eachDroppable), [rootDroppable](api.md#rootDroppable), [maxLevel](api.md#maxLevel)

### Max Level

Related props: [maxLevel](api.md#maxLevel)

### Drag Open

When drag over a node, it will be open by default. Use prop [dragOpen](api.md#dragOpen) to change it. Use prop [dragOpenDelay](api.md#dragOpenDelay) to set delay time. Hook prop: [beforeDragOpen](api.md#beforeDragOpen)

### Placeholder

It will use a light blue box to mark droppable position when drag. Use slot `placeholder` to customize it, such as add tips.

When drag leave tree, placeholder will be removed. Use prop [keepPlaceholder](api.md#keepPlaceholder) to keep placeholder even leave tree.

### Runtime info when drag

In drag process, runtime info is in an exported object [dragContext](api.md#dragContext).

```ts
// vue3
import { dragContext } from '@he-tree/vue'
// vue2
import { dragContext } from '@he-tree/vue/vue2'
```

### Drop from outside

When dropped from outside by Drag and Drop API, you can use hook props: [onExternalDragOver](api.md#onExternalDragOver), [externalDataHandler](api.md#externalDataHandler) to handle it. he-tree can work with any code which use HTML5 Drag and Drop API.

## Touch & Mobile

It is based on HTML5 Drag and Drop API. So it works in any device that supports Drag and Drop API. For others, you can try Drag and Drop API polyfill.

## Watermark

It prints a watermark information to browser console. Use prop [watermark](api.md#watermark) to disable it.

## Pro

[pro](../pro.md) has follow advanced features.

- Drag cross trees.
- Drag copy: copy node when drag start.
- Draggable table.

  [Click to get pro detail](../pro.md).
