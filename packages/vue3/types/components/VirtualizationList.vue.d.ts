import { PropType } from "vue";
import { obj } from "../types";
declare const _default: import("vue").DefineComponent<{
    items: {
        type: PropType<obj[]>;
        default: () => never[];
    };
    enabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    buffer: {
        type: NumberConstructor;
        default: number;
    };
    minItemHeight: {
        type: NumberConstructor;
        default: number;
    };
    prerender: {
        type: NumberConstructor;
        default: number;
    };
    listTag: {
        type: StringConstructor;
        default: string;
    };
    listClass: {
        type: StringConstructor;
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    gap: {
        type: NumberConstructor;
        default: number;
    };
    afterCalcTop2: {
        type: PropType<(top2: number) => number>;
    };
    isForceVisible: {
        type: PropType<(node: obj, index: number) => boolean>;
    };
}, unknown, {
    start: number;
    end: number;
    top: number;
    bottom: number;
    totalHeight: number;
    itemsHeight: number[];
    mountedPromise: Promise<unknown>;
}, {
    visibleItems(): {
        item: obj;
        index: number;
    }[];
}, {
    getItemElHeight(el: HTMLElement): number;
    update(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    items?: unknown;
    enabled?: unknown;
    buffer?: unknown;
    minItemHeight?: unknown;
    prerender?: unknown;
    listTag?: unknown;
    listClass?: unknown;
    itemClass?: unknown;
    gap?: unknown;
    afterCalcTop2?: unknown;
    isForceVisible?: unknown;
} & {
    enabled: boolean;
    items: obj[];
    buffer: number;
    minItemHeight: number;
    prerender: number;
    listTag: string;
    itemClass: string;
    gap: number;
} & {
    listClass?: string | undefined;
    afterCalcTop2?: ((top2: number) => number) | undefined;
    isForceVisible?: ((node: obj, index: number) => boolean) | undefined;
}>, {
    enabled: boolean;
    items: obj[];
    buffer: number;
    minItemHeight: number;
    prerender: number;
    listTag: string;
    itemClass: string;
    gap: number;
}>;
export default _default;
