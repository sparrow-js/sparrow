export enum Role {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}

export enum OperateType {
  codeReview = 'codeReview',
  note = 'note',
  reconfiguration = 'reconfiguration',
}


/**
 *
 * @export
 * @interface ChatCompletionRequestMessage
 */
export interface ChatCompletionRequestMessage {
  /**
   * The role of the author of this message.
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  role: Role;
  /**
   * The contents of the message
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  content: string;
  /**
   * The name of the user in a multi-user chat
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  name?: string;
  from?: string;
}
