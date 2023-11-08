import * as React from 'react';
export interface InlineTipProps {
    position: string;
    theme?: 'green' | 'black';
    children: React.ReactNode;
}
export default class InlineTip extends React.Component<InlineTipProps> {
    static displayName: string;
    static defaultProps: {
        position: string;
        theme: string;
    };
    render(): React.ReactNode;
}
