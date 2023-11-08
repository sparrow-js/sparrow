import { evalTemplate } from "./evalTemplate";
import { describe, expect, test } from "vitest";

describe("evalTemplate", () => {
  test("basic", () => {
    const res = evalTemplate("https://example.com/${filePath}${ext}", {
      filePath: "test",
      ext: ".js",
    });
    expect(res).toBe("https://example.com/test.js");
  });
});
