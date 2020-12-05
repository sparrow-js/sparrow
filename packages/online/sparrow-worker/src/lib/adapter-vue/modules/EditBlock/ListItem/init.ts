export default           {
  "id": "Container",
  "config": {
    "model": {
      "attr": {
        "v-if": "",
        "class": ""
      },
      "custom": {
        "display": "flex",
        "flex-direction": "row",
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
            ":size": "64",
            ":src": "'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'",
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
      "id": "Container",
      "config": {
        "model": {
          "attr": {
            "v-if": "",
            "class": "ml10"
          },
          "custom": {
            "display": "block",
            "flex-direction": "column",
            "justify-content": "",
            "align-items": "",
            "flex-wrap": "",
            "style": "margin-left:10px"
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
          "id": "Typography",
          "config": {
            "model": {
              "attr": {
                "style": ""
              },
              "custom": {
                "label": "标题",
                "type": "Text",
                "class": "mb10"
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
                "style": ""
              },
              "custom": {
                "label": "内容",
                "type": "AText",
                "class": ""
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
      "path": "",
      "type": "box"
    }
  ],
  "params": null,
  "path": "",
  "type": "box"
}