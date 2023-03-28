import * as hp from "helper-js";

export const CHILDREN = "children"; // inner childrenKey
/**
 * help to handle tree data. 帮助处理树形数据.
 */
export function makeTreeProcessor<T>(data: T[], opt: Options = {}) {
  const opt2 = opt as Required<Options>;
  const utilsBase = {
    ...defaultOptions,
    ...opt2,
    data,
    stats: null as Stat<T>[] | null,
    statsFlat: null as Stat<T>[] | null,
    _statsMap: null as Map<T, Stat<T>> | null,
    initialized: false,
    init() {
      const { data, childrenKey } = this;
      const td = new hp.TreeData([] as Stat<T>[]);
      this._statsMap = new Map();
      hp.walkTreeData(
        data,
        (nodeData, index, parent, path) => {
          const stat = this.statHandler({
            ...statDefault(),
            data: nodeData,
            open: Boolean(this.defaultOpen),
            parent: td.getParent(path),
            children: [],
            level: path.length,
          });
          this._statsMap!.set(nodeData, stat);
          td.set(path, stat);
        },
        { childrenKey }
      );
      const statsFlat: typeof td.rootChildren = [];
      td.walk((stat) => {
        statsFlat.push(stat);
      });
      this.stats = this.statsHandler(td.rootChildren);
      this.statsFlat = this.statsFlatHandler(statsFlat);
      this.initialized = true;
    },
    getStat(nodeData: T) {
      let r: Stat<T> = this._statsMap!.get(nodeData)!;
      if (!r) {
        throw new StatNotFoundError(`Stat not found`);
      }
      return r;
    },
    has(nodeData: T | Stat<T>) {
      if (nodeData["isStat"]) {
        // @ts-ignore
        return this.statsFlat.indexOf(nodeData) > -1;
      } else {
        try {
          // @ts-ignore
          let r = this.getStat(nodeData);
          return Boolean(r);
        } catch (error) {
          if (error instanceof StatNotFoundError) {
            return false;
          }
          throw error;
        }
      }
    },
    _getPathByStat(stat: Stat<T> | null) {
      if (stat == null) {
        return [];
      }
      const siblings = this.getSiblings(stat);
      const index = siblings.indexOf(stat);
      return [...(stat.parent ? this._getPathByStat(stat.parent) : []), index];
    },
    /**
     * call it after a stat's `checked` changed
     * @param stat
     * @returns return false mean ignored
     */
    afterOneCheckChanged(stat: Stat<T>) {
      const { checked } = stat;
      if (stat._ignoreCheckedOnce) {
        delete stat._ignoreCheckedOnce;
        return false;
      }

      // change parent
      const checkParent = (stat: any) => {
        const { parent } = stat;
        if (parent) {
          let hasChecked;
          let hasUnchecked;
          for (const child of parent.children) {
            if (child.checked) {
              hasChecked = true;
            } else {
              hasUnchecked = true;
              if (hasChecked) {
                break;
              }
            }
          }
          const parentChecked = !hasUnchecked ? true : hasChecked ? 0 : false;
          if (parent.checked !== parentChecked) {
            parent._ignoreCheckedOnce = true;
            parent.checked = parentChecked;
          }
          checkParent(parent);
        }
      };
      checkParent(stat);
      // change children
      hp.walkTreeData(
        stat.children,
        (child) => {
          if (child.checked !== checked) {
            child._ignoreCheckedOnce = true;
            child.checked = checked;
          }
        },
        { childrenKey: CHILDREN }
      );
      return true;
    },
    isVisible(statOrNodeData: T | Stat<T>) {
      // @ts-ignore
      const stat: Stat<T> = statOrNodeData["isStat"] ? statOrNodeData : this.getStat(statOrNodeData); // prettier-ignore
      const walk = (stat: Stat<T> | null) => {
        return !stat || (!stat.hidden && stat.open && walk(stat.parent));
      };
      return Boolean(!stat.hidden && walk(stat.parent));
    },
    /**
     * call it to update all stats' `checked`
     */
    updateCheck() {
      hp.walkTreeData(
        this.stats!,
        (stat) => {
          if (stat.children && stat.children.length > 0) {
            const checked = stat.children.every((v) => v.checked);
            if (stat.checked !== checked) {
              stat._ignoreCheckedOnce = true;
              stat.checked = checked;
            }
          }
        },
        { childFirst: true, childrenKey: CHILDREN }
      );
    },
    getChecked(withDemi = false) {
      return this.statsFlat!.filter((v) => {
        return v.checked || (withDemi && v.checked === 0);
      });
    },
    getUnchecked(withDemi = true) {
      return this.statsFlat!.filter((v) => {
        return withDemi ? !v.checked : v.checked === false;
      });
    },
    /**
     * open all nodes
     */
    openAll() {
      for (const stat of this.statsFlat!) {
        stat.open = true;
      }
    },
    /**
     * close all nodes
     */
    closeAll() {
      for (const stat of this.statsFlat!) {
        stat.open = false;
      }
    },
    // actions
    _calcFlatIndex(parent: Stat<T> | null, index: number) {
      let flatIndex = parent ? this.statsFlat!.indexOf(parent) + 1 : 0;
      const siblings = parent ? parent.children : this.stats!;
      for (let i = 0; i < index; i++) {
        flatIndex += this._count(siblings[i]);
      }
      return flatIndex;
    },
    add(nodeData: T, parent?: Stat<T> | null, index?: number | null) {
      if (this.has(nodeData)) {
        throw `Can't add because data exists in tree`;
      }
      const siblings = parent ? parent.children : this.stats!;
      if (index == null) {
        index = siblings.length;
      }
      const stat: Stat<T> = this.statHandler({
        ...statDefault(),
        open: Boolean(this.defaultOpen),
        data: nodeData,
        parent: parent || null,
        children: [],
        level: parent ? parent.level + 1 : 1,
      });
      this._setPosition(stat, parent || null, index);
      const children = nodeData[this.childrenKey];
      if (children) {
        const childrenSnap = children.slice();
        for (const child of childrenSnap) {
          this.add(child, stat);
        }
      }
    },
    remove(stat: Stat<T>) {
      const siblings = this.getSiblings(stat);
      if (siblings.includes(stat)) {
        hp.arrayRemove(siblings, stat);
        const stats = this._flat(stat);
        this.statsFlat!.splice(this.statsFlat!.indexOf(stat), stats.length);
        for (const stat of stats) {
          this._statsMap!.delete(stat.data);
        }
        this.afterRemoveStat(stat);
        return true;
      }
      return false;
    },
    getSiblings(stat: Stat<T>) {
      const { parent } = stat;
      return parent ? parent.children : this.stats!;
    },
    /**
     * The node should not exsit.
     * @param node
     * @param parent
     * @param index
     */
    _setPosition(stat: Stat<T>, parent: Stat<T> | null, index: number) {
      const siblings = parent ? parent.children : this.stats!;
      siblings.splice(index, 0, stat);
      stat.parent = parent;
      stat.level = parent ? parent.level + 1 : 1;
      const flatIndex = this._calcFlatIndex(parent, index);
      const stats = this._flat(stat);
      this.statsFlat!.splice(flatIndex, 0, ...stats);
      for (const stat of stats) {
        if (!this._statsMap!.has(stat.data)) {
          this._statsMap!.set(stat.data, stat);
        }
      }
      hp.walkTreeData(
        stat,
        (node, index, parent) => {
          if (parent) {
            node.level = parent.level + 1;
          }
        },
        { childrenKey: CHILDREN }
      );
      this.afterSetStat(stat, parent, index);
    },
    *iterateParent(stat: Stat<T>, opt?: { withSelf: boolean }) {
      let t = opt?.withSelf ? stat : stat.parent;
      while (t) {
        yield t;
        t = t.parent;
      }
    },
    move(stat: Stat<T>, parent: Stat<T> | null, index: number) {
      if (this.has(stat)) {
        if (
          stat.parent === parent &&
          this.getSiblings(stat).indexOf(stat) === index
        ) {
          return false;
        }
        // check if is self
        if (stat === parent) {
          // 不允许移动目标为自己
          throw new Error(`Can't move node to it self`);
        }
        // check if is descendant
        if (parent && stat.level < parent.level) {
          let t;
          for (const item of this.iterateParent(parent)) {
            if (item.level === stat.level) {
              t = item;
              break;
            }
          }
          if (stat === t) {
            // 不允许移动节点到其后代节点下
            throw new Error(`Can't move node to its descendant`);
          }
        }
        this.remove(stat);
      }
      this._setPosition(stat, parent, index);
      return true;
    },
    /**
     * convert stat and its children to one-dimensional array
     * 转换节点和其后代节点为一维数组
     * @param stat
     * @returns
     */
    _flat(stat: Stat<T>) {
      const r: Stat<T>[] = [];
      hp.walkTreeData(
        stat,
        (child) => {
          r.push(child);
        },
        { childrenKey: CHILDREN }
      );
      return r;
    },
    /**
     * get count of stat and its all children
     * 统计节点和其后代节点数量
     * @param stat
     */
    _count(stat: Stat<T>) {
      return this._flat(stat).length;
    },
    getData(filter?: (data: T) => T, root?: Stat<T>) {
      const { childrenKey } = this;
      const td = new hp.TreeData<T>([]);
      td.childrenKey = childrenKey;
      hp.walkTreeData(
        root || this.stats!,
        (stat, index, parent, path) => {
          let newData = { ...stat.data, [childrenKey]: [] };
          if (filter) {
            // @ts-ignore
            newData = filter(newData);
          }
          td.set(path, newData);
        },
        {
          childrenKey: CHILDREN,
        }
      );
      return td.data;
    },
  };
  type Base = typeof utilsBase;
  const utils: Base & {} = utilsBase;
  if (!utilsBase.noInitialization) {
    utils.init();
  }
  return utils;
}

export type TreeProcessor = ReturnType<typeof makeTreeProcessor>;

export const defaultOptions = {
  childrenKey: "children",
  defaultOpen: false,
  statsHandler(stats: Stat<any>[]) {
    return stats;
  },
  statsFlatHandler(statsFlat: Stat<any>[]) {
    return statsFlat;
  },
  afterSetStat(stat: Stat<any>, parent: Stat<any> | null, index: number) {},
  afterRemoveStat(stat: Stat<any>) {},
  statHandler(stat: Stat<any>) {
    return stat;
  },
};

export interface Options extends Partial<typeof defaultOptions> {
  /**
   * don't call init. You can call it manually later.
   */
  noInitialization?: boolean;
}

export interface Stat<T> extends ReturnType<typeof statDefault> {
  [x: string]: any;
  data: T;
  open: boolean;
  parent: Stat<T> | null;
  children: Stat<T>[];
  level: number;
}

export function statDefault() {
  return {
    isStat: true,
    hidden: false,
    checked: false,
    style: null,
    class: null,
    draggable: null,
    droppable: null,
  } as {
    isStat: true;
    hidden: boolean;
    checked: boolean | 0; // 0 mean just part of children checked
    draggable: boolean | null; //null mean inhert parent
    droppable: boolean | null; //null mean inhert parent
    style: any;
    class: any;
  };
}

class StatNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StatNotFoundError";
  }
}
