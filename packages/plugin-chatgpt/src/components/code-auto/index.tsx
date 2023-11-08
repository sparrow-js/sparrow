import React from 'react';
import { observer, globalContext } from '@firefly/auto-editor-core';
import { Popover, Button, List, Skeleton, Checkbox, Tooltip, Select } from 'antd';
import { Chatgpt } from '../../chatgpt';
import {
  IconReview,
  IconNote,
  IconRefactor,
  IconSync,
  IconClear,
  IconClose,
  IconSure,
  IconPrompt,
} from '../icon';
import {
    Designer,
} from '@firefly/auto-designer';
import { editInsertNode } from '../../../api';
import { ChatCompletionRequestMessage, Role, OperateType } from '../../../types';

interface ComponentPaneProps {
    chatgpt: Chatgpt;
    scrollBottom: () => void;
}

interface ComponentPaneState {
    open: boolean;
    promptOpen: boolean;
}


@observer
export default class CodeAuto extends React.Component<
  ComponentPaneProps,
  ComponentPaneState
> {
    state: ComponentPaneState = {
        open: false,
        promptOpen: false,
    };

    hide = () => {
        this.setState({
            open: false,
        });
    };

    promptHide = () => {
      this.setState({
          promptOpen: false,
      });
    };

    handleOpenChange = () => {
        this.setState({
            open: true,
        });
    };

    handlePromptOpenChange = () => {
      this.setState({
          promptOpen: true,
      });
    };

    onChange = (value: string[]) => {
        const { chatgpt } = this.props;
        chatgpt.setSelectedFiles(value);
        console.log('***', value);
    };

    content() {
        const { chatgpt } = this.props;

        return (
          <div>
            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange} value={chatgpt.selectedFiles}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={chatgpt.changeFiles}
                renderItem={(item) => (
                  <List.Item
                    actions={[<Checkbox value={item.value} />]}
                  >
                    <div>{item.value}</div>
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </div>
        );
    }

    handlerCode = (value: OperateType) => {
        return () => {
            const { chatgpt } = this.props;
            chatgpt.setOperateType(value);
            chatgpt.getWatchChangeFiles();
        };
    };

    syncToCode = async () => {
        const editor = globalContext.get('editor');
        const designer: Designer = editor.get('designer');
        const selection = designer.currentDocument?.selection;
        if (selection) {
          const nodes = selection.getNodes();
          const node = nodes[0];
          if (node) {
            const { instance } = node;
            // const unique = instance.dataset['unique'];
            // const interval = unique.split('::');
            // const res = await editInsertNode({
            //   path: node.id.split('::')[0],
            //   start: interval[0],
            //   end: interval[1],
            //   position: 0,
            //   content: this.props.chatgpt.selection,
            // });
          }
        }
      };

    sureOperateCode = () => {
      const { chatgpt } = this.props;
      chatgpt.startPrompt();
    };

    handlePromptChange = (value: any) => {
      const { chatgpt } = this.props;
      chatgpt.setPrompt(value);
      this.props.scrollBottom();
    };

    promptContent = () => {
      const { chatgpt } = this.props;
      return (
        <div className="prompt-box">
          <Select
            defaultValue="react"
            onChange={this.handlePromptChange}
            style={{ width: 200 }}
            options={chatgpt.promptList}
          />
        </div>
      );
    };

    render() {
        return (
          <div>
            <Tooltip title="同步">
              <span className="mr-6 red-5" onClick={this.syncToCode}>
                {IconSync({})}
              </span>
            </Tooltip>
            <Popover
              content={this.promptContent()}
              placement="bottom"
              title={
                <div>
                  <a onClick={this.promptHide} className="mr-6">{IconClose({})}</a>
                </div>
              }
              trigger="click"
              open={this.state.promptOpen}
              onOpenChange={this.handlePromptOpenChange}
            >
              <span className="mr-6">
                {IconPrompt({})}
              </span>
            </Popover>
            <Popover
              content={this.content()}
              placement="bottom"
              title={
                <div>
                  <a onClick={this.hide} className="mr-6">{IconClose({})}</a>
                  <a className="mr-6" onClick={this.sureOperateCode}>{IconSure({})}</a>
                  <a className="mr-6">{IconClear({})}</a>
                </div>
              }
              trigger="click"
              open={this.state.open}
              onOpenChange={this.handleOpenChange}
            >
              <Tooltip title="code review">
                <span className="mr-6" onClick={this.handlerCode(OperateType.codeReview)}>
                  {IconReview({})}
                </span>
              </Tooltip>

              <Tooltip title="代码注释">
                <span className="mr-6" onClick={this.handlerCode(OperateType.note)}>
                  {IconNote({})}
                </span>
              </Tooltip>
              <Tooltip title="代码重构">
                <span className="mr-6" onClick={this.handlerCode(OperateType.reconfiguration)}>
                  {IconRefactor({})}
                </span>
              </Tooltip>

            </Popover>
          </div>
        );
    }
}