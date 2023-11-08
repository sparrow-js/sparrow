import {
    obx,
    autorun,
    reaction,
    computed,
    engineConfig,
    IReactionPublic,
    IReactionOptions,
    IReactionDisposer,
    makeObservable,
    hotkey,
    action,
    observer,
    globalContext,
} from '@firefly/auto-editor-core';
import {
  Designer,
} from '@firefly/auto-designer';
import {
    getPromptList,
    watchProject,
    getProjectRootPath,
    getWatchChangeFiles,
    getCodePromptList,
    startCodeDocument,
    chatgptGenerate,
    executeProduceChain,
} from '../api';
import { ChatCompletionRequestMessage, Role, OperateType } from '../types';

  export class Chatgpt {
    @obx.ref selection: string;
    @obx.ref promptList: any[];
    @obx.ref currentPrompt: any;
    promptId: string = 'react';
    @obx.ref chatgptKey: string;
    @obx messages: ChatCompletionRequestMessage[] = [];
    hasConnect: boolean = false;
    projectRootDir: string = '';
    @obx changeFiles: Array<{
      value: string;
      label: string;
    }> = [];
    @obx selectedFiles: string[] = [];
    hasWatchFile: boolean = false;
    operateType: OperateType;
    promptCodeList: any[];
    codeOperateType: string = 'modify';
    filePath: string = '';
    chainId: string = '82f74522-d882-4507-8c0c-70f15bc9a4e4';
    pagePath: string = '';

    constructor() {
        makeObservable(this);
    }
    async init() {
      await this.getProjectRootPath();
      if (this.projectRootDir) {
        this.watchProject(this.projectRootDir);
      }
    }

    /**
     * @description: 生成对话
     * @param {string} text
     */
    setPrompt(value: string) {
      this.promptId = value;
      const prompt = this.promptList.find((item) => item.value === value);
      if (prompt) {
        this.currentPrompt = prompt;
        this.messages = [].concat(this.currentPrompt.messages);
      }
    }

    setCodePrompt(value: string) {
      this.codeOperateType = value;
    }

    async startPrompt() {
      this.messages = [];
      const res = await startCodeDocument({
        files: this.selectedFiles,
        promptType: this.operateType,
      });
      if (res.data) {
        this.messages = res.data.messages;
      }
    }

    async watchProject(path: string) {
      const res = await watchProject({
        dir: path,
      });
      if (res.data) {
        this.hasWatchFile = true;
      }
    }

    async getWatchChangeFiles() {
      const res = await getWatchChangeFiles();
      if (res.data) {
        this.changeFiles = res.data.files.map((item: string) => {
          return {
            value: item,
            label: item,
          };
        });
      }
    }

    @action
    setSelectedFiles(files: string[]) {
      this.selectedFiles = files;
    }

    @action
    setOperateType(operateType: OperateType) {
      this.operateType = operateType;
    }

    async getProjectRootPath() {
      const Iframe = document.getElementsByClassName('lc-simulator-content-frame')[0] as HTMLIFrameElement;
      const app = Iframe.contentDocument?.querySelector('div[data-uid*="/"]');
      const pages = Iframe.contentDocument?.querySelector('div[data-uid*="pages"]');

      if (app) {
        let path = (app as HTMLElement).dataset['locatorjsId'];
        path = path ? path.split('::')[0] : '';
        if (path) {
          const res = await getProjectRootPath({
            path,
          });
          if (res.data) {
            this.projectRootDir = res.data.rootDir;
          }
        }
      }

      if (pages) {
        let pagePath = (pages as HTMLElement).dataset['locatorjsId'];
        pagePath = pagePath ? pagePath.split('::')[0] : '';
        if (pagePath) {
          this.pagePath = pagePath;
        }
      }
    }

    async chatgptGenerate(sendMessage: string) {
      const { messages } = this;
      if (!sendMessage) return;
      const message = {
        role: Role.user,
        content: sendMessage,
      };
      messages.push(message);
      const res = await chatgptGenerate({
        message,
        path: this.filePath,
      });
      const { data } = res;
      if (data.url) {
        const editor = globalContext.get('editor');
        const designer: Designer = editor.get('designer');
        let urlObj = new URL(location.href);
        let urlParam = new URL(urlObj.searchParams.get('url') || '');
        let url = `${urlParam.origin}${data.url}`;
        designer.project.simulator?.modifySimulatorUrl(url, `${urlObj.origin}/?url=${url}`);
      }
      if (data.path) {
        this.filePath = data.path;
      }
      if (data.chainId) {
        this.chainId = data.chainId;
      }
      if (data && data.message) {
        messages.push(data.message);
        return data.message;
      }
      return null;
    }

    async executeProduceChain() {
      console.log('*********', this.chainId);
      const res = await executeProduceChain({
        chainId: this.chainId,
        pagePath: this.pagePath,
      });
    }
  }
const chatgptInstance = new Chatgpt();
export {
  chatgptInstance,
};