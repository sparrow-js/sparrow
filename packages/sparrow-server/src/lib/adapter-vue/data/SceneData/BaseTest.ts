export default {
  "label": "page",
  "children": [
    {
      "id": "box",
      "config": null,
      "children": [
        {
          "id": "Form",
          "config": null,
          "children": [
            {
              "id": "Input",
              "config": {
                "_custom": {
                  "required": false,
                  "regList": []
                },
                "_attr": {
                  "placeholder": "",
                  "v-model": "form.name"
                }
              },
              "children": []
            },
            {
              "id": "DatePicker",
              "config": {
                "_custom": {
                  "required": false,
                  "regList": []
                },
                "_attr": {
                  "v-model": "form.date1"
                },
                "_slot": {}
              },
              "children": []
            },
            {
              "id": "DateTimePicker",
              "config": {
                "_custom": {
                  "required": false,
                  "regList": []
                },
                "_attr": {
                  "v-model": "form.date2"
                },
                "_slot": {}
              },
              "children": []
            },
            {
              "id": "Switch",
              "config": {
                "_custom": {
                  "required": false,
                  "regList": []
                },
                "_attr": {
                  "placeholder": "请输入",
                  "v-model": "form.delivery"
                },
                "_slot": {}
              },
              "children": []
            }
          ],
          "fileName": "Form5"
        }
      ]
    },
    {
      "id": "box",
      "config": null,
      "children": []
    }
  ]
}