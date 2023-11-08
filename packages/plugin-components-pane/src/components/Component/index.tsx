
import React from 'react';
import classNames from 'classnames';
import './index.less';

interface Props {
    data: any;
}

interface State {
    icon: string | React.ReactNode;
    snippet: any;
}

export default class Component extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props) {
        const { data } = props;
        const { icon, snippets = [] } = data;
        const snippet = snippets[0];
        const screenshot = snippet?.screenshot ?? icon;

        return {
          icon: screenshot,
          snippet,
        };
    }

    state = {
        icon: '',
        snippet: null,
    };

    renderIcon() {
      const { icon } = this.state;

      if (typeof icon === 'string') {
        return <img src={icon} alt="" />;
      }

      if (typeof icon === 'function') {
        const X = icon as any;
        return <X />;
      }

      return icon;
    }

    render() {
        const { data } = this.props;
        const { title } = data;
        const { snippet } = this.state;

        return (
          <div className={classNames('snippet card')} data-id={snippet.id} title={title}>
            <div className={classNames('icon')}>{this.renderIcon()}</div>
            <div className={classNames('name')}>{title}</div>
          </div>
        );
    }
}