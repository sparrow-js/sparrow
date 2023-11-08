export default {
    code: {
        PageChain: {
          description: 'Construct a zero shot agent from an LLM and tools.',
          base_classes: [
            'AgentExecutor',
            'function',
          ],
          display_name: 'AgentInitializer',
          template: {
            question: {
              required: false,
              placeholder: '',
              show: true,
              multiline: true,
              value: 'Answer the following questions as best you can. You have access to the following tools:',
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
              multiline: false,
              password: false,
              name: 'memory',
              advanced: false,
              type: 'BaseChatMemory',
              list: false,
            },
            tools: {
              required: false,
              placeholder: '',
              show: true,
              multiline: false,
              password: false,
              name: 'tools',
              advanced: false,
              type: 'Tool',
              list: true,
            },
            llm: {
              required: true,
              placeholder: '',
              show: true,
              multiline: false,
              password: false,
              name: 'llm',
              display_name: 'LLM',
              advanced: false,
              type: 'BaseLanguageModel',
              list: false,
            },
          },
        },
      },
};