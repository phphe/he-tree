export type obj = Record<string, unknown>; // equal to object

export interface BaseNode {
  $id: string | number;
  $pid?: string | number;
  $level: number; // 0 is root
  $hidden?: boolean;
  $folded?: boolean;
  $checked?: boolean | 0;
  $children: Node[];
  $childrenLoading?: boolean;
  $childrenLoadStaus?: obj; // private
  $draggable?: boolean;
  $droppable?: boolean;
  // style
  $nodeStyle?: string | Record<string, string> | unknown;
  $nodeClass?: string | unknown;
  $outerStyle?: string | Record<string, string> | unknown;
  $outerClass?: string | unknown;
}

export type Node = obj & BaseNode;
