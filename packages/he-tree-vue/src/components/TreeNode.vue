<template>
  <div v-if="!table" class="tree-node" :class="{ 'tree-node--with-tree-line': treeLine }" :style="indentStyle" ref="el">
    <template v-if="treeLine">
      <div v-for="line in vLines" class="tree-line tree-vline" :style="line.style"></div>
      <div v-if="stat.level > 1" class="tree-line tree-hline" :style="hLineStyle"></div>
    </template>
    <div class="tree-node-inner">
      <slot :indentStyle="indentStyle"></slot>
    </div>
  </div>
  <tr v-else class="tree-node" ref="el">
    <slot :indentStyle="indentStyle"></slot>
  </tr>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue-demi";

const cpt = defineComponent({
  // components: {},
  props: ["stat", "rtl", "btt", "indent", "table", "treeLine", "treeLineOffset", "processor"],
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
        if (props.processor.afterOneCheckChanged(props.stat)) {
          emit("check", props.stat);
        }
      }
    );
    // watch open
    watch(
      () => props.stat.open,
      (open) => {
        if (open) {
          emit("open", props.stat);
        } else {
          emit("close", props.stat);
        }
      }
    );
    // tree lines
    const vLines = computed(() => {
      const lines: { style: object }[] = [];
      const hasNextVisibleNode = (stat) => {
        if (stat.parent) {
          let i = stat.parent?.children.indexOf(stat);
          do {
            i++
            let next = stat.parent.children[i]
            if (next) {
              if (!next.hidden) {
                return true
              }
            } else {
              break
            }
          } while (true);
        }
        return false
      }
      const leftOrRight = props.rtl ? 'right' : 'left'
      const bottomOrTop = props.btt ? 'top' : 'bottom'
      let current = props.stat
      while (current) {
        let left = (current.level - 2) * props.indent + props.treeLineOffset
        const hasNext = hasNextVisibleNode(current)
        const addLine = () => {
          lines.push({
            style: {
              [leftOrRight]: left + 'px',
              [bottomOrTop]: hasNext ? 0 : '50%',
            }
          })
        }
        if (current === props.stat) {
          if (current.level > 1) {
            addLine()
          }
        } else if (hasNext) {
          addLine()
        }
        current = current.parent
      }
      return lines
    })
    const hLineStyle = computed(() => {
      let left = (props.stat.level - 2) * props.indent + props.treeLineOffset
      const leftOrRight = props.rtl ? 'right' : 'left'
      return {
        [leftOrRight]: left + 'px',
      }
    })
    return { indentStyle, vLines, hLineStyle, }
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
</style>