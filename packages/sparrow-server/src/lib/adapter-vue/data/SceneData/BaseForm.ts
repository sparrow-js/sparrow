export default {
  "name": "BaseForm",
  "id": "",
  "config": {
    "label": "page",
    "initScene": "BaseForm",
    "children": [
      {
        "id": "box",
        "config": null,
        "children": [
          {
            "id": "Form",
            "config": {
              "dataCode": "var data = {}",
              "inline": false
            },
            "children": [],
            "params": {
              "blockName": "FormBasic",
            },
            "fileName": "FormBasic"
          }
        ],
        "params": null
      },
      {
        "id": "box",
        "config": null,
        "children": [
          {
            "id": "CustomInline",
            "config": null,
            "params": {
              "compBox": "BaseForm"
            },
            "children": [],
            "fileName": "CustomInline"
          }
        ],
        "params": null
      }
    ]
  }
};



