export function isLocatorsOwnElement(element: HTMLElement) {
  return (
    element.className == "locatorjs-label" ||
    element.id == "locatorjs-labels-section" ||
    element.id == "locatorjs-layer" ||
    element.id == "locatorjs-wrapper" ||
    element.matches("#locatorjs-wrapper *")
  );
}
