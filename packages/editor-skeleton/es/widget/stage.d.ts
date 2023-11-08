import Widget from './widget';
import { Skeleton } from '../skeleton';
import { WidgetConfig } from '../types';
export interface StageConfig extends WidgetConfig {
    isRoot?: boolean;
}
export declare class Stage extends Widget {
    readonly isRoot: boolean;
    private previous?;
    private refer?;
    constructor(skeleton: Skeleton, config: StageConfig);
    setPrevious(stage: Stage): void;
    getPrevious(): Stage;
    hasBack(): boolean;
    setRefer(stage: Stage, direction: 'right' | 'left'): void;
    setReferRight(stage: Stage): void;
    setReferLeft(stage: Stage): void;
    getRefer(): {
        stage?: Stage;
        direction?: "left" | "right";
    };
}
