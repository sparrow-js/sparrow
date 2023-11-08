
import React from 'react';
import classNames from 'classnames';
import { Editor, observer, globalContext } from '@firefly/auto-editor-core';
import './index.less';
import { Input, Select, Button } from 'antd';
import App from './App';
import ContextWrapper from './contexts';
import '../output.css';

import {
  Designer,
} from '@firefly/auto-designer';

export interface PluginProps {
    editor: Editor;
}

interface ComponentPaneProps extends PluginProps {
    [key: string]: any;
}

interface ComponentPaneState {
    showKeyInput: boolean;
    sendMessage: string;
}

@observer
export default class ChatgptPane extends React.Component<ComponentPaneProps, ComponentPaneState> {
    static displayName = 'AutoChatgptPane';
    chatgpt: Chatgpt;
    private messageBox: HTMLDivElement | null = null;

    // constructor(props: ComponentPaneProps) {
    //     super(props);
    // }

    render() {
        return (
          <div className={classNames('auto-component-panel isolate')}>
            <ContextWrapper>
              <App />
            </ContextWrapper>
          </div>
        );
    }
}
