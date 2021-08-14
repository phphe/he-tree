import * as hp from "helper-js";
import { obj, BaseNode } from "./types";

export function genNodeID() {
  return `ht_${hp.randString(12)}`;
}

export function initNode(node: obj) {
  if (!node.$id) {
    node.$id = genNodeID();
  }
  if (!node.$children) {
    node.$children = [];
  }
}

export function convertTreeDataToFlat<T extends obj>(
  data: T[],
  childrenKey = "children",
  idKey = "id"
) {
  const flatData: T[] = [];
  const mapForPid = new Map();
  hp.walkTreeData(
    data,
    (node, index, parent) => {
      const newNode = { $id: node[idKey], $pid: "", ...node };
      initNode(newNode);
      mapForPid.set(node, newNode.$id);
      newNode.$pid = (parent && mapForPid.get(parent)) || null;
      flatData.push(newNode);
    },
    childrenKey
  );
  return convertFlatDataToStandard(flatData, "$id", "$pid");
}

export function convertFlatDataToStandard<T extends obj>(
  data: T[],
  idKey = "id",
  pidKey = "parent_id"
) {
  const nodesByID: Record<string, T & BaseNode> = {};
  let nodes = data.map((node) => {
    // @ts-ignore
    const newNode: T & BaseNode = {
      $id: <string>node[idKey],
      $pid: <string>node[pidKey],
      ...node,
      $children: [],
    };
    initNode(newNode);
    nodesByID[<string>newNode.$id] = newNode;
    return newNode;
  });
  const top = [];
  for (const node of nodes) {
    if (node.$level == null) {
      node.$level = resolveLevel(node);
    }
    const parent = node.$pid && nodesByID[node.$pid];
    if (parent) {
      parent.$children.push(node);
    }
    if (node.$level === 1) {
      top.push(node);
    }
  }
  nodes = [];
  hp.walkTreeData(
    top,
    (node) => {
      nodes.push(node);
    },
    "$children"
  );
  return { nodes, nodesByID };
  //
  function resolveLevel(node: T & BaseNode): number {
    if (node.$level && node.$level > 0) {
      return node.$level;
    } else {
      const parent = nodesByID[node.$pid || ""];
      if (!parent) {
        return 1;
      } else {
        return resolveLevel(parent) + 1;
      }
    }
  }
}
