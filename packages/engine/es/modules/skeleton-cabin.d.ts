/// <reference types="react" />
import { Skeleton as InnerSkeleton } from '@firefly/auto-editor-skeleton';
export default function getSkeletonCabin(skeleton: InnerSkeleton): {
    Workbench: (props: any) => import("react").JSX.Element;
};
