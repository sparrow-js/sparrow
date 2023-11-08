export function isExtension() {
  return typeof document !== "undefined"
    ? !!document.querySelector(".locatorjs-extension-script")
    : false;
}
