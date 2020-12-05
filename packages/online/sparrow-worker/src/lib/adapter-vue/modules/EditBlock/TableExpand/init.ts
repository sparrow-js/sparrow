export default           {
  "id": "Table",
  "config": {
    "model": {
      "attr": {
        "stripe": "",
        "border": "true",
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
                "type": "input",
                "inputType": "text",
                "label": "border",
                "model": "border"
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
            "label": "",
            "type": "expand"
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
                "label-position": "left",
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
              "id": "FormEditText",
              "config": {
                "model": {
                  "attr": {
                    "class": ""
                  },
                  "custom": {
                    "label": "商品名称",
                    "des": "好滋好味鸡蛋仔",
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
                    "label": "所属店铺",
                    "des": "王小虎夫妻店",
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
                    "label": "商品 ID",
                    "des": "12987123",
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
                    "label": "店铺 ID",
                    "des": "10333",
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
                    "label": "商品分类",
                    "des": "江浙小吃、小吃零食",
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
                    "label": "店铺地址",
                    "des": "上海市普陀区真北路",
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
                    "label": "商品描述",
                    "des": "好滋好味鸡蛋仔",
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
                    "label": "商品名称",
                    "des": "荷兰优质淡奶，奶香浓而不腻",
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
            "label": "商品 ID",
            "type": ""
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
            "label": "商品名称",
            "type": ""
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
            "label": "描述",
            "type": ""
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
            "label": "操作",
            "type": ""
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
          "id": "Delete",
          "config": {},
          "children": [],
          "params": null,
          "path": "/custom/Table/Delete",
          "type": "custom"
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
}