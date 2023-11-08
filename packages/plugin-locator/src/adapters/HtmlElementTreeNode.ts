/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Source } from "@locator/shared";
import { getReferenceId } from "../functions/getReferenceId";
import nonNullable from "../functions/nonNullable";
import { TreeNode, TreeNodeComponent } from "../types/TreeNode";
import { SimpleDOMRect } from "../types/types";

export class HtmlElementTreeNode implements TreeNode {
  type: "element" = "element";
  element: HTMLElement;
  name: string;
  uniqueId: string;
  constructor(element: HTMLElement) {
    this.element = element;
    this.name = element.nodeName.toLowerCase();
    this.uniqueId = String(getReferenceId(element));
  }
  getBox(): SimpleDOMRect | null {
    return this.element.getBoundingClientRect();
  }
  getElement(): Element | Text {
    return this.element;
  }
  getChildren(): TreeNode[] {
    const children = Array.from(this.element.children);
    return children
      .map((child) => {
        if (child instanceof HTMLElement) {
          // @ts-ignore
          return new this.constructor(child);
        } else {
          return null;
        }
      })
      .filter(nonNullable);
  }
  getParent(): TreeNode | null {
    if (this.element.parentElement) {
      // @ts-ignore
      return new this.constructor(this.element.parentElement);
    } else {
      return null;
    }
  }
  getSource(): Source | null {
    throw new Error("Method not implemented.");
  }
  getComponent(): TreeNodeComponent | null {
    throw new Error("Method not implemented.");
  }
}
