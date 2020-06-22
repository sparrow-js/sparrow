<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box indexcomp="0" uuid="8091de77">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="0" uuid="8091de77" />
            <el-input placeholder="" v-model="form.name" />
          </el-form-item> </component-box
        ><component-box indexcomp="1" uuid="91de7730">
          <el-form-item label=" ">
            <label-box label="单选框" indexcomp="1" uuid="91de7730" />
            <el-radio-group v-model="form.region">
              <el-radio
                v-for="item in radionboxOptions91de7730"
                :key="item.value"
                :label="item.label"
              />
            </el-radio-group>
          </el-form-item> </component-box
        ><component-box indexcomp="2" uuid="de7730f3">
          <el-form-item label=" ">
            <label-box label="特殊资源" indexcomp="2" uuid="de7730f3" />
            <el-select placeholder="请输入" v-model="form.date1">
              <el-option
                v-for="item in selectOptionsde7730f3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> </component-box
        ><component-box indexcomp="3" uuid="7730f319">
          <el-form-item label=" ">
            <label-box label="级联选择器" indexcomp="3" uuid="7730f319">
            </label-box>
            <el-cascader
              placeholder="请输入"
              v-model="form.date2"
              :options="cascaderOptions7730f319"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange7730f319"
            />
          </el-form-item> </component-box
        ><component-box indexcomp="4" uuid="30f319e4">
          <el-form-item label=" ">
            <label-box label="开关" indexcomp="4" uuid="30f319e4" />
            <el-switch placeholder="请输入" v-model="form.delivery" />
          </el-form-item> </component-box
        ><component-box indexcomp="5" uuid="f319e49f">
          <el-form-item label=" ">
            <label-box label="日期选择器" :indexcomp="5" uuid="f319e49f" />

            <el-date-picker
              v-model="form.resource"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item> </component-box
        ><component-box indexcomp="6" uuid="19e49f01">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="6" uuid="19e49f01" />
            <el-input
              placeholder=""
              v-model="form.desc"
              type="textarea"
              rows="4"
            />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {
    handleChange7730f319(value) {
      console.log(value);
    }
  },

  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      radionboxOptions91de7730: [
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
      ],
      selectOptionsde7730f3: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
        },
        {
          value: "选项3",
          label: "选项3"
        }
      ],
      cascaderOptions7730f319: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
    };
  }
};
</script>
