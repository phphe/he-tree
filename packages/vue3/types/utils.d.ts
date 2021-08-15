import { obj, BaseNode } from "./types";
export declare function genNodeID(): string;
export declare function initNode(node: obj): void;
export declare function convertTreeDataToFlat<T extends obj>(data: T[], childrenKey?: string, idKey?: string): {
    nodes: (T & BaseNode)[];
    nodesByID: Record<string, T & BaseNode>;
};
export declare function convertFlatDataToStandard<T extends obj>(data: T[], idKey?: string, pidKey?: string): {
    nodes: (T & BaseNode)[];
    nodesByID: Record<string, T & BaseNode>;
};
