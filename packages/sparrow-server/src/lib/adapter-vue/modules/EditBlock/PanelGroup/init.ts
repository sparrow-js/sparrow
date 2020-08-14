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
    }
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
            ":xs": "12",
            ":sm": "12",
            ":md": "",
            ":lg": "6",
            ":xl": "",
            "tag": "",
            "span": 12
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
          "id": "CardPanel",
          "config": {},
          "children": [
            {
              "id": "EditText",
              "config": {
                "model": {
                  "custom": {
                    "label": "输入文本"
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
              "path": ""
            },
            {
              "id": "SvgIcon",
              "config": {
                "model": {
                  "attr": {
                    "icon-class": "peoples"
                  },
                  "custom": {
                    "icon-color": "icon-color-1"
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
                            "label": "icon-class",
                            "model": "icon-class"
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
                            "type": "select",
                            "label": "icon-color",
                            "model": "icon-color",
                            "values": [
                              "icon-color-1",
                              "icon-color-2",
                              "icon-color-3",
                              "icon-color-4"
                            ]
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "children": [],
              "params": null,
              "path": "/EditBlock/PanelGroup/SvgIcon"
            }
          ],
          "params": null,
          "path": "/EditBlock/PanelGroup/CardPanel"
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
            ":span": "",
            ":offset": "",
            ":push": "",
            ":pull": "",
            ":xs": "12",
            ":sm": "12",
            ":md": "",
            ":lg": "6",
            ":xl": "",
            "tag": "",
            "span": 12
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
          "id": "CardPanel",
          "config": {},
          "children": [
            {
              "id": "EditText",
              "config": {
                "model": {
                  "custom": {
                    "label": "输入文本"
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
              "path": ""
            },
            {
              "id": "SvgIcon",
              "config": {
                "model": {
                  "attr": {
                    "icon-class": "message"
                  },
                  "custom": {
                    "icon-color": "icon-color-2"
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
                            "label": "icon-class",
                            "model": "icon-class"
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
                            "type": "select",
                            "label": "icon-color",
                            "model": "icon-color",
                            "values": [
                              "icon-color-1",
                              "icon-color-2",
                              "icon-color-3",
                              "icon-color-4"
                            ]
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "children": [],
              "params": null,
              "path": "/EditBlock/PanelGroup/SvgIcon"
            }
          ],
          "params": null,
          "path": "/EditBlock/PanelGroup/CardPanel"
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
            ":span": "",
            ":offset": "",
            ":push": "",
            ":pull": "",
            ":xs": "12",
            ":sm": "12",
            ":md": "",
            ":lg": "6",
            ":xl": "",
            "tag": "",
            "span": 12
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
          "id": "CardPanel",
          "config": {},
          "children": [
            {
              "id": "EditText",
              "config": {
                "model": {
                  "custom": {
                    "label": "输入文本"
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
              "path": ""
            },
            {
              "id": "SvgIcon",
              "config": {
                "model": {
                  "attr": {
                    "icon-class": "money"
                  },
                  "custom": {
                    "icon-color": "icon-color-3"
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
                            "label": "icon-class",
                            "model": "icon-class"
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
                            "type": "select",
                            "label": "icon-color",
                            "model": "icon-color",
                            "values": [
                              "icon-color-1",
                              "icon-color-2",
                              "icon-color-3",
                              "icon-color-4"
                            ]
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "children": [],
              "params": null,
              "path": "/EditBlock/PanelGroup/SvgIcon"
            }
          ],
          "params": null,
          "path": "/EditBlock/PanelGroup/CardPanel"
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
            ":span": "",
            ":offset": "",
            ":push": "",
            ":pull": "",
            ":xs": "12",
            ":sm": "12",
            ":md": "",
            ":lg": "6",
            ":xl": "",
            "tag": "",
            "span": 12
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
          "id": "CardPanel",
          "config": {},
          "children": [
            {
              "id": "EditText",
              "config": {
                "model": {
                  "custom": {
                    "label": "输入文本"
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
              "path": ""
            },
            {
              "id": "SvgIcon",
              "config": {
                "model": {
                  "attr": {
                    "icon-class": "shopping"
                  },
                  "custom": {
                    "icon-color": "icon-color-4"
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
                            "label": "icon-class",
                            "model": "icon-class"
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
                            "type": "select",
                            "label": "icon-color",
                            "model": "icon-color",
                            "values": [
                              "icon-color-1",
                              "icon-color-2",
                              "icon-color-3",
                              "icon-color-4"
                            ]
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "children": [],
              "params": null,
              "path": "/EditBlock/PanelGroup/SvgIcon"
            }
          ],
          "params": null,
          "path": "/EditBlock/PanelGroup/CardPanel"
        }
      ],
      "params": null,
      "path": "/box/Row/Column"
    }
  ],
  "params": {
    "columns": 2
  },
  "path": ""
}