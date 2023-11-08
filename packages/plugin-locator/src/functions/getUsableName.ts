import { Fiber } from "@locator/shared";

// function printDebugOwnerTree(fiber: Fiber): string | null {
//   let current: Fiber | null = fiber || null;
//   let results = [];
//   while (current) {
//     results.push(getUsableName(current));
//     current = current._debugOwner || null;
//   }
//   console.log('DEBUG OWNER: ', results);
//   return null;
// }
// function printReturnTree(fiber: Fiber): string | null {
//   let current: Fiber | null = fiber || null;
//   let results = [];
//   while (current) {
//     results.push(getUsableName(current));
//     current = current.return || null;
//   }
//   console.log('RETURN: ', results);
//   return null;
// }

export function getUsableName(fiber: Fiber | null | undefined): string {
  if (!fiber) {
    return "Not found";
  }

  if (typeof fiber.elementType === "string") {
    return fiber.elementType;
  }
  if (!fiber.elementType) {
    return "Anonymous";
  }

  if (fiber.elementType.name) {
    return fiber.elementType.name;
  }
  // Not sure about this
  if (fiber.elementType.displayName) {
    return fiber.elementType.displayName;
  }
  // Used in rect.memo
  if (fiber.elementType.type?.name) {
    return fiber.elementType.type.name;
  }
  if (fiber.elementType._payload?._result?.name) {
    return fiber.elementType._payload._result.name;
  }

  return "Anonymous";
}
