<template>
  <div class="panel-body">
    <vue-form-generator 
      :schema="schema" 
      :model="model" 
      :options="formOptions"
    ></vue-form-generator>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {
        attr: {
          placeholder: '',
          'v-model': ''
        },
        custom: {
          required: false,
          regList: [
            {
              value: '',
              label: ''
            }
          ],
          label: '文本框',
          type: 1
        },
        
      },
      schema: {
        fields: [
          {
            type: 'object',
            label: '',
            model: 'attr',
            schema: {
              fields: [
                {
                  type: "input",
                  inputType: "text",
                  label: "placeholder",
                  model: "placeholder"
                },
                {
                  type: "input",
                  inputType: "text",
                  label: "v-model",
                  model: "v-model"
                }
              ]
            }
          },
          {
            type: 'object',
            label: '',
            model: 'custom',
            schema: {
              fields: [
                {
                  type: "switch",
                  label: "required",
                  model: "required",
                  textOn: '必填',
                  textOff: '非必填'
                },
                {
                  type: "array",
                  label: "regList",
                  model: "regList",
                  itemContainerComponent: 'ArrayContainer',
                  showRemoveButton: false,
                  fieldClasses: 'array-editor',
                  newElementButtonLabelClasses: "el-button el-button--primary el-button--small array-button-add",
                  items: {
                    type: 'object',
                    default: {},
                    schema: {
                      fields: [
                        {
                          type: "input",
                          inputType: "text",
                          label: "label",
                          model: "label"
                        },
                        {
                          type: "input",
                          inputType: "text",
                          label: "value",
                          model: "value"
                        },
                      ]
                    }
                  }
   
                },
                {
                  type: "input",
                  inputType: "text",
                  label: "label",
                  model: "label"
                }
              ]
            }
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
  }
}
</script>
<style lang="scss">
.array-editor{
  width: 100%;
}
.array-button-add{
  margin-top: 10px !important;
}
.vue-form-generator .field-wrap{
  margin-top: 5px;
}
</style>