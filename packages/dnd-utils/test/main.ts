// for test only
import oneDrag from "../src/index";
import * as hp from "helper-js";

// @ts-ignore
const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = document.getElementById("template").innerHTML;
const list = document.getElementById("list");

let destroy;
window["initOnFirst"] = () => {
  destroy?.();
  const r = oneDrag(list.firstElementChild as HTMLElement, {
    onDrop(ctx) {
      ctx.moveElement.setAttribute("style", ctx.styleBackup);
    },
  });
  destroy = r.destroy;
};
window["initOnRoot"] = () => {
  destroy?.();
  const r = oneDrag(list, {
    resolveElements(ctx) {
      if (ctx.triggerElement.tagName !== "LI") {
        return null;
      } else {
        return [ctx.triggerElement, ctx.triggerElement];
      }
    },
    onDrop(ctx) {
      ctx.moveElement.setAttribute("style", ctx.styleBackup);
    },
  });
  destroy = r.destroy;
};
window["initClone"] = () => {
  destroy?.();
  const r = oneDrag(list, {
    beforeDrag(ctx) {
      if (ctx.triggerElement.tagName !== "LI") {
        return null;
      } else {
        const cloned = ctx.triggerElement.cloneNode(true);
        hp.insertAfter(cloned, ctx.triggerElement);
        return { dragElement: ctx.triggerElement };
      }
    },
    onDrop(ctx) {
      hp.removeEl(ctx.moveElement);
    },
  });
  destroy = r.destroy;
};
