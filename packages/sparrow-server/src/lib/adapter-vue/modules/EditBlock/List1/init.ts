export default {
  "id": "Card",
  "config": {
    "model": {
      "attr": {
        "shadow": "never",
        ":body-style": "{\n\tbackgroundImage: 'linear-gradient(152deg, #0CC7F0 0%, #087ECC 51%, #077AC9 55%, #0659B9 78%)'\n}"
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
      "id": "Container",
      "config": {
        "model": {
          "attr": {
            "v-if": "",
            "class": ""
          },
          "custom": {
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "",
            "align-items": "center",
            "flex-wrap": "",
            "style": ""
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
                  },
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
                    "type": "radios",
                    "label": "display",
                    "model": "display",
                    "values": [
                      "flex",
                      "block",
                      "inline-block"
                    ]
                  },
                  {
                    "type": "radios",
                    "label": "flex-direction",
                    "model": "flex-direction",
                    "values": [
                      "row",
                      "row-reverse",
                      "column",
                      "column-reverse"
                    ]
                  },
                  {
                    "type": "radios",
                    "label": "align-items",
                    "model": "align-items",
                    "values": [
                      "flex-start",
                      "flex-end",
                      "baseline",
                      "center",
                      "stretch"
                    ]
                  },
                  {
                    "type": "radios",
                    "label": "justify-content",
                    "model": "justify-content",
                    "values": [
                      "flex-start",
                      "flex-end",
                      "center",
                      "space-between",
                      "space-around"
                    ]
                  },
                  {
                    "type": "radios",
                    "label": "flex-wrap",
                    "model": "flex-wrap",
                    "values": [
                      "nowrap",
                      "wrap",
                      "wrap-reverse"
                    ]
                  },
                  {
                    "type": "input",
                    "inputType": "text",
                    "label": "style",
                    "model": "style"
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
          "id": "Avatar",
          "config": {
            "model": {
              "attr": {
                ":size": "72",
                ":src": "'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zk6CQphLepQAAAAAAAAAAAAAARQnAQ'",
                "shape": "square",
                "fit": ""
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
                        "model": ":src"
                      },
                      {
                        "type": "input",
                        "inputType": "text",
                        "label": "size",
                        "model": ":size"
                      },
                      {
                        "type": "select",
                        "label": "shape",
                        "model": "shape",
                        "multi": true,
                        "values": [
                          "circle",
                          "square",
                          ""
                        ]
                      },
                      {
                        "type": "select",
                        "label": "fit",
                        "model": "fit",
                        "multi": true,
                        "values": [
                          "fill",
                          "contain",
                          "cover",
                          "none",
                          "scale-down"
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
          "path": ""
        },
        {
          "id": "Typography",
          "config": {
            "model": {
              "attr": {
                "style": "color: #fff"
              },
              "custom": {
                "label": "标题",
                "type": "H4",
                "class": "mt10"
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
                        "label": "style",
                        "model": "style"
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
                        "label": "class",
                        "model": "class"
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
              "attr": {
                "style": "color: #fff"
              },
              "custom": {
                "label": "内容",
                "type": "AText",
                "class": "mt8"
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
                        "label": "style",
                        "model": "style"
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
                        "label": "class",
                        "model": "class"
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
    }
  ],
  "params": null,
  "path": ""
}