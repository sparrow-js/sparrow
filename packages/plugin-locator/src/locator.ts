import { obx, computed, makeObservable, action } from '@firefly/auto-editor-core';
import { ProjectOptions } from './types/types';
export class Locator {
    @obx.ref private _active: boolean = false;
    private iframe: HTMLIFrameElement;
    iframeBox: any;
    ProjectOptions: ProjectOptions = {
        hrefTarget: '_self',
        adapterId: 'react',
    };

    @obx.ref private _currentElement: HTMLElement = window.document.getElementById('root') as HTMLElement;

    constructor() {
        makeObservable(this);
    }

    get active() {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    get currentElement() {
        return this._currentElement;
    }

    set currentElement(value: HTMLElement) {
        this._currentElement = value;
    }
}