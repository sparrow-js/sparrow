import { Component, Fragment, PureComponent } from 'react';
import { BuiltinSimulatorHost } from '../host';
import { computed, observer, Title } from '@firefly/auto-editor-core';
import classNames from 'classnames';


export class BorderDetectingInstance extends PureComponent<{
    title: string;
    rect: DOMRect | null;
    scale: number;
    scrollX: number;
    scrollY: number;
    isLocked?: boolean;
  }> {
    render() {
        const { title, rect, scale, scrollX, scrollY, isLocked } = this.props;
        if (!rect) {
          return null;
        }

        const style = {
          width: rect.width * scale,
          height: rect.height * scale,
          transform: `translate(${(scrollX + rect.left) * scale}px, ${(scrollY + rect.top) * scale}px)`,
        };

        const className = classNames('lc-borders lc-borders-detecting');


        return (
          <div className={className} style={style}>
            <Title title={title} className="lc-borders-title" />
          </div>
        );
    }
  }


@observer
export class BorderDetecting extends Component<{ host: BuiltinSimulatorHost }> {
    @computed get current() {
        const { host } = this.props;
        // const doc = host.currentDocument;
        // if (!doc) {
        //   return null;
        // }
        // const { selection } = doc;
        const { current } = host.designer.detecting;

        // if (!current || current.document !== doc || selection.has(current.id)) {
        //   return null;
        // }
        return current;
    }

    @computed get scale() {
      return this.props.host.viewport.scale;
    }

    @computed get scrollX() {
      return this.props.host.viewport.scrollX;
    }

    @computed get scrollY() {
      return this.props.host.viewport.scrollY;
    }

    render() {
        if (!this.current) return null;
        const { instance } = this.current;
        const rect = instance.getBoundingClientRect();
        const title = instance.tagName;

        return (
          <Fragment>
            <BorderDetectingInstance
              key="line-h"
              title={title}
              scale={this.scale}
              scrollX={this.scrollX}
              scrollY={this.scrollY}
              rect={rect}
            />
          </Fragment>
        );
    }
}