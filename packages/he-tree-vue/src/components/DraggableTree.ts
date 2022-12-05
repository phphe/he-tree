import { PropType, defineComponent } from "vue-demi";
import BaseTree from "./BaseTree.vue";
import { Stat, CHILDREN } from "@he-tree/tree-utils";
import { context as ctx, Point } from "@he-tree/dnd-utils";
import { extendedDND, ExtendedDND } from "@he-tree/dnd-utils";
import * as hp from "helper-js";
import { Nullable } from "helper-js";

export type PropDraggable = (stat: Stat<any>) => boolean | null;
export type PropDroppable = (stat: Stat<any>) => boolean | null;
export type RootDroppable = () => boolean;
export type BeforeDragOpen = (stat: Stat<any>) => void | Promise<void>;
export type DragCopyDataHandler<T> = (nodeData: T) => T;
export type OnExternalDragOver = (event: DragEvent) => boolean;
export type ExternalDataHandler = (event: DragEvent) => any;
let startTree: DraggableTreeType | null = null;
let targetTree: DraggableTreeType | null = null;
let startInfo: StartInfo;
let targetInfo: TargetInfo;
let dragOpenLastNode: Nullable<Stat<any>>;
let startMovePoint: Point;
let startMouse: Point;
let dragNode: Nullable<Stat<any>>;

export const context = {
  get startInfo() {
    return startInfo;
  },
  get targetInfo() {
    return targetInfo;
  },
  get dragNode() {
    return dragNode;
  },
  get startTree() {
    return startTree;
  },
  get targetTree() {
    return targetTree;
  },
};

const cpt = defineComponent({
  extends: BaseTree,
  props: {
    triggerClass: { type: [String, Array] as PropType<string | string[]> },
    disableDrag: Boolean,
    disableDrop: Boolean,
    eachDraggable: {
      type: Function as PropType<PropDraggable>,
    },
    eachDroppable: {
      type: Function as PropType<PropDroppable>,
    },
    rootDroppable: {
      type: [Boolean, Function] as PropType<boolean | RootDroppable>,
      default: true,
    },
    /**
     * open closed node when drag over
     */
    dragOpen: { type: Boolean, default: true },
    dragOpenDelay: { type: Number, default: 0 },
    /**
     * e.g.: you can load children by ajax in the hook
     */
    beforeDragOpen: { type: Function as PropType<BeforeDragOpen> },
    resolveStartMovePoint: {
      type: [String, Function] as PropType<
        "mouse" | "default" | ((dragElement: HTMLElement) => Point)
      >,
    },
    /**
     * if remove placeholder when drag leave a tree
     */
    keepPlaceholder: { type: Boolean },
    /**
     * prevent drop if greater than maxLevel
     */
    maxLevel: { type: Number },
    /**
     * copy when drag
     */
    dragCopy: { type: Boolean },
    /**
     * return new data when drag copy
     */
    dragCopyDataHandler: {
      type: Function as PropType<DragCopyDataHandler<any>>,
    },
    onExternalDragOver: {
      type: Function as PropType<OnExternalDragOver>,
    },
    externalDataHandler: {
      type: Function as PropType<ExternalDataHandler>,
    },
  },
  data() {
    return {
      treeDraggableInstance: null,
    } as {
      treeDraggableInstance: ExtendedDND | null;
    };
  },
  computed: {},
  methods: {
    getNodeByElement(el: HTMLElement): Stat<any> | null {
      const i = el.getAttribute("vt-index");
      return i == null ? null : this.visibleStats[i];
    },
    isDraggable(node: Stat<any>): boolean {
      if (this.disableDrag) {
        return false;
      }
      if (node.draggable != null) {
        return node.draggable;
      }
      if (this.eachDraggable) {
        const t = this.eachDraggable(node);
        if (t != null) {
          return t;
        }
      }
      const { parent } = node;
      if (!parent) {
        return true;
      } else {
        return this.isDraggable(parent);
      }
    },
    isDroppable(node: Stat<any> | null): boolean {
      if (this.disableDrop) {
        return false;
      }
      if (!node) {
        return hp.resolveValueOrGettter(this.rootDroppable, [this, startTree]);
      }
      if (node.droppable != null) {
        return node.droppable;
      }
      if (this.eachDroppable) {
        const t = this.eachDroppable(node);
        if (t != null) {
          return t;
        }
      }
      const { parent } = node;
      if (!parent) {
        return true;
      } else {
        return this.isDroppable(parent);
      }
    },
    _eachDroppable() {
      return hp.resolveValueOrGettter(this["_isDragCopy"]?.(), [this]);
    },
  },
  mounted() {
    // Deprecated old watermark
    // const hetreeWatermark = window["_hetreeWatermark"];
    // window["_hetreeWatermark"] = () =>
    //   hp.resolveValueOrGettter(document["_hetreeWatermark"], [
    //     true,
    //     false,
    //     true,
    //   ]);
    // if (
    //   hp.resolveValueOrGettter(!window["_hetreeWatermark"]()) &&
    //   !hetreeWatermark
    // ) {
    //   console.log(
    //     `%c[he-tree] Vue tree component:  https://hetree.phphe.com`,
    //     "color:#0075ff; font-size:14px;"
    //   );
    // }
    //
    const isMoved = (mouse: Point, lastMouse: Point) => {
      let r = true;
      if (startTree && startTree !== this) {
        r = r && this["_isMoved"];
      }
      if (this.table && !this["_isDragCopy"]) {
        r = r && this["_isDragCopy"];
      }
      return r && (mouse.x !== lastMouse.x || mouse.y !== lastMouse.y);
    };
    //
    const movePlaceholder = (parent: Stat<any> | null, index: number) => {
      targetTree!.ignoreUpdate(() => {
        // get placeholder
        if (!targetTree!.has(targetTree!.placeholderData)) {
          if (targetTree!.table) {
            let colspan = 0;
            const tr = targetTree!.getRootEl().querySelector("tr");
            if (tr) {
              for (const {
                value: childEl,
              } of hp.iterateAll<HTMLTableCellElement>(tr.children)) {
                if (hp.css(childEl, "display") !== "none") {
                  colspan += childEl.colSpan || 1;
                }
              }
            }
            if (colspan < 1) {
              colspan = 1;
            }
            targetTree!.placeholderColspan = colspan;
          }
          targetTree!.add(targetTree!.placeholderData);
        }
        const placeholder = targetTree!.getStat(targetTree!.placeholderData);
        targetTree!.move(placeholder, parent, index);
      });
    };
    const removePlaceholder = () => {
      const tree = this;
      if (tree.has(tree.placeholderData)) {
        tree.remove(tree.getStat(tree.placeholderData));
        return true;
      }
    };
    /**
     * set cursor should be synchronously with event. This function will try update cursor at next dragover event.
     */
    const setCursor = (droppable: boolean) => {
      if (!droppable) {
        ctx.dropEffect = "none";
      } else {
        ctx.dropEffect = startTree?.dragCopy ? "copy" : "move";
      }
    };
    const setDroppable = (droppable: boolean) => {
      const tree = this; // targetTree
      if (!droppable) {
        if (!tree.keepPlaceholder) {
          removePlaceholder();
          setCursor(false);
        } else if (!tree.has(tree.placeholderData)) {
          setCursor(false);
        }
      } else {
        setCursor(true);
      }
    };
    let lastMouse = { x: 0, y: 0 }; // for dragover to detect if moved
    const rootEl = this.getRootEl();
    let dragElement: HTMLElement | null = null; // dragElement is the drag node element
    const removePlaceholderWhenEnd = () => {
      if (targetTree!.has(targetTree!.placeholderData)) {
        targetTree!.ignoreUpdate(() => {
          targetTree!.remove(
            targetTree!.getStat(targetTree!.placeholderData)
          );
          // update together to prevent flick
          if (startTree) {
            startTree.dragNode!.hidden = false;
            startTree.dragOvering = false;
          }
        });
      }
    }
    this.treeDraggableInstance = extendedDND(rootEl, {
      beforeDragStart: (event) => {
        // triggerElement trigger click
        if (!ctx.triggerElement) {
          return;
        }
        let triggerClass = this.triggerClass;
        if (!triggerClass || triggerClass.length === 0) {
          triggerClass = "tree-node";
        }
        let triggerClasses = hp.toArrayIfNot(triggerClass);
        let triggerDragElement = hp.findParent(
          ctx.triggerElement,
          (el) => {
            if (hp.hasClassIn(el, triggerClasses)) {
              return true;
            } else if (hp.hasClass(el, "tree-node")) {
              return "break";
            }
          },
          { withSelf: true, until: rootEl }
        );
        // dragElement is the drag node element
        dragElement = hp.findParent(
          triggerDragElement,
          (el) => {
            if (hp.hasClass(el, "tree-node")) {
              return true;
            }
          },
          { withSelf: true, until: rootEl }
        );
        if (!dragElement) {
          return;
        }
        dragNode = this.getNodeByElement(dragElement);
        if (!dragNode) {
          throw `Can't find drag node`;
        }
        if (!this.isDraggable(dragNode)) {
          return;
        }
        return rootEl;
      },
      onDragStart: (event) => {
        if (!dragElement || !dragNode) {
          return;
        }
        {
          const { x, y } = dragElement.getBoundingClientRect();
          const { clientX, clientY } = event;
          event.dataTransfer?.setDragImage(
            dragElement,
            clientX - x,
            clientY - y
          );
        }
        const mouse = { x: event.clientX, y: event.clientY };
        startMouse = mouse;
        startTree = this;
        startTree.dragNode = dragNode;
        startMovePoint = (() => {
          if (this.resolveStartMovePoint === "mouse") {
            return { x: event.clientX, y: event.clientY };
          } else if (typeof this.resolveStartMovePoint === "function") {
            return this.resolveStartMovePoint(dragElement);
          } else {
            // top_left
            let point: Point;
            let height = 0;
            if (!this.table) {
              if (!this.rtl) {
                point = dragElement.children[0]
                  .getBoundingClientRect()
                  .toJSON();
                height = (<DOMRect>point).height;
              } else {
                const rect = dragElement.children[0].getBoundingClientRect();
                point = {
                  x: rect.right,
                  y: rect.y,
                };
                height = rect.height;
              }
            } else {
              let rect = dragElement.getBoundingClientRect();
              point = { x: rect.x, y: rect.y };
              if (this.rtl) {
                point.x = rect.right;
              }
              height = rect.height;
            }
            if (this.btt) {
              point.y += height;
            }
            return point!;
          }
        })();
        this.dragOvering = true;
        const siblings = startTree.getSiblings(startTree!.dragNode!);
        const indexBeforeDrop = siblings.indexOf(dragNode);
        startInfo = {
          tree: startTree,
          dragNode,
          parent: dragNode.parent,
          siblings,
          indexBeforeDrop,
        };
        targetTree = this;
        event.dataTransfer?.setData(
          "text",
          `he-tree drag start at ${new Date().toISOString()}`
        ); // required for Chrome Andriod, or Drag and Drop API does't  work
        if (!startTree._eachDroppable()) {
          setTimeout(() => {
            dragNode!.hidden = true;
            movePlaceholder(dragNode!.parent, indexBeforeDrop + 1);
          }, 0);
        }
      },
      // onDragEnter, onDragLeave, onDragOver, onDrop execute on target tree
      onEnter: (event) => {
        this.$emit("enter", event);
      },
      onLeave: (event) => {
        dragOpenLastNode = null;
        this.dragOvering = false;
        ctx.preventDefault = false
        removePlaceholder();
        this.$emit("leave", event);
      },
      onDragOver: hp.applyFinally(
        (event: DragEvent) => {
          if (!startTree) {
            // from external
            if (
              !this.onExternalDragOver ||
              this.onExternalDragOver(event) === false
            ) {
              return;
            } else {
              ctx.preventDefault = true
            }
          }
          // return if not moved
          const mouse = { x: event.clientX, y: event.clientY };
          const isMoved2 = isMoved(mouse, lastMouse);
          lastMouse = mouse;
          if (!isMoved2) {
            return;
          }
          //
          this.dragOvering = true;
          //
          targetTree = this;
          const movePoint = startMovePoint ? {
            x: startMovePoint.x + (mouse.x - startMouse.x),
            y: startMovePoint.y + (mouse.y - startMouse.y),
          } : {...mouse}
          const { btt, rtl } = targetTree;
          // if undroppable, return
          if (targetTree!.disableDrop) {
            ctx.dropEffect = "none";
            return;
          }

          let prevNode: Stat<any> | null;
          let nextNode: Stat<any> | null;
          const nodeList = targetTree
            .getRootEl()
            .querySelectorAll(`.tree-node`);
          const nodeEls: HTMLElement[] = [];
          nodeList.forEach((el) => {
            if (
              !hp.hasClassIn(el, [
                "drag-placeholder-wrapper",
                "dragging-node",
              ]) &&
              hp.css(el, "display") !== "none"
            ) {
              nodeEls.push(el as HTMLElement);
            }
          });
          const t = hp.binarySearch(
            nodeEls,
            (node) =>
              hp.getBoundingClientRect(node)[!btt ? "top" : "bottom"] -
              movePoint.y,
            { returnNearestIfNoHit: true }
          )!;
          let prevIndex: number | null = null;
          let prevNodeEl: HTMLElement;
          let nextNodeEl: HTMLElement;
          if (t.hit) {
          } else {
            if (t.greater) {
              if (!btt) {
                prevIndex = t.index - 1;
                if (!nodeEls[prevIndex]) {
                  prevIndex++;
                }
              } else {
              }
            } else {
              if (!btt) {
              } else {
                prevIndex = t.index + 1;
                if (!nodeEls[prevIndex]) {
                  prevIndex--;
                }
              }
            }
          }
          if (prevIndex == null) {
            prevIndex = t.index;
          }
          prevNodeEl = nodeEls[prevIndex];
          nextNodeEl = !btt ? nodeEls[prevIndex + 1] : nodeEls[prevIndex - 1];
          prevNode = prevNodeEl && targetTree!.getNodeByElement(prevNodeEl);
          nextNode = nextNodeEl && targetTree!.getNodeByElement(nextNodeEl);

          //
          const { indent } = targetTree;
          // prev node BoundingClientRect
          // the element is the first child of prevNode
          const prevBCR = hp.cacheFunction(() => {
            if (!targetTree!.table) {
              return hp.getBoundingClientRect(prevNodeEl.firstElementChild!);
            } else {
              let r = hp.getBoundingClientRect(prevNodeEl).toJSON();
              const indentSize = indent * (prevNode!.level - 1);
              if (!rtl) {
                r.x += indentSize;
              } else {
                r.width -= indentSize;
                r.right -= indentSize;
              }
              return r as DOMRect;
            }
          }).action;
          const onPrevMiddle = hp.cacheFunction(() => {
            if (!btt) {
              return movePoint.y < prevBCR().y + prevBCR().height / 2;
            } else {
              return movePoint.y > prevBCR().y + prevBCR().height / 2;
            }
          }).action;
          const atTop = hp.cacheFunction(() => {
            // special. at the top of the tree
            if (!btt) {
              return !prevNodeEl || (prevIndex === 0 && onPrevMiddle());
            } else {
              return (
                !prevNodeEl ||
                (prevIndex === nodeEls.length - 1 && onPrevMiddle())
              );
            }
          }).action;
          // Positive number mean moving node at left of prev node
          const prevX_minusMovePointX = hp.cacheFunction(() =>
            !rtl
              ? prevBCR().x - movePoint.x
              : movePoint.x - (prevBCR().x + prevBCR().width)
          ).action;
          const atPrevIndentRight = hp.cacheFunction(() =>
            !rtl
              ? movePoint.x > prevBCR().x + indent
              : movePoint.x < prevBCR().x + prevBCR().width - indent
          ).action;
          //
          let targetLevel: number;
          if (atTop()) {
            targetLevel = 1;
            prevNode = null;
          } else if (!prevNode) {
            return;
          } else if (prevX_minusMovePointX() > 0) {
            // at left
            targetLevel =
              prevNode!.level - Math.ceil(prevX_minusMovePointX() / indent);
          } else if (atPrevIndentRight()) {
            targetLevel = prevNode!.level + 1;
          } else {
            targetLevel = prevNode!.level;
          }

          if (nextNode && targetLevel < nextNode.level) {
            targetLevel = nextNode.level;
          }
          //
          const findDroppablePosition = async () => {
            let parent, prevSibling;
            let cancelled = false;
            let _dragOpenLastNode: typeof dragOpenLastNode = null; // for reset dragOpenLastNode
            const isOpen = async (stat: Stat<any>) => {
              if (stat.open) {
                return true;
              } else if (targetTree!.dragOpen) {
                if (!targetTree!.dragOpenDelay) {
                  stat.open = true;
                  return true;
                } else {
                  _dragOpenLastNode = stat;
                  if (dragOpenLastNode === stat) {
                    cancelled = true;
                  } else {
                    let wait = hp.promisePin<boolean, any>();
                    dragOpenLastNode = stat;
                    const localNode = stat;
                    setTimeout(async () => {
                      if (localNode !== dragOpenLastNode) {
                        cancelled = true;
                        wait.resolve(true);
                      } else {
                        if (targetTree!.beforeDragOpen) {
                          await targetTree!.beforeDragOpen(stat);
                        }
                        if (localNode !== dragOpenLastNode) {
                          cancelled = true;
                          wait.resolve(true);
                        } else {
                          stat.open = true;
                          _dragOpenLastNode = null;
                          wait.resolve(true);
                        }
                      }
                    }, targetTree!.dragOpenDelay);
                    return await wait.promise;
                  }
                }
              } else {
                return false;
              }
            };
            const tryPrepend = async () => {
              // prevNode must existing
              if (
                targetTree!.isDroppable(prevNode) &&
                (await isOpen(prevNode!))
              ) {
                if (cancelled) {
                  return;
                }
                parent = prevNode;
                prevSibling = null;
              } else {
                return false;
              }
            };
            const tryAfter = (minLevel = targetLevel) => {
              // prevNode must existing
              let t: Stat<any> | null = prevNode!;
              let t3: (Stat<any> | null)[] = [];
              while (t && t.level >= minLevel) {
                t = t.parent || null; // null mean root
                t3.unshift(t);
              }
              let i = 0;
              for (const node of t3) {
                if (targetTree!.isDroppable(node)) {
                  parent = node;
                  prevSibling = t3[i + 1] || prevNode;
                  return true;
                }
                i++;
              }
              return false;
            };
            if (!prevNode) {
              if (targetTree!.isDroppable(null)) {
                parent = null;
              }
            } else if (targetLevel > prevNode.level) {
              if ((await tryPrepend()) === false) {
                tryAfter(prevNode.level);
              }
            } else {
              if (tryAfter() === false) {
                await tryPrepend();
              }
            }
            dragOpenLastNode = _dragOpenLastNode;
            const success = Boolean(!cancelled && (parent || parent === null));
            const getIndex = () =>
              prevSibling
                ? (parent ? parent.children : targetTree!.stats)
                    .filter((v) => v.data !== targetTree!.placeholderData)
                    .indexOf(prevSibling) + 1
                : 0;
            return {
              cancelled,
              success,
              parent,
              index: success ? getIndex() : -1,
            };
          };
          findDroppablePosition().then((dp) => {
            if (dp.cancelled) {
              return;
            }
            if (!dp.success) {
              setDroppable(false);
              return;
            }
            // check max level
            if (
              startTree &&
              targetTree!.maxLevel != null &&
              targetTree!.maxLevel > 0
            ) {
              const dragNode = startTree.dragNode!;
              let childMaxLevel = 0;
              hp.walkTreeData(
                dragNode,
                (node) => {
                  if (node!.level > childMaxLevel) {
                    childMaxLevel = node!.level;
                  }
                },
                {
                  childrenKey: CHILDREN,
                }
              );
              const willLevel =
                childMaxLevel -
                dragNode.level +
                1 +
                (dp.parent ? dp.parent.level : 0);
              if (willLevel > targetTree!.maxLevel) {
                setDroppable(false);
                return;
              }
            }
            setDroppable(true);
            // move placeholder
            movePlaceholder(dp.parent, dp.index);
          });
        },
        () => {
          // do nothing
        }
      ),
      onDrop: (event) => {
        targetTree = this;
        const external = !startTree;
        if (!targetTree) {
          return;
        }
        const dragNode = startTree?.dragNode!;
        let externalData: any;
        let dragChanged = (() => {
          let changed = true;
          if (!targetTree!.has(targetTree!.placeholderData)) {
            changed = false;
          } else if (external) {
            externalData = this.externalDataHandler?.(event);
            changed = externalData != null;
          } else if (!startTree!.dragCopy) {
            const placeholder = targetTree!.getStat(
              targetTree!.placeholderData
            );
            if (
              startTree === targetTree &&
              placeholder.parent === dragNode!.parent
            ) {
              if (
                (hp.findTreeData(dragNode, (node) => node === placeholder),
                { childrenKey: CHILDREN })
              ) {
              } else {
                const siblings = this.processor.getSiblings(placeholder);
                const placeholderIndex = siblings.indexOf(placeholder);
                const prev = siblings[placeholderIndex - 1];
                const next = siblings[placeholderIndex + 1];
                if (prev === dragNode || next === dragNode) {
                  changed = false;
                }
              }
            }
          }
          return changed;
        })();
        if (dragChanged) {
          const placeholder = targetTree!.getStat(targetTree!.placeholderData);
          const siblings = targetTree!.getSiblings(placeholder);
          targetInfo = {
            tree: targetTree,
            dragNode,
            parent: placeholder.parent,
            siblings,
            indexBeforeDrop: siblings.indexOf(placeholder),
          };
        }
        (() => {
          removePlaceholderWhenEnd()
          if (dragChanged) {
            // resolve targetIndex
            let targetIndex = targetInfo.indexBeforeDrop;
            if (
              startTree &&
              !startTree.dragCopy &&
              startTree === targetTree &&
              startInfo.parent == targetInfo.parent &&
              startInfo.indexBeforeDrop < targetIndex
            ) {
              targetIndex--;
            }
            //
            if (
              startTree &&
              startTree !== targetTree &&
              !startTree._eachDroppable()
            ) {
              startTree.batchUpdate(() => {
                startTree!.remove(dragNode);
                startTree!.updateCheck();
              });
            }
            targetTree!.batchUpdate(() => {
              let newDragNode = startTree?.dragNode!;
              let newData: any;
              if (externalData) {
                newData = externalData;
              } else if (startTree!._eachDroppable()) {
                newData = hp.cloneTreeData(startTree!.dragNode!.data, {
                  childrenKey: startTree!.childrenKey,
                });
                if (startTree!.dragCopyDataHandler) {
                  newData = startTree!.dragCopyDataHandler(newData);
                }
              }
              if (newData) {
                targetTree!.add(newData);
                newDragNode = targetTree!.getStat(newData);
              }
              targetTree!.move(newDragNode, targetInfo.parent, targetIndex);
              targetTree!.updateCheck();
            });
          }
          targetTree!.$emit("after-drop");
          if (dragChanged) {
            if (startTree) {
              // don't emit change when dragCopy
              if (!startTree.dragCopy) {
                startTree.$emit("change");
              }
            }
            if (targetTree !== startTree) {
              targetTree!.$emit("change");
            }
          }
        })();
      },
      onDragEnd:(event) => {
        removePlaceholderWhenEnd()
        // reset
        if (startTree) {
          startTree.dragNode && (startTree.dragNode.hidden = false);
          startTree.dragNode = null;
          startTree.dragOvering = false;
          startTree = null;
        }
        targetTree = null;
        dragOpenLastNode = null;
        dragNode = null;
      },
    });
  },
  unmounted() {
    this.treeDraggableInstance?.destroy();
  },
});
export default cpt;
export type DraggableTreeType = InstanceType<typeof cpt>;
export interface StartInfo {
  tree: DraggableTreeType;
  dragNode: Stat<any>;
  parent: Stat<any> | null;
  siblings: Stat<any>[];
  indexBeforeDrop: number;
}
export type TargetInfo = StartInfo;
