export default           {
  "id": "Form",
  "config": {
    "model": {
      "attr": {
        "ref": "",
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
                "label": "ref",
                "model": "ref"
              },
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
              "id": "Input",
              "config": {
                "model": {
                  "attr": {
                    "title": "",
                    "type": "",
                    "closable": true,
                    "center": "",
                    "size": ""
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
          "path": "/box/Row/Column",
          "type": "box"
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
            }
          ],
          "params": null,
          "path": "/box/Row/Column",
          "type": "box"
        },
        {
          "id": "Container",
          "config": {
            "model": {
              "attr": {
                "v-if": "advanced === true",
                ":style": ""
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
                },
                {
                  "type": "object",
                  "label": "",
                  "model": "attr",
                  "schema": {
                    "fields": [
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "style",
                        "model": ":style"
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
                        "data": "var data = {\n  selectOptions2a8856ae: [{\n    value: '选项1',\n    label: '选项1'\n  }, {\n    value: '选项2',\n    label: '选项2'\n  }, {\n    value: '选项3',\n    label: '选项3'\n  }]\n};"
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
              "path": "/box/Row/Column",
              "type": "box"
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
                  "id": "Input",
                  "config": {
                    "model": {
                      "attr": {
                        "title": "",
                        "type": "",
                        "closable": true,
                        "center": "",
                        "size": ""
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
              "path": "/box/Row/Column",
              "type": "box"
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
                  "id": "Input",
                  "config": {
                    "model": {
                      "attr": {
                        "title": "",
                        "type": "",
                        "closable": true,
                        "center": "",
                        "size": ""
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
              "path": "/box/Row/Column",
              "type": "box"
            }
          ],
          "params": null,
          "path": "",
          "type": "box"
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
                ":md": "!advanced && 8 || 24",
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
              "id": "Container",
              "config": {
                "model": {
                  "attr": {
                    "v-if": "",
                    ":style": "advanced && { float: 'right', overflow: 'hidden' } || {}"
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
                    },
                    {
                      "type": "object",
                      "label": "",
                      "model": "attr",
                      "schema": {
                        "fields": [
                          {
                            "type": "input",
                            "inputType": "text",
                            "label": "style",
                            "model": ":style"
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
                        "style": "",
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
                  "path": "/EditBlock/ComplexTable/SearchButton",
                  "type": "EditBlock"
                },
                {
                  "id": "ResetButton",
                  "config": {},
                  "children": [],
                  "params": null,
                  "path": "/custom/BaseForm/ResetButton",
                  "type": "custom"
                },
                {
                  "id": "Advanced",
                  "config": {},
                  "children": [],
                  "params": null,
                  "path": "/EditBlock/AdvancedSearch/Advanced",
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
  ],
  "params": null,
  "path": "",
  "type": "box"
}