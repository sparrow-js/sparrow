import Config from '../config';
export const custom = [
  // 基础表单
  {
    key: 'ResetButton',
    label: '重置',
    des: '表单重置按钮',
    keys: ['重置', 'Form', '表单'],
    path: '/custom/BaseForm/ResetButton',
  },
  {
    key: 'SaveButton',
    label: '保存',
    des: '表单保存按钮',
    keys: ['保存', 'Form', '表单'],
    path: '/custom/BaseForm/SaveButton',
  },

  // 基础表格
  // {
  //   key: 'CreateButton',
  //   label: '创建',
  //   des: '创建跳转按钮',
  //   keys: ['创建', 'Form', '表单', '表格'],
  //   path: '/custom/BaseTable/CreateButton',
  // },
  // {
  //   key: 'SearchButton',
  //   label: '搜索',
  //   des: '搜索按钮',
  //   keys: ['搜索', 'Form', '表单', '表格'],
  //   path: '/custom/BaseTable/SearchButton',
  // },
  // 表单删除、编辑、查看
  // {
  //   key: 'Delete',
  //   label: '删除',
  //   des: '表格删除按钮',
  //   keys: ['删除', '表格', 'table'],
  //   path: '/custom/Table/Delete',
  // },
  // {
  //   key: 'Edit',
  //   label: '编辑',
  //   des: '编辑按钮',
  //   keys: ['编辑', '表格', 'table'],
  //   path: '/custom/Table/Edit',
  // },
  // {
  //   key: 'See',
  //   label: '查看按钮',
  //   des: '查看按钮',
  //   keys: ['查看', '表格', 'table'],
  //   path: '/custom/Table/See',
  // },

  // 图片处理区
  {
    key: 'UploadWall',
    label: '图片墙',
    des: '上传多图片，图片墙',
    keys: ['上传', 'img', 'jpg', 'png', 'image', '多图'],
    path: '/custom/UploadWall',
  },
  {
    key: 'UploadList',
    label: '图片列表缩略图',
    des: '图片列表缩略图',
    keys: ['上传', 'img', 'jpg', 'png', 'image', '图片列表'],
    path: '/custom/UploadList',
  },
  {
    key: 'UploadDrag',
    label: '拖拽上传',
    des: '拖拽上传图片',
    keys: ['拖拽', '上传', 'img', 'jpg', 'png', 'image'],
    path: '/custom/UploadDrag',
  },

  // Dropzone
  {
    key: 'Dropzone',
    label: 'Dropzone',
    des: 'Dropzone，上传图片',
    keys: ['上传图片', 'Dropzone'],
    path: '/custom/Dropzone',
  },

  // 面板组
  {
    key: 'PanelGroup',
    label: '面板组',
    des: '面板组',
    keys: ['面板组'],
    path: '/custom/PanelGroup',
  },

  // 卡片面板
  {
    key: 'CardPannel',
    label: '卡片面板',
    des: '卡片面板',
    keys: ['卡片面板'],
    path: '/EditBlock/PanelGroup/CardPanel',
  },
  // SvgIcon
  {
    key: 'SvgIcon',
    label: 'SvgIcon',
    des: 'SvgIcon',
    keys: ['SvgIcon'],
    path: '/EditBlock/PanelGroup/SvgIcon',
  },
  

  // 卡片信息
  {
    key: 'CardInfo',
    label: '卡片文案容器',
    des: '卡片文案容器',
    keys: ['卡片文案容器'],
    path: '/EditBlock/CardGroup/CardInfo',
  },
  {
    // Clipboard 剪贴板
    key: 'Clipboard',
    label: '剪贴板',
    des: '剪贴板，复制',
    keys: ['Clipboard', '复制', 'copy'],
    path: '/custom/Clipboard',
  },

  // 富文本编辑器
  {
    key: 'Tinymce',
    label: 'Tinymce',
    des: 'Tinymce, 富文本编辑器',
    keys: ['富文本编辑器', 'Tinymce'],
    path: '/custom/Tinymce',
  },

  // 吸顶
  {
    key: 'Sticky',
    label: 'Sticky',
    des: 'Sticky, 吸顶',
    keys: ['吸顶', 'Sticky'],
    path: '/custom/Sticky',
  },
  // 拖拽选择
  {
    key: 'DragSelect',
    label: 'DragSelect',
    des: 'DragSelect, 拖拽Select',
    keys: ['拖拽Select', 'DragSelect'],
    path: '/custom/DragSelect',
  },
  // 分页
  {
    key: 'Pagination',
    label: 'Pagination',
    des: '分页，Pagination',
    keys: ['分页', 'Pagination', 'page'],
    path: '/custom/Pagination',
  },

  // 综合表单
  {
    key: 'ComplexTable',
    label: 'ComplexTable',
    des: '综合表格, 初始化数据',
    keys: ['综合表格', 'ComplexTable'],
    path: '/EditBlock/ComplexTable',
  },
  {
    key: 'CreateButton',
    label: 'CreateButton',
    des: '添加按钮，弹窗',
    keys: ['表格', 'CreateButton', '添加'],
    path: '/EditBlock/ComplexTable/CreateButton',
  },
  {
    key: 'DeleteButton',
    label: 'DeleteButton',
    des: '删除按钮，弹窗',
    keys: ['表格', 'DeleteButton', '删除'],
    path: '/EditBlock/ComplexTable/DeleteButton',
  },
  {
    key: 'EditButton',
    label: 'EditButton',
    des: '编辑按钮，弹窗',
    keys: ['表格', 'EditButton', '编辑'],
    path: '/EditBlock/ComplexTable/EditButton',
  },
  {
    key: 'FormCreateButton',
    label: 'FormCreateButton',
    des: '创建按钮，弹窗',
    keys: ['表单', 'FormCreateButton', '创建'],
    path: '/EditBlock/ComplexTable/FormCreateButton',
  },
  {
    key: 'FormUpdateButton',
    label: 'FormUpdateButton',
    des: '更新按钮',
    keys: ['表单', 'FormUpdateButton', '更新'],
    path: '/EditBlock/ComplexTable/FormUpdateButton',
  },
  {
    key: 'SearchButton',
    label: 'SearchButton',
    des: '搜索按钮',
    keys: ['搜索', '按钮'],
    path: '/EditBlock/ComplexTable/SearchButton',
  },
  {
    key: 'StatusButton',
    label: 'StatusButton',
    des: '状态按钮',
    keys: ['状态', '按钮'],
    path: '/EditBlock/ComplexTable/StatusButton',
  },

  // 标签
  {
    key: 'AuditTag',
    label: '审核中',
    des: '审核中，tag',
    keys: ['审核中', '审核', 'tag', '标签'],
    thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.2/assets/1000010.png',
    path: '/custom/TagCollect/Audit',
  },
  {
    key: 'Deleted',
    label: '已删除',
    des: '已删除，tag',
    keys: ['已删除', '删除', 'tag', '标签'],
    thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.2/assets/1000012.png',
    path: '/custom/TagCollect/Deleted',
  },
  {
    key: 'Offline',
    label: '下线',
    des: '下线，tag',
    keys: ['下线', 'tag', '标签'],
    thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.2/assets/1000009.png',
    path: '/custom/TagCollect/Offline',
  },
  {
    key: 'Online',
    label: '上线',
    des: '上线，tag',
    keys: ['上线', 'tag', '标签'],
    thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.2/assets/1000011.png',
    path: '/custom/TagCollect/Online',
  },
  {
    key: 'Draft',
    label: '草稿',
    des: '草稿，tag',
    keys: ['草稿', 'tag', '标签'],
    thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.2/assets/1000007.png',
    path: '/custom/TagCollect/Draft',
  },
  {
    key: 'Published',
    label: '已发布',
    des: '已发布，tag',
    keys: ['已发布', 'tag', '标签'],
    thumb: 'https://unpkg.com/@sparrow-vue/images@1.0.2/assets/1000008.png',
    path: '/custom/TagCollect/Published',
  },

  // AdvancedTable 高级表单
  {
    key: 'AdvancedTable',
    label: 'AdvancedTable',
    des: '高级表格, 编辑表格, AdvancedTable',
    keys: ['高级表格', 'AdvancedTable'],
    path: '/EditBlock/AdvancedTable',
  },
  {
    key: 'AddButton',
    label: 'AddButton',
    des: '添加按钮，高级表单',
    keys: ['表格', 'AdvancedTable', '高级表单', '添加'],
    path: '/EditBlock/AdvancedTable/AddButton',
  },
  {
    key: 'CancelButton',
    label: 'CancelButton',
    des: '取消按钮，高级表单',
    keys: ['表格', 'AdvancedTable', '高级表单', '取消'],
    path: '/EditBlock/AdvancedTable/CancelButton',
  },
  {
    key: 'DeleteButton',
    label: 'DeleteButton',
    des: '删除按钮，高级表单',
    keys: ['表格', 'AdvancedTable', '高级表单', '删除'],
    path: '/EditBlock/AdvancedTable/DeleteButton',
  },
  {
    key: 'EditButton',
    label: 'EditButton',
    des: '编辑按钮，高级表单',
    keys: ['表格', 'AdvancedTable', '高级表单', '编辑'],
    path: '/EditBlock/AdvancedTable/EditButton',
  },
  {
    key: 'SaveButton',
    label: 'SaveButton',
    des: '保存按钮，高级表单',
    keys: ['表格', 'AdvancedTable', '高级表单', '保存'],
    path: '/EditBlock/AdvancedTable/SaveButton',
  },
  {
    key: 'NewButton',
    label: 'NewButton',
    des: '新增按钮，高级表单',
    keys: ['表格', 'AdvancedTable', '高级表单', '新增'],
    path: '/EditBlock/AdvancedTable/NewButton',
  },
  // divder
  {
    key: 'HDivder',
    label: 'HDivder',
    des: '水平分割线',
    keys: ['水平分割线', 'Divder'],
    path: '/custom/DividerCollect/HDivder',
  },
  {
    key: 'VDivder',
    label: 'VDivder',
    des: '垂直分割线',
    keys: ['垂直分割线', '分割线'],
    path: '/custom/DividerCollect/VDivder',
  },

  // AdvancedSearch 折叠搜索
  {
    key: 'Advanced',
    label: 'Advanced',
    des: '折叠搜索',
    keys: ['折叠搜索', '收起', '展开'],
    path: '/EditBlock/AdvancedSearch/Advanced',
  },

  {
    key: 'info',
    label: 'info',
    des: '信息盒',
    keys: ['信息盒', 'info'],
    path: '/custom/info',
  },
  // ing
  {
    key: 'sparrow-test-component',
    label: 'Test',
    des: '测试sparrow插件',
    keys: ['测试', '插件'],
    path: Config.pluginPath + '/sparrow-test-component/dist',
  }
]