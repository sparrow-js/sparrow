import { ReactNode, Component, PureComponent } from 'react';
import './style.less';
export declare const PopupContext: import("react").Context<PopupPipe>;
export declare class PopupPipe {
    private emitter;
    private currentId?;
    create(props?: object): {
        send: (content: ReactNode, title: ReactNode) => void;
        show: (target: Element) => void;
    };
    private popup;
    onPopupChange(fn: (props: object, target?: Element) => void): () => void;
    purge(): void;
}
export default class PopupService extends Component<{
    popupPipe?: PopupPipe;
    actionKey?: string;
    safeId?: string;
}> {
    private popupPipe;
    componentWillUnmount(): void;
    render(): import("react").JSX.Element;
}
export declare class PopupContent extends PureComponent<{
    safeId?: string;
}> {
    static contextType: import("react").Context<PopupPipe>;
    popupContainerId: string;
    state: any;
    private dispose;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onClose: () => void;
    render(): import("react").JSX.Element;
}
