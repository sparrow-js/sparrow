简体中文 | [English](./README.md)
## 项目概述
本项目旨在提供辅助前端开发的功能，使得日常开发中使用的React、Vue等项目的源码可以进行编辑。此外，我们计划逐步引入ChatGPT技术，探索将生成式人工智能应用于前端开发的方案。本项目是在lowcode-engine基础上进行修改的，如果您对原理感兴趣，可以先参阅[lowcode-engine的文档](<https://github.com/alibaba/lowcode-engine>)。

![项目首页截图](https://raw.githubusercontent.com/sparrow-js/firefly/main/docs/12345.png)

![任务链截图](https://raw.githubusercontent.com/sparrow-js/firefly/main/docs/56789.png)

---

## 安装

```bash
# Global installation
$ npm install -g firefly-code

# run
$ firefly
```
---

## 项目中添加firefly-babel-jsx插件
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

// 安装插件 firefly-babel-jsx

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

## 基础功能
- 录入prompt，执行链任务
- 通过对话开发代码
- 快速定位到源代码文件（使用"Option + Command + 点击页面元素"的方式）
- 页面元素可编辑
- 可以向页面追加元素


## 项目重点
本项目的重点研究方向是ChatGPT与前端开发的结合应用。我们计划通过以下方式帮助开发人员提升工作效率，包括但不限于：
- 代码生成：利用ChatGPT生成代码片段
- 代码补全：提供智能的代码补全功能
- 代码转换：辅助进行代码语言转换
- 代码解释：提供对代码逻辑的解释和说明
- 代码审查：帮助进行代码质量的审查
- 代码重构：辅助进行代码重构和优化
- bug检测和修复：帮助发现和修复代码中的bug
- 系统设计和架构：提供系统设计和架构方面的指导
- 模拟数据生成：辅助生成测试和开发所需的模拟数据
- 测试：提供测试相关的辅助功能
- 文档：帮助生成项目文档
- 内容生产：支持内容创作和生成

我们将在实践中不断学习并逐步实现以上功能，展望未来的发展前景。

如有任何问题或需进一步了解，请随时联系我们。