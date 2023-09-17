# he-tree

[中文](/zh) | [English](/)

Vue tree component. Features: Vue2, Vue3, TypeScript, SSR, nested, virtual, list, draggable, sortable, placeholder for drag, table tree, based on Drag and Drop API, deal with any other code based on Drag and Drop API.

[Guide](./v2/guide.md) | [Demo](./v2/guide.md#Examples)

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

## License

MIT
