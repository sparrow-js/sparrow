import { Component } from 'react';

import { observer, engineConfig } from '@firefly/auto-editor-core';
import { Designer } from '../designer';
import { BuiltinSimulatorHostView } from '../builtin-simulator';

import './project.less';

export class ProjectView extends Component<{ designer: Designer }> {
    componentDidMount() {
        const { designer } = this.props;
        const { project } = designer;
        project.onRendererReady(() => {
          this.forceUpdate();
        });
    }
    render() {
        const { designer } = this.props;
        const { project } = designer;
        const { simulatorProps } = project;
        const Simulator = designer.simulatorComponent || BuiltinSimulatorHostView;

        return (
          <div className="lc-project">
            <div className="lc-simulator-shell">
              <Simulator {...simulatorProps} />
            </div>
          </div>
        );
      }
}

