<template>
  <div
    v-if="!table"
    class="tree-node"
    :class="{ 'tree-node--with-tree-line': treeLine }"
    :style="indentStyle"
    ref="el"
    v-bind="ariaAttrs"
  >
    <template v-if="treeLine">
      <div
        v-for="line in vLines"
        class="tree-line tree-vline"
        :style="line.style"
      ></div>
      <div
        v-if="stat.level > 1"
        class="tree-line tree-hline"
        :style="hLineStyle"
      ></div>
    </template>
    <div class="tree-node-inner">
      <slot :indentStyle="indentStyle"></slot>
    </div>
  </div>
  <tr v-else class="tree-node" ref="el" v-bind="ariaAttrs">
    <slot :indentStyle="indentStyle"></slot>
  </tr>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue-demi";

let justToggleOpen = false;
const afterToggleOpen = () => {
  justToggleOpen = true;
  setTimeout(() => {
    justToggleOpen = false;
  }, 100);
};

const cpt = defineComponent({
  // components: {},
  props: [
    "stat",
    "rtl",
    "btt",
    "indent",
    "table",
    "treeLine",
    "treeLineOffset",
    "processor",
    "activeDescendant",
    "isPlaceholder",
  ],
  emits: ["open", "close", "check"],
  setup(props, { emit }) {
    const indentStyle = computed(() => {
      return {
        [!props.rtl ? "paddingLeft" : "paddingRight"]:
          props.indent * (props.stat.level - 1) + "px",
      };
    });
    // watch checked
    watch(
      () => props.stat.checked,
      (checked) => {
        // fix issue: https://github.com/phphe/he-tree/issues/98
        // when open/close above node, the after nodes' states 'checked' and 'open' will be updated. It should be caused by Vue's key. We don't use Vue's key prop.
        // 将勾选组件拖动到下一个父级组件,再拖回去,会丢失勾选状态, 直接在BaseTree给TreeNode组件添加:key="stat.data"可以解决. 暂时不应用
        if (justToggleOpen) {
          return;
        }
        if (props.processor.afterOneCheckChanged(props.stat)) {
          emit("check", props.stat);
        }
      }
    );
    // watch open
    watch(
      () => props.stat.open,
      (open) => {
        if (justToggleOpen) {
          return;
        }
        if (open) {
          emit("open", props.stat);
        } else {
          emit("close", props.stat);
        }
        afterToggleOpen();
      }
    );
    // tree lines
    const vLines = computed(() => {
      const lines: { style: object }[] = [];
      const hasNextVisibleNode = (stat) => {
        if (stat.parent) {
          let i = stat.parent?.children.indexOf(stat);
          do {
            i++;
            let next = stat.parent.children[i];
            if (next) {
              if (!next.hidden) {
                return true;
              }
            } else {
              break;
            }
          } while (true);
        }
        return false;
      };
      const leftOrRight = props.rtl ? "right" : "left";
      const bottomOrTop = props.btt ? "top" : "bottom";
      let current = props.stat;
      while (current) {
        let left = (current.level - 2) * props.indent + props.treeLineOffset;
        const hasNext = hasNextVisibleNode(current);
        const addLine = () => {
          lines.push({
            style: {
              [leftOrRight]: left + "px",
              [bottomOrTop]: hasNext ? 0 : "50%",
            },
          });
        };
        if (current === props.stat) {
          if (current.level > 1) {
            addLine();
          }
        } else if (hasNext) {
          addLine();
        }
        current = current.parent;
      }
      return lines;
    });
    const hLineStyle = computed(() => {
      let left = (props.stat.level - 2) * props.indent + props.treeLineOffset;
      const leftOrRight = props.rtl ? "right" : "left";
      return {
        [leftOrRight]: left + "px",
      };
    });
    // ARIA accessibility
    const siblings = computed(
      () => props.stat.parent?.children || props.processor.stats
    );
    const ariaSetSize = computed(() => siblings.value.length);
    const ariaPosInSet = computed(
      () => siblings.value.indexOf(props.stat) + 1
    );
    const ariaAttrs = computed(() => {
      if (props.isPlaceholder) {
        return { "aria-hidden": "true" };
      }
      const stat = props.stat;
      const hasChildren = stat.children && stat.children.length > 0;
      const attrs: Record<string, any> = {
        role: "treeitem",
        "aria-level": stat.level,
        "aria-setsize": ariaSetSize.value,
        "aria-posinset": ariaPosInSet.value,
        tabindex: stat === props.activeDescendant ? 0 : -1,
      };
      if (hasChildren) {
        attrs["aria-expanded"] = stat.open ? "true" : "false";
      }
      // Checkbox state
      if (stat.checked === true) {
        attrs["aria-checked"] = "true";
      } else if (stat.checked === 0) {
        attrs["aria-checked"] = "mixed";
      } else if (stat.checked === false && stat.checked !== undefined) {
        // Only include aria-checked if checkboxes are in use
        // We detect this by checking if checked is explicitly set
      }
      // Disabled state (non-draggable in a draggable tree)
      if (stat.draggable === false) {
        attrs["aria-disabled"] = "true";
      }
      return attrs;
    });
    return { indentStyle, vLines, hLineStyle, ariaAttrs };
  },
  // data() {
  //   return {}
  // },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {}
});
export default cpt;
export type TreeNodeType = InstanceType<typeof cpt>;
</script>

<style>
/* tree line start */
.tree-node--with-tree-line {
  position: relative;
}

.tree-line {
  position: absolute;
  background-color: #bbbbbb;
}

.tree-vline {
  width: 1px;
  top: 0;
  bottom: 0;
}

.tree-hline {
  height: 1px;
  top: 50%;
  width: 10px;
}

/* tree line end */

/* accessibility */
.tree-node:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: -2px;
}

@media (forced-colors: active) {
  .tree-node:focus-visible {
    outline: 2px solid Highlight;
  }
  .tree-line {
    background-color: CanvasText;
  }
}

@media (prefers-reduced-motion: reduce) {
  .he-tree,
  .he-tree * {
    transition: none !important;
  }
}
</style>
