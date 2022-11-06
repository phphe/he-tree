import * as hp from "helper-js";
import { Nullable } from "helper-js";
import DragEventService from "drag-event-service";

export const instances = new Map<Element, ExtendedDND>();
export const context = {
  triggerElement: null as Nullable<HTMLElement>,
  dragElement: null as Nullable<HTMLElement>,
  internal: false, // if the dragstart event is internal
  dropEffect: "none" as DataTransfer["dropEffect"],
};
const ctx = context;

function syncDropEffect(e: DragEvent) {
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = ctx.dropEffect;
  }
}

//
export function extendedDND(root: Element, options: Options = {}) {
  if (instances.has(root)) {
    throw "Already registered on specified element";
  }
  // opt is same with thisInstance
  const opt = { ...options }; // clone options object
  const ins = opt as ExtendedDND;
  hp.objectAssignIfNoKey(opt, defaultOptions);
  DragEventService.on(root, "start", beforeDragStart, {
    touchArgs: [{ passive: true }],
  });
  // methods
  function beforeDragStart(e: MouseEvent | TouchEvent) {
    const node = e.target as Node;
    // only process element node
    if (node.nodeType === Node.ELEMENT_NODE) {
      ctx.triggerElement = node as HTMLElement;
    }
    const el = node as HTMLElement;
    // if in ingoreHTMLTags
    if (opt.ingoreHTMLTags && el.tagName) {
      if (opt.ingoreHTMLTags.find((tag) => tag.toUpperCase() === el.tagName)) {
        return;
      }
    }
    const dragElement = opt.beforeDragStart?.(e);
    if (dragElement) {
      dragElement.setAttribute("draggable", "true");
      ctx.dragElement = dragElement;
    }
  }

  function onDragStart(e: DragEvent) {
    ctx.internal = true;
    opt.onDragStart?.(e);
    syncDropEffect(e);
  }

  function onDrag(e: DragEvent) {
    opt.onDrag?.(e);
    syncDropEffect(e);
  }

  function onDragEnd(e: DragEvent) {
    opt.onDragEnd?.(e);
    ctx.internal = false;
    if (ctx.dragElement) {
      ctx.dragElement.removeAttribute("draggable");
    }
    ctx.triggerElement = null;
    ctx.dragElement = null;
    ctx.dropEffect = "none";
  }

  // follow is called on target instance
  const destroyDropZoneListeners = extendedDropZone(root, {
    onDragLeave(e) {
      opt.onDragLeave?.(e);
      syncDropEffect(e);
    },
    onDragEnter(e) {
      ins.ifPreventDefault(e) && e.preventDefault();
      opt.onDragEnter?.(e);
      syncDropEffect(e);
    },
    onDragOver(e) {
      ins.ifPreventDefault(e) && e.preventDefault();
      opt.onDragOver?.(e);
      syncDropEffect(e);
    },
    onDrop(e) {
      ins.ifPreventDefault(e) && e.preventDefault();
      opt.onDrop?.(e);
    },
    onEnter(e) {
      opt.onEnter?.(e);
    },
    onLeave(e) {
      opt.onLeave?.(e);
    },
  });

  hp.on(root, "dragstart", onDragStart);
  hp.on(root, "drag", onDrag);
  hp.on(root, "dragend", onDragEnd);
  // define the destroy function
  // 定义销毁/退出的方法
  const destroy = () => {
    DragEventService.off(root, "start", beforeDragStart, {
      touchArgs: [{ passive: true }],
    });
    hp.off(root, "dragstart", onDragStart);
    hp.off(root, "drag", onDrag);
    hp.off(root, "dragend", onDragEnd);
    destroyDropZoneListeners();
    instances.delete(root);
  };

  Object.assign(opt, {
    root,
    destroy,
  });
  instances.set(root, ins);
  return ins;
}

export const defaultOptions = {
  ingoreHTMLTags: ["INPUT", "TEXTAREA", "SELECT", "OPTGROUP", "OPTION"], // uppercase
  ifPreventDefault(event: DragEvent): boolean {
    return Boolean(context.dragElement);
  },
  beforeDragStart(event: MouseEvent | TouchEvent): void | HTMLElement {},
  onDragStart(event: DragEvent) {},
  onDrag(event: DragEvent) {},
  onDragEnter(event: DragEvent) {},
  onDragLeave(event: DragEvent) {},
  onDragOver(event: DragEvent) {},
  onDragEnd(event: DragEvent) {},
  onDrop(event: DragEvent) {},
};

export type Point = {
  x: number;
  y: number;
};
export type Options = Partial<typeof defaultOptions> & {
  /**
   * custom event, like mouseenter. event belongs to dragenter or dragover
   */
  onEnter?: (event: DragEvent) => void;
  /**
   * custom event, like mouseleave. event belongs to dragenter or dragover
   */
  onLeave?: (event: DragEvent) => void;
};

// ExtendedDND is the return of extendedDND
export type ExtendedDND = Required<Options> & {
  root: Element;
  /**
   * For user to pass custom data between multiple instances
   * 用于用户在多个实例间传递自定义数据
   */
  data?: unknown;
  destroy: () => void;
};

export function extendedDropZone(
  el: Element,
  opt: {
    onEnter?: (event: DragEvent) => void;
    onLeave?: (event: DragEvent) => void;
    onDragEnter?: (event: DragEvent) => void;
    onDragOver?: (event: DragEvent) => void;
    onDragLeave?: (event: DragEvent) => void;
    onDrop?: (event: DragEvent) => void;
    /**
     * for extendedDND's onEnter and onLeave; 用以实现 extendedDND 的 onEnter 和 onLeave
     */
    onEndBeforeLeave?: (event: MouseEvent | TouchEvent | KeyboardEvent) => void;
  } = {}
) {
  let entered = false;
  const onEnter = (e: DragEvent) => {
    entered = true;
    opt.onEnter?.(e);
    endListeners.resume();
  };
  const onDragEnter = (e: DragEvent) => {
    opt.onDragEnter?.(e);
    if (!entered) {
      onEnter(e);
    }
  };
  const onDragOver = (e: DragEvent) => {
    if (!entered) {
      onEnter(e);
    }
    opt.onDragOver?.(e);
  };
  const onDragLeave = (e: DragEvent) => {
    opt.onDragLeave?.(e);
    const doLeave = (event = e) => {
      entered = false;
      opt.onLeave?.(event);
      endListeners.stop();
    }
    if (e.target === el) {
      doLeave()
    } else {
      // @ts-ignore
      el._onLeave_dragover_destroy?.()
      // @ts-ignore
      const destroy = el._onLeave_dragover_destroy = hp.once(window, "dragover", (e2: DragEvent) => {
        if (!hp.pointIn(e2.clientX, e2.clientY, el)) {
          doLeave(e2)
        }
      });
      setTimeout(() => {
        destroy();
      }, 1000);
    }
  };

  const onDrop = (e: DragEvent) => {
    opt.onDrop?.(e);
  };

  const onEndBeforeLeave = (e: any) => {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Escape") {
        return;
      }
    }
    entered = false;
    endListeners.stop();
    opt.onEndBeforeLeave?.(e);
  };
  const endListeners = hp.extendedListen([
    [el, "drop", onEndBeforeLeave],
    [window, "mouseup", onEndBeforeLeave],
    [window, "touchend", onEndBeforeLeave],
    [window, "keydown", onEndBeforeLeave],
  ]);
  endListeners.stop();

  const resume = () => {
    hp.on(el, "dragenter", onDragEnter);
    hp.on(el, "dragover", onDragOver);
    hp.on(el, "dragleave", onDragLeave);
    hp.on(el, "drop", onDrop);
  };
  const destroy = () => {
    hp.off(el, "dragenter", onDragEnter);
    hp.off(el, "dragover", onDragOver);
    hp.off(el, "dragleave", onDragLeave);
    hp.off(el, "drop", onDrop);
    endListeners.stop();
  };

  resume();

  return destroy;
}
