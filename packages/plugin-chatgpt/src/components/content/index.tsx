import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { debounce } from 'lodash';
import * as parser from '@babel/parser';
import { Chatgpt } from '../../chatgpt';
import { observer } from '@firefly/auto-editor-core';


interface ComponentPaneProps {
    content: string;
    chatgpt: Chatgpt;
}

interface ComponentPaneState {
    html: string;
}

@observer
export default class ContentMessage extends React.Component<
  ComponentPaneProps,
  ComponentPaneState
> {
  constructor(props: any) {
    super(props);
    this.getSelection = debounce(this.getSelection, 500, {
      trailing: true,
    });
    document.addEventListener('selectionchange', () => {
      this.getSelection();
    });
  }

  getSelection() {
    const selection = document.getSelection();
    let content = selection?.toString() || '';
    try {
      parser.parse(content, {
        sourceType: 'module',
        plugins: ['jsx'],
      });
    } catch (e) {
      // console.error(e);
      content = '';
    }
    this.props.chatgpt.selection = content;

    return content;
  }


  render() {
      return (
        <div>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                  >{String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >{this.props.content}
          </ReactMarkdown>
        </div>
      );
  }
}