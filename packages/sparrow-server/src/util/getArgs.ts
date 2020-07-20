export default function getArgs(name: string) {
  if (!name) return '';
  const argv = process.argv;
  return JSON.parse(argv[2])[name];
}