import type { DefineComponent, ComputedRef, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue-demi';
declare const cpt: DefineComponent<Readonly<{
    stat?: any;
    rtl?: any;
    btt?: any;
    indent?: any;
    table?: any;
    treeLine?: any;
    treeLineOffset?: any;
    processor?: any;
}>, {
    indentStyle: ComputedRef<{
        [x: string]: string;
    }>;
    vLines: ComputedRef<{
        style: object;
    }[]>;
    hLineStyle: ComputedRef<{
        [x: string]: string;
    }>;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("open" | "close" | "check")[], "open" | "close" | "check", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<Readonly<{
    stat?: any;
    rtl?: any;
    btt?: any;
    indent?: any;
    table?: any;
    treeLine?: any;
    treeLineOffset?: any;
    processor?: any;
}>>> & {
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onCheck?: ((...args: any[]) => any) | undefined;
}, {
    stat: any;
    rtl: any;
    btt: any;
    indent: any;
    table: any;
    treeLine: any;
    treeLineOffset: any;
    processor: any;
}>;
export default cpt;
export declare type TreeNodeType = InstanceType<typeof cpt>;
