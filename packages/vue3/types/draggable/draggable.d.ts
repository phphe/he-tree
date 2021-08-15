import { Options, Store } from "draggable-helper";
import { obj } from "../types";
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
    movePlaceholder: (store: Store2, el: HTMLElement | undefined, targetLevel: number) => void;
    onDrop: (store: Store2, restoreStyle: () => void) => void;
}
export default function makeTreeListDraggable(treeEl: HTMLElement, options: Options2, hooks: Hooks): {
    destroy: () => void;
    options: Options;
    hooks: Hooks;
};
export {};
