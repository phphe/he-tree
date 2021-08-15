import { PropType, ComponentPublicInstance } from "vue";
import { obj, Node } from "./types";
export declare const trees: Record<string, ComponentPublicInstance>;
declare type ChildrenLoader = (node: Node, vm: ComponentPublicInstance) => Promise<Node[]>;
declare const _default: import("vue").DefineComponent<{
    idKey: {
        type: StringConstructor;
        default: string;
    };
    parentIdKey: {
        type: StringConstructor;
        default: string;
    };
    childrenKey: {
        type: StringConstructor;
        default: string;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    flatData: {
        type: PropType<Record<string, unknown>[]>;
    };
    treeData: {
        type: PropType<Record<string, unknown>[]>;
    };
    indent: {
        type: NumberConstructor;
        default: number;
    };
    gap: {
        type: NumberConstructor;
    };
    rtl: {
        type: BooleanConstructor;
        default: boolean;
    };
    virtualization: {
        type: BooleanConstructor;
        default: boolean;
    };
    virtualizationPrerender: {
        type: NumberConstructor;
        default: number;
    };
    childrenLazyLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    childrenLoader: {
        type: PropType<ChildrenLoader>;
    };
    defaultFolded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    nodes: Node[];
    nodesByID: Record<string, Node>;
    trees: Record<string, ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>>;
    dragging: boolean;
    treeID: string;
    tree: ComponentPublicInstance<Readonly<{
        idKey?: unknown;
        parentIdKey?: unknown;
        childrenKey?: unknown;
        text?: unknown;
        flatData?: unknown;
        treeData?: unknown;
        indent?: unknown;
        gap?: unknown;
        rtl?: unknown;
        virtualization?: unknown;
        virtualizationPrerender?: unknown;
        childrenLazyLoading?: unknown;
        childrenLoader?: unknown;
        defaultFolded?: unknown;
    } & {
        idKey: string;
        parentIdKey: string;
        childrenKey: string;
        text: string;
        indent: number;
        rtl: boolean;
        virtualization: boolean;
        virtualizationPrerender: number;
        childrenLazyLoading: boolean;
        defaultFolded: boolean;
    } & {
        flatData?: Record<string, unknown>[] | undefined;
        treeData?: Record<string, unknown>[] | undefined;
        gap?: number | undefined;
        childrenLoader?: ChildrenLoader | undefined;
    }> & {}, {}, {}, {}, import("vue").MethodOptions, {}, Readonly<{
        idKey?: unknown;
        parentIdKey?: unknown;
        childrenKey?: unknown;
        text?: unknown;
        flatData?: unknown;
        treeData?: unknown;
        indent?: unknown;
        gap?: unknown;
        rtl?: unknown;
        virtualization?: unknown;
        virtualizationPrerender?: unknown;
        childrenLazyLoading?: unknown;
        childrenLoader?: unknown;
        defaultFolded?: unknown;
    } & {
        idKey: string;
        parentIdKey: string;
        childrenKey: string;
        text: string;
        indent: number;
        rtl: boolean;
        virtualization: boolean;
        virtualizationPrerender: number;
        childrenLazyLoading: boolean;
        defaultFolded: boolean;
    } & {
        flatData?: Record<string, unknown>[] | undefined;
        treeData?: Record<string, unknown>[] | undefined;
        gap?: number | undefined;
        childrenLoader?: ChildrenLoader | undefined;
    }> & {}, {}, false, import("vue").ComponentOptionsBase<Readonly<{
        idKey?: unknown;
        parentIdKey?: unknown;
        childrenKey?: unknown;
        text?: unknown;
        flatData?: unknown;
        treeData?: unknown;
        indent?: unknown;
        gap?: unknown;
        rtl?: unknown;
        virtualization?: unknown;
        virtualizationPrerender?: unknown;
        childrenLazyLoading?: unknown;
        childrenLoader?: unknown;
        defaultFolded?: unknown;
    } & {
        idKey: string;
        parentIdKey: string;
        childrenKey: string;
        text: string;
        indent: number;
        rtl: boolean;
        virtualization: boolean;
        virtualizationPrerender: number;
        childrenLazyLoading: boolean;
        defaultFolded: boolean;
    } & {
        flatData?: Record<string, unknown>[] | undefined;
        treeData?: Record<string, unknown>[] | undefined;
        gap?: number | undefined;
        childrenLoader?: ChildrenLoader | undefined;
    }> & {}, {}, {}, {}, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}>>;
    virtualizationListAfterCalcTop2: undefined;
}, {
    rootNodeChildren(): Node[];
    rootNode(): Node;
    visibleNodes(): Node[];
}, {
    initNodes(nodes: Node[]): void;
    getTreeVmByTreeEl(treeEl: HTMLElement): ComponentPublicInstance | undefined;
    nodeIndentStyle(node: Node): {
        [x: string]: string;
    };
    getNodeByEl(el: HTMLElement): Node;
    getElByID(id: string | number): HTMLElement | undefined;
    getParent(node?: Node | undefined): {
        [x: string]: unknown;
        $id: string | number;
        $pid?: string | number | undefined;
        $level: number;
        $hidden?: boolean | undefined;
        $folded?: boolean | undefined;
        $checked?: boolean | 0 | undefined;
        $children: any[];
        $childrenLoading?: boolean | undefined;
        $childrenLoadStaus?: {
            [x: string]: unknown;
        } | undefined;
        $draggable?: boolean | undefined;
        $droppable?: boolean | undefined;
        $nodeStyle?: unknown;
        $nodeClass?: unknown;
        $outerStyle?: unknown;
        $outerClass?: unknown;
    } | undefined;
    getChildren(node: Node | undefined): Node[];
    countChildren(node: Node | undefined): number;
    _checkIDExists(id: number | string): void;
    _pidIndexToListIndex(pid: number | string | null, index: number): number;
    addNode(node: obj, parentId: number | string | null, index?: number): void;
    moveNode(node: Node, parentId: number | string | null, index?: number): void;
    removeNode(node: Node): void;
    outputNestedData(parent: Node | null, ignoreKeys?: string[], _returnFlat?: boolean | undefined): obj[];
    outputFlatData(parent: Node | null, ignoreKeys?: string[]): Record<string, unknown>[];
    isNodeParentFolded(node: Node): boolean;
    isNodeVisible(node: Node): boolean;
    forceVisible(node: Node): boolean;
    foldAll(): void;
    loadChildren(node: Node): Promise<void>;
    loadAllChildren(node?: Node | undefined): Promise<void>;
    unfoldAll(node?: Node | undefined): Promise<void> | undefined;
    unfold(node: Node): void | Promise<void>;
    toggleFold(node: Node): void | Promise<void>;
    updateChecked(node: Node): void;
    getAllCheckedNodes(): {
        [x: string]: unknown;
        $id: string | number;
        $pid?: string | number | undefined;
        $level: number;
        $hidden?: boolean | undefined;
        $folded?: boolean | undefined;
        $checked?: boolean | 0 | undefined;
        $children: any[];
        $childrenLoading?: boolean | undefined;
        $childrenLoadStaus?: {
            [x: string]: unknown;
        } | undefined;
        $draggable?: boolean | undefined;
        $droppable?: boolean | undefined;
        $nodeStyle?: unknown;
        $nodeClass?: unknown;
        $outerStyle?: unknown;
        $outerClass?: unknown;
    }[];
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    idKey?: unknown;
    parentIdKey?: unknown;
    childrenKey?: unknown;
    text?: unknown;
    flatData?: unknown;
    treeData?: unknown;
    indent?: unknown;
    gap?: unknown;
    rtl?: unknown;
    virtualization?: unknown;
    virtualizationPrerender?: unknown;
    childrenLazyLoading?: unknown;
    childrenLoader?: unknown;
    defaultFolded?: unknown;
} & {
    idKey: string;
    parentIdKey: string;
    childrenKey: string;
    text: string;
    indent: number;
    rtl: boolean;
    virtualization: boolean;
    virtualizationPrerender: number;
    childrenLazyLoading: boolean;
    defaultFolded: boolean;
} & {
    flatData?: Record<string, unknown>[] | undefined;
    treeData?: Record<string, unknown>[] | undefined;
    gap?: number | undefined;
    childrenLoader?: ChildrenLoader | undefined;
}> & {}, {
    idKey: string;
    parentIdKey: string;
    childrenKey: string;
    text: string;
    indent: number;
    rtl: boolean;
    virtualization: boolean;
    virtualizationPrerender: number;
    childrenLazyLoading: boolean;
    defaultFolded: boolean;
}>;
export default _default;
