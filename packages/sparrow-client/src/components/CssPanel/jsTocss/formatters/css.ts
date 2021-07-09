import prettier from "prettier/standalone";
import prettierCss from "prettier/parser-postcss";

/**
 * Takes some CSS code and formats it.
 * @param cssString string of CSS code
 */
export function formatCss(cssString: string) {
  const prettierOutput = prettier.format(cssString, {
    parser: "css",
    plugins: [prettierCss],
  });

  return prettierOutput.trim();
}
