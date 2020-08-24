export default [
  {
    "id": "Card",
    "config": {
      "model": {
        "attr": {
          "shadow": "always",
          ":body-style": "{}"
        },
        "custom": {
          "hasHeader": false,
          "label": "卡片"
        }
      },
      "schema": {
        "fields": [
          {
            "type": "object",
            "label": "",
            "model": "custom",
            "schema": {
              "fields": [
                {
                  "type": "switch",
                  "label": "hasHeader",
                  "model": "hasHeader",
                  "textOn": "有头",
                  "textOff": "非有头"
                },
                {
                  "type": "input",
                  "inputType": "text",
                  "label": "label",
                  "model": "label"
                }
              ]
            }
          },
          {
            "type": "object",
            "label": "",
            "model": "attr",
            "schema": {
              "fields": [
                {
                  "type": "select",
                  "label": "shadow",
                  "model": "shadow",
                  "values": [
                    "always",
                    "hover",
                    "never"
                  ]
                },
                {
                  "type": "sourcecode",
                  "label": "body-style",
                  "model": ":body-style",
                  "theme": "neo",
                  "mode": {
                    "name": "javascript",
                    "json": true
                  }
                }
              ]
            }
          }
        ]
      },
      "initType": "auto"
    },
    "children": [
      {
        "id": "Form",
        "config": {
          "model": {
            "attr": {
              "label-position": "",
              ":inline": true,
              "label-width": "100px",
              "size": ""
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "select",
                      "label": "label-position",
                      "model": "label-position",
                      "values": [
                        "right",
                        "left",
                        "top",
                        ""
                      ]
                    },
                    {
                      "type": "switch",
                      "label": "inline",
                      "model": ":inline",
                      "textOn": "inline",
                      "textOff": "非inline"
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "label-width",
                      "model": "label-width"
                    },
                    {
                      "type": "select",
                      "label": "size",
                      "model": "size",
                      "values": [
                        "medium",
                        "small",
                        "mini"
                      ]
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [
          {
            "id": "Input",
            "config": {
              "model": {
                "attr": {
                  "placeholder": "",
                  "v-model": ""
                },
                "custom": {
                  "required": false,
                  "regList": [
                    {
                      "value": "",
                      "label": ""
                    }
                  ],
                  "label": "文本框",
                  "insideForm": true
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-model",
                          "model": "v-model"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "placeholder",
                          "model": "placeholder"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "custom",
                    "schema": {
                      "fields": [
                        {
                          "type": "switch",
                          "label": "required",
                          "model": "required",
                          "textOn": "必填",
                          "textOff": "非必填"
                        },
                        {
                          "type": "array",
                          "label": "regList",
                          "model": "regList",
                          "itemContainerComponent": "ArrayContainer",
                          "showRemoveButton": false,
                          "fieldClasses": "array-editor",
                          "newElementButtonLabelClasses": "el-button el-button--primary el-button--small array-button-add",
                          "items": {
                            "type": "object",
                            "default": {},
                            "schema": {
                              "fields": [
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "label",
                                  "model": "label"
                                },
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "value",
                                  "model": "value"
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "label",
                          "model": "label"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": ""
          },
          {
            "id": "Select",
            "config": {
              "model": {
                "attr": {
                  "placeholder": "",
                  "v-model": ""
                },
                "custom": {
                  "required": false,
                  "regList": [
                    {
                      "value": "",
                      "label": ""
                    }
                  ],
                  "label": "特殊资源",
                  "insideForm": true
                },
                "slot": {
                  "data": "var data = {\n  selectOptionsb3b600e5: [{\n    value: '选项1',\n    label: '选项1'\n  }, {\n    value: '选项2',\n    label: '选项2'\n  }, {\n    value: '选项3',\n    label: '选项3'\n  }]\n};"
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-model",
                          "model": "v-model"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "placeholder",
                          "model": "placeholder"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "custom",
                    "schema": {
                      "fields": [
                        {
                          "type": "switch",
                          "label": "required",
                          "model": "required",
                          "textOn": "必填",
                          "textOff": "非必填"
                        },
                        {
                          "type": "array",
                          "label": "regList",
                          "model": "regList",
                          "itemContainerComponent": "ArrayContainer",
                          "showRemoveButton": false,
                          "fieldClasses": "array-editor",
                          "newElementButtonLabelClasses": "el-button el-button--primary el-button--small array-button-add",
                          "items": {
                            "type": "object",
                            "default": {},
                            "schema": {
                              "fields": [
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "label",
                                  "model": "label"
                                },
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "value",
                                  "model": "value"
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "label",
                          "model": "label"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "slot",
                    "schema": {
                      "fields": [
                        {
                          "type": "sourcecode",
                          "label": "data",
                          "model": "data",
                          "theme": "neo",
                          "mode": {
                            "name": "javascript",
                            "json": true
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": ""
          }
        ],
        "params": null,
        "path": ""
      },
      {
        "id": "CreateButton",
        "config": {
          "model": {
            "attr": {
              "size": "medium",
              "type": "primary",
              ":plain": false,
              "round": false,
              "circle": false,
              "loading": false,
              "disabled": false,
              "icon": "",
              "@click": "handleCreate",
              "v-if": ""
            },
            "custom": {
              "label": "添加"
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "select",
                      "label": "size",
                      "model": "size",
                      "multi": true,
                      "values": [
                        "medium",
                        "small",
                        "mini"
                      ]
                    },
                    {
                      "type": "select",
                      "label": "type",
                      "model": "type",
                      "multi": true,
                      "values": [
                        "primary",
                        "success",
                        "warning",
                        "danger",
                        "info",
                        "text"
                      ]
                    },
                    {
                      "type": "switch",
                      "label": "plain",
                      "model": "plain",
                      "readonly": false,
                      "textOn": "朴素",
                      "textOff": "否朴素"
                    },
                    {
                      "type": "switch",
                      "label": "round",
                      "model": "round",
                      "readonly": false,
                      "textOn": "圆角",
                      "textOff": "否圆角"
                    },
                    {
                      "type": "switch",
                      "label": "circle",
                      "model": "circle",
                      "readonly": false,
                      "textOn": "圆形",
                      "textOff": "否圆形"
                    },
                    {
                      "type": "switch",
                      "label": "loading",
                      "model": "loading",
                      "readonly": false,
                      "textOn": "loading",
                      "textOff": "否loading"
                    },
                    {
                      "type": "switch",
                      "label": "disabled",
                      "model": "disabled",
                      "readonly": false,
                      "textOn": "disabled",
                      "textOff": "否disabled"
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "icon",
                      "model": "icon"
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "click",
                      "model": "@click"
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "v-if",
                      "model": "v-if"
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [],
        "params": null,
        "path": "/EditBlock/ComplexTable/CreateButton"
      },
      {
        "id": "SearchButton",
        "config": {
          "model": {
            "attr": {
              "size": "medium",
              "type": "primary",
              ":plain": false,
              "round": false,
              "circle": false,
              "loading": false,
              "disabled": false,
              "icon": "",
              "@click": "",
              "v-if": ""
            },
            "custom": {
              "label": "搜索"
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "select",
                      "label": "size",
                      "model": "size",
                      "multi": true,
                      "values": [
                        "medium",
                        "small",
                        "mini"
                      ]
                    },
                    {
                      "type": "select",
                      "label": "type",
                      "model": "type",
                      "multi": true,
                      "values": [
                        "primary",
                        "success",
                        "warning",
                        "danger",
                        "info",
                        "text"
                      ]
                    },
                    {
                      "type": "switch",
                      "label": "plain",
                      "model": "plain",
                      "readonly": false,
                      "textOn": "朴素",
                      "textOff": "否朴素"
                    },
                    {
                      "type": "switch",
                      "label": "round",
                      "model": "round",
                      "readonly": false,
                      "textOn": "圆角",
                      "textOff": "否圆角"
                    },
                    {
                      "type": "switch",
                      "label": "circle",
                      "model": "circle",
                      "readonly": false,
                      "textOn": "圆形",
                      "textOff": "否圆形"
                    },
                    {
                      "type": "switch",
                      "label": "loading",
                      "model": "loading",
                      "readonly": false,
                      "textOn": "loading",
                      "textOff": "否loading"
                    },
                    {
                      "type": "switch",
                      "label": "disabled",
                      "model": "disabled",
                      "readonly": false,
                      "textOn": "disabled",
                      "textOff": "否disabled"
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "icon",
                      "model": "icon"
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "click",
                      "model": "@click"
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "v-if",
                      "model": "v-if"
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [],
        "params": null,
        "path": "/EditBlock/ComplexTable/SearchButton"
      }
    ],
    "params": null,
    "path": ""
  },
  {
    "id": "Dialog",
    "config": {
      "model": {
        "custom": {
          "label": "添加",
          "showMethod": "dialogVisibleHandlerafc914b6",
          "visible": "dialogFormVisible"
        }
      },
      "schema": {
        "fields": [
          {
            "type": "object",
            "label": "",
            "model": "custom",
            "schema": {
              "fields": [
                {
                  "type": "input",
                  "inputType": "text",
                  "label": "label",
                  "model": "label"
                },
                {
                  "type": "input",
                  "inputType": "text",
                  "label": "showMethod",
                  "model": "showMethod"
                },
                {
                  "type": "input",
                  "inputType": "text",
                  "label": "visible",
                  "model": "visible"
                }
              ]
            }
          }
        ]
      },
      "initType": "auto"
    },
    "children": [
      {
        "id": "Form",
        "config": {
          "model": {
            "attr": {
              "label-position": "",
              ":inline": false,
              "label-width": "100px",
              "size": ""
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "select",
                      "label": "label-position",
                      "model": "label-position",
                      "values": [
                        "right",
                        "left",
                        "top",
                        ""
                      ]
                    },
                    {
                      "type": "switch",
                      "label": "inline",
                      "model": ":inline",
                      "textOn": "inline",
                      "textOff": "非inline"
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "label-width",
                      "model": "label-width"
                    },
                    {
                      "type": "select",
                      "label": "size",
                      "model": "size",
                      "values": [
                        "medium",
                        "small",
                        "mini"
                      ]
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [
          {
            "id": "Input",
            "config": {
              "model": {
                "attr": {
                  "placeholder": "",
                  "v-model": ""
                },
                "custom": {
                  "required": false,
                  "regList": [
                    {
                      "value": "",
                      "label": ""
                    }
                  ],
                  "label": "文本框",
                  "insideForm": true
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-model",
                          "model": "v-model"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "placeholder",
                          "model": "placeholder"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "custom",
                    "schema": {
                      "fields": [
                        {
                          "type": "switch",
                          "label": "required",
                          "model": "required",
                          "textOn": "必填",
                          "textOff": "非必填"
                        },
                        {
                          "type": "array",
                          "label": "regList",
                          "model": "regList",
                          "itemContainerComponent": "ArrayContainer",
                          "showRemoveButton": false,
                          "fieldClasses": "array-editor",
                          "newElementButtonLabelClasses": "el-button el-button--primary el-button--small array-button-add",
                          "items": {
                            "type": "object",
                            "default": {},
                            "schema": {
                              "fields": [
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "label",
                                  "model": "label"
                                },
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "value",
                                  "model": "value"
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "label",
                          "model": "label"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": ""
          },
          {
            "id": "Input",
            "config": {
              "model": {
                "attr": {
                  "placeholder": "",
                  "v-model": "",
                  "type": "textarea",
                  "rows": 4
                },
                "custom": {
                  "required": false,
                  "regList": [
                    {
                      "value": "",
                      "label": ""
                    }
                  ],
                  "label": "文本框",
                  "type": "textarea",
                  "insideForm": true
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-model",
                          "model": "v-model"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "placeholder",
                          "model": "placeholder"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "custom",
                    "schema": {
                      "fields": [
                        {
                          "type": "switch",
                          "label": "required",
                          "model": "required",
                          "textOn": "必填",
                          "textOff": "非必填"
                        },
                        {
                          "type": "array",
                          "label": "regList",
                          "model": "regList",
                          "itemContainerComponent": "ArrayContainer",
                          "showRemoveButton": false,
                          "fieldClasses": "array-editor",
                          "newElementButtonLabelClasses": "el-button el-button--primary el-button--small array-button-add",
                          "items": {
                            "type": "object",
                            "default": {},
                            "schema": {
                              "fields": [
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "label",
                                  "model": "label"
                                },
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "value",
                                  "model": "value"
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "label",
                          "model": "label"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": ""
          },
          {
            "id": "Autocomplete",
            "config": {
              "model": {
                "attr": {
                  "placeholder": "",
                  "v-model": ""
                },
                "custom": {
                  "required": false,
                  "regList": [
                    {
                      "value": "",
                      "label": ""
                    }
                  ],
                  "label": "文本框",
                  "type": 1,
                  "insideForm": true
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-model",
                          "model": "v-model"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "placeholder",
                          "model": "placeholder"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "custom",
                    "schema": {
                      "fields": [
                        {
                          "type": "switch",
                          "label": "required",
                          "model": "required",
                          "textOn": "必填",
                          "textOff": "非必填"
                        },
                        {
                          "type": "array",
                          "label": "regList",
                          "model": "regList",
                          "itemContainerComponent": "ArrayContainer",
                          "showRemoveButton": false,
                          "fieldClasses": "array-editor",
                          "newElementButtonLabelClasses": "el-button el-button--primary el-button--small array-button-add",
                          "items": {
                            "type": "object",
                            "default": {},
                            "schema": {
                              "fields": [
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "label",
                                  "model": "label"
                                },
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "value",
                                  "model": "value"
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "label",
                          "model": "label"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": ""
          },
          {
            "id": "InputNumber",
            "config": {
              "model": {
                "attr": {
                  "placeholder": "",
                  "v-model": ""
                },
                "custom": {
                  "required": false,
                  "regList": [
                    {
                      "value": "",
                      "label": ""
                    }
                  ],
                  "label": "数字文本框",
                  "type": 1,
                  "insideForm": true
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-model",
                          "model": "v-model"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "placeholder",
                          "model": "placeholder"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "custom",
                    "schema": {
                      "fields": [
                        {
                          "type": "switch",
                          "label": "required",
                          "model": "required",
                          "textOn": "必填",
                          "textOff": "非必填"
                        },
                        {
                          "type": "array",
                          "label": "regList",
                          "model": "regList",
                          "itemContainerComponent": "ArrayContainer",
                          "showRemoveButton": false,
                          "fieldClasses": "array-editor",
                          "newElementButtonLabelClasses": "el-button el-button--primary el-button--small array-button-add",
                          "items": {
                            "type": "object",
                            "default": {},
                            "schema": {
                              "fields": [
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "label",
                                  "model": "label"
                                },
                                {
                                  "type": "input",
                                  "inputType": "text",
                                  "label": "value",
                                  "model": "value"
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "label",
                          "model": "label"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": ""
          },
          {
            "id": "Button",
            "config": {
              "model": {
                "attr": {
                  "size": "medium",
                  "type": "primary",
                  ":plain": true,
                  "round": false,
                  "circle": false,
                  "loading": false,
                  "disabled": false,
                  "icon": "",
                  "@click": "dialogFormVisible = false",
                  "v-if": ""
                },
                "custom": {
                  "label": "取消"
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "select",
                          "label": "size",
                          "model": "size",
                          "multi": true,
                          "values": [
                            "medium",
                            "small",
                            "mini"
                          ]
                        },
                        {
                          "type": "select",
                          "label": "type",
                          "model": "type",
                          "multi": true,
                          "values": [
                            "primary",
                            "success",
                            "warning",
                            "danger",
                            "info",
                            "text"
                          ]
                        },
                        {
                          "type": "switch",
                          "label": "plain",
                          "model": "plain",
                          "readonly": false,
                          "textOn": "朴素",
                          "textOff": "否朴素"
                        },
                        {
                          "type": "switch",
                          "label": "round",
                          "model": "round",
                          "readonly": false,
                          "textOn": "圆角",
                          "textOff": "否圆角"
                        },
                        {
                          "type": "switch",
                          "label": "circle",
                          "model": "circle",
                          "readonly": false,
                          "textOn": "圆形",
                          "textOff": "否圆形"
                        },
                        {
                          "type": "switch",
                          "label": "loading",
                          "model": "loading",
                          "readonly": false,
                          "textOn": "loading",
                          "textOff": "否loading"
                        },
                        {
                          "type": "switch",
                          "label": "disabled",
                          "model": "disabled",
                          "readonly": false,
                          "textOn": "disabled",
                          "textOff": "否disabled"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "icon",
                          "model": "icon"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "click",
                          "model": "@click"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-if",
                          "model": "v-if"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": ""
          },
          {
            "id": "FormCreateButton",
            "config": {
              "model": {
                "attr": {
                  "size": "medium",
                  "type": "primary",
                  ":plain": false,
                  "round": false,
                  "circle": false,
                  "loading": false,
                  "disabled": false,
                  "icon": "",
                  "@click": "createData",
                  "v-if": ""
                },
                "custom": {
                  "label": "确定"
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "select",
                          "label": "size",
                          "model": "size",
                          "multi": true,
                          "values": [
                            "medium",
                            "small",
                            "mini"
                          ]
                        },
                        {
                          "type": "select",
                          "label": "type",
                          "model": "type",
                          "multi": true,
                          "values": [
                            "primary",
                            "success",
                            "warning",
                            "danger",
                            "info",
                            "text"
                          ]
                        },
                        {
                          "type": "switch",
                          "label": "plain",
                          "model": "plain",
                          "readonly": false,
                          "textOn": "朴素",
                          "textOff": "否朴素"
                        },
                        {
                          "type": "switch",
                          "label": "round",
                          "model": "round",
                          "readonly": false,
                          "textOn": "圆角",
                          "textOff": "否圆角"
                        },
                        {
                          "type": "switch",
                          "label": "circle",
                          "model": "circle",
                          "readonly": false,
                          "textOn": "圆形",
                          "textOff": "否圆形"
                        },
                        {
                          "type": "switch",
                          "label": "loading",
                          "model": "loading",
                          "readonly": false,
                          "textOn": "loading",
                          "textOff": "否loading"
                        },
                        {
                          "type": "switch",
                          "label": "disabled",
                          "model": "disabled",
                          "readonly": false,
                          "textOn": "disabled",
                          "textOff": "否disabled"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "icon",
                          "model": "icon"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "click",
                          "model": "@click"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-if",
                          "model": "v-if"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": "/EditBlock/ComplexTable/FormCreateButton"
          }
        ],
        "params": null,
        "path": ""
      }
    ],
    "params": null,
    "path": ""
  },
  {
    "id": "Table",
    "config": {
      "model": {
        "attr": {
          "stripe": "",
          ":border": true,
          "height": "",
          "max-height": "",
          "highlight-current-row": "",
          ":default-sort": ""
        },
        "custom": {
          "col": 5,
          "checkbox": false
        }
      },
      "schema": {
        "fields": [
          {
            "type": "object",
            "label": "",
            "model": "attr",
            "schema": {
              "fields": [
                {
                  "type": "switch",
                  "label": "stripe",
                  "model": "stripe",
                  "textOn": "斑马纹",
                  "textOff": "非斑马纹"
                },
                {
                  "type": "switch",
                  "label": "border",
                  "model": ":border",
                  "textOn": "border",
                  "textOff": "非border"
                },
                {
                  "type": "input",
                  "inputType": "text",
                  "label": "height",
                  "model": "height"
                },
                {
                  "type": "input",
                  "inputType": "text",
                  "label": "max-height",
                  "model": "max-height"
                },
                {
                  "type": "input",
                  "inputType": "text",
                  "label": "highlight-current-row",
                  "model": "highlight-current-row"
                }
              ]
            }
          },
          {
            "type": "object",
            "label": "",
            "model": "custom",
            "schema": {
              "fields": [
                {
                  "type": "input",
                  "inputType": "text",
                  "label": "col",
                  "model": "col"
                },
                {
                  "type": "checkbox",
                  "label": "checkbox",
                  "model": "checkbox",
                  "default": true
                }
              ]
            }
          }
        ]
      },
      "initType": "auto"
    },
    "children": [
      {
        "id": "column",
        "config": {
          "model": {
            "attr": {
              ":fixed": false,
              "sortable": ""
            },
            "custom": {
              "label": "ID",
              "type": "",
              "value": "row.id"
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "switch",
                      "readonly": false,
                      "label": ":fixed",
                      "model": ":fixed",
                      "textOn": "固定列",
                      "textOff": "否固定列"
                    }
                  ]
                }
              },
              {
                "type": "object",
                "label": "",
                "model": "custom",
                "schema": {
                  "fields": [
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "label",
                      "model": "label"
                    },
                    {
                      "type": "select",
                      "label": "type",
                      "model": "type",
                      "values": [
                        "selection",
                        "index",
                        "expand"
                      ]
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "value",
                      "model": "value"
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [],
        "params": null,
        "path": "/box/Table/column"
      },
      {
        "id": "column",
        "config": {
          "model": {
            "attr": {
              ":fixed": false,
              "sortable": ""
            },
            "custom": {
              "label": "Author",
              "type": "",
              "value": "row.author"
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "switch",
                      "readonly": false,
                      "label": ":fixed",
                      "model": ":fixed",
                      "textOn": "固定列",
                      "textOff": "否固定列"
                    }
                  ]
                }
              },
              {
                "type": "object",
                "label": "",
                "model": "custom",
                "schema": {
                  "fields": [
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "label",
                      "model": "label"
                    },
                    {
                      "type": "select",
                      "label": "type",
                      "model": "type",
                      "values": [
                        "selection",
                        "index",
                        "expand"
                      ]
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "value",
                      "model": "value"
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [],
        "params": null,
        "path": "/box/Table/column"
      },
      {
        "id": "column",
        "config": {
          "model": {
            "attr": {
              ":fixed": false,
              "sortable": ""
            },
            "custom": {
              "label": "",
              "type": "",
              "value": ""
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "switch",
                      "readonly": false,
                      "label": ":fixed",
                      "model": ":fixed",
                      "textOn": "固定列",
                      "textOff": "否固定列"
                    }
                  ]
                }
              },
              {
                "type": "object",
                "label": "",
                "model": "custom",
                "schema": {
                  "fields": [
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "label",
                      "model": "label"
                    },
                    {
                      "type": "select",
                      "label": "type",
                      "model": "type",
                      "values": [
                        "selection",
                        "index",
                        "expand"
                      ]
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "value",
                      "model": "value"
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [],
        "params": null,
        "path": "/box/Table/column"
      },
      {
        "id": "column",
        "config": {
          "model": {
            "attr": {
              ":fixed": false,
              "sortable": ""
            },
            "custom": {
              "label": "",
              "type": "",
              "value": ""
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "switch",
                      "readonly": false,
                      "label": ":fixed",
                      "model": ":fixed",
                      "textOn": "固定列",
                      "textOff": "否固定列"
                    }
                  ]
                }
              },
              {
                "type": "object",
                "label": "",
                "model": "custom",
                "schema": {
                  "fields": [
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "label",
                      "model": "label"
                    },
                    {
                      "type": "select",
                      "label": "type",
                      "model": "type",
                      "values": [
                        "selection",
                        "index",
                        "expand"
                      ]
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "value",
                      "model": "value"
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [
          {
            "id": "PublishedTag",
            "config": {
              "model": {
                "attr": {
                  "size": "medium",
                  "type": "success",
                  "closable": false,
                  "disable-transitions": false,
                  "hit": false,
                  "color": "",
                  "effect": "light",
                  "v-if": "row.status === 'published'"
                },
                "custom": {
                  "label": "已发布",
                  "value": "row.status"
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "select",
                          "label": "size",
                          "model": "size",
                          "multi": true,
                          "values": [
                            "medium",
                            "small",
                            "mini"
                          ]
                        },
                        {
                          "type": "select",
                          "label": "type",
                          "model": "type",
                          "multi": true,
                          "values": [
                            "success",
                            "info",
                            "warning",
                            "danger"
                          ]
                        },
                        {
                          "type": "switch",
                          "label": "closable",
                          "model": "closable",
                          "readonly": false,
                          "textOn": "可关闭",
                          "textOff": "否可关闭"
                        },
                        {
                          "type": "switch",
                          "label": "disable-transitions",
                          "model": "disable-transitions",
                          "readonly": false,
                          "textOn": "禁用渐变",
                          "textOff": "否禁用渐变"
                        },
                        {
                          "type": "switch",
                          "label": "hit",
                          "model": "hit",
                          "readonly": false,
                          "textOn": "描边",
                          "textOff": "否描边"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "color",
                          "model": "color"
                        },
                        {
                          "type": "select",
                          "label": "effect",
                          "model": "effect",
                          "multi": true,
                          "values": [
                            "dark",
                            "light",
                            "plain"
                          ]
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-if",
                          "model": "v-if"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "custom",
                    "schema": {
                      "fields": [
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "value",
                          "model": "value"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": "/custom/TagCollect/Published"
          },
          {
            "id": "DraftTag",
            "config": {
              "model": {
                "attr": {
                  "size": "medium",
                  "type": "warning",
                  "closable": false,
                  "disable-transitions": false,
                  "hit": false,
                  "color": "",
                  "effect": "light",
                  "v-if": "row.status === 'draft'"
                },
                "custom": {
                  "label": "草稿",
                  "value": "row.status"
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "select",
                          "label": "size",
                          "model": "size",
                          "multi": true,
                          "values": [
                            "medium",
                            "small",
                            "mini"
                          ]
                        },
                        {
                          "type": "select",
                          "label": "type",
                          "model": "type",
                          "multi": true,
                          "values": [
                            "success",
                            "info",
                            "warning",
                            "danger"
                          ]
                        },
                        {
                          "type": "switch",
                          "label": "closable",
                          "model": "closable",
                          "readonly": false,
                          "textOn": "可关闭",
                          "textOff": "否可关闭"
                        },
                        {
                          "type": "switch",
                          "label": "disable-transitions",
                          "model": "disable-transitions",
                          "readonly": false,
                          "textOn": "禁用渐变",
                          "textOff": "否禁用渐变"
                        },
                        {
                          "type": "switch",
                          "label": "hit",
                          "model": "hit",
                          "readonly": false,
                          "textOn": "描边",
                          "textOff": "否描边"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "color",
                          "model": "color"
                        },
                        {
                          "type": "select",
                          "label": "effect",
                          "model": "effect",
                          "multi": true,
                          "values": [
                            "dark",
                            "light",
                            "plain"
                          ]
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-if",
                          "model": "v-if"
                        }
                      ]
                    }
                  },
                  {
                    "type": "object",
                    "label": "",
                    "model": "custom",
                    "schema": {
                      "fields": [
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "value",
                          "model": "value"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": "/custom/TagCollect/Draft"
          }
        ],
        "params": null,
        "path": "/box/Table/column"
      },
      {
        "id": "column",
        "config": {
          "model": {
            "attr": {
              ":fixed": false,
              "sortable": ""
            },
            "custom": {
              "label": "操作",
              "type": "",
              "value": ""
            }
          },
          "schema": {
            "fields": [
              {
                "type": "object",
                "label": "",
                "model": "attr",
                "schema": {
                  "fields": [
                    {
                      "type": "switch",
                      "readonly": false,
                      "label": ":fixed",
                      "model": ":fixed",
                      "textOn": "固定列",
                      "textOff": "否固定列"
                    }
                  ]
                }
              },
              {
                "type": "object",
                "label": "",
                "model": "custom",
                "schema": {
                  "fields": [
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "label",
                      "model": "label"
                    },
                    {
                      "type": "select",
                      "label": "type",
                      "model": "type",
                      "values": [
                        "selection",
                        "index",
                        "expand"
                      ]
                    },
                    {
                      "type": "input",
                      "inputType": "text",
                      "label": "value",
                      "model": "value"
                    }
                  ]
                }
              }
            ]
          },
          "initType": "auto"
        },
        "children": [
          {
            "id": "DeleteButton",
            "config": {
              "model": {
                "attr": {
                  "size": "mini",
                  "type": "danger",
                  ":plain": false,
                  "round": false,
                  "circle": false,
                  "loading": false,
                  "disabled": false,
                  "icon": "",
                  "@click": "handleDelete",
                  "v-if": ""
                },
                "custom": {
                  "label": "删除"
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "select",
                          "label": "size",
                          "model": "size",
                          "multi": true,
                          "values": [
                            "medium",
                            "small",
                            "mini"
                          ]
                        },
                        {
                          "type": "select",
                          "label": "type",
                          "model": "type",
                          "multi": true,
                          "values": [
                            "primary",
                            "success",
                            "warning",
                            "danger",
                            "info",
                            "text"
                          ]
                        },
                        {
                          "type": "switch",
                          "label": "plain",
                          "model": "plain",
                          "readonly": false,
                          "textOn": "朴素",
                          "textOff": "否朴素"
                        },
                        {
                          "type": "switch",
                          "label": "round",
                          "model": "round",
                          "readonly": false,
                          "textOn": "圆角",
                          "textOff": "否圆角"
                        },
                        {
                          "type": "switch",
                          "label": "circle",
                          "model": "circle",
                          "readonly": false,
                          "textOn": "圆形",
                          "textOff": "否圆形"
                        },
                        {
                          "type": "switch",
                          "label": "loading",
                          "model": "loading",
                          "readonly": false,
                          "textOn": "loading",
                          "textOff": "否loading"
                        },
                        {
                          "type": "switch",
                          "label": "disabled",
                          "model": "disabled",
                          "readonly": false,
                          "textOn": "disabled",
                          "textOff": "否disabled"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "icon",
                          "model": "icon"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "click",
                          "model": "@click"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-if",
                          "model": "v-if"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": "/EditBlock/ComplexTable/DeleteButton"
          },
          {
            "id": "EditButton",
            "config": {
              "model": {
                "attr": {
                  "size": "mini",
                  "type": "primary",
                  ":plain": false,
                  "round": false,
                  "circle": false,
                  "loading": false,
                  "disabled": false,
                  "icon": "",
                  "@click": "handleUpdate",
                  "v-if": ""
                },
                "custom": {
                  "label": "编辑"
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "select",
                          "label": "size",
                          "model": "size",
                          "multi": true,
                          "values": [
                            "medium",
                            "small",
                            "mini"
                          ]
                        },
                        {
                          "type": "select",
                          "label": "type",
                          "model": "type",
                          "multi": true,
                          "values": [
                            "primary",
                            "success",
                            "warning",
                            "danger",
                            "info",
                            "text"
                          ]
                        },
                        {
                          "type": "switch",
                          "label": "plain",
                          "model": "plain",
                          "readonly": false,
                          "textOn": "朴素",
                          "textOff": "否朴素"
                        },
                        {
                          "type": "switch",
                          "label": "round",
                          "model": "round",
                          "readonly": false,
                          "textOn": "圆角",
                          "textOff": "否圆角"
                        },
                        {
                          "type": "switch",
                          "label": "circle",
                          "model": "circle",
                          "readonly": false,
                          "textOn": "圆形",
                          "textOff": "否圆形"
                        },
                        {
                          "type": "switch",
                          "label": "loading",
                          "model": "loading",
                          "readonly": false,
                          "textOn": "loading",
                          "textOff": "否loading"
                        },
                        {
                          "type": "switch",
                          "label": "disabled",
                          "model": "disabled",
                          "readonly": false,
                          "textOn": "disabled",
                          "textOff": "否disabled"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "icon",
                          "model": "icon"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "click",
                          "model": "@click"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-if",
                          "model": "v-if"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": "/EditBlock/ComplexTable/EditButton"
          },
          {
            "id": "StatusButton",
            "config": {
              "model": {
                "attr": {
                  "size": "mini",
                  "type": "success",
                  ":plain": false,
                  "round": false,
                  "circle": false,
                  "loading": false,
                  "disabled": false,
                  "icon": "",
                  "@click": "handleModifyStatus(row,'published')",
                  "v-if": ""
                },
                "custom": {
                  "label": "发布"
                }
              },
              "schema": {
                "fields": [
                  {
                    "type": "object",
                    "label": "",
                    "model": "attr",
                    "schema": {
                      "fields": [
                        {
                          "type": "select",
                          "label": "size",
                          "model": "size",
                          "multi": true,
                          "values": [
                            "medium",
                            "small",
                            "mini"
                          ]
                        },
                        {
                          "type": "select",
                          "label": "type",
                          "model": "type",
                          "multi": true,
                          "values": [
                            "primary",
                            "success",
                            "warning",
                            "danger",
                            "info",
                            "text"
                          ]
                        },
                        {
                          "type": "switch",
                          "label": "plain",
                          "model": "plain",
                          "readonly": false,
                          "textOn": "朴素",
                          "textOff": "否朴素"
                        },
                        {
                          "type": "switch",
                          "label": "round",
                          "model": "round",
                          "readonly": false,
                          "textOn": "圆角",
                          "textOff": "否圆角"
                        },
                        {
                          "type": "switch",
                          "label": "circle",
                          "model": "circle",
                          "readonly": false,
                          "textOn": "圆形",
                          "textOff": "否圆形"
                        },
                        {
                          "type": "switch",
                          "label": "loading",
                          "model": "loading",
                          "readonly": false,
                          "textOn": "loading",
                          "textOff": "否loading"
                        },
                        {
                          "type": "switch",
                          "label": "disabled",
                          "model": "disabled",
                          "readonly": false,
                          "textOn": "disabled",
                          "textOff": "否disabled"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "icon",
                          "model": "icon"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "click",
                          "model": "@click"
                        },
                        {
                          "type": "input",
                          "inputType": "text",
                          "label": "v-if",
                          "model": "v-if"
                        }
                      ]
                    }
                  }
                ]
              },
              "initType": "auto"
            },
            "children": [],
            "params": null,
            "path": "/EditBlock/ComplexTable/StatusButton"
          }
        ],
        "params": null,
        "path": "/box/Table/column"
      }
    ],
    "params": null,
    "path": ""
  },
  {
    "id": "Pagination",
    "config": {
      "initType": "auto"
    },
    "children": [],
    "params": null,
    "path": "/custom/Pagination"
  },
  {
    "id": "ComplexTable",
    "config": {
      "initType": "auto"
    },
    "children": [],
    "params": null,
    "path": "/EditBlock/ComplexTable"
  }
]