import { Node, Edge, Viewport } from 'reactflow';
export declare type APIObjectType = {
    kind: APIKindType;
    [key: string]: APIKindType;
};
export declare type APIKindType = {
    class: APIClassType;
    [key: string]: APIClassType;
};
export declare type APITemplateType = {
    variable: TemplateVariableType;
    [key: string]: TemplateVariableType;
};
export declare type APIClassType = {
    base_classes: Array<string>;
    description: string;
    template: APITemplateType;
    [key: string]: Array<string> | string | APITemplateType;
};
export declare type TemplateVariableType = {
    type: string;
    required: boolean;
    placeholder?: string;
    list: boolean;
    show: boolean;
    multiline?: boolean;
    value?: any;
    [key: string]: any;
};
export declare type sendAllProps = {
    nodes: Node[];
    edges: Edge[];
    name: string;
    description: string;
    viewport: Viewport;
    message: string;
    chatHistory: {
        message: string;
        isSend: boolean;
    }[];
};
export declare type errorsTypeAPI = {
    function: {
        errors: Array<string>;
    };
    imports: {
        errors: Array<string>;
    };
};
export declare type PromptTypeAPI = {
    input_variables: Array<string>;
};
