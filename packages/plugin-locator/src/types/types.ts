import { Fiber, Target } from "@locator/shared";

export type Source = {
  fileName: string;
  lineNumber: number;
  columnNumber?: number;
  projectPath?: string;
};

type SimpleElement = {
  type: "element";
  name: string;
  uniqueId: string;
  fiber: Fiber;
  box: SimpleDOMRect | null;
  element: Element | Text;
  children: (SimpleElement | SimpleComponent)[];
  source: Source | null;
};

type SimpleComponent = {
  type: "component";
  uniqueId: string;
  name: string;
  fiber: Fiber;
  box: SimpleDOMRect | null;
  children: (SimpleElement | SimpleComponent)[];
  source: Source | null;
  definitionSourceFile: string | null;
};

export type SimpleNode = SimpleElement | SimpleComponent;

export type HighlightedNode = {
  getNode: () => SimpleNode | null;
  setNode: (node: SimpleNode | null) => void;
};

export type SimpleDOMRect = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type Targets = { [k: string]: Target | string };

export type LinkProps = {
  filePath: string;
  projectPath: string;
  line: number;
  column: number;
};

export type ProjectOptions = {
  projectPath?: string;
  templateOrTemplateId?: string;
  adapterId?: string;
  replacePath?: {
      from: string;
      to: string;
  };
  disabled?: boolean;
  showIntro?: boolean;
  welcomeScreenDismissed?: boolean;
  hrefTarget?: '_blank' | '_self';
};

