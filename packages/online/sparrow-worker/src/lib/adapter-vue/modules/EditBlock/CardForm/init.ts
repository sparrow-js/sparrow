export default {
  "id": "Form",
  "config": {
    "model": {
      "attr": {
        "label-position": "top",
        ":inline": false,
        "label-width": "50px",
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
      "id": "Card",
      "config": {
        "model": {
          "attr": {
            "shadow": "always",
            ":body-style": "{}"
          },
          "custom": {
            "hasHeader": true,
            "label": "仓库管理"
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
                        "label": "仓库名",
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
                        "label": "仓库管理员",
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
                  "id": "DatePicker",
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
                        "label": "生效日期",
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
  ],
  "params": null,
  "path": "",
  "type": "box"
}