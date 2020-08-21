export default {
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
      "id": "Typography",
      "config": {
        "model": {
          "custom": {
            "label": "退款申请",
            "type": "H4"
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
        },
        "initType": "auto"
      },
      "children": [],
      "params": null,
      "path": ""
    },
    {
      "id": "Row",
      "config": {
        "model": {
          "attr": {
            "gutter": "",
            "type": "",
            "justify": "",
            "align": "",
            "tag": ""
          },
          "custom": {}
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
                    "label": "gutter",
                    "model": "gutter"
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "type",
                    "model": "type"
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "justify",
                    "model": "justify"
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "align",
                    "model": "align"
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "tag",
                    "model": "tag"
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
                ":span": 8,
                ":offset": "",
                ":push": "",
                ":pull": "",
                ":xs": "",
                ":sm": "",
                ":md": "",
                ":lg": "",
                ":xl": "",
                "tag": ""
              },
              "custom": {}
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
                        "label": "span",
                        "model": ":span"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "offset",
                        "model": ":offset"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "push",
                        "model": ":push"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "pull",
                        "model": ":pull"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xs",
                        "model": ":xs"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "sm",
                        "model": ":sm"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "md",
                        "model": ":md"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "lg",
                        "model": ":lg"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xl",
                        "model": ":xl"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "tag",
                        "model": "tag"
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
                    "class": "sp-descriptions-item-label sp-descriptions-item-colon"
                  },
                  "custom": {
                    "label": "取货单号",
                    "inline": true
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
            },
            {
              "id": "EditText",
              "config": {
                "model": {
                  "attr": {
                    "class": "sp-descriptions-item-content"
                  },
                  "custom": {
                    "label": "1000000000",
                    "inline": true
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
          "path": "/box/Row/Column"
        },
        {
          "id": "column",
          "config": {
            "model": {
              "attr": {
                ":span": 8,
                ":offset": "",
                ":push": "",
                ":pull": "",
                ":xs": "",
                ":sm": "",
                ":md": "",
                ":lg": "",
                ":xl": "",
                "tag": ""
              },
              "custom": {}
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
                        "label": "span",
                        "model": ":span"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "offset",
                        "model": ":offset"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "push",
                        "model": ":push"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "pull",
                        "model": ":pull"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xs",
                        "model": ":xs"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "sm",
                        "model": ":sm"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "md",
                        "model": ":md"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "lg",
                        "model": ":lg"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xl",
                        "model": ":xl"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "tag",
                        "model": "tag"
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
                    "class": "sp-descriptions-item-label sp-descriptions-item-colon"
                  },
                  "custom": {
                    "label": "状态",
                    "inline": true
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
            },
            {
              "id": "EditText",
              "config": {
                "model": {
                  "attr": {
                    "class": "sp-descriptions-item-content"
                  },
                  "custom": {
                    "label": "已取货",
                    "inline": true
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
          "path": "/box/Row/Column"
        },
        {
          "id": "column",
          "config": {
            "model": {
              "attr": {
                ":span": 8,
                ":offset": "",
                ":push": "",
                ":pull": "",
                ":xs": "",
                ":sm": "",
                ":md": "",
                ":lg": "",
                ":xl": "",
                "tag": ""
              },
              "custom": {}
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
                        "label": "span",
                        "model": ":span"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "offset",
                        "model": ":offset"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "push",
                        "model": ":push"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "pull",
                        "model": ":pull"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xs",
                        "model": ":xs"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "sm",
                        "model": ":sm"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "md",
                        "model": ":md"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "lg",
                        "model": ":lg"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xl",
                        "model": ":xl"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "tag",
                        "model": "tag"
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
                    "class": "sp-descriptions-item-label sp-descriptions-item-colon"
                  },
                  "custom": {
                    "label": "销售单号",
                    "inline": true
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
            },
            {
              "id": "EditText",
              "config": {
                "model": {
                  "attr": {
                    "class": "sp-descriptions-item-content"
                  },
                  "custom": {
                    "label": "1234123421",
                    "inline": true
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
          "path": "/box/Row/Column"
        },
        {
          "id": "column",
          "config": {
            "model": {
              "attr": {
                ":span": 8,
                ":offset": "",
                ":push": "",
                ":pull": "",
                ":xs": "",
                ":sm": "",
                ":md": "",
                ":lg": "",
                ":xl": "",
                "tag": ""
              },
              "custom": {}
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
                        "label": "span",
                        "model": ":span"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "offset",
                        "model": ":offset"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "push",
                        "model": ":push"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "pull",
                        "model": ":pull"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xs",
                        "model": ":xs"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "sm",
                        "model": ":sm"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "md",
                        "model": ":md"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "lg",
                        "model": ":lg"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xl",
                        "model": ":xl"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "tag",
                        "model": "tag"
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
                    "class": "sp-descriptions-item-label sp-descriptions-item-colon"
                  },
                  "custom": {
                    "label": "子订单",
                    "inline": true
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
            },
            {
              "id": "EditText",
              "config": {
                "model": {
                  "attr": {
                    "class": "sp-descriptions-item-content"
                  },
                  "custom": {
                    "label": "3214321432",
                    "inline": true
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
          "path": "/box/Row/Column"
        }
      ],
      "params": {
        "columns": 3
      },
      "path": ""
    },
    {
      "id": "Divider",
      "config": {
        "model": {
          "attr": {
            "class": ""
          },
          "custom": {
            "label": "输入文本"
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
      "id": "Typography",
      "config": {
        "model": {
          "custom": {
            "label": "用户信息",
            "type": "H4"
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
        },
        "initType": "auto"
      },
      "children": [],
      "params": null,
      "path": ""
    },
    {
      "id": "Row",
      "config": {
        "model": {
          "attr": {
            "gutter": "",
            "type": "",
            "justify": "",
            "align": "",
            "tag": ""
          },
          "custom": {}
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
                    "label": "gutter",
                    "model": "gutter"
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "type",
                    "model": "type"
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "justify",
                    "model": "justify"
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "align",
                    "model": "align"
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "tag",
                    "model": "tag"
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
                ":span": 8,
                ":offset": "",
                ":push": "",
                ":pull": "",
                ":xs": "",
                ":sm": "",
                ":md": "",
                ":lg": "",
                ":xl": "",
                "tag": ""
              },
              "custom": {}
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
                        "label": "span",
                        "model": ":span"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "offset",
                        "model": ":offset"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "push",
                        "model": ":push"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "pull",
                        "model": ":pull"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xs",
                        "model": ":xs"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "sm",
                        "model": ":sm"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "md",
                        "model": ":md"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "lg",
                        "model": ":lg"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xl",
                        "model": ":xl"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "tag",
                        "model": "tag"
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
                    "class": "sp-descriptions-item-label sp-descriptions-item-colon"
                  },
                  "custom": {
                    "label": "用户姓名",
                    "inline": true
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
            },
            {
              "id": "EditText",
              "config": {
                "model": {
                  "attr": {
                    "class": "sp-descriptions-item-content"
                  },
                  "custom": {
                    "label": "付小小",
                    "inline": true
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
          "path": "/box/Row/Column"
        },
        {
          "id": "column",
          "config": {
            "model": {
              "attr": {
                ":span": 8,
                ":offset": "",
                ":push": "",
                ":pull": "",
                ":xs": "",
                ":sm": "",
                ":md": "",
                ":lg": "",
                ":xl": "",
                "tag": ""
              },
              "custom": {}
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
                        "label": "span",
                        "model": ":span"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "offset",
                        "model": ":offset"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "push",
                        "model": ":push"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "pull",
                        "model": ":pull"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xs",
                        "model": ":xs"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "sm",
                        "model": ":sm"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "md",
                        "model": ":md"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "lg",
                        "model": ":lg"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xl",
                        "model": ":xl"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "tag",
                        "model": "tag"
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
                    "class": "sp-descriptions-item-label sp-descriptions-item-colon"
                  },
                  "custom": {
                    "label": "联系电话",
                    "inline": true
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
            },
            {
              "id": "EditText",
              "config": {
                "model": {
                  "attr": {
                    "class": "sp-descriptions-item-content"
                  },
                  "custom": {
                    "label": "18100000000",
                    "inline": true
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
          "path": "/box/Row/Column"
        },
        {
          "id": "column",
          "config": {
            "model": {
              "attr": {
                ":span": 8,
                ":offset": "",
                ":push": "",
                ":pull": "",
                ":xs": "",
                ":sm": "",
                ":md": "",
                ":lg": "",
                ":xl": "",
                "tag": ""
              },
              "custom": {}
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
                        "label": "span",
                        "model": ":span"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "offset",
                        "model": ":offset"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "push",
                        "model": ":push"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "pull",
                        "model": ":pull"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xs",
                        "model": ":xs"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "sm",
                        "model": ":sm"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "md",
                        "model": ":md"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "lg",
                        "model": ":lg"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "xl",
                        "model": ":xl"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "tag",
                        "model": "tag"
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
                    "class": "sp-descriptions-item-label sp-descriptions-item-colon"
                  },
                  "custom": {
                    "label": "常用快递",
                    "inline": true
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
            },
            {
              "id": "EditText",
              "config": {
                "model": {
                  "attr": {
                    "class": "sp-descriptions-item-content"
                  },
                  "custom": {
                    "label": "菜鸟仓储",
                    "inline": true
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
          "path": "/box/Row/Column"
        }
      ],
      "params": {
        "columns": 3
      },
      "path": ""
    }
  ],
  "params": null,
  "path": ""
}