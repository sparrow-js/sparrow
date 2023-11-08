import { createContext, ReactNode, useEffect, useState } from 'react';
import { Node } from 'reactflow';
import { typesContextType } from '../types/typesContext';
import { APIKindType } from '../types/api';
import alldata from './all.json';


const initialValue: typesContextType = {
  reactFlowInstance: null,
  setReactFlowInstance: () => {},
  deleteNode: () => {},
  types: {},
  setTypes: () => {},
  templates: {},
  setTemplates: () => {},
  data: {},
  setData: () => {},
};

export const typesContext = createContext<typesContextType>(initialValue);

export function TypesProvider({ children }: { children: ReactNode }) {
  const [types, setTypes] = useState({});
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [templates, setTemplates] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    let delay = 1000; // Start delay of 1 second
    let intervalId = null;
    let retryCount = 0; // Count of retry attempts
    const maxRetryCount = 5; // Max retry attempts

    let isMounted = true;

    async function getTypes(): Promise<void> {
      try {
        const result = {
            data: {
              code: {
                PageChain: {
                  description: 'Construct a zero shot agent from an LLM and tools.',
                  base_classes: [
                    'PageChain',
                    'function',
                  ],
                  display_name: 'PageChain',
                  template: {
                    question: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'question',
                      advanced: false,
                      type: 'prompt',
                      list: false,
                    },
                    answer: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'answer',
                      advanced: false,
                      type: 'prompt',
                      list: false,
                    },
                    feature: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      password: false,
                      name: 'feature',
                      advanced: false,
                      type: 'FeatureChain',
                      list: true,
                      auxiliary: true,
                    },
                    store: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'store',
                      advanced: false,
                      type: 'StoreChain',
                      list: false,
                    },
                    api: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'api',
                      advanced: false,
                      type: 'ApiChain',
                      list: false,
                    },
                  },
                },
                StoreChain: {
                  description: '状态管理',
                  base_classes: [
                    'StoreChain',
                    'function',
                  ],
                  display_name: 'StoreChain',
                  template: {
                    question: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'question',
                      advanced: false,
                      type: 'prompt',
                      list: false,
                    },
                    answer: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'answer',
                      advanced: false,
                      type: 'list',
                      list: false,
                      dataList: [],
                    },
                    api: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'api',
                      advanced: false,
                      type: 'ApiChain',
                      list: false,
                    },
                  },
                },
                ApiChain: {
                  description: '接口',
                  base_classes: [
                    'ApiChain',
                    'function',
                  ],
                  display_name: 'ApiChain',
                  template: {
                    question: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'question',
                      advanced: false,
                      type: 'prompt',
                      list: false,
                    },
                    answer: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'answer',
                      advanced: false,
                      type: 'list',
                      list: false,
                      dataList: [],
                    },
                    mock: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'mock',
                      advanced: false,
                      type: 'MockChain',
                      list: false,
                    },
                    step: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'StepChain',
                      advanced: false,
                      type: 'StepChain',
                      list: false,
                      auxiliary: true,
                    },
                  },
                },
                StepChain: {
                  description: 'StepChain',
                  base_classes: [
                    'StepChain',
                    'function',
                  ],
                  display_name: 'StepChain',
                  template: {
                    question: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'question',
                      advanced: false,
                      type: 'prompt',
                      list: false,
                    },
                    answer: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'answer',
                      advanced: false,
                      type: 'list',
                      list: false,
                      dataList: [],
                    },
                  },
                },
                MockChain: {
                  description: 'Mock数据',
                  base_classes: [
                    'MockChain',
                    'function',
                  ],
                  display_name: 'MockChain',
                  template: {
                    question: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'prefix',
                      advanced: false,
                      type: 'prompt',
                      list: false,
                    },
                    answer: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'answer',
                      advanced: false,
                      type: 'list',
                      list: false,
                      dataList: [],
                    },
                  },
                },
              },
              feature: {
                FeatureChain: {
                  description: '新增功能',
                  base_classes: [
                    'FeatureChain',
                    'function',
                  ],
                  display_name: 'FeatureChain',
                  template: {
                    question: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'question',
                      advanced: false,
                      type: 'prompt',
                      list: false,
                    },
                    answer: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'answer',
                      advanced: false,
                      type: 'list',
                      list: false,
                      dataList: [],
                    },
                  },
                },
              },
              file: {
                fileOutput: {
                  description: '文件输出',
                  base_classes: [
                    'FileOutputChain',
                    'function',
                  ],
                  display_name: 'FileOutputChain',
                  template: {
                    code: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: true,
                      value: '',
                      password: false,
                      name: 'custom code',
                      advanced: false,
                      type: 'prompt',
                      list: false,
                    },
                    mock: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'mock',
                      advanced: false,
                      type: 'MockChain',
                      list: false,
                    },
                    store: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'store',
                      advanced: false,
                      type: 'StoreChain',
                      list: false,
                    },
                    api: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'api',
                      advanced: false,
                      type: 'ApiChain',
                      list: false,
                    },
                    page: {
                      required: false,
                      placeholder: '',
                      show: true,
                      multiline: false,
                      password: false,
                      name: 'page',
                      advanced: false,
                      type: 'PageChain',
                      list: false,
                    },
                  },
                },
              },
              // ...alldata,
            },
        } as any;
        console.log('******', result);
        // Make sure to only update the state if the component is still mounted.
        if (isMounted) {
          setData(result.data);
          setTemplates(
            Object.keys(result.data).reduce((acc, curr) => {
              Object.keys(result.data[curr]).forEach((c: keyof APIKindType) => {
                acc[c] = result.data[curr][c];
              });
              return acc;
            }, {} as any),
          );
          // Set the types by reducing over the keys of the result data and updating the accumulator.
          setTypes(
            Object.keys(result.data).reduce((acc, curr) => {
              Object.keys(result.data[curr]).forEach((c: keyof APIKindType) => {
                acc[c] = curr;
                // Add the base classes to the accumulator as well.
                result.data[curr][c].base_classes?.forEach((b) => {
                  acc[b] = curr;
                });
              });
              return acc;
            }, {} as any),
          );
        }
        // Clear the interval if successful.
        clearInterval(intervalId);
      } catch (error) {
        retryCount++;
        // On error, double the delay for the next attempt up to a maximum.
        delay = Math.min(30000, delay * 2);
        // Log errors but don't do anything else - the function will try again on the next interval.
        console.error(error);
        // Clear the old interval and start a new one with the new delay.
        if (retryCount <= maxRetryCount) {
          clearInterval(intervalId);
          intervalId = setInterval(getTypes, delay);
        } else {
          console.error('Max retry attempts reached. Stopping retries.');
        }
      }
    }

    // Start the initial interval.
    intervalId = setInterval(getTypes, delay);

    return () => {
      // This will clear the interval when the component unmounts, or when the dependencies of the useEffect hook change.
      clearInterval(intervalId);
      // Indicate that the component has been unmounted.
      isMounted = false;
    };
  }, []);

  function deleteNode(idx: string) {
    reactFlowInstance.setNodes(
      reactFlowInstance.getNodes().filter((n: Node) => n.id !== idx),
    );
    reactFlowInstance.setEdges(
      reactFlowInstance
        .getEdges()
        .filter((ns) => ns.source !== idx && ns.target !== idx),
    );
  }
  return (
    <typesContext.Provider
      value={{
        types,
        setTypes,
        reactFlowInstance,
        setReactFlowInstance,
        deleteNode,
        setTemplates,
        templates,
        data,
        setData,
      }}
    >
      {children}
    </typesContext.Provider>
  );
}
