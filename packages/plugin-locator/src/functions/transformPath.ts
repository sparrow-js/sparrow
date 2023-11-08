export function transformPath(path: string, from: string, to: string) {
  try {
    return path.replace(new RegExp(`${from}`), to);
  } catch (e) {
    return path;
  }
}
