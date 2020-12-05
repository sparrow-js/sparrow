export default {
  "id": "Container",
  "config": {
    "model": {
      "attr": {
        "v-if": ""
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
  "children": [
    {
      "id": "Steps",
      "config": {
        "initType": "auto"
      },
      "children": [
        {
          "id": "Step",
          "config": {
            "model": {
              "attr": {},
              "custom": {
                "label": "步骤1"
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
                      }
                    ]
                  }
                }
              ]
            }
          },
          "children": [],
          "params": null,
          "path": "/box/Steps/Step",
          "type": "box"
        },
        {
          "id": "Step",
          "config": {
            "model": {
              "attr": {},
              "custom": {
                "label": "步骤1"
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
                      }
                    ]
                  }
                }
              ]
            }
          },
          "children": [],
          "params": null,
          "path": "/box/Steps/Step",
          "type": "box"
        },
        {
          "id": "Step",
          "config": {
            "model": {
              "attr": {},
              "custom": {
                "label": "步骤1"
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
                      }
                    ]
                  }
                }
              ]
            }
          },
          "children": [],
          "params": null,
          "path": "/box/Steps/Step",
          "type": "box"
        }
      ],
      "params": null,
      "path": "",
      "type": "box"
    },
    {
      "id": "Container",
      "config": {
        "model": {
          "attr": {
            "v-if": "active === 0"
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
                        "type": "input",
                        "inputType": "text",
                        "label": "label-position",
                        "model": "label-position"
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
                    "label": "付款账户：",
                    "insideForm": true
                  },
                  "slot": {
                    "data": "var data = {\n  selectOptionsffa2fd83: [{\n    value: '选项1',\n    label: '选项1'\n  }, {\n    value: '选项2',\n    label: '选项2'\n  }, {\n    value: '选项3',\n    label: '选项3'\n  }]\n};"
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
            },
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
                    "label": "收入账号：",
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
                    "label": "收款人姓名：",
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
                    "label": "转账金额：",
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
            }
          ],
          "params": null,
          "path": "",
          "type": "box"
        }
      ],
      "params": null,
      "path": "",
      "type": "box"
    },
    {
      "id": "Container",
      "config": {
        "model": {
          "attr": {
            "v-if": "active === 1"
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
                        "type": "input",
                        "inputType": "text",
                        "label": "label-position",
                        "model": "label-position"
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
              "id": "FormEditText",
              "config": {
                "model": {
                  "attr": {
                    "class": ""
                  },
                  "custom": {
                    "label": "付款账户：",
                    "des": "sparrowwht7@gmail.com",
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
                            "label": "class",
                            "model": "class"
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
              "id": "FormEditText",
              "config": {
                "model": {
                  "attr": {
                    "class": ""
                  },
                  "custom": {
                    "label": "收入账号：",
                    "des": "sparrowwht7@gmail.com",
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
                            "label": "class",
                            "model": "class"
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
              "id": "FormEditText",
              "config": {
                "model": {
                  "attr": {
                    "class": ""
                  },
                  "custom": {
                    "label": "收款人姓名：",
                    "des": "wht",
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
                            "label": "class",
                            "model": "class"
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
              "id": "FormEditText",
              "config": {
                "model": {
                  "attr": {
                    "class": ""
                  },
                  "custom": {
                    "label": "转账金额：",
                    "des": "1000",
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
                            "label": "class",
                            "model": "class"
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
          "path": "",
          "type": "box"
        }
      ],
      "params": null,
      "path": "",
      "type": "box"
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
            "@click": "next"
          },
          "custom": {
            "label": "下一步"
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
  "path": "",
  "type": "box"
}