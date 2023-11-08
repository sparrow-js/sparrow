import { Component } from 'react';
import { CustomView } from '@alilc/lowcode-types';
import { SettingField, SettingTopEntry, SettingEntry } from '@alilc/lowcode-designer';
export declare function createSettingFieldView(item: SettingField | CustomView, field: SettingEntry, index?: number): {};
export declare type SettingsPaneProps = {
    target: SettingTopEntry | SettingField;
    usePopup?: boolean;
};
export declare class SettingsPane extends Component<SettingsPaneProps> {
    static contextType: import("react").Context<import("../..").Skeleton>;
    private currentStage?;
    private popupPipe;
    private pipe;
    private handleClick;
    private popStage;
    render(): import("react").JSX.Element;
}
