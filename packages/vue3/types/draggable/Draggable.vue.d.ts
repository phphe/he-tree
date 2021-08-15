import { PropType, ComponentPublicInstance } from "vue";
import { Node } from "../types";
import { Store2 } from "./draggable";
declare type Draggable = ComponentPublicInstance;
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
export declare type PositionMode = "top_left_corner" | "mouse";
declare const _default: import("vue").DefineComponent<{
    triggerClass: {
        type: StringConstructor;
        default: string;
    };
    triggerBySelf: BooleanConstructor;
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    droppable: {
        type: BooleanConstructor;
        default: boolean;
    };
    eachDraggable: {
        type: (BooleanConstructor | FunctionConstructor)[];
        default: undefined;
    };
    eachDroppable: {
        type: (BooleanConstructor | FunctionConstructor)[];
        default: undefined;
    };
    rootDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    rootDroppable: {
        type: BooleanConstructor;
        default: boolean;
    };
    ondragstart: {
        type: PropType<(store: Store3) => boolean>;
    };
    ondragend: {
        type: PropType<(store: Store3) => boolean>;
    };
    afterPlaceholderCreated: {
        type: PropType<(placeholder: HTMLElement, store: Store3) => void>;
    };
    placeholderMaxHeight: {
        type: NumberConstructor;
        default: number;
    };
    unfoldWhenDragover: {
        type: BooleanConstructor;
        default: boolean;
    };
    unfoldWhenDragoverDelay: {
        type: NumberConstructor;
        default: number;
    };
    isNodeUnfoldable: {
        type: PropType<(store: Store3) => boolean>;
    };
    draggingNodePositionMode: {
        type: PropType<PositionMode>;
        default: string;
    };
    preventTextSelection: {
        type: BooleanConstructor;
        default: boolean;
    };
    edgeScroll: {
        type: BooleanConstructor;
    };
    edgeScrollTriggerMargin: {
        type: NumberConstructor;
        default: number;
    };
    edgeScrollSpeed: {
        type: NumberConstructor;
        default: number;
    };
    edgeScrollTriggerMode: {
        type: PropType<PositionMode>;
        default: string;
    };
    edgeScrollSpecifiedContainerX: {
        type: (FunctionConstructor | ObjectConstructor)[];
    };
    edgeScrollSpecifiedContainerY: {
        type: (FunctionConstructor | ObjectConstructor)[];
    };
}, unknown, {
    draggingNode: Node | null;
    store: Store3 | null;
}, {}, {
    isParentDragging(node: Node): boolean;
    isNodeVisible(node: Node): boolean;
}, import("vue").ComponentOptionsMixin, import("vue").DefineComponent<{}, {}, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}> & {}, {}>, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    triggerClass?: unknown;
    triggerBySelf?: unknown;
    draggable?: unknown;
    droppable?: unknown;
    eachDraggable?: unknown;
    eachDroppable?: unknown;
    rootDraggable?: unknown;
    rootDroppable?: unknown;
    ondragstart?: unknown;
    ondragend?: unknown;
    afterPlaceholderCreated?: unknown;
    placeholderMaxHeight?: unknown;
    unfoldWhenDragover?: unknown;
    unfoldWhenDragoverDelay?: unknown;
    isNodeUnfoldable?: unknown;
    draggingNodePositionMode?: unknown;
    preventTextSelection?: unknown;
    edgeScroll?: unknown;
    edgeScrollTriggerMargin?: unknown;
    edgeScrollSpeed?: unknown;
    edgeScrollTriggerMode?: unknown;
    edgeScrollSpecifiedContainerX?: unknown;
    edgeScrollSpecifiedContainerY?: unknown;
} & {
    triggerClass: string;
    triggerBySelf: boolean;
    draggable: boolean;
    droppable: boolean;
    rootDraggable: boolean;
    rootDroppable: boolean;
    placeholderMaxHeight: number;
    unfoldWhenDragover: boolean;
    unfoldWhenDragoverDelay: number;
    draggingNodePositionMode: PositionMode;
    preventTextSelection: boolean;
    edgeScroll: boolean;
    edgeScrollTriggerMargin: number;
    edgeScrollSpeed: number;
    edgeScrollTriggerMode: PositionMode;
} & {
    eachDraggable?: boolean | Function | undefined;
    eachDroppable?: boolean | Function | undefined;
    ondragstart?: ((store: Store3) => boolean) | undefined;
    ondragend?: ((store: Store3) => boolean) | undefined;
    afterPlaceholderCreated?: ((placeholder: HTMLElement, store: Store3) => void) | undefined;
    isNodeUnfoldable?: ((store: Store3) => boolean) | undefined;
    edgeScrollSpecifiedContainerX?: unknown;
    edgeScrollSpecifiedContainerY?: unknown;
}> & {}, {
    triggerClass: string;
    triggerBySelf: boolean;
    draggable: boolean;
    droppable: boolean;
    eachDraggable: boolean | Function;
    eachDroppable: boolean | Function;
    rootDraggable: boolean;
    rootDroppable: boolean;
    placeholderMaxHeight: number;
    unfoldWhenDragover: boolean;
    unfoldWhenDragoverDelay: number;
    draggingNodePositionMode: PositionMode;
    preventTextSelection: boolean;
    edgeScroll: boolean;
    edgeScrollTriggerMargin: number;
    edgeScrollSpeed: number;
    edgeScrollTriggerMode: PositionMode;
}>;
export default _default;
