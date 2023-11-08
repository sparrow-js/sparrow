
import React from 'react';
import classNames from 'classnames';
import { Editor, observer, globalContext } from '@firefly/auto-editor-core';

import './index.less';
import {
  Designer,
} from '@firefly/auto-designer';
import { Textarea } from './components/textarea';
import { Button } from './components/button';
import { Input } from './components/input';
import { saveSystemInfo, getSystemInfo } from '../api';

export interface PluginProps {
    editor: Editor;
}

interface ComponentPaneProps extends PluginProps {
    [key: string]: any;
}

interface ComponentPaneState {
    systemMessage: string;
    apiKey: string;
    proxyUrl: string;
}

@observer
export default class SystemSettingPane extends React.Component<ComponentPaneProps, ComponentPaneState> {
    static displayName = 'AutoChatgptPane';
    private messageBox: HTMLDivElement | null = null;

    constructor(props: ComponentPaneProps) {
        super(props);
        this.init();
    }

   async init() {
    const res = await getSystemInfo();
    if (res.data) {
      const { systemMessage, apiKey, proxyUrl } = res.data;
      this.setState({
        systemMessage,
        apiKey,
        proxyUrl,
      });
    }
   }

    state: Readonly<ComponentPaneState> = {
      systemMessage: '',
      apiKey: '',
      proxyUrl: '',
    };
    onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(e);
    };

    render() {
        return (
          <div className={classNames('auto-component-panel')}>
            <div>
              <label>system</label>
              <div>
                <Textarea
                  className="form-input h-[200px] w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  value={this.state.systemMessage}
                  onChange={(e) => {
                    this.setState(
                      {
                        systemMessage: e.target.value,
                      },
                    );
                  }}
                  placeholder="System"
                />
              </div>
            </div>
            <div>
              <label>apikey</label>
              <div>
                <Input
                  className="mt-2"
                  onChange={(event) => {
                    this.setState(
                      {
                        apiKey: event.target.value,
                      },
                    );
                   }}
                  type="text"
                  name="apikey"
                  value={this.state.apiKey}
                  placeholder="apikey"
                  id="apikey"
                />
              </div>
            </div>
            <div>
              <label>proxy url</label>
              <div>
                <Input
                  className="mt-2"
                  onChange={(event) => {
                    this.setState(
                      {
                        proxyUrl: event.target.value,
                      },
                    );
                   }}
                  type="text"
                  name="proxyUrl"
                  value={this.state.proxyUrl}
                  placeholder="proxy url"
                  id="proxyUrl"
                />
              </div>
            </div>
            <div className="mt-2">
              <Button onClick={async () => {
                const res = await saveSystemInfo(this.state);
                console.log(res);
              }}
              >
                保存
              </Button>
            </div>
          </div>
        );
    }
}
