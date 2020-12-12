import React, { Component } from 'react';
import reportWebVitals from './reportWebVitals';
import dependencies from './InitVue/dependencies';
import Init from './InitVue/init';
import Message from './utils/message';
import styles from './PreviewSandBox.module.scss';

import {
  FileExplorer,
  CodeMirror,
  BrowserPreview,
  SandpackProvider,
} from './components';
import 'react-smooshpack/dist/styles.css';
const curfiles: any = {
  ...Init,
};


class PreviewSandBox extends Component {
  state = {
    files: curfiles,
    toggleIde: false,
  }
  
  componentDidMount() {
    Message.on('generate-file', (data: any) => {
      let {files} = this.state;
      files[data.path] = {
        code: data.code
      };
      this.setState({
        files,
      })
    });

    Message.on('generate.ide.toogle', () => {
      let {toggleIde} = this.state;
      this.setState({
        toggleIde: !toggleIde,
      })
    })
  }

  toggleIde = () => {
    const {toggleIde} = this.state;
    this.setState({
      toggleIde: !toggleIde,
    })
  }

  render() {
    const {toggleIde} = this.state;
    return (
      <div className={styles.preview}>
        <SandpackProvider files={this.state.files} dependencies={dependencies} entry="/src/main.js" bundlerURL={'http://192.168.199.156:3000'}>
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div className={styles.previewIdeBox}>
              {
                toggleIde && (
                  <div className={styles.previewIde}>
                    <FileExplorer style={{ width: 200, height: 'fit-content', textAlign: 'left' }} />
                    <CodeMirror style={{ width: 400, textAlign: 'left' }} />
                  </div>
                )
              }
            </div>
            <div className={styles.previewView} style={{ flex: 1 }} >
              <BrowserPreview/>
            </div>
          </div>
        </SandpackProvider>
      </div>
    )
  }
}

export default PreviewSandBox;