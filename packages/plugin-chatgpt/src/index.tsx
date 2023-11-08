
import React from 'react';
import classNames from 'classnames';
import { Editor, observer, globalContext } from '@firefly/auto-editor-core';
import './index.less';
import { Input, Select, Button } from 'antd';
import ContentMessage from './components/content';
import { chatgptInstance, Chatgpt } from './chatgpt';
import {
  Designer,
} from '@firefly/auto-designer';
import { chatgptConnect } from '../api';
import ChatMessage from './components/ChatMessage';

const { TextArea } = Input;


export interface PluginProps {
    editor: Editor;
}

interface ComponentPaneProps extends PluginProps {
    [key: string]: any;
}

interface ComponentPaneState {
    sendMessage: string;
}

@observer
export default class ChatgptPane extends React.Component<ComponentPaneProps, ComponentPaneState> {
    static displayName = 'AutoChatgptPane';
    chatgpt: Chatgpt;
    private messageBox: HTMLDivElement | null = null;

    constructor(props: ComponentPaneProps) {
        super(props);
        this.chatgpt = chatgptInstance;
        this.chatgpt.init();
        this.initConnect();
    }

    async initConnect() {
      const res = await chatgptConnect();
      console.log('********', res);
    }

    state: ComponentPaneState = {
        sendMessage: '',
    };

    handleChatgptKeyChange = (e: any) => {
      this.chatgpt.chatgptKey = e.target.value;
    };

    scrollBottom() {
      setTimeout(() => {
        this.messageBox?.scroll(0, this.messageBox.scrollHeight);
      }, 0);
    }

    onSendMessage = async () => {
      const { sendMessage } = this.state;
      this.setState({
        sendMessage: '',
      });
      const res = await this.chatgpt.chatgptGenerate(sendMessage);
      if (res) {
        this.scrollBottom();
      }
    };

    handlerSendMessage = (e: any) => {
      this.setState({
        sendMessage: e.target.value,
      });
    };

    handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    handlePromptChange = (value: any) => {
      const { chatgpt } = this;
      chatgpt.setCodePrompt(value);
    };

    render() {
        return (
          <div className={classNames('auto-component-panel')}>
            <ChatMessage />
            {/* <div className="code-auto-box">
              <CodeAuto chatgpt={this.chatgpt} scrollBottom={this.scrollBottom} />
            </div> */}
            {/* <div ref={(messageBox) => { this.messageBox = messageBox; }} className="message-box">
              {
                messages.map((item) => {
                  return item.from !== 'built-in' ? (
                    <div className="message-item">
                      <div>
                        <span className="role-name">{item.role}</span>
                      </div>
                      <div>
                        <ContentMessage content={item.content} chatgpt={this.chatgpt} />
                      </div>
                    </div>
                  ) : null;
                })
              }
            </div>
            <div className={classNames('send-box')}>
              <TextArea className={classNames('send-input')} autoSize bordered={false} value={this.state.sendMessage} onChange={this.handlerSendMessage} />
              <Button className="height-24 send-btn" onClick={this.onSendMessage} icon={IconSeed({})} />
            </div> */}
          </div>
        );
    }
}
