export default [
  {
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
              "label": "名称：",
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
      },
      {
        "id": "Input",
        "config": {
          "model": {
            "attr": {
              "title": "",
              "type": "textarea",
              "closable": true,
              "center": "",
              "size": "",
              "rows": 4
            },
            "custom": {
              "required": false,
              "regList": [
                {
                  "value": "",
                  "label": ""
                }
              ],
              "label": "详情：",
              "type": "textarea",
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
      },
      {
        "id": "SaveButton",
        "config": {},
        "children": [],
        "params": null,
        "path": "/custom/BaseForm/SaveButton",
        "type": "custom"
      },
      {
        "id": "ResetButton",
        "config": {},
        "children": [],
        "params": null,
        "path": "/custom/BaseForm/ResetButton",
        "type": "custom"
      }
    ],
    "params": null,
    "path": "",
    "type": "box"
  }
]