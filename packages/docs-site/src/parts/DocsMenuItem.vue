<template lang="pug">
Anchor.DocsMenuItem(:to="to" v-bind="$attrs" @resolved="onResolve")
  slot
.docs-submenu.overflow-auto.mb-1.text-sm(v-if="submenuVisible")
  .pl-2
    BaseTree(ref="tree" v-model="submenu" updateBehavior="disabled" :indent="8")
      template(v-slot="{ node, tree, stat }")
        a(v-anchor :href="'#'+node.id" :class="'docs-submenu-a docs-submenu-level'+stat.level" @click="onSubmenuClick(stat)")
          span {{nodeText(node.name)}}
          VIconMDI.dsi-open-icon(v-if="stat.level===1 && stat.children?.length>0" :icon="mdiExpandMore")
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { BaseTree } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import submenuRef from '../docsSubmenu'
import { state } from '../store'
import VIconMDI from '../components/VIconMDI.vue'
import { mdiExpandMore } from "mdi-js/filled";

export default defineComponent({
  components: { BaseTree, VIconMDI },
  props: {
    to: {},
  },
  data() {
    return {
      realTo: null,
      mdiExpandMore,
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
          getPath(this.realTo) === this.$route.path.replace(/\/$/, '') &&
          this.submenu.length > 0
        )
      }
      return false
    },
  },
  methods: {
    onResolve(props) {
      this.realTo = props.bind.to
    },
    nodeText(str) {
      if (str.length > 23 && !str.includes(' ')) {
        str = str.substring(0, 23) + '...'
      }
      return str
    },
    onSubmenuClick(stat) {
      if (stat.level === 1) {
        stat.open = !stat.open
      }
    },
  },
  mounted() {
    // highlight menu item by anchor
    // Does not work
    let old = []
    this.$watch(() => [state.currentAnchors, this.submenu], () => {
      const id = state.currentAnchors[0]
      if (!id || !this.$refs.tree) return
      const currentStat = this.$refs.tree.statsFlat.find(v => v.data.id === id)
      if (!currentStat) return
      if (old) {
        for (const stat of old) {
          stat.data.active = false
        }
      }
      let news = [currentStat]
      for (const item of this.$refs.tree.iterateParent(currentStat)) {
        news.unshift(item)
      }
      for (const stat of news) {
        stat.data.active = true
      }
      old = news
    }, { immediate: true })
  },
})
</script>

<style lang="scss">
.docs-submenu {
  @apply text-gray-500;

  .tree-node:not(:last-child) {
    margin-bottom: 0.3rem;
  }
}

.docs-submenu-level1 {
  font-size: 1rem;
  @apply font-medium;
}

.docs-submenu-level2 {
  font-size: 1rem;
  @apply italic text-gray-700;
}

.docs-submenu-level3 {
  font-size: 0.95rem;
}

.docs-submenu-a {
  &:hover {
    @apply text-gray-900 underline;
  }
}

.dsi-open-icon {
  position: relative;
  top: 2px;
}
</style>
