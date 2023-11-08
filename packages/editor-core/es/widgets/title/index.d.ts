import { Component, ReactNode } from 'react';
import { TitleContent, I18nData } from '@alilc/lowcode-types';
import './title.less';
export declare class Title extends Component<{
    title: TitleContent;
    className?: string;
    onClick?: () => void;
    match?: boolean;
    keywords?: string;
}> {
    constructor(props: any);
    handleClick(e: React.MouseEvent): void;
    renderLabel: (label: string | I18nData | ReactNode) => import("react").JSX.Element;
    render(): import("react").JSX.Element;
}
