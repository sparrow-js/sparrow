# sparrow

 <img src="https://unpkg.com/@sparrow-vue/images@1.0.18/assets/anim1.gif"  width = "520"  alt="图片名称" align="center" >

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e8640213efb453a8177a959e24f7da1~tplv-k3u1fbpfcp-watermark.image" width = "400"  alt="图片名称" align="center" /><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6db9f5bff2414c958fd0b8862e489810~tplv-k3u1fbpfcp-watermark.image" width = "400"  alt="图片名称" align="center" />

#### 场景化低代码（LowCode）搭建工作台；

sparrow的核心目标仅有一条“提升研发效率”，目前提供基于vue、element-ui组件库中后台项目的实践，实时输出源代码，新功能持续新增中；

---
## 特性

- **低代码开发，**  快速生成可读性强、vue element-ui组件库的源代码。
- **可视化开发，**  通过GUI生成页面代码源文件。
- **资产市场，**  代码资源共享，包含组件、编辑区块、静态区块、搜索业务组件、插件、场景搭建编辑器。

## 优势
- sprarrow 的核心目标是“提效”，因此功能上不只是单纯UI的可视化搭建，目前提供函数级别的搭建，提供拥有业务逻辑的代码组装，生成可二次开发的源代码；
- 易于扩展，通过AST读取组件源代码，进行组合，只要页面的逻辑是可拆解的就可以任意组装；
- 可与项目结合，技术上采用本地运行server服务，可以与项目深度结合，实现更多提效手段，更大可操作空间；


## 快速使用

### 线上版
线上体验版，代码生成worker、浏览器构建、可视化操作、实时输出源代码、多种类型物料源，更多精彩内容逐步开放

[https://sparrow-js.github.io/sparrow-online/](https://sparrow-js.github.io/sparrow-online/)

---

### 全局安装

```bash
# 全局安装
$ npm install -g sparrow-code

# 运行
$ sparrow
```
---

### 项目内安装

```bash
# 项目内安装
$ npm install sparrow-code -D

# package.json 增加 sparrow
"scripts": {
  "sparrow": "sparrow start -m page"
}

# 项目内安装GUI组件
$ npm install @sparrow-vue/develop-ui -S

# 项目内引用App.vue
<template>
  <div id="app">
    <router-view />
    <sparrow />
  </div>
</template>

<script>
import Sparrow from '@sparrow-vue/develop-ui'

export default {
  components: {
    Sparrow
  },
  name: 'App'
}
</script>


```

## 功能

### 物料
sparrow 提供多种类型的物料源，以此提升研发效率。
-  组件：vue element-ui基础组件
-  容器：存储基础组件
-  编辑区块：可增删改的特定场景代码片段
-  静态区块：代码片段
-  搜索组件：官方内置拥有特定逻辑组件
-  插件：第三方自定义组件

### 基础功能
- 实时预览
- 拖拽
- 实时预览源代码
- 组件: 复制
- 组件: 删除
- 组件: 配置
- 撤销
- 保存
- 导出
- 重置
- 接口生成
- 打开vscode展示代码
- 文本编辑
- 等等功能

## 讨论（本项目没有群，讨论可发到github discussions）
理性交流，如无具体事情不需加微信，精力有限不保证能够及时回复。
- 微信号：sparrow777-js

<img src="https://unpkg.com/@sparrow-vue/images@1.0.29/assets/WechatIMG613.jpeg" width = "200"  alt="图片名称" align="center" />


## License
[MIT](https://github.com/sparrow-js/sparrow/blob/master/LICENSE)
