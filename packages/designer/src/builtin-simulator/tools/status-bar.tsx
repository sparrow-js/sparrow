import { Component } from 'react';
import { observer, computed } from '@firefly/auto-editor-core';
import { BuiltinSimulatorHost } from '../host';
import './status-bar.less';


@observer
export class StatusBar extends Component<{ host: BuiltinSimulatorHost }> {
  get host(): BuiltinSimulatorHost {
    return this.props.host;
  }

  @computed get detecting() {
    const { host } = this.props;
    const { current } = host.designer.detecting;
    return current;
  }

  @computed get selecting() {
    const doc = this.host.currentDocument;
    if (!doc || doc.suspensed) {
      return null;
    }
    const { selection } = doc;
    return selection.getNodes();
  }

  render() {
    const { selecting } = this;
    let path = '';
    if (selecting && selecting[0]) {
      path = selecting[0].id;
    } else if (this.detecting) {
      const { instance } = this.detecting;
      path = instance.dataset['locatorjsId'];
    }
    return (
      <div className="status-bar">
        {path ? (
          <span className="file-path">{path}</span>
        ) : null }
      </div>
    );
  }
}