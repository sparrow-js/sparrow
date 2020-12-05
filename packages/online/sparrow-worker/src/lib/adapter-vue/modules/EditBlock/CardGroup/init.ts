export default {
  "id": "Row",
  "config": {
    "model": {
      "attr": {
        "gutter": "40",
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
            ":span": "",
            ":offset": "",
            ":push": "",
            ":pull": "",
            ":xs": "",
            ":sm": "",
            ":md": "",
            ":lg": "",
            ":xl": "",
            "tag": "",
            "span": 8
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
          "id": "Card",
          "config": {
            "model": {
              "attr": {
                "shadow": "hover",
                ":body-style": "{\n\tpadding: '0px'\n}"
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
                },
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
                }
              ]
            },
            "initType": "auto"
          },
          "children": [
            {
              "id": "Image",
              "config": {
                "model": {
                  "attr": {
                    "src": "https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ZhzDQLMyYlYAAAAAAAAAAABkARQnAQ",
                    "fit": "",
                    "alt": "",
                    "style": "",
                    ":lazy": false,
                    ":preview-src-list": ""
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
                            "label": "src",
                            "model": "src"
                          },
                          {
                            "type": "input",
                            "inputType": "text",
                            "label": "style",
                            "model": "style"
                          },
                          {
                            "type": "select",
                            "label": "fit",
                            "model": "fit",
                            "values": [
                              "fill",
                              "contain",
                              "cover",
                              "none",
                              "scale-down"
                            ]
                          },
                          {
                            "type": "input",
                            "inputType": "text",
                            "label": "alt",
                            "model": "alt"
                          },
                          {
                            "type": "switch",
                            "label": "lazy",
                            "model": "lazy",
                            "textOn": "lazy",
                            "textOff": "否lazy"
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
              "id": "CardInfo",
              "config": {},
              "children": [
                {
                  "id": "EditText",
                  "config": {
                    "model": {
                      "attr": {
                        "class": "card-meta-title"
                      },
                      "custom": {
                        "label": "sparrow"
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
                  "id": "EditText",
                  "config": {
                    "model": {
                      "attr": {
                        "class": "card-meta-description "
                      },
                      "custom": {
                        "label": "开箱即用的中台前端/设计解决方案"
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
              "path": "/EditBlock/CardGroup/CardInfo",
              "type": "EditBlock"
            }
          ],
          "params": null,
          "path": "",
          "type": "box"
        }
      ],
      "params": null,
      "path": "/box/Row/Column",
      "type": "box"
    },
    {
      "id": "column",
      "config": {
        "model": {
          "attr": {
            ":span": "",
            ":offset": "",
            ":push": "",
            ":pull": "",
            ":xs": "",
            ":sm": "",
            ":md": "",
            ":lg": "",
            ":xl": "",
            "tag": "",
            "span": 8
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
          "id": "Card",
          "config": {
            "model": {
              "attr": {
                "shadow": "hover",
                ":body-style": "{\n\tpadding: '0px'\n}"
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
                },
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
                }
              ]
            },
            "initType": "auto"
          },
          "children": [
            {
              "id": "Image",
              "config": {
                "model": {
                  "attr": {
                    "src": "https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ZhzDQLMyYlYAAAAAAAAAAABkARQnAQ",
                    "fit": "",
                    "alt": "",
                    "style": "",
                    ":lazy": false,
                    ":preview-src-list": ""
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
                            "label": "src",
                            "model": "src"
                          },
                          {
                            "type": "input",
                            "inputType": "text",
                            "label": "style",
                            "model": "style"
                          },
                          {
                            "type": "select",
                            "label": "fit",
                            "model": "fit",
                            "values": [
                              "fill",
                              "contain",
                              "cover",
                              "none",
                              "scale-down"
                            ]
                          },
                          {
                            "type": "input",
                            "inputType": "text",
                            "label": "alt",
                            "model": "alt"
                          },
                          {
                            "type": "switch",
                            "label": "lazy",
                            "model": "lazy",
                            "textOn": "lazy",
                            "textOff": "否lazy"
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
              "id": "CardInfo",
              "config": {},
              "children": [
                {
                  "id": "EditText",
                  "config": {
                    "model": {
                      "attr": {
                        "class": "card-meta-title"
                      },
                      "custom": {
                        "label": "sparrow"
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
                  "id": "EditText",
                  "config": {
                    "model": {
                      "attr": {
                        "class": "card-meta-description "
                      },
                      "custom": {
                        "label": "开箱即用的中台前端/设计解决方案"
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
              "path": "/EditBlock/CardGroup/CardInfo",
              "type": "EditBlock"
            }
          ],
          "params": null,
          "path": "",
          "type": "box"
        }
      ],
      "params": null,
      "path": "/box/Row/Column",
      "type": "box"
    },
    {
      "id": "column",
      "config": {
        "model": {
          "attr": {
            ":span": "",
            ":offset": "",
            ":push": "",
            ":pull": "",
            ":xs": "",
            ":sm": "",
            ":md": "",
            ":lg": "",
            ":xl": "",
            "tag": "",
            "span": 8
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
          "id": "Card",
          "config": {
            "model": {
              "attr": {
                "shadow": "hover",
                ":body-style": "{\n\tpadding: '0px'\n}"
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
                },
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
                }
              ]
            },
            "initType": "auto"
          },
          "children": [
            {
              "id": "Image",
              "config": {
                "model": {
                  "attr": {
                    "src": "https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ZhzDQLMyYlYAAAAAAAAAAABkARQnAQ",
                    "fit": "",
                    "alt": "",
                    "style": "",
                    ":lazy": false,
                    ":preview-src-list": ""
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
                            "label": "src",
                            "model": "src"
                          },
                          {
                            "type": "input",
                            "inputType": "text",
                            "label": "style",
                            "model": "style"
                          },
                          {
                            "type": "select",
                            "label": "fit",
                            "model": "fit",
                            "values": [
                              "fill",
                              "contain",
                              "cover",
                              "none",
                              "scale-down"
                            ]
                          },
                          {
                            "type": "input",
                            "inputType": "text",
                            "label": "alt",
                            "model": "alt"
                          },
                          {
                            "type": "switch",
                            "label": "lazy",
                            "model": "lazy",
                            "textOn": "lazy",
                            "textOff": "否lazy"
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
              "id": "CardInfo",
              "config": {},
              "children": [
                {
                  "id": "EditText",
                  "config": {
                    "model": {
                      "attr": {
                        "class": "card-meta-title"
                      },
                      "custom": {
                        "label": "sparrow"
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
                  "id": "EditText",
                  "config": {
                    "model": {
                      "attr": {
                        "class": "card-meta-description "
                      },
                      "custom": {
                        "label": "开箱即用的中台前端/设计解决方案"
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
              "path": "/EditBlock/CardGroup/CardInfo",
              "type": "EditBlock"
            }
          ],
          "params": null,
          "path": "",
          "type": "box"
        }
      ],
      "params": null,
      "path": "/box/Row/Column",
      "type": "box"
    }
  ],
  "params": {
    "columns": 3
  },
  "path": "",
  "type": "box"
}