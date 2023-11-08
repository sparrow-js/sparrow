English | [简体中文](./README.md)

## Project Overview
This project aims to provide functionalities that assist frontend development, allowing for editing of source code for projects using React, Vue, and similar technologies. Additionally, we plan to gradually introduce ChatGPT technology to explore the application of generative artificial intelligence in frontend development. This project is a modification based on the lowcode-engine. If you are interested in the principles, you can refer to the [lowcode-engine documentation](https://github.com/alibaba/lowcode-engine).

![Project Homepage Screenshot](https://raw.githubusercontent.com/sparrow-js/firefly/main/docs/12345.png)

![Task Chain Screenshot](https://raw.githubusercontent.com/sparrow-js/firefly/main/docs/56789.png)

---

## Installation

```bash
# Global installation
$ npm install -g firefly-code

# run
$ firefly
```

---

## Adding the firefly-babel-jsx Plugin to the Project
```js
// vite project
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'firefly-babel-jsx/dist',
            {
              env: 'development',
            },
          ],
        ],
      },
    }),
    resolveExternalsPlugin({
      '@firefly/auto-engine': 'AliLowCodeEngine',
    }),
  ],
});

// Install the firefly-babel-jsx plugin

babel: {
    plugins: [
        [
        'firefly-babel-jsx/dist',
        {
            env: 'development',
        },
        ],
    ],
},

```

## Core Features
- Entering prompts and executing chain tasks
- Developing code through conversation
- Quickly navigating to source code files (using "Option + Command + click on page elements")
- Editable page elements
- Ability to append elements to the page

## Project Focus
The main research direction of this project is the integration of ChatGPT and frontend development. We plan to help developers improve work efficiency through the following means, including but not limited to:
- Code generation: Using ChatGPT to generate code snippets
- Code completion: Providing intelligent code completion functionality
- Code transformation: Assisting with code language conversion
- Code explanation: Providing explanations and descriptions of code logic
- Code review: Assisting with code quality review
- Code refactoring: Assisting with code refactoring and optimization
- Bug detection and fixing: Helping to identify and fix bugs in the code
- System design and architecture: Providing guidance on system design and architecture
- Mock data generation: Assisting with generating simulated data required for testing and development
- Testing: Providing auxiliary functions related to testing
- Documentation: Assisting in generating project documentation
- Content production: Supporting content creation and generation

We will continuously learn and gradually implement the above functionalities in practice, looking forward to future development prospects.

If you have any questions or would like to learn more, please feel free to contact us.