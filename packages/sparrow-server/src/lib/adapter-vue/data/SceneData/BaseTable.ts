export default {
  "name": "BaseTable",
  "id": "",
  "config": {
    "label": "page",
    "initScene": "BaseTable",
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
              "blockName": "FormBase",
            },
            "fileName": "FormBase"
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
              "compBox": "BasicTable"
            },
            "children": [],
            "fileName": "CustomInline"
          }
        ],
        "params": null
      },
      {
        "id": "box",
        "config": null,
        "children": [
          {
            "id": "Table",
            "config": null,
            "children": [
              {
                "id": "column",
                "config": {
                  "_custom": {
                    "label": ""
                  }
                },
                "children": [],
                "params": null
              },
              {
                "id": "column",
                "config": {
                  "_custom": {
                    "label": ""
                  }
                },
                "children": [],
                "params": null
              },
              {
                "id": "column",
                "config": {
                  "_custom": {
                    "label": ""
                  }
                },
                "children": [],
                "params": null
              },
              {
                "id": "column",
                "config": {
                  "_custom": {
                    "label": ""
                  }
                },
                "children": [],
                "params": null
              },
              {
                "id": "column",
                "config": {
                  "_custom": {
                    "label": ""
                  }
                },
                "children": [],
                "params": null
              }
            ],
            "params": {
              "blockName": "TableBase",
              "col": "5"
            },
            "fileName": "TableBase"
          }
        ],
        "params": null
      }
    ]
  }
};



