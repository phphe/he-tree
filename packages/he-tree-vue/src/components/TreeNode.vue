<template>
  <div v-if="!table" class="tree-node" :style="indentStyle" ref="el">
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
  props: ["stat", "rtl", "indent", "table", "processor"],
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
    return { indentStyle };
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
