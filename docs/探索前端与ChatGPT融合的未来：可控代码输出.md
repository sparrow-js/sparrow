近一个月以来，在前端与ChatGPT融合探索方面取得了一些进展，下面我将分享一些具体的成果。
### 一、输出预期代码
在输出预期代码方面，发现直接使用GPT输出的结果是不可控的。为了让输出内容可控，采取了两种形式：

1. Prompt提示：通过精心设计提示，引导GPT输出期望的结果。
2. Fine-tuning微调：目前尚未在实践中取得令人满意的效果。
#### 1.系统设置
作为一个React工程师，使用Ant Design (antd)作为UI库，同时使用Recoil库作为状态管理。开发语言使用TypeScript。
#### 2.直接提问
quesiton：**创建用户表单，包括用户名称，用户详情**
以下是代码输出结果：
```tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { useRecoilState } from 'recoil';
import { userState } from './recoil/atoms';

const UserForm: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  const onFinish = (values: any) => {
    setUser(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="User Name"
        name="name"
        rules={[{ required: true, message: 'Please input your user name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="User Details"
        name="details"
        rules={[{ required: true, message: 'Please input user details!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
```
```tsx
// recoil/atoms.ts
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    name: '',
    details: '',
  },
});
```
```tsx
// App.tsx
import React from 'react';
import { RecoilRoot } from 'recoil';
import UserForm from './UserForm';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <UserForm />
    </RecoilRoot>
  );
};

export default App;
```
#### 2.加上Prompt的结果
通过引入Prompt，可以使输出的内容更加可控。以下是引入Prompt后的代码输出结果：
```tsx
import React from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

const UserForm = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form error:', errorInfo);
  };

  return (
    <Form
      name="userForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="用户名称"
        name="username"
        rules={[{ required: true, message: '请输入用户名称' }]}
      >
        <Input placeholder="请输入用户名称" />
      </Form.Item>

      <Form.Item
        label="用户详情"
        name="userDetails"
        rules={[{ required: true, message: '请输入用户详情' }]}
      >
        <TextArea rows={4} placeholder="请输入用户详情" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
```
### 二、模拟输出日常开发代码
使用了"chain"的概念，使用"langchain"可以直接模拟输出日常开发代码。比如开发一个表单，需要以下几个步骤：

- 编写界面
- 存储数据
- 请求服务端数据
- 模拟数据

通过按顺序执行"chain"任务，并最终输出期望的代码。
#### 1.录入chain prompt
人工录入prompt，编写任务链。
![Pasted Graphic.png](https://cdn.nlark.com/yuque/0/2023/png/34596612/1689764835809-5f8f7345-fad2-4d86-8549-0baa29527d5c.png#averageHue=%23fdfcfc&clientId=u31c936fd-4e9c-4&from=drop&id=u599d86a7&originHeight=1466&originWidth=2542&originalType=binary&ratio=2&rotation=0&showTitle=false&size=258463&status=done&style=none&taskId=u6a43b0ce-32a4-42f4-8969-f9bccc58181&title=)
#### 2.执行chain，结果如下
```markdown
// UserForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms';

const { TextArea } = Input;

const UserForm = () => {
  const [user, setUser] = useRecoilState(userState);

  const onFinish = (values) => {
    console.log('Form values:', values);
    setUser(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form error:', errorInfo);
  };

  return (
    <Form
      name="userForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="用户名称"
        name="username"
        rules={[{ required: true, message: '请输入用户名称' }]}
      >
        <Input placeholder="请输入用户名称" />
      </Form.Item>

      <Form.Item
        label="用户详情"
        name="userDetails"
        rules={[{ required: true, message: '请输入用户详情' }]}
      >
        <TextArea rows={4} placeholder="请输入用户详情" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
// atoms.ts
import { atom } from 'recoil';

type User = {
  username: string;
  userDetails: string;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    username: '',
    userDetails: '',
  },
});
```
录入了page和store的prompt后输出的代码如上。输出了页面内容和store内容。
### 三、找到相似任务，创建场景
为了更好地进行模拟输出，录入了多个场景的Prompt，然后使用向量数据库来查找相似的Prompt。存储格式如下：
```markdown
{
    pageContent: '创建一个产品详情页，包括产品名称，产品详情，产品名称',
    metadata: {
        question: '',
        output: '',
        custom: ''
    }

}
```

- pageContent：向量数据库搜索内容，支持使用"{custom}"和"{code}"。任务链中上一次的内容会放到"code"里。
- question：提出的问题。
- output：期望给出的结果。
- custom：可以自定义其他字段。

目前，将数据存储在本地的Chroma中，并且在使用时需要安装Chroma。
### 四、修改已有页面
为了方便进行增加、删除和修改，提供了可视化的源码编辑能力。具体操作如下：

1. 增加：可以通过Code Search Code查找向量数据库中相似的代码，并使用Prompt指导GPT输出结果；或者存储上一次的操作元数据，查找原有任务链上的修改任务Prompt，也可以通过代码类型分析找到对应的修改Prompt。
2. 删除：提供可视化的源码编辑能力，方便快捷地删除代码，并在需要时使用GPT优化代码。
3. 修改：选中需要修改的部分，描述需要修改的内容并找到对应的Prompt，然后执行修改的任务链。

需要注意的是，目前只实现了核心代码部分，还需要进一步开发和优化。在修改状态下直接与GPT交互可能不是最佳实践，如下图片让可视项目提供可编辑。
![Pasted Graphic 1.png](https://cdn.nlark.com/yuque/0/2023/png/34596612/1689764953300-02f655a1-a4f9-4661-aeb6-ea1ef910db38.png#averageHue=%23859f6e&clientId=u31c936fd-4e9c-4&from=drop&id=uafc8220a&originHeight=638&originWidth=2536&originalType=binary&ratio=2&rotation=0&showTitle=false&size=129873&status=done&style=none&taskId=u04ccef39-8815-4d68-9fe8-0fdbfb04aa7&title=)
### 五、后续探索
在接下来的探索中，计划进行以下方面的工作：

1. 录入任务分解：将任务拆解成模块，分别输出代码，然后再合成为完整的代码。
2. 录入Prompt分析优化调整：对录入的Prompt进行维护和管理，并评价Prompt的质量。
3. 自动分析现有项目：探索自动分析现有项目，自动录入学习的可能性。
4. Model Fine-tuning：尝试直接微调模型，减少对Prompt的手动录入。

目前，项目仍处于早期阶段，还有许多问题需要解决。
开源地址：[https://github.com/sparrow-js/firefly](https://github.com/sparrow-js/firefly)。
不断探索和改进，为实现前端与ChatGPT的融合提供更多有用的工具和功能。
