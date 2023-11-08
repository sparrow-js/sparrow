import React, { Component } from 'react';
import { BuiltinSimulatorHost } from '../host';
import { observer } from '@alilc/lowcode-editor-core';
import { BorderDetecting } from './border-detecting';
import { BorderSelecting } from './border-selecting';
import { InsertionView } from './insertion';


import './bem-tools.less';
import './borders.less';


@observer
export class BemTools extends Component<{ host: BuiltinSimulatorHost }> {
    render() {
        const { host } = this.props;
        const { designMode } = host;
        const { scrollX, scrollY, scale } = host.viewport;
        if (designMode === 'live') {
          return null;
        }
        return (
          <div className="lc-bem-tools" style={{ transform: `translate(${-scrollX * scale}px,${-scrollY * scale}px)` }}>
            <InsertionView key="insertion" host={host} />
            <BorderSelecting key="selecting" host={host} />
            <BorderDetecting host={host} />
          </div>
        );
    }
}