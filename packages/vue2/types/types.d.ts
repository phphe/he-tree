export declare type obj = Record<string, unknown>;
export interface BaseNode {
    $id: string | number;
    $pid?: string | number;
    $level: number;
    $hidden?: boolean;
    $folded?: boolean;
    $checked?: boolean | 0;
    $children: Node[];
    $childrenLoading?: boolean;
    $childrenLoadStaus?: obj;
    $draggable?: boolean;
    $droppable?: boolean;
    $nodeStyle?: string | Record<string, string> | unknown;
    $nodeClass?: string | unknown;
    $outerStyle?: string | Record<string, string> | unknown;
    $outerClass?: string | unknown;
}
export declare type Node = obj & BaseNode;
