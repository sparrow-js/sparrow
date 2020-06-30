export default {
  "label": "page",
  "children": [
    {
      "id": "box",
      "config": null,
      "children": [
        {
          "id": "Form",
          "config": {
            "dataCode": "var data = {\n\tform: {\n          name: '',\n          region: '',\n          date1: '',\n          date2: '',\n          delivery: false,\n          type: [],\n          resource: '',\n          desc: ''\n        }\n}",
            "inline": false
          },
          "children": [
            {
              "id": "Input",
              "config": {
                "_custom": {
                  "required": false,
                  "regList": [],
                  "label": "文本框"
                },
                "_attr": {
                  "placeholder": "",
                  "v-model": "form.name"
                }
              },
              "children": [],
              "params": null
            }
          ],
          "params": {
            "blockName": "Form2",
            "col": ""
          },
          "fileName": "Form2"
        }
      ],
      "params": null
    },
    {
      "id": "box",
      "config": null,
      "children": [],
      "params": null
    }
  ]
}