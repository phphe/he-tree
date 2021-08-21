<template lang="pug">
Anchor.DocsMenuItem(:to="to" v-bind="$attrs" @resolved="onResolve")
  slot
.docs-submenu.flex-grow.h-0.overflow-y-auto.mb-1.text-sm(v-if="submenuVisible")
  .pl-2
    BaseTree(:treeData="submenu" :indent="8" :gap="8")
      template(v-slot="{ node, tree }")
        a(v-anchor :href="'#'+node.id") {{node.name}}
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BaseTree } from '@he-tree/vue3'
  import '@he-tree/vue3/dist/he-tree-vue3.css'
  import submenu from '../docsSubmenu'

  export default defineComponent({
    components: { BaseTree },
    props: {
      to: { type: Object },
    },
    data() {
      return {
        submenu,
        realTo: null,
      }
    },
    computed: {
      submenuVisible(): boolean {
        if (this.submenu) {
          return (
            this.realTo &&
            this.realTo.path === this.$route.path.replace(/\/$/, '')
          )
        }
        return false
      },
    },
    methods: {
      onResolve(props) {
        this.realTo = props.bind.to
      },
    },
  })
</script>

<style lang="scss"></style>
