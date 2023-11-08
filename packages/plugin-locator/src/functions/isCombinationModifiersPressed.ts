export function getMouseModifiers() {
  const mouseModifiers =
    document.documentElement.dataset.locatorMouseModifiers || "alt";
  const mouseModifiersArray = mouseModifiers.split("+");
  const modifiers: { [key: string]: true } = {};
  mouseModifiersArray.forEach((modifier) => {
    modifiers[modifier] = true;
  }, {});

  return modifiers;
}

export function isCombinationModifiersPressed(e: MouseEvent | KeyboardEvent) {
  const modifiers = getMouseModifiers();
  return (
    e.altKey == !!modifiers.alt &&
    e.ctrlKey == !!modifiers.ctrl &&
    e.metaKey == !!modifiers.meta &&
    e.shiftKey == !!modifiers.shift
  );
}
