/* eslint-disable prefer-const */
import * as hp from "helper-js";
import draggableHelper, { Options, Store } from "draggable-helper";
import { obj, BaseNode } from "../types";

export interface Options2 extends Options {
  treeClass: string;
  nodeClass: string;
  nodeOuterClass: string;
  placeholderClass: string;
  rtl: boolean;
  draggingNodePositionMode: "top_left_corner" | "mouse";
}

export interface Store2 extends Store {
  startTreeEl: HTMLElement;
  targetTreeEl: HTMLElement;
  placeholder: HTMLElement;
}

interface Hooks {
  beforeFirstMove?: (store: Store2, options: Options2) => boolean;
  afterFirstMove?: (store: Store2, options: Options2) => void;
  getNodeLevelByEl: (el: HTMLElement) => number;
  createPlaceholder: () => HTMLElement;
  setPlaceholderLevel: (placeholder: HTMLElement, level: number) => void;
  filterTargetTreeEl?: (el: HTMLElement, store: Store2) => boolean;
  afterTargetTreeElUpdated?: (store: Store2) => void;
  insertedPlaceholderAfterCreated: (store: Store2) => void;
  getTreeIndent: (treeEl: HTMLElement, store: Store2) => number;
  moveEnd: (action: string, info?: obj) => void;
  movePlaceholder: (
    store: Store2,
    el: HTMLElement | undefined,
    targetLevel: number
  ) => void;
  onDrop: (store: Store2, restoreStyle: () => void) => void;
}

export default function makeTreeListDraggable(
  treeEl: HTMLElement,
  options: Options2,
  hooks: Hooks
) {
  const defaultOptions: Options = {
    updateMovedElementStyleManually: true,
    getMovedOrClonedElement: (directTriggerElement, store) => {
      // find closest node from parents
      const el = hp.findParent(
        store.triggerElement,
        (el) => hp.hasClass(el, options.nodeOuterClass),
        { withSelf: true }
      );
      return el;
    },
    // @ts-ignore
    beforeFirstMove(store: Store2, options: Options2) {
      store.startTreeEl = treeEl;
      if (
        hooks.beforeFirstMove &&
        hooks.beforeFirstMove(store, options) === false
      ) {
        return false;
      }
    },
    // it means onMove
    // @ts-ignore
    beforeMove(store: Store2) {
      // first move
      // 第一次移动
      if (store.movedCount === 0) {
        // create placeholder
        // 创建占位元素
        const placeholder = hooks.createPlaceholder();
        store.placeholder = placeholder;
        store.targetTreeEl = store.startTreeEl;
        hooks.afterTargetTreeElUpdated?.(store);
        hooks.insertedPlaceholderAfterCreated(store);
        hooks.setPlaceholderLevel(
          store.placeholder,
          hooks.getNodeLevelByEl(store.movedOrClonedElement)
        );
        store.updateMovedElementStyle();
        hooks.afterFirstMove?.(store, options);
        // skip first move
        // 跳过第一次移动
        hooks.moveEnd("first_move");
        return;
      }
      //
      store.updateMovedElementStyle();
      //
      const movingEl = store.movedElement; // node
      // find closest node and hovering tree
      let tree;
      const movingNode = movingEl;
      // movingNodeOf and movingNodeRect are not always real. when RTL, there 'x' is top right. when draggingNodePositionMode is mouse, there x and y are mouse position. So don't calc them with their width or height.
      // movingNodeOf 和 movingNodeRect并非一直如字面意义是movingNode真实坐标. RTL时, x坐标是右上角. draggingNodePositionMode是mouse时, x和y是鼠标坐标.
      const movingNodeRealEl = movingNode.querySelector(
        `.${options.nodeClass}`
      ) as HTMLElement; // movingNode is node outer
      let movingNodeOf = hp.getOffset(movingNodeRealEl);
      let movingNodeRect = hp.getBoundingClientRect(movingNodeRealEl);
      if (options.draggingNodePositionMode === "mouse") {
        // use mouse position as dragging node position
        const { moveEvent } = store;
        // @ts-ignore
        movingNodeOf = { x: moveEvent.pageX, y: moveEvent.pageY };
        // @ts-ignore
        movingNodeRect = { x: moveEvent.clientX, y: moveEvent.clientY };
      } else if (options.rtl) {
        movingNodeOf.x += movingNode.offsetWidth;
        movingNodeRect.x += movingNode.offsetWidth;
      }
      // find tree with elementsFromPoint
      let found;
      let firstElement;
      for (const itemEl of hp.elementsFromPoint(
        movingNodeRect.x,
        movingNodeRect.y
      )) {
        if (!firstElement) {
          firstElement = itemEl;
        }
        if (hp.hasClass(<HTMLElement>itemEl, options.treeClass)) {
          found = itemEl;
          break;
        }
      }
      // check if the found element is covered by other elements
      if (
        firstElement !== found &&
        !hp.isDescendantOf(<HTMLElement>firstElement, <HTMLElement>found)
      ) {
        found = null;
      }
      tree = found as HTMLElement;
      if (!tree) {
        // out of tree or tree is covered by other elements
        hooks.moveEnd("no_target_tree");
        return;
      }
      // check if target tree right
      if (
        hooks.filterTargetTreeEl &&
        hooks.filterTargetTreeEl(tree, store) === false
      ) {
        hooks.moveEnd("disallowed_tree");
        return;
      }
      store.targetTreeEl = <HTMLElement>tree;
      hooks.afterTargetTreeElUpdated?.(store);
      const indent = hooks.getTreeIndent(store.targetTreeEl, store);
      //
      class DecisionInfo {
        private _visibleNodesElements?: NodeList;
        public get visibleNodesElementsExcludeDragging() {
          if (!this._visibleNodesElements) {
            this._visibleNodesElements = store.targetTreeEl.querySelectorAll(
              `.${options.nodeClass}:not(.${options.draggingClassName} > .${options.nodeClass})`
            );
          }
          const r: Node[] = [];
          this._visibleNodesElements.forEach((node) => {
            // @ts-ignore
            if (node.parentElement.style.display !== "none") {
              // node-outer visible
              r.push(node);
            }
          });
          return r;
        }

        // index is for visibleNodesElementsExcludeDragging
        private _closestNodeElAndIndex?: {
          el: HTMLElement;
          index: number;
        } | null;
        public get closestNodeElAndIndex() {
          if (this._closestNodeElAndIndex === undefined) {
            const nodes = this.visibleNodesElementsExcludeDragging;
            //
            if (nodes.length === 0) {
              this._closestNodeElAndIndex = null;
            } else {
              let found, index;
              const t = hp.binarySearch(
                nodes,
                (node) => hp.getOffset(node).y - movingNodeOf.y,
                { returnNearestIfNoHit: true }
              )!;
              if (t.hit) {
                found = t.value;
                index = t.index;
              } else {
                if (t.greater) {
                  index = t.index - 1;
                  found = nodes[index] || t.value;
                } else {
                  index = t.index;
                  found = t.value;
                }
              }
              this._closestNodeElAndIndex = { el: found, index: index };
            }
          }
          return this._closestNodeElAndIndex!;
        }

        // prev node is closest node when closest node is not placeholder, or is prev node of closest node when it is placeholder
        // closest node不是placeholder时, prev node是closest node, 否则是closest node上方的node
        private _prevNodeAndIndex?: {
          el: HTMLElement;
          index: number;
        } | null;
        public get prevNodeAndIndex() {
          if (this._prevNodeAndIndex === undefined) {
            let el, index;
            if (this.closestNodeElAndIndex) {
              index = this.closestNodeElAndIndex.index; // can't reduce 1; 不能减1
              el = this.visibleNodesElementsExcludeDragging[index];
              if (
                el &&
                hp.hasClass(<HTMLElement>el, options.placeholderClass)
              ) {
                index--;
                el = this.visibleNodesElementsExcludeDragging[index];
              }
              if (el) {
                this._prevNodeAndIndex = { el: <HTMLElement>el, index };
              } else {
                this._prevNodeAndIndex = null;
              }
            } else {
              this._prevNodeAndIndex = null;
            }
          }
          return this._prevNodeAndIndex;
        }

        private _prevNodeOffset?: ReturnType<typeof hp.getOffset> | null;
        public get prevtNodeOffset() {
          if (this._prevNodeOffset === undefined) {
            this._prevNodeOffset = this.prevNodeAndIndex
              ? hp.getOffset(this.prevNodeAndIndex.el)
              : null;
          }
          return this._prevNodeOffset;
        }

        private _prevNodeLevel?: number | null;
        public get prevNodeLevel() {
          if (this._prevNodeLevel === undefined) {
            this._prevNodeLevel = this.prevNodeAndIndex
              ? hooks.getNodeLevelByEl(this.prevNodeAndIndex.el)
              : null;
          }
          return this._prevNodeLevel;
        }

        private _nextNodeAndIndex?: {
          el: HTMLElement;
          index: number;
        } | null;
        public get nextNodeAndIndex() {
          if (this._nextNodeAndIndex === undefined) {
            let el, index;
            if (this.closestNodeElAndIndex) {
              index = this.closestNodeElAndIndex.index + 1;
              el = this.visibleNodesElementsExcludeDragging[index];
              if (
                el &&
                hp.hasClass(<HTMLElement>el, options.placeholderClass)
              ) {
                index++;
                el = this.visibleNodesElementsExcludeDragging[index];
              }
              if (el) {
                this._nextNodeAndIndex = { el: <HTMLElement>el, index };
              } else {
                this._nextNodeAndIndex = null;
              }
            } else {
              this._nextNodeAndIndex = null;
            }
          }
          return this._nextNodeAndIndex;
        }
      }
      const info = new DecisionInfo();
      const onMiddleOfPrevNode = () =>
        movingNodeOf.y <
        info.prevtNodeOffset!.y + info.prevNodeAndIndex!.el.offsetHeight / 2;
      // Positive number mean moving node at left of prev node
      const prevNodeLeftXReduceMovingNodeX = () =>
        !options.rtl
          ? info.prevtNodeOffset!.x - movingNodeOf.x
          : movingNodeOf.x -
            (info.prevtNodeOffset!.x + info.prevNodeAndIndex!.el.offsetWidth);
      const atRightOfPrevNodeIndent = () =>
        !options.rtl
          ? movingNodeOf.x > info.prevtNodeOffset!.x + indent
          : movingNodeOf.x <
            info.prevtNodeOffset!.x +
              info.prevNodeAndIndex!.el.offsetWidth -
              indent;
      //
      let targetLevel: number | undefined;

      let nextNodeLevel = info.nextNodeAndIndex
        ? hooks.getNodeLevelByEl(info.nextNodeAndIndex.el)
        : 1; // targetLevel max is nextNodeLevel
      let prevNodeAndIndex = info.prevNodeAndIndex;
      if (
        !prevNodeAndIndex ||
        (prevNodeAndIndex.index === 0 && onMiddleOfPrevNode())
      ) {
        targetLevel = 1;
        prevNodeAndIndex = null;
        nextNodeLevel = 1;
      } else {
        const atLeft = prevNodeLeftXReduceMovingNodeX();
        if (atLeft > 0) {
          targetLevel = info.prevNodeLevel! - Math.ceil(atLeft / indent);
        } else if (atRightOfPrevNodeIndent()) {
          targetLevel = info.prevNodeLevel! + 1;
        } else {
          targetLevel = info.prevNodeLevel!;
        }
      }
      if (targetLevel < nextNodeLevel) {
        targetLevel = nextNodeLevel;
      }
      hooks.movePlaceholder(store, prevNodeAndIndex?.el, targetLevel);
    },
    // @ts-ignore
    beforeDrop(store: Store2) {
      const { endEvent } = store;
      const movingEl = store.movedElement;
      const { placeholder, movedCount, targetTreeEl, startTreeEl } = store;
      // destroy placeholder
      const restoreStyle = () => {
        hp.removeEl(placeholder);
        store.updateMovedElementStyle();
      };
      //
      hooks.onDrop(store, restoreStyle);
    },
  };
  Object.keys(defaultOptions).forEach((key) => {
    // @ts-ignore
    if (options[key] === undefined) {
      // @ts-ignore
      options[key] = defaultOptions[key];
    }
  });
  const { destroy, options: draggableHelperOptions } = draggableHelper(
    treeEl,
    options
  );
  return { destroy, options: draggableHelperOptions, hooks };
}
