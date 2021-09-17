<template lang="pug">
VirtualizationList.he-tree(:id="treeID" ref="virtualizationList" :items="visibleNodes" :enabled="virtualization" :prerender="virtualizationPrerender" :gap="gap" :afterCalcTop2="virtualizationListAfterCalcTop2" :isForceVisible="isNodeForceVisibleInVL" :class="{'he-tree-rtl': rtl, 'he-tree-dragging':dragging}")
  template(v-slot="info")
    .tree-node-outer.vl-item(:data-vindex="info.index" :data-v-render-index="info.renderIndex" :data-id="info.item.$id" :style="[info.itemStyle, nodeIndentStyle(info.item), info.item.$outerStyle, {display: info.item === draggingNode && (!store || !store.isCloned) ? 'none' : ''}]" :class="info.item.$outerClass")
      .tree-node(:class="info.item.$nodeClass" :style="info.item.$nodeStyle")
        slot(:node="info.item" :tree="tree") {{info.item[textKey]}}
</template>

<script lang="ts">
// @ts-nocheck
import {
  defineComponent,
  PropType,
  ComponentPublicInstance,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import { obj, Node } from "./types";
import {
  convertFlatDataToStandard,
  convertTreeDataToFlat,
  initNode,
} from "./utils";
import * as hp from "helper-js";
import VirtualizationList from "./components/VirtualizationList.vue";

export const trees: Record<string, ComponentPublicInstance> = {};

type ChildrenLoader = (
  node: Node,
  vm: ComponentPublicInstance
) => Promise<Node[]>;

export default defineComponent({
  components: { VirtualizationList },
  props: {
    idKey: { type: String, default: "id" },
    parentIdKey: { type: String, default: "parent_id" },
    childrenKey: { type: String, default: "children" },
    textKey: { type: String, default: "text" },
    flatData: { type: Array as PropType<obj[]> },
    treeData: { type: Array as PropType<obj[]> },
    indent: { type: Number, default: 20 },
    gap: { type: Number },
    rtl: { type: Boolean, default: false },
    virtualization: { type: Boolean, default: false },
    virtualizationPrerender: { type: Number, default: 20 },
    childrenLazyLoading: { type: Boolean, default: false },
    childrenLoader: { type: Function as PropType<ChildrenLoader> },
    defaultFolded: { type: Boolean, default: false },
  },
  data() {
    return {
      nodes: <Node[]>[],
      nodesByID: <Record<string, Node>>{},
      trees,
      dragging: false,
      treeID: hp.randString(),
      tree: this,
      virtualizationListAfterCalcTop2: undefined,
      // for drag
      store: null,
      draggingNode: null,
      // is node force visible in virtual list
      isNodeForceVisibleInVL: (node: Node, index: number): boolean => {
        // @ts-ignore
        return this.draggingNode === node;
      },
    };
  },
  computed: {
    rootNodeChildren(): Node[] {
      return this.nodes.filter(
        (node) => !node.$pid || !this.nodesByID[node.$pid]
      );
    },
    rootNode() {
      return {
        $level: 0,
        $children: this.rootNodeChildren,
      } as Node;
    },
    visibleNodes(): Node[] {
      return this.nodes.filter((node, index) => this.isNodeVisible(node));
    },
  },
  watch: {
    flatData: {
      immediate: true,
      handler(val: obj[] | null): void {
        if (val) {
          const t = convertFlatDataToStandard(
            val,
            this.idKey,
            this.parentIdKey
          );
          this.initNodes(t.nodes);
          this.nodes = t.nodes;
          this.nodesByID = t.nodesByID;
        } else {
          if (!this.treeData) {
            this.nodes = [];
            this.nodesByID = {};
          }
        }
      },
    },
    treeData: {
      immediate: true,
      handler(val: obj[] | null): void {
        if (val) {
          const t = convertTreeDataToFlat(val, this.childrenKey, this.idKey);
          this.initNodes(t.nodes);
          this.nodes = t.nodes;
          this.nodesByID = t.nodesByID;
        } else {
          if (!this.flatData) {
            this.nodes = [];
            this.nodesByID = {};
          }
        }
      },
    },
  },
  methods: {
    initNodes(nodes: Node[]) {
      const nodeInitializators = [];
      for (const key of Object.keys(this.$data)) {
        if (key.startsWith("nodeInitializator_")) {
          nodeInitializators.push(this.$data[key]);
        }
      }
      const { idKey, parentIdKey } = this;
      for (const node of nodes) {
        if (node.$id == null) {
          node.$id = node[idKey] as string;
        }
        if (node.$pid == null) {
          node.$pid = node[parentIdKey] as string;
        }
        initNode(node);
        if (this.nodesByID) {
          this.nodesByID[node.$id] = node;
        }
        if (node.$folded == null) {
          node.$folded = this.defaultFolded;
        }
        if (node.$checked == null) {
          node.$checked = false;
        }
        for (const func of nodeInitializators) {
          func(node);
        }
      }
    },
    getTreeVmByTreeEl(
      treeEl: HTMLElement
    ): ComponentPublicInstance | undefined {
      return this.trees[treeEl.getAttribute("id")!];
    },
    nodeIndentStyle(node: Node) {
      return {
        [!this.rtl ? "paddingLeft" : "paddingRight"]:
          this.indent * (node.$level - 1) + "px",
      };
    },
    getNodeByEl(el: HTMLElement): Node {
      const el2 = hp.findParent(
        el,
        (el) => hp.hasClass(el, "tree-node-outer"),
        {
          withSelf: true,
        }
      );
      const id = el2.getAttribute("data-id");
      return this.nodesByID[id!];
    },
    getElByID(id: string | number): HTMLElement | undefined {
      return this.$el.querySelector(`[data-id=${id}]`) as HTMLElement;
    },
    getParent(node?: Node) {
      if (!node) {
        return undefined;
      }
      return node.$pid ? this.nodesByID[node.$pid] : undefined;
    },
    getChildren(node: Node | undefined) {
      if (!node) {
        return this.rootNode.$children;
      }
      return node.$children;
    },
    countChildren(node: Node | undefined) {
      let r = 0;
      const t = node || this.rootNode;
      hp.walkTreeData(
        t.$children,
        (node) => {
          r++;
        },
        "$children"
      );
      return r;
    },
    _checkIDExists(id: number | string) {
      if (!this.nodesByID[id]) {
        throw new Error(`Node not found by specified id ${id}`);
      }
    },
    _pidIndexToListIndex(pid: number | string | null, index: number) {
      pid != null && this._checkIDExists(pid);
      const parent = this.nodesByID[pid!];
      let listIndex = 0;
      if (parent) {
        listIndex = this.nodes.indexOf(parent) + 1;
      }
      const parentChildren = this.getChildren(parent);
      for (let i = 0; i < index; i++) {
        listIndex += 1 + this.countChildren(parentChildren[i]);
      }
      return listIndex;
    },
    addNode(node: obj, parentId: number | string | null, index = 0) {
      parentId != null && this._checkIDExists(parentId);
      const nodes: Node[] = [];
      const parent = this.nodesByID[parentId!];
      hp.walkTreeData(
        node,
        (child, index, parent) => {
          this.initNodes([child]);
          child.$level = parent ? parent.$level : 1;
          child.$pid = parent ? parent.$id : parentId;
          child.$children = child[this.childrenKey] || [];
          nodes.push(child);
        },
        this.childrenKey
      );
      if (parent) {
        parent.$children.splice(index, 0, node as Node);
      }
      const listIndex = this._pidIndexToListIndex(parentId, index);
      this.nodes.splice(listIndex, 0, ...nodes);
    },
    moveNode(node: Node, parentId: number | string | null, index = 0) {
      parentId != null && this._checkIDExists(parentId);
      const nodes: Node[] = [];
      const oldParent = this.getParent(node);
      if (oldParent) {
        const oldIndex = oldParent.$children.indexOf(node);
        oldParent.$children.splice(oldIndex, 1);
      }
      const oldListIndex = this.nodes.indexOf(node);
      const removeLen = this.countChildren(node) + 1;
      this.nodes.splice(oldListIndex, removeLen);
      const parent = this.nodesByID[parentId!];
      hp.walkTreeData(
        node,
        (child, index, parent) => {
          child.$level = parent ? parent.$level : 1;
          nodes.push(child);
        },
        this.childrenKey
      );
      node.$pid = parentId == null ? undefined : parentId;
      if (parent) {
        parent.$children.splice(index, 0, node);
      }
      const listIndex = this._pidIndexToListIndex(parentId, index);
      this.nodes.splice(listIndex, 0, ...nodes);
    },
    removeNode(node: Node) {
      const parent = this.getParent(node);
      if (parent) {
        const index = parent.$children.indexOf(node);
        parent.$children.splice(index, 1);
      }
      const listIndex = this.nodes.indexOf(node);
      const removeLen = this.countChildren(node) + 1;
      this.nodes.splice(listIndex, removeLen);
    },
    outputNestedData(
      parent: Node | null,
      ignoreKeys: string[] = [],
      _returnFlat?: boolean
    ): obj[] {
      const td = new hp.TreeData(parent || this.rootNode.$children);
      td.childrenKey = "$children";
      const data = td.clone();
      const nodes: Node[] = [];
      hp.walkTreeData(
        data,
        (child) => {
          nodes.push(child);
        },
        "$children"
      );
      const { idKey, childrenKey, parentIdKey } = this;
      const ignore: obj = {};
      for (const key of ignoreKeys) {
        ignore[key] = true;
      }
      for (const node of nodes) {
        if (idKey !== "$id") {
          node[idKey] = node.$id;
          delete node.$id;
        }
        if (parentIdKey !== "$pid") {
          node[parentIdKey] = node.$pid;
          delete node.$pid;
        }
        if (childrenKey !== "$children") {
          node[childrenKey] = node.$children;
          delete node.$children;
        }
        for (const key of Object.keys(node)) {
          if (key[0] === "$" && !ignore[key]) {
            delete node[key];
          }
        }
      }
      if (_returnFlat) {
        return nodes;
      } else {
        return hp.isArray(data) ? data : [data];
      }
    },
    outputFlatData(parent: Node | null, ignoreKeys: string[] = []) {
      return this.outputNestedData(parent, ignoreKeys, true);
    },
    isNodeParentFolded(node: Node): boolean {
      const parent = this.getParent(node);
      return Boolean(
        parent && (parent.$folded || this.isNodeParentFolded(parent))
      );
    },
    isNodeVisible(node: Node): boolean {
      return !node.$hidden && !this.isNodeParentFolded(node);
    },
    foldAll() {
      for (const node of this.nodes) {
        node.$folded = true;
        this.$emit("fold", node);
      }
    },
    loadChildren(node: Node): Promise<void> {
      if (
        !node.$childrenLoadStaus ||
        node.$childrenLoadStaus.status === "error"
      ) {
        node.$childrenLoading = true;
        const promise = Promise.resolve(this.childrenLoader!(node, this)).then(
          (children) => {
            for (const child of children) {
              child.$pid = node.$id;
              child.$level = node.$level + 1;
              child.$folded = true;
            }
            this.initNodes(children);
            node.$children = children;
            this.nodes.splice(this.nodes.indexOf(node) + 1, 0, ...children);
            node.$childrenLoadStaus = {
              status: "success",
            };
            node.$childrenLoading = false;
            this.$emit("load-children-success", node);
          },
          (error) => {
            node.$children = [];
            node.$childrenLoadStaus = {
              status: "error",
              error,
            };
            node.$childrenLoading = false;
            this.$emit("load-children-error", node);
            console.warn("Failed to load children of node", node, error);
            throw error;
          }
        );
        node.$childrenLoadStaus = {
          status: "loading",
          promise,
        };
        this.$emit("load-children", node);
        return promise;
      } else if (node.$childrenLoadStaus.status === "loading") {
        return node.$childrenLoadStaus.promise;
      } else {
        return Promise.resolve();
      }
    },
    loadAllChildren(node?: Node): Promise<void> {
      return new Promise(async (resolve, reject) => {
        let promises = [];
        let nodes = node ? [node] : this.nodes;
        let failed = false;
        do {
          for (const node of nodes) {
            promises.push(
              this.loadChildren(node).then(
                () => {},
                () => {}
              )
            );
          }
          await Promise.all(promises).then(
            () => {},
            () => {
              failed = true;
            }
          );
          const newnNodes = [];
          for (const node of nodes) {
            if (!node.$children) {
              console.log(node);
            }
            newnNodes.push(...node.$children);
          }
          nodes = newnNodes;
          promises = [];
        } while (nodes.length > 0);
        if (failed) {
          reject(new Error("Failed to load all children"));
        } else {
          resolve(undefined);
        }
      });
    },
    unfoldAll(node?: Node) {
      const doAction = () => {
        hp.walkTreeData(
          node || this.nodes,
          (node) => {
            node.$folded = false;
            this.$emit("unfold", node);
          },
          "$children"
        );
      };
      if (this.childrenLazyLoading) {
        return this.loadAllChildren(node).then(
          () => {
            doAction();
          },
          (error) => {
            doAction();
            throw error;
          }
        );
      } else {
        doAction();
      }
    },
    unfold(node: Node): void | Promise<void> {
      if (this.childrenLazyLoading) {
        return this.loadChildren(node).then(() => {
          node.$folded = false;
          this.$emit("unfold", node);
        });
      } else {
        node.$folded = false;
        this.$emit("unfold", node);
      }
    },
    toggleFold(node: Node): void | Promise<void> {
      if (node.$folded) {
        return this.unfold(node);
      } else {
        node.$folded = true;
        this.$emit("fold", node);
      }
    },
    updateChecked(node: Node) {
      const checkParent = (node: Node) => {
        const parent = this.getParent(node);
        if (parent) {
          let hasChecked;
          let hasUnchecked;
          for (const child of parent.$children) {
            if (child.$checked) {
              hasChecked = true;
            } else {
              hasUnchecked = true;
              if (hasChecked) {
                break;
              }
            }
          }
          parent.$checked = !hasUnchecked ? true : hasChecked ? 0 : false;
          checkParent(parent);
        }
      };
      checkParent(node);
      hp.walkTreeData(
        node,
        (childNode) => {
          if (childNode.$checked !== node.$checked) {
            childNode.$checked = node.$checked;
          }
        },
        "$children"
      );
    },
    getAllCheckedNodes() {
      return this.nodes.filter((node) => node.$checked);
    },
  },
  mounted() {
    this.treeID = "hetree_" + hp.randString();
    this.trees[this.treeID] = this;
  },
  beforeUnmount() {
    delete trees[this.treeID];
  },
});
</script>

<style>
.he-tree-rtl {
  direction: rtl;
}
</style>
