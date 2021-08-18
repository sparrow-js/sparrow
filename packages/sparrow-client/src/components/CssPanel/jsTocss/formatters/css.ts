import prettier from "prettier/standalone";
import prettierCss from "prettier/parser-postcss";
export function formatCss(cssString: string) {
  const prettierOutput = prettier.format(cssString, {
    parser: "css",
    plugins: [prettierCss],
  });

  return prettierOutput.trim();
}
