import { Node } from "../types";
import { Store2, Options2 } from "./draggable";
import BaseTree from "../BaseTree.vue";
declare type eachDraggableFunc = (node: Node | undefined, store: Store3, options: Options2, vm: Draggable) => boolean | undefined;
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
export default class Draggable extends BaseTree {
    readonly triggerClass: string;
    readonly triggerBySelf: boolean;
    readonly draggable: boolean;
    readonly droppable: boolean;
    readonly eachDraggable: boolean | eachDraggableFunc;
    readonly eachDroppable: boolean | eachDraggableFunc;
    readonly rootDraggable: boolean;
    readonly rootDroppable: boolean;
    readonly ondragstart: (store: Store3) => boolean;
    readonly ondragend: (store: Store3) => boolean;
    readonly afterPlaceholderCreated: (placeholder: HTMLElement, store: Store3) => void;
    readonly placeholderMaxHeight: number;
    readonly unfoldWhenDragover: boolean;
    readonly unfoldWhenDragoverDelay: number;
    readonly isNodeUnfoldable: (store: Store3) => boolean;
    readonly draggingNodePositionMode: "top_left_corner" | "mouse";
    readonly preventTextSelection: boolean;
    readonly edgeScroll: boolean;
    readonly edgeScrollTriggerMargin: number;
    readonly edgeScrollSpeed: number;
    readonly edgeScrollTriggerMode: "top_left_corner" | "mouse";
    readonly edgeScrollSpecifiedContainerX: HTMLElement | ((store: Store3) => HTMLElement);
    readonly edgeScrollSpecifiedContainerY: HTMLElement | ((store: Store3) => HTMLElement);
    draggingNode: Node | null;
    store: Store3 | null;
    private unfoldWhenDragoverInfo?;
    data(): {
        virtualizationListAfterCalcTop2: (top2: number) => number;
    };
    private isParentDragging;
    isNodeVisible(node: Node): boolean;
    mounted(): void;
}
export {};
