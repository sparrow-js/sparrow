import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { toNormalCase } from '../../../utils';
import ChatMessage from './chatMessage';
import { ChatMessageType } from '../../../../types/chat';
import ChatInput from './chatInput';
import { chatgptGenerate } from '../../../../api';

import _, { set } from 'lodash';
import { chatgptInstance } from '../../../chatgpt';
import { IconChain } from '../IconChain';
import { IconClear } from '../IconClear';


export default function Chat() {
  const [chatValue, setChatValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const [lockChat, setLockChat] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatHistory]);

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

  const ref = useRef(null);

  async function sendMessage() {
    if (chatValue) {
      let message = chatValue;
      setChatValue('');
      addChatHistory(message, true);
      const res = await chatgptInstance.chatgptGenerate(message);
      if (res) {
        addChatHistory(res.content, false);
      }
      console.log(res);
    }
  }
  function clearChat() {
    setChatHistory([]);
  }

  function executeChain() {
    chatgptInstance.executeProduceChain();
  }

  function setModalOpen(x: boolean) {}
  return (
    <div className="flex h-full items-end text-center sm:items-center sm:p-0">
      <div className="w-full relative flex flex-col transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all h-full">
        <div className="relative w-full p-4">
          <button
            onClick={() => executeChain()}
            className="absolute top-2 right-10 hover:text-red-500 text-gray-600 dark:text-gray-300 dark:hover:text-red-500 z-30"
          > {IconChain({})}
          </button>
          <button
            onClick={() => clearChat()}
            className="absolute top-2 right-2 hover:text-red-500 text-gray-600 dark:text-gray-300 dark:hover:text-red-500 z-30"
          > {IconClear({})}
          </button>
        </div>
        <div
          ref={messagesRef}
          className="w-full bg-white dark:bg-gray-800 border-t dark:border-t-gray-600 flex-col flex items-center overflow-scroll scrollbar-hide mt-2"
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
                    <div className="flex flex-col h-full text-center w-full items-center align-middle mt-2">
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
        <div className="w-full bg-white dark:bg-gray-800 border-t dark:border-t-gray-600 flex-col flex items-center justify-between p-3 absolute bottom-0">
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
