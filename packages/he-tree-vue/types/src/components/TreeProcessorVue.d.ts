import type { Stat, Options } from '@he-tree/tree-utils';
export * from "@he-tree/tree-utils";
export declare function vueMakeTreeProcessor<T>(data: T[], options?: Options): {
    data: T[];
    stats: Stat<T>[] | null;
    statsFlat: Stat<T>[] | null;
    _statsMap: Map<T, Stat<T>> | null;
    initialized: boolean;
    init(): void;
    getStat(nodeData: T): Stat<T>;
    has(nodeData: T | Stat<T>): boolean;
    _getPathByStat(stat: Stat<T> | null): any;
    afterOneCheckChanged(stat: Stat<T>): boolean;
    _ignoreCheckedOnce(stat: Stat<T>): void;
    isVisible(statOrNodeData: T | Stat<T>): boolean;
    updateCheck(): void;
    getChecked(withDemi?: boolean | undefined): Stat<T>[];
    getUnchecked(withDemi?: boolean | undefined): Stat<T>[];
    openAll(): void;
    closeAll(): void;
    openNodeAndParents(nodeOrStat: T | Stat<T>): void;
    _calcFlatIndex(parent: Stat<T> | null, index: number): number;
    add(nodeData: T, parent?: Stat<T> | null | undefined, index?: number | null | undefined): void;
    remove(stat: Stat<T>): boolean;
    getSiblings(stat: Stat<T>): Stat<T>[];
    _setPosition(stat: Stat<T>, parent: Stat<T> | null, index: number): void;
    iterateParent(stat: Stat<T>, opt?: {
        withSelf: boolean;
    } | undefined): Generator<Stat<T>, void, unknown>;
    move(stat: Stat<T>, parent: Stat<T> | null, index: number): boolean;
    _flat(stat: Stat<T>): Stat<T>[];
    _count(stat: Stat<T>): number;
    getData(filter?: ((data: T) => T) | undefined, root?: Stat<T> | undefined): T | T[];
    noInitialization: boolean;
    childrenKey: string;
    defaultOpen: boolean;
    statsHandler: (stats: Stat<any>[]) => Stat<any>[];
    statsFlatHandler: (statsFlat: Stat<any>[]) => Stat<any>[];
    afterSetStat: (stat: Stat<any>, parent: Stat<any> | null, index: number) => void;
    afterRemoveStat: (stat: Stat<any>) => void;
    statHandler: (stat: Stat<any>) => Stat<any>;
};
