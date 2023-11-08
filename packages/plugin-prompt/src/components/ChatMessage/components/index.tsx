import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { FlowType, NodeType } from '../../../types/flow';
import { alertContext } from '../../../contexts/alertContext';
import { toNormalCase } from '../../../utils';
import { typesContext } from '../../../contexts/typesContext';
import ChatMessage from './chatMessage';
import { ChatMessageType, ChatType } from '../../../types/chat';
import ChatInput from './chatInput';

import _, { set } from 'lodash';
import { serialExecute } from '../serialExecute';
import { serialNode } from '../serialNode';
import { chainExecute } from '../../../../api';

export default function Chat({
  flow,
}: {
  flow: FlowType;
}) {
  const [chatValue, setChatValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const { reactFlowInstance } = useContext(typesContext);
  const { setErrorData, setNoticeData } = useContext(alertContext);
  const ws = useRef<WebSocket | null>(null);
  const [lockChat, setLockChat] = useState(false);
  const messagesRef = useRef(null);
  const id = useRef(flow.id);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    id.current = flow.id;
  }, [flow.id]);

  let isStream = false;

  const addChatHistory = (
    message: string,
    isSend: boolean,
    thought?: string,
    files?: any[],
  ) => {
    setChatHistory((old) => {
      let newChat = _.cloneDeep(old);
      if (files) {
        newChat.push({ message, isSend, files, thought });
      } else if (thought) {
        newChat.push({ message, isSend, thought });
      } else {
        newChat.push({ message, isSend });
      }
      return newChat;
    });
  };

  // add proper type signature for function

  function updateLastMessage({
    str,
    thought,
    end = false,
    files,
  }: {
    str?: string;
    thought?: string;
    // end param default is false
    end?: boolean;
    files?: any[];
  }) {
    setChatHistory((old) => {
      let newChat = [...old];
      if (str) {
        if (end) {
          newChat[newChat.length - 1].message = str;
        } else {
          newChat[newChat.length - 1].message =
            newChat[newChat.length - 1].message + str;
        }
      }
      if (thought) {
        newChat[newChat.length - 1].thought = thought;
      }
      if (files) {
        newChat[newChat.length - 1].files = files;
      }
      return newChat;
    });
  }

  function handleOnClose(event: CloseEvent) {}

  function handleWsMessage(data: any) {
    if (Array.isArray(data)) {
      // set chat history
      setChatHistory((_) => {
        let newChatHistory: ChatMessageType[] = [];
        data.forEach(
          (chatItem: {
            intermediate_steps?: 'string';
            is_bot: boolean;
            message: string;
            type: string;
            files?: any[];
          }) => {
            if (chatItem.message) {
              newChatHistory.push(
                chatItem.files
                  ? {
                      isSend: !chatItem.is_bot,
                      message: chatItem.message,
                      thought: chatItem.intermediate_steps,
                      files: chatItem.files,
                    }
                  : {
                      isSend: !chatItem.is_bot,
                      message: chatItem.message,
                      thought: chatItem.intermediate_steps,
                    },
              );
            }
          },
        );
        return newChatHistory;
      });
    }
    if (data.type === 'start') {
      addChatHistory('', false);
      isStream = true;
    }
    if (data.type === 'end') {
      if (data.message) {
        updateLastMessage({ str: data.message, end: true });
      }
      if (data.intermediate_steps) {
        updateLastMessage({
          str: data.message,
          thought: data.intermediate_steps,
          end: true,
        });
      }
      if (data.files) {
        updateLastMessage({
          end: true,
          files: data.files,
        });
      }

      setLockChat(false);
      isStream = false;
    }
    if (data.type === 'stream' && isStream) {
      updateLastMessage({ str: data.message });
    }
  }

  function connectWS() {}

  useEffect(() => {
    connectWS();
    return () => {
      console.log('unmount');
      console.log(ws);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);


  async function sendAll(data: any) {
    console.log(data);
  }

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  function validateNode(n: NodeType): string[] {
    if (!n.data?.node?.template || !Object.keys(n.data.node.template)) {
      setNoticeData({
        title:
          "We've noticed a potential issue with a node in the flow. Please review it and, if necessary, submit a bug report with your exported flow file. Thank you for your help!",
      });
      return [];
    }

    const {
      type,
      node: { template },
    } = n.data;

    return Object.keys(template).reduce(
      (errors: string[], t) => errors.concat(
          template[t].required &&
            template[t].show &&
            (template[t].value === undefined ||
              template[t].value === null ||
              template[t].value === '') &&
            !reactFlowInstance
              .getEdges()
              .some(
                (e) => e.targetHandle.split('|')[1] === t &&
                  e.targetHandle.split('|')[2] === n.id,
              )
            ? [
                `${type} is missing ${
                  template.display_name
                    ? template.display_name
                    : toNormalCase(template[t].name)
                }.`,
              ]
            : [],
        ),
      [] as string[],
    );
  }

  function validateNodes() {
    return reactFlowInstance
      .getNodes()
      .flatMap((n: NodeType) => validateNode(n));
  }

  const ref = useRef(null);


  async function sendMessage() {
    if (chatValue) {
      let message = chatValue;
      setChatValue('');
      addChatHistory(message, true);
      // serialExecute
      const nodes = serialNode(flow);
      console.log(nodes);
      const tasks: any[] = [];
      // nodes.forEach((node) => {
      //   tasks.push((prevResult?: any, pause?: () => void) => {
      //     if (prevResult) {
      //       addChatHistory(`\n${prevResult.data.content}\n`, false);
      //     }
      //     return chainExecute({
      //       value: (prevResult && prevResult.data && prevResult.data.content) || message,
      //       node: node.data,
      //     });
      //   });
      // });
      // const result: any = await serialExecute(tasks);
      // if (result && result.data) {
      //   addChatHistory(`\n${result.data.content}\n`, false);
      // }
    }

    // if (chatValue !== '') {
    //   let nodeValidationErrors = validateNodes();
    //   if (nodeValidationErrors.length === 0) {
    //     setLockChat(true);
    //     let message = chatValue;
    //     setChatValue('');
    //     addChatHistory(message, true);
    //     sendAll({
    //       ...reactFlowInstance.toObject(),
    //       message,
    //       chatHistory,
    //       name: flow.name,
    //       description: flow.description,
    //     });
    //   } else {
    //     setErrorData({
    //       title: 'Oops! Looks like you missed some required information:',
    //       list: nodeValidationErrors,
    //     });
    //   }
    // } else {
    //   setErrorData({
    //     title: 'Error sending message',
    //     list: ['The message cannot be empty.'],
    //   });
    // }
  }
  function clearChat() {
    setChatHistory([]);
  }

  function setModalOpen(x: boolean) {
  }
  return (
    <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="drop-shadow-2xl relative flex flex-col justify-between transform h-[95%] overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all w-[690px]">
        <div className="relative w-full p-4">
          <button
            onClick={() => clearChat()}
            className="absolute top-2 right-10 hover:text-red-500 text-gray-600 dark:text-gray-300 dark:hover:text-red-500 z-30"
          > 清除
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-1.5 right-2 hover:text-red-500 text-gray-600 dark:text-gray-300 dark:hover:text-red-500 z-30"
          >
            关闭
          </button>
        </div>
        <div
          ref={messagesRef}
          className="w-full h-[300px] bg-white dark:bg-gray-800 border-t dark:border-t-gray-600 flex-col flex items-center overflow-scroll scrollbar-hide"
        >
          {chatHistory.length > 0 ? (
                    chatHistory.map((c, i) => (
                      <ChatMessage
                        lockChat={lockChat}
                        chat={c}
                        lastMessage={chatHistory.length - 1 == i}
                        key={i}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col h-full text-center justify-center w-full items-center align-middle">
                      <span>
                        👋{' '}
                        <span className="text-gray-600 dark:text-gray-300 text-lg">
                          Firefly Chat
                        </span>
                      </span>
                      <br />
                      <div className="bg-gray-100 dark:bg-gray-900 rounded-md w-2/4 px-6 py-8 border border-gray-200 dark:border-gray-700">
                        <span className="text-base text-gray-500">
                          Start a conversation and click the agent’s thoughts{' '}
                          <span>
                            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 inline animate-bounce " />
                          </span>{' '}
                          to inspect the chaining process.
                        </span>
                      </div>
                    </div>
                  )}
          <div ref={ref} />
        </div>
        <div className="w-full bg-white dark:bg-gray-800 border-t dark:border-t-gray-600 flex-col flex items-center justify-between p-3">
          <div className="relative w-full  mt-1 rounded-md shadow-sm">
            <ChatInput
              chatValue={chatValue}
              lockChat={lockChat}
              sendMessage={sendMessage}
              setChatValue={setChatValue}
              inputRef={ref}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
