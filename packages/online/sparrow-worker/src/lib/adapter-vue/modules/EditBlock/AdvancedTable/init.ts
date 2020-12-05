export default [
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
        "path": "/box/Table/column",
        "type": "box"
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
              "label": "author",
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
            "id": "Container",
            "config": {
              "model": {
                "attr": {
                  "v-if": "row.editable"
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
                "id": "Input",
                "config": {
                  "model": {
                    "attr": {
                      "title": "",
                      "type": "",
                      "closable": true,
                      "center": "",
                      "size": "small",
                      "v-model": "row.author"
                    },
                    "custom": {
                      "required": false,
                      "regList": [
                        {
                          "value": "",
                          "label": ""
                        }
                      ],
                      "label": "文本框"
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
                            },
                            {
                              "type": "select",
                              "label": "size",
                              "model": "size",
                              "multi": true,
                              "values": [
                                "medium",
                                "small",
                                "mini",
                                ""
                              ]
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
          },
          {
            "id": "Container",
            "config": {
              "model": {
                "attr": {
                  "v-if": "!row.editable"
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
                "id": "EditText",
                "config": {
                  "model": {
                    "attr": {
                      "class": ""
                    },
                    "custom": {
                      "label": "name",
                      "inline": false,
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
                            },
                            {
                              "type": "input",
                              "inputType": "text",
                              "label": "value",
                              "model": "value"
                            },
                            {
                              "type": "switch",
                              "label": "inline",
                              "model": "inline",
                              "textOn": "行内",
                              "textOff": "否行内"
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
        "path": "/box/Table/column",
        "type": "box"
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
              "label": "des",
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
            "id": "Container",
            "config": {
              "model": {
                "attr": {
                  "v-if": "row.editable"
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
                "id": "Input",
                "config": {
                  "model": {
                    "attr": {
                      "title": "",
                      "type": "",
                      "closable": true,
                      "center": "",
                      "size": "small",
                      "v-model": "row.title"
                    },
                    "custom": {
                      "required": false,
                      "regList": [
                        {
                          "value": "",
                          "label": ""
                        }
                      ],
                      "label": "文本框"
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
                            },
                            {
                              "type": "select",
                              "label": "size",
                              "model": "size",
                              "multi": true,
                              "values": [
                                "medium",
                                "small",
                                "mini",
                                ""
                              ]
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
          },
          {
            "id": "Container",
            "config": {
              "model": {
                "attr": {
                  "v-if": "!row.editable"
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
                "id": "EditText",
                "config": {
                  "model": {
                    "attr": {
                      "class": ""
                    },
                    "custom": {
                      "label": "Bmzl hyu ilmgtw.",
                      "inline": false,
                      "value": "row.title"
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
                            },
                            {
                              "type": "input",
                              "inputType": "text",
                              "label": "value",
                              "model": "value"
                            },
                            {
                              "type": "switch",
                              "label": "inline",
                              "model": "inline",
                              "textOn": "行内",
                              "textOff": "否行内"
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
        "path": "/box/Table/column",
        "type": "box"
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
              "label": "tool",
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
            "id": "Container",
            "config": {
              "model": {
                "attr": {
                  "v-if": "row.editable"
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
                "id": "Container",
                "config": {
                  "model": {
                    "attr": {
                      "v-if": "row.isNew"
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
                    "id": "AddButton",
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
                          "style": "",
                          "@click": "saveRow(row)",
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
                    "path": "/EditBlock/AdvancedTable/AddButton",
                    "type": "EditBlock"
                  },
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
                          "style": "",
                          "@click": "",
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
                    "path": "/EditBlock/AdvancedTable/DeleteButton",
                    "type": "EditBlock"
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
                      "v-if": "!row.isNew"
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
                    "id": "SaveButton",
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
                          "style": "",
                          "@click": "saveRow(row)",
                          "v-if": ""
                        },
                        "custom": {
                          "label": "保存"
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
                    "path": "/EditBlock/AdvancedTable/SaveButton",
                    "type": "EditBlock"
                  },
                  {
                    "id": "CancelButton",
                    "config": {
                      "model": {
                        "attr": {
                          "size": "mini",
                          "type": "warning",
                          ":plain": false,
                          "round": false,
                          "circle": false,
                          "loading": false,
                          "disabled": false,
                          "icon": "",
                          "style": "",
                          "@click": "cancel(row.id)",
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
                    "path": "/EditBlock/AdvancedTable/CancelButton",
                    "type": "EditBlock"
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
                  "v-if": "!row.editable"
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
                      "style": "",
                      "@click": "toggle(row.id)",
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
                "path": "/EditBlock/AdvancedTable/EditButton",
                "type": "EditBlock"
              },
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
                      "style": "",
                      "@click": "",
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
                "path": "/EditBlock/AdvancedTable/DeleteButton",
                "type": "EditBlock"
              }
            ],
            "params": null,
            "path": "",
            "type": "box"
          }
        ],
        "params": null,
        "path": "/box/Table/column",
        "type": "box"
      }
    ],
    "params": null,
    "path": "",
    "type": "box"
  },
  {
    "id": "AdvancedTable",
    "config": {},
    "children": [],
    "params": null,
    "path": "/EditBlock/AdvancedTable",
    "type": "EditBlock"
  },
  {
    "id": "NewButton",
    "config": {
      "model": {
        "attr": {
          "size": "medium",
          "type": "",
          ":plain": false,
          "round": false,
          "circle": false,
          "loading": false,
          "disabled": false,
          "icon": "el-icon-plus",
          "style": "width: 100%;margin-top: 10px;",
          "@click": "newMember",
          "v-if": ""
        },
        "custom": {
          "label": "新增"
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
      }
    },
    "children": [],
    "params": null,
    "path": "/EditBlock/AdvancedTable/NewButton",
    "type": "EditBlock"
  }
]