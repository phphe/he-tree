// library entry
export { default as BaseTree } from "./components/BaseTree.vue";
import Draggable from "./components/DraggableTree";
export * from "./components/DraggableTree";
export {
  default as Draggable,
  context as dragContext,
} from "./components/DraggableTree";

export function pro(account: string, secretKey: string): typeof Draggable {
  try {
    // @ts-ignore
    return {
      mixins: [Draggable],
      created: new Function(deSecretKey(account, secretKey))(),
    };
  } catch (error) {
    throw new Error("he-tree-pro: wrong secret key");
  }
}

function deSecretKey(account: string, code: string) {
  account = encodeURIComponent(account);
  if (account.length % 2 === 1) {
    account += "h";
  }
  account = account.split("").reverse().join("");
  code = atob(code);
  for (let index = 0; index < account.length; index += 2) {
    const a = account[index];
    const b = account[index + 1];
    code = doubleReplace(code, a, b);
  }
  return join2(
    "arb=inowc=ocmet;etrnfucton){are=1,=tistr{evod !=b}ath(){e&(c_htreWtemak=)=e,._sMve=(=>._eteeatrmrkd.israCoy=)=d.abe,._acDrppbl=(=>.dagop)}",
    code
  );
}

function doubleReplace(str: string, char1: string, char2: string) {
  let r = "";
  for (let index = 0; index < str.length; index++) {
    const char = str[index];
    if (char === char1) {
      r += char2;
    } else if (char === char2) {
      r += char1;
    } else {
      r += char;
    }
  }
  return r;
}

function join2(a: string, b: string) {
  let i = 0;
  let r = "";
  while (true) {
    let index;
    index = i;
    if (index >= b.length) {
      break;
    }
    r += b[index];
    index = i * 2;
    if (index >= a.length) {
      break;
    }
    r += a[index];
    index += 1;
    if (index >= a.length) {
      break;
    }
    r += a[index];
    i++;
  }
  return r;
}
