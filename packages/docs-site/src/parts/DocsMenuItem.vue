<template lang="pug">
Anchor.DocsMenuItem(:to="to" v-bind="$attrs" @resolved="onResolve")
  slot
.docs-submenu.overflow-auto.mb-1.text-sm(v-if="submenuVisible")
  .pl-2
    BaseTree(ref="tree" v-model="submenu" updateBehavior="disabled" :indent="8")
      template(v-slot="{ node, tree, stat }")
        a(v-anchor :href="'#'+node.id" :class="'docs-submenu-level'+stat.level") {{node.name}}{{node.active}}
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { BaseTree } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import submenuRef from '../docsSubmenu'
import { state } from '../store'

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
  },
  mounted() {
    // highlight menu item by anchor
    let old = []
    this.$watch(() => [state.currentAnchors, this.submenu], () => {
      const id = state.currentAnchors
      if (!id || !this.$refs.tree) return
      const currentStat = this.$refs.tree.statsFlat.find(v => v.data.id === id)
      if(!currentStat)return
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
      console.log(news);
      
    }, { immediate: true })
  },
})
</script>

<style lang="scss">
.docs-submenu {
  .tree-node:not(:last-child) {
    margin-bottom: 0.3rem;
  }
}

.docs-submenu-level1 {
  font-size: 0.95rem;
}

.docs-submenu-level2 {}

.docs-submenu-level3 {
  font-size: 0.8rem;
}
</style>
