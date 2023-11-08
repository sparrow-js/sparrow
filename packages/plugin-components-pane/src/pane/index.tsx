
import React from 'react';
import classNames from 'classnames';
import { Editor, globalContext } from '@firefly/auto-editor-core';
import Component from '../components/Component';
import './index.less';

export interface PluginProps {
    editor: Editor;
}

interface ComponentPaneProps extends PluginProps {
    [key: string]: any;
}

interface ComponentPaneState {
    keyword: string;
}
export default class ComponentPane extends React.Component<ComponentPaneProps, ComponentPaneState> {
    static displayName = 'LowcodeComponentPane';


    registerAdditive = (shell: HTMLDivElement | null) => {
      if (!shell || shell.dataset.registered) {
        return;
      }

      function getSnippetId(elem: any) {
        if (!elem) {
          return null;
        }
        while (shell !== elem) {
          console.log('elem.classList; ', elem.classList);
          if (elem.classList.contains('snippet')) {
            return elem.dataset.id;
          }
          elem = elem.parentNode;
        }
        return null;
      }
      const { editor } = this.props;
      const designer = editor?.get('designer');
      const _dragon = designer?.dragon;
      if (!_dragon || (!designer)) {
        return;
      }

      // eslint-disable-next-line
      const click = (e: Event) => {};

      shell.addEventListener('click', click);

      _dragon.from(shell, (e: Event) => {
        const doc = designer?.currentDocument;
        const id = getSnippetId(e.target);
        if (!doc || !id) {
          return false;
        }

        const dragTarget = {
          type: 'nodedata',
          data: {
            id,
          },
        };

        return dragTarget;
      });

      shell.dataset.registered = 'true';
    };

    renderContent() {
        return (
          <div className="card-box" ref={this.registerAdditive}>
            <Component
              data={{
                title: 'Text',
                icon: 'https://img.alicdn.com/imgextra/i3/O1CN01n5wpxc1bi862KuXFz_!!6000000003498-55-tps-50-50.svg',
                snippets: [{
                  id: 'Text',
                }],
              }}
              key={'Text'}
            />
            <Component
              data={{
                title: 'img',
                icon: 'https://img.alicdn.com/imgextra/i3/O1CN01tnhXhk1GUIFhsXwzA_!!6000000000625-55-tps-56-56.svg',
                snippets: [{
                  id: 'Image',
                }],
              }}
              key={'img'}
            />
          </div>
        );
    }

    render() {
        return (
          <div className={classNames('lowcode-component-panel')}>
            {this.renderContent()}
          </div>
        );
    }
}