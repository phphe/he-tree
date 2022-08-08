<template lang="pug">
Anchor.DocsMenuItem(:to="to" v-bind="$attrs" @resolved="onResolve")
  slot
.docs-submenu.overflow-auto.mb-1.text-sm(v-if="submenuVisible")
  .pl-2
    BaseTree(v-model="submenu" updateBehavior="disabled" :indent="8" :gap="8")
      template(v-slot="{ node, tree }")
        a(v-anchor :href="'#'+node.id") {{node.name}}
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BaseTree } from '@he-tree/vue'
  import '@he-tree/vue/style/default.css'
  import submenuRef from '../docsSubmenu'

  export default defineComponent({
    components: { BaseTree },
    props: {
      to: {},
    },
    data() {
      return {
        realTo: null,
      }
    },
    computed: {
      submenu() {
        return submenuRef.value
      },
      submenuVisible(): boolean {
        if (this.submenu) {
          const getPath = (to: any) => (typeof to === 'string' ? to : to.path)
          return Boolean(
            this.realTo &&
              getPath(this.realTo) === this.$route.path.replace(/\/$/, '')
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
