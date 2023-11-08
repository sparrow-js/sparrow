import {
    Skeleton as InnerSkeleton,
    Workbench as InnerWorkbench,
} from '@firefly/auto-editor-skeleton';

export default function getSkeletonCabin(skeleton: InnerSkeleton) {
    return {
        Workbench: (props: any) => <InnerWorkbench {...props} skeleton={skeleton} />, // hijack skeleton
    };
}

