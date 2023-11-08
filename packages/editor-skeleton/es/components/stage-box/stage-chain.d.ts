import { Stage as StageWidget } from '../../widget/stage';
export default class StageChain {
    private emitter;
    private stage;
    constructor(stage: StageWidget);
    stagePush(stage: StageWidget | null): void;
    stageBack(): void;
    /**
     * 回到最开始
     */
    stageBackToRoot(): void;
    getCurrentStage(): StageWidget;
    onStageChange(func: () => void): () => void;
}
