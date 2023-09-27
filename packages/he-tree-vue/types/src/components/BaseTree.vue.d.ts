import type { DefineComponent, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes, PropType } from 'vue-demi';
import { Stat } from "./TreeProcessorVue";
declare const cpt: DefineComponent<{
    value: {
        required: boolean;
        type: PropType<any[]>;
    };
    modelValue: {
        required: boolean;
        type: PropType<any[]>;
    };
    updateBehavior: {
        type: PropType<"modify" | "new" | "disabled">;
        default: string;
    };
    processor: {
        type: PropType<{
            data: unknown[];
            stats: Stat<unknown>[] | null;
            statsFlat: Stat<unknown>[] | null;
            _statsMap: Map<unknown, Stat<unknown>> | null;
            initialized: boolean;
            init(): void;
            getStat(nodeData: unknown): Stat<unknown>;
            has(nodeData: unknown): boolean;
            _getPathByStat(stat: Stat<unknown> | null): any;
            afterOneCheckChanged(stat: Stat<unknown>): boolean;
            isVisible(statOrNodeData: unknown): boolean;
            updateCheck(): void;
            getChecked(withDemi?: boolean | undefined): Stat<unknown>[];
            getUnchecked(withDemi?: boolean | undefined): Stat<unknown>[];
            openAll(): void;
            closeAll(): void;
            openNodeAndParents(nodeOrStat: unknown): void;
            _calcFlatIndex(parent: Stat<unknown> | null, index: number): number;
            add(nodeData: unknown, parent?: Stat<unknown> | null | undefined, index?: number | null | undefined): void;
            remove(stat: Stat<unknown>): boolean;
            getSiblings(stat: Stat<unknown>): Stat<unknown>[];
            _setPosition(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): void;
            iterateParent(stat: Stat<unknown>, opt?: {
                withSelf: boolean;
            } | undefined): Generator<Stat<unknown>, void, unknown>;
            move(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): boolean;
            _flat(stat: Stat<unknown>): Stat<unknown>[];
            _count(stat: Stat<unknown>): number;
            getData(filter?: ((data: unknown) => unknown) | undefined, root?: Stat<unknown> | undefined): unknown;
            noInitialization: boolean;
            childrenKey: string;
            defaultOpen: boolean;
            statsHandler: (stats: Stat<any>[]) => Stat<any>[];
            statsFlatHandler: (statsFlat: Stat<any>[]) => Stat<any>[];
            afterSetStat: (stat: Stat<any>, parent: Stat<any> | null, index: number) => void;
            afterRemoveStat: (stat: Stat<any>) => void;
            statHandler: (stat: Stat<any>) => Stat<any>;
        }>;
        default: () => {
            data: never[];
            stats: Stat<never>[] | null;
            statsFlat: Stat<never>[] | null;
            _statsMap: Map<never, Stat<never>> | null;
            initialized: boolean;
            init(): void;
            getStat(nodeData: never): Stat<never>;
            has(nodeData: Stat<never>): boolean;
            _getPathByStat(stat: Stat<never> | null): any;
            afterOneCheckChanged(stat: Stat<never>): boolean;
            isVisible(statOrNodeData: Stat<never>): boolean;
            updateCheck(): void;
            getChecked(withDemi?: boolean | undefined): Stat<never>[];
            getUnchecked(withDemi?: boolean | undefined): Stat<never>[];
            openAll(): void;
            closeAll(): void;
            openNodeAndParents(nodeOrStat: Stat<never>): void;
            _calcFlatIndex(parent: Stat<never> | null, index: number): number;
            add(nodeData: never, parent?: Stat<never> | null | undefined, index?: number | null | undefined): void;
            remove(stat: Stat<never>): boolean;
            getSiblings(stat: Stat<never>): Stat<never>[];
            _setPosition(stat: Stat<never>, parent: Stat<never> | null, index: number): void;
            iterateParent(stat: Stat<never>, opt?: {
                withSelf: boolean;
            } | undefined): Generator<Stat<never>, void, unknown>;
            move(stat: Stat<never>, parent: Stat<never> | null, index: number): boolean;
            _flat(stat: Stat<never>): Stat<never>[];
            _count(stat: Stat<never>): number;
            getData(filter?: ((data: never) => never) | undefined, root?: Stat<never> | undefined): never[];
            noInitialization: boolean;
            childrenKey: string;
            defaultOpen: boolean;
            statsHandler: (stats: Stat<any>[]) => Stat<any>[];
            statsFlatHandler: (statsFlat: Stat<any>[]) => Stat<any>[];
            afterSetStat: (stat: Stat<any>, parent: Stat<any> | null, index: number) => void;
            afterRemoveStat: (stat: Stat<any>) => void;
            statHandler: (stat: Stat<any>) => Stat<any>;
        };
    };
    childrenKey: {
        type: StringConstructor;
        default: string;
    };
    /**
     * for default slot. 用于默认插槽
     */
    textKey: {
        type: StringConstructor;
        default: string;
    };
    /**
     * node indent. 节点缩进
     */
    indent: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * Enable virtual list. 启用虚拟列表
     */
    virtualization: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Render count for virtual list at start. 虚拟列表初始渲染数量.
     */
    virtualizationPrerenderCount: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * Open all nodes by default. 默认打开所有节点.
     */
    defaultOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    statHandler: {
        type: PropType<(stat: Stat<any>) => Stat<any>>;
    };
    /**
     * From right to left. 由右向左显示.
     */
    rtl: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * From bottom to top. 由下向上显示
     */
    btt: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Display as table
     */
    table: {
        type: BooleanConstructor;
        default: boolean;
    };
    watermark: {
        type: BooleanConstructor;
        default: boolean;
    };
    nodeKey: {
        type: PropType<"index" | ((stat: Stat<any>, index: number) => any)>;
        default: string;
    };
    treeLine: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeLineOffset: {
        type: NumberConstructor;
        default: number;
    };
}, unknown, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("update:modelValue" | "click:node" | "open:node" | "close:node" | "check:node" | "beforeDragStart" | "before-drag-start" | "after-drop" | "change" | "enter" | "leave")[], "update:modelValue" | "click:node" | "open:node" | "close:node" | "check:node" | "beforeDragStart" | "before-drag-start" | "after-drop" | "change" | "enter" | "leave", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    value: {
        required: boolean;
        type: PropType<any[]>;
    };
    modelValue: {
        required: boolean;
        type: PropType<any[]>;
    };
    updateBehavior: {
        type: PropType<"modify" | "new" | "disabled">;
        default: string;
    };
    processor: {
        type: PropType<{
            data: unknown[];
            stats: Stat<unknown>[] | null;
            statsFlat: Stat<unknown>[] | null;
            _statsMap: Map<unknown, Stat<unknown>> | null;
            initialized: boolean;
            init(): void;
            getStat(nodeData: unknown): Stat<unknown>;
            has(nodeData: unknown): boolean;
            _getPathByStat(stat: Stat<unknown> | null): any;
            afterOneCheckChanged(stat: Stat<unknown>): boolean;
            isVisible(statOrNodeData: unknown): boolean;
            updateCheck(): void;
            getChecked(withDemi?: boolean | undefined): Stat<unknown>[];
            getUnchecked(withDemi?: boolean | undefined): Stat<unknown>[];
            openAll(): void;
            closeAll(): void;
            openNodeAndParents(nodeOrStat: unknown): void;
            _calcFlatIndex(parent: Stat<unknown> | null, index: number): number;
            add(nodeData: unknown, parent?: Stat<unknown> | null | undefined, index?: number | null | undefined): void;
            remove(stat: Stat<unknown>): boolean;
            getSiblings(stat: Stat<unknown>): Stat<unknown>[];
            _setPosition(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): void;
            iterateParent(stat: Stat<unknown>, opt?: {
                withSelf: boolean;
            } | undefined): Generator<Stat<unknown>, void, unknown>;
            move(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): boolean;
            _flat(stat: Stat<unknown>): Stat<unknown>[];
            _count(stat: Stat<unknown>): number;
            getData(filter?: ((data: unknown) => unknown) | undefined, root?: Stat<unknown> | undefined): unknown;
            noInitialization: boolean;
            childrenKey: string;
            defaultOpen: boolean;
            statsHandler: (stats: Stat<any>[]) => Stat<any>[];
            statsFlatHandler: (statsFlat: Stat<any>[]) => Stat<any>[];
            afterSetStat: (stat: Stat<any>, parent: Stat<any> | null, index: number) => void;
            afterRemoveStat: (stat: Stat<any>) => void;
            statHandler: (stat: Stat<any>) => Stat<any>;
        }>;
        default: () => {
            data: never[];
            stats: Stat<never>[] | null;
            statsFlat: Stat<never>[] | null;
            _statsMap: Map<never, Stat<never>> | null;
            initialized: boolean;
            init(): void;
            getStat(nodeData: never): Stat<never>;
            has(nodeData: Stat<never>): boolean;
            _getPathByStat(stat: Stat<never> | null): any;
            afterOneCheckChanged(stat: Stat<never>): boolean;
            isVisible(statOrNodeData: Stat<never>): boolean;
            updateCheck(): void;
            getChecked(withDemi?: boolean | undefined): Stat<never>[];
            getUnchecked(withDemi?: boolean | undefined): Stat<never>[];
            openAll(): void;
            closeAll(): void;
            openNodeAndParents(nodeOrStat: Stat<never>): void;
            _calcFlatIndex(parent: Stat<never> | null, index: number): number;
            add(nodeData: never, parent?: Stat<never> | null | undefined, index?: number | null | undefined): void;
            remove(stat: Stat<never>): boolean;
            getSiblings(stat: Stat<never>): Stat<never>[];
            _setPosition(stat: Stat<never>, parent: Stat<never> | null, index: number): void;
            iterateParent(stat: Stat<never>, opt?: {
                withSelf: boolean;
            } | undefined): Generator<Stat<never>, void, unknown>;
            move(stat: Stat<never>, parent: Stat<never> | null, index: number): boolean;
            _flat(stat: Stat<never>): Stat<never>[];
            _count(stat: Stat<never>): number;
            getData(filter?: ((data: never) => never) | undefined, root?: Stat<never> | undefined): never[];
            noInitialization: boolean;
            childrenKey: string;
            defaultOpen: boolean;
            statsHandler: (stats: Stat<any>[]) => Stat<any>[];
            statsFlatHandler: (statsFlat: Stat<any>[]) => Stat<any>[];
            afterSetStat: (stat: Stat<any>, parent: Stat<any> | null, index: number) => void;
            afterRemoveStat: (stat: Stat<any>) => void;
            statHandler: (stat: Stat<any>) => Stat<any>;
        };
    };
    childrenKey: {
        type: StringConstructor;
        default: string;
    };
    /**
     * for default slot. 用于默认插槽
     */
    textKey: {
        type: StringConstructor;
        default: string;
    };
    /**
     * node indent. 节点缩进
     */
    indent: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * Enable virtual list. 启用虚拟列表
     */
    virtualization: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Render count for virtual list at start. 虚拟列表初始渲染数量.
     */
    virtualizationPrerenderCount: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * Open all nodes by default. 默认打开所有节点.
     */
    defaultOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    statHandler: {
        type: PropType<(stat: Stat<any>) => Stat<any>>;
    };
    /**
     * From right to left. 由右向左显示.
     */
    rtl: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * From bottom to top. 由下向上显示
     */
    btt: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Display as table
     */
    table: {
        type: BooleanConstructor;
        default: boolean;
    };
    watermark: {
        type: BooleanConstructor;
        default: boolean;
    };
    nodeKey: {
        type: PropType<"index" | ((stat: Stat<any>, index: number) => any)>;
        default: string;
    };
    treeLine: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeLineOffset: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onClick:node"?: ((...args: any[]) => any) | undefined;
    "onOpen:node"?: ((...args: any[]) => any) | undefined;
    "onClose:node"?: ((...args: any[]) => any) | undefined;
    "onCheck:node"?: ((...args: any[]) => any) | undefined;
    onBeforeDragStart?: ((...args: any[]) => any) | undefined;
    "onBefore-drag-start"?: ((...args: any[]) => any) | undefined;
    "onAfter-drop"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
    onLeave?: ((...args: any[]) => any) | undefined;
}, {
    rtl: boolean;
    btt: boolean;
    indent: number;
    table: boolean;
    treeLine: boolean;
    treeLineOffset: number;
    processor: {
        data: unknown[];
        stats: Stat<unknown>[] | null;
        statsFlat: Stat<unknown>[] | null;
        _statsMap: Map<unknown, Stat<unknown>> | null;
        initialized: boolean;
        init(): void;
        getStat(nodeData: unknown): Stat<unknown>;
        has(nodeData: unknown): boolean;
        _getPathByStat(stat: Stat<unknown> | null): any;
        afterOneCheckChanged(stat: Stat<unknown>): boolean;
        isVisible(statOrNodeData: unknown): boolean;
        updateCheck(): void;
        getChecked(withDemi?: boolean | undefined): Stat<unknown>[];
        getUnchecked(withDemi?: boolean | undefined): Stat<unknown>[];
        openAll(): void;
        closeAll(): void;
        openNodeAndParents(nodeOrStat: unknown): void;
        _calcFlatIndex(parent: Stat<unknown> | null, index: number): number;
        add(nodeData: unknown, parent?: Stat<unknown> | null | undefined, index?: number | null | undefined): void;
        remove(stat: Stat<unknown>): boolean;
        getSiblings(stat: Stat<unknown>): Stat<unknown>[];
        _setPosition(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): void;
        iterateParent(stat: Stat<unknown>, opt?: {
            withSelf: boolean;
        } | undefined): Generator<Stat<unknown>, void, unknown>;
        move(stat: Stat<unknown>, parent: Stat<unknown> | null, index: number): boolean;
        _flat(stat: Stat<unknown>): Stat<unknown>[];
        _count(stat: Stat<unknown>): number;
        getData(filter?: ((data: unknown) => unknown) | undefined, root?: Stat<unknown> | undefined): unknown;
        noInitialization: boolean;
        childrenKey: string;
        defaultOpen: boolean;
        statsHandler: (stats: Stat<any>[]) => Stat<any>[];
        statsFlatHandler: (statsFlat: Stat<any>[]) => Stat<any>[];
        afterSetStat: (stat: Stat<any>, parent: Stat<any> | null, index: number) => void;
        afterRemoveStat: (stat: Stat<any>) => void;
        statHandler: (stat: Stat<any>) => Stat<any>;
    };
    childrenKey: string;
    defaultOpen: boolean;
    updateBehavior: "modify" | "new" | "disabled";
    textKey: string;
    virtualization: boolean;
    virtualizationPrerenderCount: number;
    watermark: boolean;
    nodeKey: "index" | ((stat: Stat<any>, index: number) => any);
}>;
export default cpt;
export declare type BaseTreeType = InstanceType<typeof cpt>;
