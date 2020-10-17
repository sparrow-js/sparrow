import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  FileExplorer,
  CodeMirror,
  BrowserPreview,
  SandpackProvider,
} from 'react-smooshpack';
import 'react-smooshpack/dist/styles.css';

const files = {
  '/main.js': {
    code: `
  import Vue from "vue";
    import App from "./App.vue";
    
    Vue.config.productionTip = false;
    
    new Vue({
      render: h => h(App)
    }).$mount("#app");`,
  },
  '/App.vue': {
    code: `
    <template>
  <div id="app">
    hello
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

    `
  }
};

const dependencies = {
  "@vue/cli-plugin-babel": "4.1.1",
  "vue": "^2.6.11"
};


ReactDOM.render(
  <React.StrictMode>
    <SandpackProvider files={files} dependencies={dependencies} entry="/main.js">
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <FileExplorer style={{ width: 300 }} />
        <CodeMirror style={{ flex: 1 }} />
        <BrowserPreview style={{ flex: 1 }} />
      </div>
    </SandpackProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
