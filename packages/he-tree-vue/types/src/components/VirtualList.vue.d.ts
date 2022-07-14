import type { DefineComponent, Ref, ComputedRef, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes, PropType } from 'vue-demi';
declare const _default: DefineComponent<{
    items: ArrayConstructor;
    disabled: BooleanConstructor;
    horizontal: BooleanConstructor;
    firstRender: {
        type: NumberConstructor;
        default: number;
    };
    buffer: {
        type: NumberConstructor;
        default: number;
    };
    getItemSize: {
        type: PropType<(item: any, index: number) => number | null | undefined | void>;
    };
}, {
    listElRef: Ref<HTMLElement | undefined>;
    listInnerRef: Ref<HTMLElement | undefined>;
    onscroll: () => void;
    listStyle: ComputedRef<{
        overflow: string;
    } | {
        overflow?: undefined;
    }>;
    listInnerStyle: ComputedRef<{
        display: string;
    }>;
    visibleItemsInfo: ComputedRef<{
        item: unknown;
        index: number;
    }[] | undefined>;
    totalHeight: ComputedRef<string>;
    totalWidth: ComputedRef<string>;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    items: ArrayConstructor;
    disabled: BooleanConstructor;
    horizontal: BooleanConstructor;
    firstRender: {
        type: NumberConstructor;
        default: number;
    };
    buffer: {
        type: NumberConstructor;
        default: number;
    };
    getItemSize: {
        type: PropType<(item: any, index: number) => number | null | undefined | void>;
    };
}>>, {
    disabled: boolean;
    horizontal: boolean;
    firstRender: number;
    buffer: number;
}>;
export default _default;
