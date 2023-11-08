import Logger, { Level } from 'zen-logger';
export { Logger };
export declare function getLogger(config: {
    level: Level;
    bizName: string;
}): Logger;
