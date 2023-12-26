import type { ComponentInternalInstance, ExtractPropTypes, VNodeProps, AllowedComponentProps, ComponentCustomProps, Slot, ComponentPublicInstance, ComponentOptionsBase, ComponentOptionsMixin, DefineComponent, DebuggerEvent, nextTick, WatchOptions, WatchStopHandle, ShallowUnwrapRef, ComponentCustomProperties, PropType } from 'vue-demi';
import { Stat } from "@he-tree/tree-utils";
import { Point } from "@he-tree/dnd-utils";
import { ExtendedDND } from "@he-tree/dnd-utils";
import * as hp from "helper-js";
export declare type PropDraggable = (stat: Stat<any>) => boolean | null;
export declare type PropDroppable = (stat: Stat<any>) => boolean | null;
export declare type RootDroppable = () => boolean;
export declare type BeforeDragOpen = (stat: Stat<any>) => void | Promise<void>;
export declare type DragCopyDataHandler<T> = (nodeData: T) => T;
export declare type OnExternalDragOver = (event: DragEvent) => boolean;
export declare type ExternalDataHandler = (event: DragEvent) => any;
export declare const context: {
    readonly startInfo: StartInfo;
    readonly targetInfo: StartInfo;
    readonly dragNode: hp.Nullable<Stat<any>>;
    readonly startTree: ({
        $: ComponentInternalInstance;
        $data: {
            treeDraggableInstance: ExtendedDND | null;
        };
        $props: Partial<{
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
                _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                childrenKey: string; /**
                 * if remove placeholder when drag leave a tree
                 */
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
        } & {
            disableDrag: boolean;
            disableDrop: boolean;
            rootDroppable: boolean | RootDroppable;
            dragOpen: boolean;
            dragOpenDelay: number;
            keepPlaceholder: boolean;
            dragCopy: boolean;
        }> & Omit<Readonly<ExtractPropTypes<{
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
                    _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
                    _ignoreCheckedOnce(stat: Stat<never>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
            textKey: {
                type: StringConstructor;
                default: string;
            };
            indent: {
                type: NumberConstructor;
                default: number;
            };
            virtualization: {
                type: BooleanConstructor;
                default: boolean;
            };
            virtualizationPrerenderCount: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            statHandler: {
                type: PropType<(stat: Stat<any>) => Stat<any>>;
            };
            rtl: {
                type: BooleanConstructor;
                default: boolean;
            };
            btt: {
                type: BooleanConstructor;
                default: boolean;
            };
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
        } & Readonly<ExtractPropTypes<{
            triggerClass: {
                type: PropType<string | string[]>;
            };
            disableDrag: BooleanConstructor;
            disableDrop: BooleanConstructor;
            eachDraggable: {
                type: PropType<PropDraggable>;
            };
            eachDroppable: {
                type: PropType<PropDroppable>;
            };
            rootDroppable: {
                type: PropType<boolean | RootDroppable>;
                default: boolean;
            };
            /**
             * open closed node when drag over
             */
            dragOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            dragOpenDelay: {
                type: NumberConstructor;
                default: number;
            };
            /**
             * e.g.: you can load children by ajax in the hook
             */
            beforeDragOpen: {
                type: PropType<BeforeDragOpen>;
            };
            resolveStartMovePoint: {
                type: PropType<"default" | "mouse" | ((dragElement: HTMLElement) => Point)>;
            };
            /**
             * if remove placeholder when drag leave a tree
             */
            keepPlaceholder: {
                type: BooleanConstructor;
            };
            /**
             * prevent drop if greater than maxLevel
             */
            maxLevel: {
                type: NumberConstructor;
            };
            /**
             * copy when drag
             */
            dragCopy: {
                type: BooleanConstructor;
            };
            /**
             * return new data when drag copy
             */
            dragCopyDataHandler: {
                type: PropType<DragCopyDataHandler<any>>;
            };
            onExternalDragOver: {
                type: PropType<OnExternalDragOver>;
            };
            externalDataHandler: {
                type: PropType<ExternalDataHandler>;
            };
        }>> & VNodeProps & AllowedComponentProps & ComponentCustomProps, ("rtl" | "btt" | "indent" | "table" | "treeLine" | "treeLineOffset" | "processor" | "childrenKey" | "defaultOpen" | "updateBehavior" | "textKey" | "virtualization" | "virtualizationPrerenderCount" | "watermark" | "nodeKey") | ("disableDrag" | "disableDrop" | "rootDroppable" | "dragOpen" | "dragOpenDelay" | "keepPlaceholder" | "dragCopy")>;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: Slot | undefined;
        }>;
        $root: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: ComponentOptionsBase<Readonly<ExtractPropTypes<{
            triggerClass: {
                type: PropType<string | string[]>;
            };
            disableDrag: BooleanConstructor;
            disableDrop: BooleanConstructor;
            eachDraggable: {
                type: PropType<PropDraggable>;
            };
            eachDroppable: {
                type: PropType<PropDroppable>;
            };
            rootDroppable: {
                type: PropType<boolean | RootDroppable>;
                default: boolean;
            };
            /**
             * open closed node when drag over
             */
            dragOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            dragOpenDelay: {
                type: NumberConstructor;
                default: number;
            };
            /**
             * e.g.: you can load children by ajax in the hook
             */
            beforeDragOpen: {
                type: PropType<BeforeDragOpen>;
            };
            resolveStartMovePoint: {
                type: PropType<"default" | "mouse" | ((dragElement: HTMLElement) => Point)>;
            };
            /**
             * if remove placeholder when drag leave a tree
             */
            keepPlaceholder: {
                type: BooleanConstructor;
            };
            /**
             * prevent drop if greater than maxLevel
             */
            maxLevel: {
                type: NumberConstructor;
            };
            /**
             * copy when drag
             */
            dragCopy: {
                type: BooleanConstructor;
            };
            /**
             * return new data when drag copy
             */
            dragCopyDataHandler: {
                type: PropType<DragCopyDataHandler<any>>;
            };
            onExternalDragOver: {
                type: PropType<OnExternalDragOver>;
            };
            externalDataHandler: {
                type: PropType<ExternalDataHandler>;
            };
        }>>, unknown, {
            treeDraggableInstance: ExtendedDND | null;
        }, {}, {
            getNodeByElement(el: HTMLElement): Stat<any> | null;
            isDraggable(node: Stat<any>): boolean;
            isDroppable(node: Stat<any> | null): boolean;
            _eachDroppable(): any;
        }, ComponentOptionsMixin, DefineComponent<{
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
                    _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
                    _ignoreCheckedOnce(stat: Stat<never>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
            textKey: {
                type: StringConstructor;
                default: string;
            };
            indent: {
                type: NumberConstructor;
                default: number;
            };
            virtualization: {
                type: BooleanConstructor;
                default: boolean;
            };
            virtualizationPrerenderCount: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            statHandler: {
                type: PropType<(stat: Stat<any>) => Stat<any>>;
            };
            rtl: {
                type: BooleanConstructor;
                default: boolean;
            };
            btt: {
                type: BooleanConstructor;
                default: boolean;
            };
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
                    _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
                    _ignoreCheckedOnce(stat: Stat<never>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
            textKey: {
                type: StringConstructor;
                default: string;
            };
            indent: {
                type: NumberConstructor;
                default: number;
            };
            virtualization: {
                type: BooleanConstructor;
                default: boolean;
            };
            virtualizationPrerenderCount: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            statHandler: {
                type: PropType<(stat: Stat<any>) => Stat<any>>;
            };
            rtl: {
                type: BooleanConstructor;
                default: boolean;
            };
            btt: {
                type: BooleanConstructor;
                default: boolean;
            };
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
                _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                childrenKey: string; /**
                 * if remove placeholder when drag leave a tree
                 */
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
        }>, Record<string, any>, string, {
            disableDrag: boolean;
            disableDrop: boolean;
            rootDroppable: boolean | RootDroppable;
            dragOpen: boolean;
            dragOpenDelay: number;
            keepPlaceholder: boolean;
            dragCopy: boolean;
        }> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: DebuggerEvent) => void) | ((e: DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: DebuggerEvent) => void) | ((e: DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch(source: string | Function, cb: Function, options?: WatchOptions<boolean> | undefined): WatchStopHandle;
    } & Readonly<ExtractPropTypes<{
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
                _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                childrenKey: string; /**
                 * if remove placeholder when drag leave a tree
                 */
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
                _ignoreCheckedOnce(stat: Stat<never>): void;
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
                childrenKey: string; /**
                 * if remove placeholder when drag leave a tree
                 */
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
        textKey: {
            type: StringConstructor;
            default: string;
        };
        indent: {
            type: NumberConstructor;
            default: number;
        };
        virtualization: {
            type: BooleanConstructor;
            default: boolean;
        };
        virtualizationPrerenderCount: {
            type: NumberConstructor;
            default: number;
        };
        defaultOpen: {
            type: BooleanConstructor;
            default: boolean;
        };
        statHandler: {
            type: PropType<(stat: Stat<any>) => Stat<any>>;
        };
        rtl: {
            type: BooleanConstructor;
            default: boolean;
        };
        btt: {
            type: BooleanConstructor;
            default: boolean;
        };
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
    } & Readonly<ExtractPropTypes<{
        triggerClass: {
            type: PropType<string | string[]>;
        };
        disableDrag: BooleanConstructor;
        disableDrop: BooleanConstructor;
        eachDraggable: {
            type: PropType<PropDraggable>;
        };
        eachDroppable: {
            type: PropType<PropDroppable>;
        };
        rootDroppable: {
            type: PropType<boolean | RootDroppable>;
            default: boolean;
        };
        /**
         * open closed node when drag over
         */
        dragOpen: {
            type: BooleanConstructor;
            default: boolean;
        };
        dragOpenDelay: {
            type: NumberConstructor;
            default: number;
        };
        /**
         * e.g.: you can load children by ajax in the hook
         */
        beforeDragOpen: {
            type: PropType<BeforeDragOpen>;
        };
        resolveStartMovePoint: {
            type: PropType<"default" | "mouse" | ((dragElement: HTMLElement) => Point)>;
        };
        /**
         * if remove placeholder when drag leave a tree
         */
        keepPlaceholder: {
            type: BooleanConstructor;
        };
        /**
         * prevent drop if greater than maxLevel
         */
        maxLevel: {
            type: NumberConstructor;
        };
        /**
         * copy when drag
         */
        dragCopy: {
            type: BooleanConstructor;
        };
        /**
         * return new data when drag copy
         */
        dragCopyDataHandler: {
            type: PropType<DragCopyDataHandler<any>>;
        };
        onExternalDragOver: {
            type: PropType<OnExternalDragOver>;
        };
        externalDataHandler: {
            type: PropType<ExternalDataHandler>;
        };
    }>> & ShallowUnwrapRef<{}> & {
        treeDraggableInstance: {
            ingoreHTMLTags: string[];
            ifPreventDefault: (event: DragEvent) => boolean;
            beforeDragStart: (event: MouseEvent | TouchEvent) => void | HTMLElement;
            onDragStart: (event: DragEvent) => void;
            onDrag: (event: DragEvent) => void;
            onDragEnter: (event: DragEvent) => void;
            onDragLeave: (event: DragEvent) => void;
            onDragOver: (event: DragEvent) => void;
            onDragEnd: (event: DragEvent) => void;
            onDrop: (event: DragEvent) => void;
            onEnter: (event: DragEvent) => void;
            onLeave: (event: DragEvent) => void;
            root: Element;
            data?: unknown;
            destroy: () => void;
        } | null;
    } & {} & {
        getNodeByElement(el: HTMLElement): Stat<any> | null;
        isDraggable(node: Stat<any>): boolean;
        isDroppable(node: Stat<any> | null): boolean;
        _eachDroppable(): any;
    } & ComponentCustomProperties) | null;
    readonly targetTree: ({
        $: ComponentInternalInstance;
        $data: {
            treeDraggableInstance: ExtendedDND | null;
        };
        $props: Partial<{
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
                _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                childrenKey: string; /**
                 * if remove placeholder when drag leave a tree
                 */
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
        } & {
            disableDrag: boolean;
            disableDrop: boolean;
            rootDroppable: boolean | RootDroppable;
            dragOpen: boolean;
            dragOpenDelay: number;
            keepPlaceholder: boolean;
            dragCopy: boolean;
        }> & Omit<Readonly<ExtractPropTypes<{
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
                    _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
                    _ignoreCheckedOnce(stat: Stat<never>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
            textKey: {
                type: StringConstructor;
                default: string;
            };
            indent: {
                type: NumberConstructor;
                default: number;
            };
            virtualization: {
                type: BooleanConstructor;
                default: boolean;
            };
            virtualizationPrerenderCount: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            statHandler: {
                type: PropType<(stat: Stat<any>) => Stat<any>>;
            };
            rtl: {
                type: BooleanConstructor;
                default: boolean;
            };
            btt: {
                type: BooleanConstructor;
                default: boolean;
            };
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
        } & Readonly<ExtractPropTypes<{
            triggerClass: {
                type: PropType<string | string[]>;
            };
            disableDrag: BooleanConstructor;
            disableDrop: BooleanConstructor;
            eachDraggable: {
                type: PropType<PropDraggable>;
            };
            eachDroppable: {
                type: PropType<PropDroppable>;
            };
            rootDroppable: {
                type: PropType<boolean | RootDroppable>;
                default: boolean;
            };
            /**
             * open closed node when drag over
             */
            dragOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            dragOpenDelay: {
                type: NumberConstructor;
                default: number;
            };
            /**
             * e.g.: you can load children by ajax in the hook
             */
            beforeDragOpen: {
                type: PropType<BeforeDragOpen>;
            };
            resolveStartMovePoint: {
                type: PropType<"default" | "mouse" | ((dragElement: HTMLElement) => Point)>;
            };
            /**
             * if remove placeholder when drag leave a tree
             */
            keepPlaceholder: {
                type: BooleanConstructor;
            };
            /**
             * prevent drop if greater than maxLevel
             */
            maxLevel: {
                type: NumberConstructor;
            };
            /**
             * copy when drag
             */
            dragCopy: {
                type: BooleanConstructor;
            };
            /**
             * return new data when drag copy
             */
            dragCopyDataHandler: {
                type: PropType<DragCopyDataHandler<any>>;
            };
            onExternalDragOver: {
                type: PropType<OnExternalDragOver>;
            };
            externalDataHandler: {
                type: PropType<ExternalDataHandler>;
            };
        }>> & VNodeProps & AllowedComponentProps & ComponentCustomProps, ("rtl" | "btt" | "indent" | "table" | "treeLine" | "treeLineOffset" | "processor" | "childrenKey" | "defaultOpen" | "updateBehavior" | "textKey" | "virtualization" | "virtualizationPrerenderCount" | "watermark" | "nodeKey") | ("disableDrag" | "disableDrop" | "rootDroppable" | "dragOpen" | "dragOpenDelay" | "keepPlaceholder" | "dragCopy")>;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: Slot | undefined;
        }>;
        $root: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: ComponentOptionsBase<Readonly<ExtractPropTypes<{
            triggerClass: {
                type: PropType<string | string[]>;
            };
            disableDrag: BooleanConstructor;
            disableDrop: BooleanConstructor;
            eachDraggable: {
                type: PropType<PropDraggable>;
            };
            eachDroppable: {
                type: PropType<PropDroppable>;
            };
            rootDroppable: {
                type: PropType<boolean | RootDroppable>;
                default: boolean;
            };
            /**
             * open closed node when drag over
             */
            dragOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            dragOpenDelay: {
                type: NumberConstructor;
                default: number;
            };
            /**
             * e.g.: you can load children by ajax in the hook
             */
            beforeDragOpen: {
                type: PropType<BeforeDragOpen>;
            };
            resolveStartMovePoint: {
                type: PropType<"default" | "mouse" | ((dragElement: HTMLElement) => Point)>;
            };
            /**
             * if remove placeholder when drag leave a tree
             */
            keepPlaceholder: {
                type: BooleanConstructor;
            };
            /**
             * prevent drop if greater than maxLevel
             */
            maxLevel: {
                type: NumberConstructor;
            };
            /**
             * copy when drag
             */
            dragCopy: {
                type: BooleanConstructor;
            };
            /**
             * return new data when drag copy
             */
            dragCopyDataHandler: {
                type: PropType<DragCopyDataHandler<any>>;
            };
            onExternalDragOver: {
                type: PropType<OnExternalDragOver>;
            };
            externalDataHandler: {
                type: PropType<ExternalDataHandler>;
            };
        }>>, unknown, {
            treeDraggableInstance: ExtendedDND | null;
        }, {}, {
            getNodeByElement(el: HTMLElement): Stat<any> | null;
            isDraggable(node: Stat<any>): boolean;
            isDroppable(node: Stat<any> | null): boolean;
            _eachDroppable(): any;
        }, ComponentOptionsMixin, DefineComponent<{
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
                    _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
                    _ignoreCheckedOnce(stat: Stat<never>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
            textKey: {
                type: StringConstructor;
                default: string;
            };
            indent: {
                type: NumberConstructor;
                default: number;
            };
            virtualization: {
                type: BooleanConstructor;
                default: boolean;
            };
            virtualizationPrerenderCount: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            statHandler: {
                type: PropType<(stat: Stat<any>) => Stat<any>>;
            };
            rtl: {
                type: BooleanConstructor;
                default: boolean;
            };
            btt: {
                type: BooleanConstructor;
                default: boolean;
            };
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
                    _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
                    _ignoreCheckedOnce(stat: Stat<never>): void;
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
                    childrenKey: string; /**
                     * if remove placeholder when drag leave a tree
                     */
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
            textKey: {
                type: StringConstructor;
                default: string;
            };
            indent: {
                type: NumberConstructor;
                default: number;
            };
            virtualization: {
                type: BooleanConstructor;
                default: boolean;
            };
            virtualizationPrerenderCount: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpen: {
                type: BooleanConstructor;
                default: boolean;
            };
            statHandler: {
                type: PropType<(stat: Stat<any>) => Stat<any>>;
            };
            rtl: {
                type: BooleanConstructor;
                default: boolean;
            };
            btt: {
                type: BooleanConstructor;
                default: boolean;
            };
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
                _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                childrenKey: string; /**
                 * if remove placeholder when drag leave a tree
                 */
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
        }>, Record<string, any>, string, {
            disableDrag: boolean;
            disableDrop: boolean;
            rootDroppable: boolean | RootDroppable;
            dragOpen: boolean;
            dragOpenDelay: number;
            keepPlaceholder: boolean;
            dragCopy: boolean;
        }> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: DebuggerEvent) => void) | ((e: DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: DebuggerEvent) => void) | ((e: DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch(source: string | Function, cb: Function, options?: WatchOptions<boolean> | undefined): WatchStopHandle;
    } & Readonly<ExtractPropTypes<{
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
                _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
                childrenKey: string; /**
                 * if remove placeholder when drag leave a tree
                 */
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
                _ignoreCheckedOnce(stat: Stat<never>): void;
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
                childrenKey: string; /**
                 * if remove placeholder when drag leave a tree
                 */
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
        textKey: {
            type: StringConstructor;
            default: string;
        };
        indent: {
            type: NumberConstructor;
            default: number;
        };
        virtualization: {
            type: BooleanConstructor;
            default: boolean;
        };
        virtualizationPrerenderCount: {
            type: NumberConstructor;
            default: number;
        };
        defaultOpen: {
            type: BooleanConstructor;
            default: boolean;
        };
        statHandler: {
            type: PropType<(stat: Stat<any>) => Stat<any>>;
        };
        rtl: {
            type: BooleanConstructor;
            default: boolean;
        };
        btt: {
            type: BooleanConstructor;
            default: boolean;
        };
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
    } & Readonly<ExtractPropTypes<{
        triggerClass: {
            type: PropType<string | string[]>;
        };
        disableDrag: BooleanConstructor;
        disableDrop: BooleanConstructor;
        eachDraggable: {
            type: PropType<PropDraggable>;
        };
        eachDroppable: {
            type: PropType<PropDroppable>;
        };
        rootDroppable: {
            type: PropType<boolean | RootDroppable>;
            default: boolean;
        };
        /**
         * open closed node when drag over
         */
        dragOpen: {
            type: BooleanConstructor;
            default: boolean;
        };
        dragOpenDelay: {
            type: NumberConstructor;
            default: number;
        };
        /**
         * e.g.: you can load children by ajax in the hook
         */
        beforeDragOpen: {
            type: PropType<BeforeDragOpen>;
        };
        resolveStartMovePoint: {
            type: PropType<"default" | "mouse" | ((dragElement: HTMLElement) => Point)>;
        };
        /**
         * if remove placeholder when drag leave a tree
         */
        keepPlaceholder: {
            type: BooleanConstructor;
        };
        /**
         * prevent drop if greater than maxLevel
         */
        maxLevel: {
            type: NumberConstructor;
        };
        /**
         * copy when drag
         */
        dragCopy: {
            type: BooleanConstructor;
        };
        /**
         * return new data when drag copy
         */
        dragCopyDataHandler: {
            type: PropType<DragCopyDataHandler<any>>;
        };
        onExternalDragOver: {
            type: PropType<OnExternalDragOver>;
        };
        externalDataHandler: {
            type: PropType<ExternalDataHandler>;
        };
    }>> & ShallowUnwrapRef<{}> & {
        treeDraggableInstance: {
            ingoreHTMLTags: string[];
            ifPreventDefault: (event: DragEvent) => boolean;
            beforeDragStart: (event: MouseEvent | TouchEvent) => void | HTMLElement;
            onDragStart: (event: DragEvent) => void;
            onDrag: (event: DragEvent) => void;
            onDragEnter: (event: DragEvent) => void;
            onDragLeave: (event: DragEvent) => void;
            onDragOver: (event: DragEvent) => void;
            onDragEnd: (event: DragEvent) => void;
            onDrop: (event: DragEvent) => void;
            onEnter: (event: DragEvent) => void;
            onLeave: (event: DragEvent) => void;
            root: Element;
            data?: unknown;
            destroy: () => void;
        } | null;
    } & {} & {
        getNodeByElement(el: HTMLElement): Stat<any> | null;
        isDraggable(node: Stat<any>): boolean;
        isDroppable(node: Stat<any> | null): boolean;
        _eachDroppable(): any;
    } & ComponentCustomProperties) | null;
};
declare const cpt: DefineComponent<{
    triggerClass: {
        type: PropType<string | string[]>;
    };
    disableDrag: BooleanConstructor;
    disableDrop: BooleanConstructor;
    eachDraggable: {
        type: PropType<PropDraggable>;
    };
    eachDroppable: {
        type: PropType<PropDroppable>;
    };
    rootDroppable: {
        type: PropType<boolean | RootDroppable>;
        default: boolean;
    };
    /**
     * open closed node when drag over
     */
    dragOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    dragOpenDelay: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * e.g.: you can load children by ajax in the hook
     */
    beforeDragOpen: {
        type: PropType<BeforeDragOpen>;
    };
    resolveStartMovePoint: {
        type: PropType<"default" | "mouse" | ((dragElement: HTMLElement) => Point)>;
    };
    /**
     * if remove placeholder when drag leave a tree
     */
    keepPlaceholder: {
        type: BooleanConstructor;
    };
    /**
     * prevent drop if greater than maxLevel
     */
    maxLevel: {
        type: NumberConstructor;
    };
    /**
     * copy when drag
     */
    dragCopy: {
        type: BooleanConstructor;
    };
    /**
     * return new data when drag copy
     */
    dragCopyDataHandler: {
        type: PropType<DragCopyDataHandler<any>>;
    };
    onExternalDragOver: {
        type: PropType<OnExternalDragOver>;
    };
    externalDataHandler: {
        type: PropType<ExternalDataHandler>;
    };
}, unknown, {
    treeDraggableInstance: ExtendedDND | null;
}, {}, {
    getNodeByElement(el: HTMLElement): Stat<any> | null;
    isDraggable(node: Stat<any>): boolean;
    isDroppable(node: Stat<any> | null): boolean;
    _eachDroppable(): any;
}, ComponentOptionsMixin, DefineComponent<{
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
            _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
            childrenKey: string; /**
             * if remove placeholder when drag leave a tree
             */
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
            _ignoreCheckedOnce(stat: Stat<never>): void;
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
            childrenKey: string; /**
             * if remove placeholder when drag leave a tree
             */
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
    textKey: {
        type: StringConstructor;
        default: string;
    };
    indent: {
        type: NumberConstructor;
        default: number;
    };
    virtualization: {
        type: BooleanConstructor;
        default: boolean;
    };
    virtualizationPrerenderCount: {
        type: NumberConstructor;
        default: number;
    };
    defaultOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    statHandler: {
        type: PropType<(stat: Stat<any>) => Stat<any>>;
    };
    rtl: {
        type: BooleanConstructor;
        default: boolean;
    };
    btt: {
        type: BooleanConstructor;
        default: boolean;
    };
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
            _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
            childrenKey: string; /**
             * if remove placeholder when drag leave a tree
             */
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
            _ignoreCheckedOnce(stat: Stat<never>): void;
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
            childrenKey: string; /**
             * if remove placeholder when drag leave a tree
             */
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
    textKey: {
        type: StringConstructor;
        default: string;
    };
    indent: {
        type: NumberConstructor;
        default: number;
    };
    virtualization: {
        type: BooleanConstructor;
        default: boolean;
    };
    virtualizationPrerenderCount: {
        type: NumberConstructor;
        default: number;
    };
    defaultOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    statHandler: {
        type: PropType<(stat: Stat<any>) => Stat<any>>;
    };
    rtl: {
        type: BooleanConstructor;
        default: boolean;
    };
    btt: {
        type: BooleanConstructor;
        default: boolean;
    };
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
        _ignoreCheckedOnce(stat: Stat<unknown>): void;
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
        childrenKey: string; /**
         * if remove placeholder when drag leave a tree
         */
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
}>, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    triggerClass: {
        type: PropType<string | string[]>;
    };
    disableDrag: BooleanConstructor;
    disableDrop: BooleanConstructor;
    eachDraggable: {
        type: PropType<PropDraggable>;
    };
    eachDroppable: {
        type: PropType<PropDroppable>;
    };
    rootDroppable: {
        type: PropType<boolean | RootDroppable>;
        default: boolean;
    };
    /**
     * open closed node when drag over
     */
    dragOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    dragOpenDelay: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * e.g.: you can load children by ajax in the hook
     */
    beforeDragOpen: {
        type: PropType<BeforeDragOpen>;
    };
    resolveStartMovePoint: {
        type: PropType<"default" | "mouse" | ((dragElement: HTMLElement) => Point)>;
    };
    /**
     * if remove placeholder when drag leave a tree
     */
    keepPlaceholder: {
        type: BooleanConstructor;
    };
    /**
     * prevent drop if greater than maxLevel
     */
    maxLevel: {
        type: NumberConstructor;
    };
    /**
     * copy when drag
     */
    dragCopy: {
        type: BooleanConstructor;
    };
    /**
     * return new data when drag copy
     */
    dragCopyDataHandler: {
        type: PropType<DragCopyDataHandler<any>>;
    };
    onExternalDragOver: {
        type: PropType<OnExternalDragOver>;
    };
    externalDataHandler: {
        type: PropType<ExternalDataHandler>;
    };
}>>, {
    disableDrag: boolean;
    disableDrop: boolean;
    rootDroppable: boolean | RootDroppable;
    dragOpen: boolean;
    dragOpenDelay: number;
    keepPlaceholder: boolean;
    dragCopy: boolean;
}>;
export default cpt;
export declare type DraggableTreeType = InstanceType<typeof cpt>;
export interface StartInfo {
    tree: DraggableTreeType;
    dragNode: Stat<any>;
    parent: Stat<any> | null;
    siblings: Stat<any>[];
    indexBeforeDrop: number;
}
export declare type TargetInfo = StartInfo;
