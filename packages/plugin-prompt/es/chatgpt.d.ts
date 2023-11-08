import { ChatCompletionRequestMessage, OperateType } from '../types';
export declare class Chatgpt {
    selection: string;
    promptList: any[];
    currentPrompt: any;
    promptId: string;
    chatgptKey: string;
    messages: ChatCompletionRequestMessage[];
    hasConnect: boolean;
    projectRootDir: string;
    changeFiles: Array<{
        value: string;
        label: string;
    }>;
    selectedFiles: string[];
    hasWatchFile: boolean;
    operateType: OperateType;
    promptCodeList: any[];
    codeOperateType: string;
    codeOperateList: Array<{
        label: string;
        value: string;
    }>;
    filePath: string;
    constructor();
    init(): Promise<void>;
    private getPromptList;
    private getCodePromptList;
    /**
     * @description: 生成对话
     * @param {string} text
     */
    setPrompt(value: string): void;
    setCodePrompt(value: string): void;
    startPrompt(): Promise<void>;
    watchProject(path: string): Promise<void>;
    getWatchChangeFiles(): Promise<void>;
    setSelectedFiles(files: string[]): void;
    setOperateType(operateType: OperateType): void;
    getProjectRootPath(): Promise<void>;
    chatgptGenerate(sendMessage: string): Promise<boolean>;
}
