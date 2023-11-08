import cropPath from "./cropPath";
import { describe, expect, test } from "vitest";

describe("cropPath", () => {
  test("crop", () => {
    expect(cropPath("aaa/bbb/ccc/ddd.tsx")).toBe(".../bbb/ccc/ddd.tsx");
    expect(cropPath("/aaa/bbb/ccc/ddd.tsx")).toBe(".../bbb/ccc/ddd.tsx");
  });

  test("no crop", () => {
    // expect(cropPath("/bbb/ccc/ddd.tsx")).toBe("/bbb/ccc/ddd.tsx");
    expect(cropPath("bbb/ccc/ddd.tsx")).toBe("bbb/ccc/ddd.tsx");
    expect(cropPath("/ccc/ddd.tsx")).toBe("/ccc/ddd.tsx");
    expect(cropPath("ccc/ddd.tsx")).toBe("ccc/ddd.tsx");
    expect(cropPath("")).toBe("");
    expect(cropPath("xxx")).toBe("xxx");
  });
});
