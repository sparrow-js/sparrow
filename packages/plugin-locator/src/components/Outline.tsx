
import { Component, ReactNode } from 'react';
import { ComponentOutLineView } from './ComponentOutline';
import { Locator } from '../locator';
import { observer } from '@firefly/auto-editor-core';

@observer
export class OutLineView extends Component<{ locator: Locator }> {
    render() {
        const { currentElement, iframeBox } = this.props.locator;
        const box = currentElement.getBoundingClientRect();
        if (currentElement.ownerDocument !== document) {
          box.x += iframeBox.x;
          box.y += iframeBox.y;
        }
        return (
          <>
            <div>
              <div
                style={{
                  position: 'fixed',
                  left: `${box.x}px`,
                  top: `${box.y}px`,
                  width: `${box.width}px`,
                  height: `${box.height}px`,
                  backgroundColor: 'rgba(24, 114, 255, 0.6)',
                  textShadow:
                    '-1px 1px 0 #fff, 1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff',
                    textOverflow: 'ellipsis',
                }}
              >
                {currentElement.tagName}
              </div>
            </div>
            <ComponentOutLineView />
          </>
        );
    }
}