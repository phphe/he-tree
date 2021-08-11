<template lang="pug">
.VirtualizationList.virtualization-list(:is="listTag" @scroll.passive="update")
  .vl-placeholder.top(:style="{height: top+'px'}")
  template(v-for="info in visibleItems")
    slot(:item="info.item" :index="info.index")
  .vl-placeholder.bottom(:style="{height: bottom+'px'}")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { obj } from "../types";
import { getOuterHeight } from "../utils";
import * as hp from "helper-js";

@Component
export default class VirtualizationList extends Vue {
  @Prop({ type: Array }) readonly items!: obj[];
  @Prop({ default: true }) readonly enabled!: boolean;
  @Prop({ default: 200 }) readonly buffer!: number;
  @Prop({ default: 20 }) readonly minItemHeight!: number;
  @Prop({ default: 20 }) readonly prerender!: number;
  @Prop({ type: String, default: "div" }) readonly listTag!: string;
  @Prop({ type: String, default: "vl-item" }) readonly itemClass!: string;

  start = 0;
  end = -1;
  top = 0;
  bottom = 0;
  itemsHeight: number[] = [];
  data() {
    return {
      mountedPromise: new Promise((resolve, reject) => {
        this._mountedPromise_resolve = resolve;
      }),
    };
  }
  mountedPromise!: Promise<unknown>;
  private _mountedPromise_resolve: ((value: unknown) => void) | undefined;

  // computed
  get visibleItems() {
    const r: { item: obj; index: number }[] = [];
    this.items.forEach((item, index) => {
      if (index >= this.start && index <= this.end) {
        r.push({ item, index });
      }
    });
    return r;
  }

  // methods
  update() {
    const task = async () => {
      if (!this.enabled) {
        this.start = 0;
        this.end = this.items.length;
        return;
      }
      await this.mountedPromise;
      let existingHeight = 0;
      let i = -1;
      for (const child of this.$el!.querySelectorAll(".vl-item")) {
        i++;
        const index = this.start + i;
        this.itemsHeight[index] = getOuterHeight(child);
      }
      const avgHeight = existingHeight / (i + 1) || this.minItemHeight;
      let { buffer, itemsHeight, items } = this;
      const { clientHeight, scrollTop } = this.$el;
      let start = 0,
        top = 0;
      const maxIndex = items.length - 1;
      const topSpace = hp.notLessThan(scrollTop - buffer, 0);
      while (top < topSpace && start <= maxIndex) {
        const newTop = top + (itemsHeight[start] || avgHeight);
        if (newTop > topSpace) {
          break;
        }

        top = newTop;
        start++;
      }
      let top2 = top;
      let end = start;
      while (top2 < scrollTop + clientHeight + buffer && end <= maxIndex) {
        top2 += itemsHeight[end] || avgHeight;
        end++;
      }
      let bottom = 0;
      for (let index = end + 1; index < items.length; index++) {
        bottom += itemsHeight[index] || avgHeight;
      }
      this.start = start;
      this.end = end;
      this.top = top;
      this.bottom = bottom;

      const waitDOMUpdated = () => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          await this.$nextTick();
          // every 5 ms, max 10 times
          await hp
            .waitFor(
              () => {
                let startEl, endEl, startIndex, endIndex;
                const els = this.$el.querySelectorAll(".vl-item");
                startEl = els[0];
                // @ts-ignore
                endEl = hp.arrayLast(els);
                startIndex = parseInt(startEl.getAttribute("data-vindex")!);
                endIndex = parseInt(endEl.getAttribute("data-vindex")!);
                return startIndex == this.start && endIndex === this.end;
              },
              5,
              10
            )
            .promise.then((x) => {
              //
              // console.log("success to wait DOM updated");
            })
            .catch((error) => {
              //
              // console.warn("failed to wait DOM updated");
            });
          resolve(undefined);
        });
      };
      await waitDOMUpdated();
      if (this._waitingUpdate) {
        const next = this._waitingUpdate;
        if (next !== task) {
          next();
        } else {
          this._waitingUpdate = undefined;
        }
      }
    };
    if (!this._waitingUpdate) {
      this._waitingUpdate = task;
      task();
    } else {
      this._waitingUpdate = task;
    }
  }
  private _waitingUpdate?: CallableFunction;
  // hooks
  created() {
    this.bottom = this.prerender - 1;
  }
  mounted() {
    this._mountedPromise_resolve!(null);
    this.$watch(
      () => [this.items],
      () => {
        this.itemsHeight = [];
        this.$nextTick(() => {
          this.update();
        });
      },
      { immediate: true }
    );
    this.$watch(
      () => [this.buffer],
      () => {
        this.update();
      }
    );
  }
}
</script>

<style lang="scss">
.vl-items {
  overflow: hidden;
  box-sizing: border-box;
}
</style>
