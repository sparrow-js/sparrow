<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <div style="margin-top: 20px;">
          <array-list-box
            :list="form.arr"
            :default="{
              id: '',
              name: ''
            }"
          >
            <template v-slot:item="{ item }">
              <logic-box :uuid="'842f567d'"
                ><component-box indexcomp="0" uuid="2f567d04">
                  <el-form-item label=" ">
                    <label-box label="文本框:" indexcomp="1" uuid="2f567d04" />
                    <el-input placeholder="" v-model="item.id" />
                  </el-form-item> </component-box
                ><component-box indexcomp="1" uuid="567d0404">
                  <el-form-item label=" ">
                    <label-box label="单选框" indexcomp="1" uuid="567d0404" />
                    <el-radio-group v-model="item.name">
                      <el-radio
                        v-for="item in radionboxOptions567d0404"
                        :key="item.value"
                        :label="item.label"
                      />
                    </el-radio-group>
                  </el-form-item> </component-box
              ></logic-box>
            </template>
          </array-list-box>
        </div>
      </el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {},

  data() {
    return {
      form: {
        arr: [
          {
            id: "",
            name: ""
          }
        ]
      },
      radionboxOptions567d0404: [
        {
          value: "单选框1",
          label: "单选框1"
        },
        {
          value: "单选框2",
          label: "单选框2"
        },
        {
          value: "单选框3",
          label: "单选框3"
        }
      ]
    };
  }
};
</script>
