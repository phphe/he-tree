# he-tree

[中文](/zh) | [English](/)

Vue 树组件. 特点: 支持 Vue2, Vue3, TypeScript, SSR, 嵌套, 虚拟列表, 可拖拽, 拖拽排序, 拖拽时使用占位节点表示可放置位置, 表格模式, 基于 Drag and Drop API, 可与其他基于 Drag and Drop API 的代码交互.

[使用指南](./v2/guide.md) | [示例/Demo](./v2/guide.md#示例)

<!-- code & demo -->

```vue
<template>
  <Draggable class="mtl-tree" v-model="treeData" treeLine>
    <template #default="{ node, stat }">
      <OpenIcon
        v-if="stat.children.length"
        :open="stat.open"
        class="mtl-mr"
        @click.native="stat.open = !stat.open"
      />
      <input
        class="mtl-checkbox mtl-mr"
        type="checkbox"
        v-model="stat.checked"
      />
      <span class="mtl-ml">{{ node.text }}</span>
    </template>
  </Draggable>
</template>

<script>
  import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'
  import '@he-tree/vue/style/default.css'
  import '@he-tree/vue/style/material-design.css'

  export default {
    components: { Draggable, OpenIcon },
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

## 许可

MIT
