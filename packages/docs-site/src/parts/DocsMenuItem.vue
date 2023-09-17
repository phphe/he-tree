<template lang="pug">
Anchor.DocsMenuItem(:to="to" v-bind="$attrs" @resolved="onResolve")
  slot
.docs-submenu.overflow-auto.mb-1.text-sm(v-if="submenuVisible")
  .pl-2
    BaseTree(ref="tree" v-model="submenu" updateBehavior="disabled" :indent="20" treeLine :tree-line-offset="8")
      template(v-slot="{ node, tree, stat }")
        a(v-anchor :href="'#'+node.id" :class="['docs-submenu-a docs-submenu-level'+stat.level, {'active-a': activeID===node.id}]" @click="onSubmenuClick(stat)")
          OpenIcon.dsi-open-icon(v-if="stat.level===1 && stat.children?.length>0" :open="stat.open")
          span {{nodeText(node.name)}}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue-demi'
import { BaseTree, OpenIcon } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import submenuRef from '../docsSubmenu'
import { state } from '../store'

const activeID = ref('')

export default defineComponent({
  components: { BaseTree, OpenIcon },
  props: {
    to: {},
  },
  setup() {
    return {
      activeID,
    }
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
      activeID.value = stat.data.id
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
    padding-bottom: 0.3rem;
  }

  .tree-line {
    background-color: #acacac;
  }

  .active-a {
    text-decoration: underline;
    @apply text-blue-600;
  }
}

.docs-submenu-level1 {
  font-size: 1rem;
  // @apply font-medium;
  font-size: 500;
}

.docs-submenu-level2 {
  font-size: 0.95rem;
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
