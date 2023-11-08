
import reactAdapter from './react/reactAdapter';
import jsxAdapter from './jsx/jsxAdapter';


export type AdapterId = 'react' | 'jsx' | 'svelte' | 'vue';
export function getElementInfo(target: HTMLElement, adapterId?: AdapterId) {
    if (adapterId === 'react') {
        return reactAdapter.getElementInfo(target);
    }

    return (
        reactAdapter.getElementInfo(target),
        jsxAdapter.getElementInfo(target)
    );
}