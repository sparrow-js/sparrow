import Logger from 'zen-logger';
export { Logger };
export function getLogger(config) {
  return new Logger(config);
}