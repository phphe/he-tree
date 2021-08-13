<script lang="tsx">
// TODO replace top_left_corner to camelcase
// @ts-nocheck
import { defineComponent, PropType, ComponentPublicInstance } from "vue";
import { obj, Node } from "../types";
import * as hp from "helper-js";
import makeTreeListDraggable, { Store2, Options2 } from "./draggable";
import BaseTree from "../BaseTree.vue";
import { Options } from "draggable-helper";
import { genNodeID } from "../utils";

type Draggable = ComponentPublicInstance;

type eachDraggableFunc = (
  node: Node | undefined,
  store: Store3,
  options: Options2,
  vm: Draggable
) => boolean | undefined;

export interface Store3 extends Store2 {
  startTree: Draggable;
  targetTree: Draggable;
  draggingNode: Node;
  startPath: {
    tree: Draggable;
    parent?: Node;
    index: number;
  };
  targetPath: Store3["startPath"];
  placeholderLevel: number;
  placeholderPrevNode?: Node;
  placeholderPrevNodeInTree?: Node;
  dragChanged?: boolean;
  isCloned?: boolean;
}

export default defineComponent({
  extends: BaseTree,
  props: {
    triggerClass: { type: String, default: "tree-node" },
    triggerBySelf: Boolean,
    draggable: { type: Boolean, default: true },
    droppable: { type: Boolean, default: true },
    eachDraggable: { type: [Boolean, Function], default: undefined }, // Function type is eachDraggableFunc
    eachDroppable: { type: [Boolean, Function], default: undefined }, // Function type is eachDraggable
    rootDraggable: { type: Boolean, default: true },
    rootDroppable: { type: Boolean, default: true },
    ondragstart: { type: Function as PropType<(store: Store3) => boolean> },
    ondragend: { type: Function as PropType<(store: Store3) => boolean> },
    afterPlaceholderCreated: {
      type: Function as PropType<
        (placeholder: HTMLElement, store: Store3) => void
      >,
    },
    placeholderMaxHeight: { type: Number, default: 100 },
    unfoldWhenDragover: { type: Boolean, default: true },
    unfoldWhenDragoverDelay: { type: Number, default: 80 },
    isNodeUnfoldable: {
      type: Function as PropType<(store: Store3) => boolean>,
    },
    top_left_corner: { type: String, default: "top_left_corner" },
    edgeScrollSpecifiedContainerX: { type: [Object, Function] }, // type: HTMLElement | ((store: Store3) => HTMLElement)
    edgeScrollSpecifiedContainerY: { type: [Object, Function] }, // type: HTMLElement | ((store: Store3) => HTMLElement)
  },
  data() {
    return {
      draggingNode: null,
      store: null,
    } as {
      draggingNode: Node | null;
      store: Store3 | null;
    };
  },

  methods: {
    isParentDragging(node: Node): boolean {
      const { nodesByID, draggingNode } = this;
      const parent = node.$pid && nodesByID[node.$pid];
      return Boolean(
        draggingNode &&
          parent &&
          (parent === draggingNode || this.isParentDragging(parent))
      );
    },
    isNodeVisible(node: Node): boolean {
      if (
        this.draggingNode &&
        this.store!.isCloned &&
        (node === this.draggingNode || this.isParentDragging(node))
      ) {
        return true;
      }
      return (
        !node.$hidden &&
        !this.isNodeParentFolded(node) &&
        !this.isParentDragging(node)
      );
    },
  },
  // hooks
  mounted() {
    const options = {
      treeClass: "he-tree",
      nodeClass: "tree-node",
      nodeOuterClass: "tree-node-outer",
      draggingClassName: "dragging",
      placeholderClass: "tree-placeholder",
      onClone: (store: Store3, options: Options) => {
        store.isCloned = false;
        // @ts-ignore
        if (this.cloneWhenDrag) {
          // @ts-ignore
          store.isCloned = store.isCloned ? this.onClone(store) : true;
        }
        return true;
      },
    };
    const syncOption = (name: string, nameInOption?: string) => {
      if (!nameInOption) {
        nameInOption = name;
      }
      // @ts-ignore
      options[nameInOption] = this[name];
      this.$watch(name, () => {
        // @ts-ignore
        options[nameInOption] = this[name];
      });
    };
    syncOption("triggerClass", "triggerClassName");
    syncOption("triggerBySelf");
    syncOption("unfoldWhenDragover");
    syncOption("unfoldWhenDragoverDelay");
    syncOption("draggingNodePositionMode");
    syncOption("cloneWhenDrag", "clone");
    syncOption("edgeScroll");
    syncOption("edgeScrollTriggerMargin");
    syncOption("edgeScrollSpeed");
    syncOption("edgeScrollTriggerMode");
    syncOption("edgeScrollSpecifiedContainerX");
    syncOption("edgeScrollSpecifiedContainerY");
    syncOption("rtl");
    syncOption("preventTextSelection");
    const isNodeDroppable0 = (store: Store3, node?: Node): boolean => {
      const vm = store.targetTree || this;
      if (!vm.droppable) {
        return false;
      }
      const droppableOpt = node
        ? node.$droppable !== undefined
          ? node.$droppable
          : vm.eachDroppable
        : vm.rootDroppable !== undefined
        ? vm.rootDroppable
        : vm.eachDroppable;
      const droppable = hp.resolveValueOrGettter(droppableOpt, [
        node,
        store,
        options,
        vm,
      ]);
      if (droppable === undefined) {
        const parent = vm.getParent(node);
        if (!parent) {
          return true;
        } else {
          return isNodeDroppable0(store, parent);
        }
      } else {
        return droppable;
      }
    };
    const isNodeUnfoldable = (store: Store3, node?: Node): boolean => {
      const vm = store.targetTree || this;
      if (!vm.isNodeUnfoldable) {
        return this.unfoldWhenDragover;
      } else {
        return vm.isNodeUnfoldable(store);
      }
    };
    const { destroy, hooks } = makeTreeListDraggable(
      this.$el as HTMLElement,
      // @ts-ignore
      options,
      {
        beforeFirstMove: (store: Store3, options) => {
          this.store = store;
          store.startTree = this.getTreeVmByTreeEl(
            store.startTreeEl
          ) as Draggable;
          const draggable = hp.resolveValueOrGettter(
            store.startTree.draggable,
            [store.startTree, store]
          );
          if (!draggable) {
            return false;
          }
          const { startTree } = store;
          store.draggingNode = startTree.getNodeByEl(
            store.movedOrClonedElement
          );
          const parent = this.getParent(store.draggingNode);
          const index = this.getChildren(parent).indexOf(store.draggingNode);
          store.startPath = { tree: this, parent, index };
          const isNodeDraggable = (node: Node): boolean => {
            if (!this.draggable) {
              return false;
            }
            const opt =
              node.$draggable !== undefined
                ? node.$draggable
                : this.eachDraggable;
            const draggable = hp.resolveValueOrGettter(opt, [
              node,
              store,
              options,
              this,
            ]);
            if (draggable === undefined) {
              const parent = this.getParent(node);
              if (!parent) {
                return true;
              } else {
                return isNodeDraggable(parent);
              }
            } else {
              return draggable;
            }
          };
          if (!isNodeDraggable(store.draggingNode)) {
            return false;
          }
          if (this.ondragstart && this.ondragstart(store) === false) {
            return false;
          }
          for (const tree of Object.values(this.trees)) {
            tree.dragging = true;
          }
          store.startTree.$emit("before-first-move", store);
          store.startTree.$emit("drag", store);
        },
        afterFirstMove: (store: Store3) => {
          this.draggingNode = store.draggingNode;
        },
        getNodeLevelByEl: (el) => {
          return this.store!.targetTree.getNodeByEl(el).$level;
        },
        createPlaceholder: () =>
          hp.createElementFromHTML(`
          <div id="hetree_drag_placeholder" class="tree-placeholder-outer tree-node-outer">
            <div class="${options.placeholderClass} tree-node">
            </div>
          </div>
        `) as HTMLElement,
        setPlaceholderLevel: (placeholder, level) => {
          placeholder.style[
            !this.store!.targetTree.rtl ? "paddingLeft" : "paddingRight"
          ] = (level - 1) * this.store!.targetTree.indent + "px";
          this.store!.placeholderLevel = level;
        },
        filterTargetTreeEl: (el, store: Store3) => {
          const targetTree = this.getTreeVmByTreeEl(el)!;
          const { startTree } = store;
          if (startTree !== targetTree) {
            // @ts-ignore
            if (this._internal_hook_filterTargetTree) {
              if (
                // @ts-ignore
                this._internal_hook_filterTargetTree(targetTree, store) ===
                false
              ) {
                return false;
              }
            } else {
              return false;
            }
          }
          const targetTreeDroppable = hp.resolveValueOrGettter(
            targetTree.droppable,
            [targetTree, store]
          );
          if (!targetTreeDroppable) {
            return false;
          }
          store.targetTree = targetTree;
          if (
            !hp.resolveValueOrGettter(store.startTree === store.targetTree) &&
            // @ts-ignore
            hp.resolveValueOrGettter(this._Draggable_unfoldTargetNode, [
              false,
              store,
            ]) !== this.store
          ) {
            return false;
          }
        },
        afterTargetTreeElUpdated: (store: Store3) => {
          store.targetTree = this.getTreeVmByTreeEl(
            store.targetTreeEl
          ) as Draggable;
        },
        insertedPlaceholderAfterCreated: (store: Store3) => {
          // set placeholder height
          const dragNodesCount = 1 + this.countChildren(store.draggingNode!);
          const nodeHeight = store.movedOrClonedElement.offsetHeight;
          const placeholderHeight = hp.notGreaterThan(
            dragNodesCount * nodeHeight,
            this.placeholderMaxHeight
          );
          (store.placeholder.querySelector(
            ".tree-node"
          ) as HTMLElement).style.height = placeholderHeight + "px";
          //
          this.afterPlaceholderCreated?.(store.placeholder, store);
          if (isNodeDroppable0(store, this.getParent(store.draggingNode))) {
            hp.insertAfter(store.placeholder, store.movedOrClonedElement);
            store.placeholderPrevNode = this.getNodeByEl(
              store.movedOrClonedElement
            );
            let placeholderPrevEl = store.movedOrClonedElement
              .previousElementSibling as HTMLElement;
            if (placeholderPrevEl) {
              if (hp.hasClass(placeholderPrevEl, options.nodeOuterClass)) {
                store.placeholderPrevNodeInTree = this.getNodeByEl(
                  placeholderPrevEl
                );
              }
            }
          }
        },
        getTreeIndent: (treeEl, store) =>
          this.getTreeVmByTreeEl(treeEl)?.indent,
        moveEnd: (action, info = {}) => {
          if (this.unfoldWhenDragoverInfo) {
            if (
              action !== "prepend" ||
              info.node !== this.unfoldWhenDragoverInfo.node
            ) {
              this.unfoldWhenDragoverInfo = undefined;
            }
          }
        },
        movePlaceholder: (store: Store3, el, targetLevel) => {
          const isNodeDroppable = (node?: Node) =>
            isNodeDroppable0(store, node);
          const setPlaceholderLevel = (level: number) =>
            hooks.setPlaceholderLevel(store.placeholder, level);
          const that = store.targetTree;
          let parent: Node | undefined,
            prevNode: Node | undefined,
            prevNodeInTree: Node | undefined;
          // find parent
          if (el) {
            prevNode = that.getNodeByEl(el);
            prevNodeInTree = prevNode;
            if (targetLevel > prevNode.$level) {
              if (
                isNodeDroppable(prevNode) &&
                (!prevNode.$folded || isNodeUnfoldable(store, prevNode))
              ) {
                // prepend or append
                parent = prevNode;
              } else {
                // after
                parent = that.getParent(prevNode);
                targetLevel--;
              }
            } else if (targetLevel === prevNode.$level) {
              parent = that.getParent(prevNode);
              if (
                !isNodeDroppable(parent) &&
                isNodeDroppable(prevNode) &&
                (!prevNode.$folded || isNodeUnfoldable(store, prevNode))
              ) {
                // fallback to prepend
                parent = prevNode;
                targetLevel++;
              } else {
                // after
              }
            } else {
              // targetLevel < prevNode.$level
              // found parent which's level equal targetLevel - 1
              parent = prevNode;
              while (parent) {
                if (parent.$level === targetLevel - 1) {
                  break;
                }
                prevNodeInTree = parent;
                parent = that.getParent(parent);
              }
            }
          }
          const getLastChildNode = (node: Node) => {
            const children = node.$children || [];
            let index = children.length - 1;
            let last = children[index];
            if (!store.isCloned && last === this.draggingNode) {
              index--;
              last = children[index];
            }
            return last;
          };
          while (parent && !isNodeDroppable(parent)) {
            targetLevel--;
            prevNodeInTree = parent;
            prevNode = getLastChildNode(parent) || parent;
            parent = that.getParent(parent);
          }
          const parentDroppable = parent ? true : isNodeDroppable(); // isNodeDroppable() get root droppable
          if (parentDroppable) {
            if (!prevNode) {
              // prepend to root
              const root = that.$el!;
              hp.prependTo(store.placeholder, root);
              setPlaceholderLevel(targetLevel);
              hooks.moveEnd("prepend_to_root");
            } else {
              // prevNode not null, prevNodeInTree not null
              const doInsert = () => {
                hp.insertAfter(
                  store.placeholder,
                  that.getElByID(prevNode!.$id)!
                );
                setPlaceholderLevel(targetLevel);
              };
              if (targetLevel === prevNodeInTree!.$level + 1) {
                // prepend
                // need to unfold node if node is folded
                if (!prevNodeInTree!.$folded) {
                  doInsert();
                  hooks.moveEnd("prepend", { node: prevNodeInTree! });
                } else {
                  hooks.moveEnd("prepend", { node: prevNodeInTree! });
                  const info = this.unfoldWhenDragoverInfo;
                  if (info) {
                    // delayAndUnfoldAndDoInsert is processing
                  } else {
                    const id = hp.randString();
                    this.unfoldWhenDragoverInfo = {
                      node: prevNodeInTree,
                      id,
                    };
                    const delayAndUnfoldAndDoInsert = async () => {
                      await hp.waitTime(
                        store.targetTree.unfoldWhenDragoverDelay
                      );
                      const cancelled = () =>
                        this.unfoldWhenDragoverInfo?.id !== id;
                      if (cancelled()) return;
                      try {
                        await store.targetTree.unfold(prevNodeInTree!);
                        if (cancelled()) return;
                        doInsert();
                      } catch (error) {
                        // failed to unfold
                      }
                    };
                    delayAndUnfoldAndDoInsert();
                  }
                }
              } else {
                // after
                doInsert();
                hooks.moveEnd("after", { node: prevNodeInTree! });
              }
            }
          } else {
            // can't drop
            hooks.moveEnd("no_action");
          }
          store.placeholderPrevNode = prevNode;
          store.placeholderPrevNodeInTree = prevNodeInTree;
        },
        onDrop: (store: Store3, restoreStyle) => {
          let dragChanged = true;
          const that = store.targetTree;
          const { startTree, targetTree } = store;
          if (
            !document.getElementById("hetree_drag_placeholder") ||
            !store.targetTreeEl
          ) {
            // not moved
            dragChanged = false;
          } else {
            const prevNodeInTree = store.placeholderPrevNodeInTree;
            const tree = store.targetTree;
            let parent, index;
            const level = store.placeholderLevel;
            if (!prevNodeInTree) {
              index = 0;
              // index = tree.rootNode.$children.indexOf()
            } else if (level > prevNodeInTree.$level) {
              parent = prevNodeInTree;
              index = 0;
            } else {
              // after prevNodeInTree
              parent = that.getParent(prevNodeInTree);
              index = that.getChildren(parent).indexOf(prevNodeInTree) + 1;
            }

            store.targetPath = { tree, parent, index };
            // correct index
            const { startPath, targetPath } = store;
            if (
              startPath.tree === targetPath.tree &&
              startPath.parent === targetPath.parent
            ) {
              if (!this.store!.isCloned) {
                if (startPath.index < targetPath.index) {
                  targetPath.index--;
                }
                if (startPath.index === targetPath.index) {
                  dragChanged = false;
                }
              }
            }
          }
          restoreStyle();
          const { startPath, targetPath } = store;
          const draggingNode = this.draggingNode!;
          store.dragChanged = dragChanged;
          // hook ondragend
          if (that.ondragend && that.ondragend(store) === false) {
            return false;
          }
          if (dragChanged) {
            // need move
            if (!store.isCloned) {
              // remove from start path
              if (startPath.parent) {
                this.getChildren(startPath.parent).splice(startPath.index, 1);
              }
              const listIndex = this.nodes.indexOf(draggingNode);
              const toRemove: Node[] = [];
              hp.walkTreeData(
                draggingNode,
                (node) => {
                  toRemove.push(node);
                },
                "$children"
              );
              this.nodes.splice(listIndex, toRemove.length);
              for (const node of toRemove) {
                delete this.nodesByID[node.$id];
              }
            }
            // insert to new position
            let insertNode = draggingNode; // insertNode may be cloned

            if (store.isCloned) {
              const td = new hp.TreeData(insertNode);
              td.childrenKey = "$children";
              // @ts-ignore
              insertNode = td.clone();
              hp.walkTreeData(
                insertNode,
                (node, index, parent) => {
                  node.$id = genNodeID();
                  node.$pid = parent && parent.$id;
                },
                "$children"
              );
            }
            that
              .getChildren(targetPath.parent)
              .splice(targetPath.index, 0, insertNode);
            insertNode.$pid = targetPath.parent
              ? targetPath.parent.$id
              : undefined;
            // resolve start index in all nodes
            // 新位置, 在所有节点中的索引
            const listIndex = that._pidIndexToListIndex(
              targetPath.parent ? targetPath.parent.$id : null,
              targetPath.index
            );

            const toAdd: Node[] = [];
            const levelChange =
              (targetPath.parent || that.rootNode).$level -
              (startPath.parent || this.rootNode).$level;

            hp.walkTreeData(
              insertNode,
              (node) => {
                node.$level += levelChange;
                toAdd.push(node);
              },
              "$children"
            );
            that.nodes.splice(listIndex, 0, ...toAdd);

            for (const node of toAdd) {
              that.nodesByID[node.$id] = node;
            }
          } else {
            // do nothing
          }
          for (const tree of Object.values(this.trees)) {
            tree.dragging = false;
          }
          // emit event
          startTree.$emit("drop", store);
          targetTree.$emit("drop-into", store);
          if (store.dragChanged) {
            startTree.$emit("drop-change", store);
            if (targetTree !== startTree) {
              targetTree.$emit("drop-change", store);
            }
          }
          this.draggingNode = null;
        },
      }
    );
  },
});
</script>

<style>
.he-tree .tree-placeholder {
  background: #ddf2f9;
  border: 1px dashed #00d9ff;
  height: 20px;
}
.he-tree .dragging .tree-node:hover {
  background-color: inherit;
}
</style>
