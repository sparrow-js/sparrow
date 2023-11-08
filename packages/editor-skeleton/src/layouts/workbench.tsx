import { Component } from 'react';
import { TipContainer, observer } from '@alilc/lowcode-editor-core';
import classNames from 'classnames';
import { Skeleton } from '../skeleton';
import LeftArea from './left-area';
import LeftFixedPane from './left-fixed-pane';
import LeftFloatPane from './left-float-pane';
import Toolbar from './toolbar';
import MainArea from './main-area';
import './workbench.less';
import { SkeletonContext } from '../context';
import { EditorConfig, PluginClassSet } from '@alilc/lowcode-types';

@observer
export class Workbench extends Component<{ skeleton: Skeleton; config?: EditorConfig; components?: PluginClassSet; className?: string; topAreaItemClassName?: string }> {
  constructor(props: any) {
    super(props);
    const { config, components, skeleton } = this.props;
    skeleton.buildFromConfig(config, components);
  }

  // componentDidCatch(error: any) {
  //   globalContext.get(Editor).emit('editor.skeleton.workbench.error', error);
  // }

  render() {
    const { skeleton, className, topAreaItemClassName } = this.props;
    return (
      <div className={classNames('lc-workbench', className)}>
        <SkeletonContext.Provider value={this.props.skeleton}>
          <div className="lc-workbench-body">
            <LeftArea area={skeleton.leftArea} />
            <LeftFloatPane area={skeleton.leftFloatArea} />
            <LeftFixedPane area={skeleton.leftFixedArea} />
            <div className="lc-workbench-center">
              <MainArea area={skeleton.mainArea} />
            </div>
          </div>
          <TipContainer />
        </SkeletonContext.Provider>
      </div>
    );
  }
}
