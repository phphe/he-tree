<template lang="pug">
.home-view.mb-8
  .site-container
    h1.text-3xl.font-bold.mt-8
      span {{config.APP_NAME}}
      Anchor.text-sm.ml-4.text-primary-500(to="/zh") 中文文档
    p.mt-8 
      template(v-if="$i18n.locale ==='en'") A vue tree component. Some features: draggable, drag sortable, virtualization list, Vue2, Vue3, Typescript, lazy load, RTL. Under MIT license. You can try the demo follow.
      template(v-else) Vue树组件. 特点: 可拖拽, 拖拽排序, 虚拟l列表, Vue2, Vue3, Typescript, 延迟加载子节点, 从右往左显示. MIT许可. 你可以尝试下面的示例.
    Draggable.border-t.border-b.mt-4(:treeData="treeData" triggerClass="drag-trigger" :gap="5")
      template(v-slot="{node, index, tree}")
        button.drag-trigger
          Icon(name="drag_indicator")
        button(@click="tree.toggleFold(node)")
          Icon(:name="node.$folded ? 'add' : 'remove'")
        input(type="checkbox" v-model="node.$checked" @change="tree.updateChecked(node)")
        span.ml-1 {{node.text}}
    .mt-2
      Anchor.text-xl.text-primary-500(to="/v1/guide" underline) {{$t('Get Started')}}
      Anchor.text-xl.text-primary-500.ml-4(to="/examples" underline) {{$t('More Examples')}}
    template(v-if="$i18n.locale ==='en'")
      h2.text-2xl.font-bold.mt-8 Features
      .prose.max-w-none
        ul
          li Including functions about fold and checkbox. You can customize UI easily and call them.
          li Edge scroll. Auto scroll when drag node to the edge of a element with scroll bar.
          li RTL supported
          li Virtualization list
          li Vue2, Vue3 supported
          li Typescript
          li Drag cross trees
          li Clone when drag
          li Lazy load child nodes, such as by Ajax.
          li Under MIT 
      h2.text-2xl.font-bold.mt-8 Estimated Size
      .prose.max-w-none
        ul
          li CommonJS: 76.61 KiB, 15.37 KiB gzipped
          li ESM: 74.49 KiB, 15.07 KiB gzipped
          li UMD minified: 58.27 KiB, 16.59 KiB gzipped
    template(v-else)
      h2.text-2xl.font-bold.mt-8 特点
      .prose.max-w-none
        ul
          li 已包含折叠和勾选框相关功能, 可以方便的自定义UI并调用它们.
          li 边缘滚动. 拖动到滚动框边缘时自动滚动.
          li 支持RTL, 从右往左显示
          li 虚拟列表
          li Vue2, Vue3 支持
          li Typescript 支持
          li 跨树拖拽
          li 克隆拖拽
          li 延迟加载子节点, 例如通过AJAX
          li MIT许可
      h2.text-2xl.font-bold.mt-8 预估大小
      .prose.max-w-none
        ul
          li CommonJS: 76.61 KiB, 15.37 KiB gzipped
          li ESM: 74.49 KiB, 15.07 KiB gzipped
          li UMD minified: 58.27 KiB, 16.59 KiB gzipped
</template>

<script>
  import { useTitle } from '../HTMLHead'
  import config from '../config'
  import { Draggable } from '@he-tree/vue3'
  import '@he-tree/vue3/dist/he-tree-vue3.css'

  export default {
    components: { Draggable },
    setup() {
      useTitle(config.APP_NAME)
    },
    // props: {},
    data() {
      return {
        config,
        treeData: [
          {
            text: 'node 1',
            children: [
              { text: 'node 1-1' },
              { text: 'node 1-2' },
              { text: 'node 1-3' },
            ],
          },
          {
            text: 'node 2',
            children: [
              { text: 'node 2-1' },
              { text: 'node 2-2' },
              { text: 'node 2-3' },
              { text: 'node 2-4' },
              { text: 'node 2-5' },
              { text: 'node 2-6' },
            ],
          },
        ],
      }
    },
    // computed: {},
    watch: {},
    created() {},
    methods: {},
    // mounted() {}
  }
</script>

<style lang="scss">
  .home-view {
    .drag-trigger {
      touch-action: none;
    }
  }
</style>
