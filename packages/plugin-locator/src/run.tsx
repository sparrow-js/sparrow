import { Component } from 'react';
import { Locator } from './locator';
import { observer } from '@firefly/auto-editor-core';
import { OutLineView } from './components/Outline';
import { Targets } from './shared';

@observer
export class RunView extends Component<{ locator: Locator; targets: Targets }> {
    render() {
        const { locator } = this.props;
        return locator.active ? (
          <div>
            <OutLineView locator={locator} />
          </div>
        ) : null;
    }
}