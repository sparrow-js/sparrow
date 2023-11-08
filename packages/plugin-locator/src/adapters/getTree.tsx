import reactAdapter from "./react/reactAdapter";
import jsxAdapter from "./jsx/jsxAdapter";
import svelteAdapter from "./svelte/svelteAdapter";
import {
  detectJSX,
  detectReact,
  detectSvelte,
  detectVue,
} from "@locator/shared";
import vueAdapter from "./vue/vueAdapter";

export function getTree(target: HTMLElement, adapterId?: string) {
  if (adapterId === "react" && reactAdapter.getTree) {
    return reactAdapter.getTree(target);
  }
  if (adapterId === "svelte" && svelteAdapter.getTree) {
    return svelteAdapter.getTree(target);
  }
  if (adapterId === "vue" && vueAdapter.getTree) {
    return vueAdapter.getTree(target);
  }
  if (adapterId === "jsx" && jsxAdapter.getTree) {
    return jsxAdapter.getTree(target);
  }

  if (detectSvelte() && svelteAdapter.getTree) {
    return svelteAdapter.getTree(target);
  }

  if (detectVue() && vueAdapter.getTree) {
    return vueAdapter.getTree(target);
  }

  if (detectReact() && reactAdapter.getTree) {
    return reactAdapter.getTree(target);
  }

  // Must be last, because its global data leaks from Locator extension.
  // Because the extension is in SolidJS and it uses JSX plugin in dev mode.
  if (detectJSX() && jsxAdapter.getTree) {
    return jsxAdapter.getTree(target);
  }

  return null;
}
