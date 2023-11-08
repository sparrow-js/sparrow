export default function cropPath(fullPath: string) {
  const array = fullPath.split("/");

  const newPath = array
    .slice(Math.max(array.length - 3, 0), array.length)
    .join("/");
  if (newPath !== fullPath) {
    return `.../${newPath}`;
  } else {
    return newPath;
  }
}
