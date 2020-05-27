<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <div style="margin-bottom: 20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <label-box label="卡片" uuid="e25784af" :clear-class="true" />
            </div>
            <div class="card-content">
              <logic-box :uuid="'e25784af'" :label="'card'"
                ><component-box indexcomp="0" uuid="5784afa6">
                  <el-form-item label=" ">
                    <label-box label="文本框:" indexcomp="1" uuid="5784afa6" />
                    <el-input placeholder="" v-model="name" />
                  </el-form-item> </component-box
                ><component-box indexcomp="1" uuid="84afa672">
                  <el-form-item label=" ">
                    <label-box label="单选框:" indexcomp="1" uuid="84afa672" />
                    <el-radio-group v-model="id">
                      <el-radio
                        v-for="item in radionboxOptions84afa672"
                        :key="item.value"
                        :label="item.label"
                      />
                    </el-radio-group>
                  </el-form-item> </component-box
                ><component-box indexcomp="2" uuid="afa67249">
                  <el-form-item label=" ">
                    <label-box label="数字文:" indexcomp="1" uuid="afa67249" />
                    <el-input-number
                      placeholder=""
                      v-model="age"
                      :min="1"
                      :max="10"
                    />
                  </el-form-item> </component-box
              ></logic-box>
            </div>
          </el-card>
        </div>

        <div style="margin-bottom: 20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <label-box label="卡片名z:" uuid="a67249ac" :clear-class="true" />
            </div>
            <div class="card-content">
              <logic-box :uuid="'a67249ac'" :label="'card'"
                ><component-box indexcomp="0" uuid="7249ac8d">
                  <el-form-item label=" ">
                    <label-box label="文本框" indexcomp="2" uuid="7249ac8d" />
                    <el-input placeholder="" v-model="name" />
                  </el-form-item> </component-box
                ><component-box indexcomp="1" uuid="49ac8d9a">
                  <el-form-item label=" ">
                    <label-box
                      label="数字文本框"
                      indexcomp="2"
                      uuid="49ac8d9a"
                    />
                    <el-input-number :min="1" :max="10" />
                  </el-form-item> </component-box
                ><component-box indexcomp="2" uuid="ac8d9a2d">
                  <el-form-item label=" ">
                    <label-box label="特殊资源" indexcomp="2" uuid="ac8d9a2d" />
                    <el-select placeholder="请输入" v-model="age">
                      <el-option
                        v-for="item in selectOptionsac8d9a2d"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item> </component-box
              ></logic-box>
            </div>
          </el-card>
        </div>

        <div style="margin-bottom: 20px;">
          <tabs-box
            :list="[
              {
                label: '用户管理',
                value: 'first'
              },
              {
                label: '配置管理',
                value: 'second'
              },
              {
                label: '角色管理',
                value: 'third'
              },
              {
                label: '定时任务补偿',
                value: 'fourth'
              }
            ]"
            :uuid="'8d9a2d84'"
            :active-name="'first'"
          >
            <div slot="tab_first">
              <div style="margin-top: 20px;">
                <logic-box :uuid="'9a2d84b6'" :label="'tab_item'"
                  ><component-box indexcomp="0" uuid="9c8947e2">
                    <el-form-item label=" ">
                      <label-box
                        label="文本=框"
                        indexcomp="3"
                        uuid="9c8947e2"
                      />
                      <el-input placeholder="" v-model="name" />
                    </el-form-item> </component-box
                ></logic-box>
              </div>
            </div>

            <div slot="tab_second">
              <div style="margin-top: 20px;">
                <logic-box :uuid="'2d84b69c'" :label="'tab_item'"
                  ><component-box indexcomp="0" uuid="8947e267">
                    <el-form-item label=" ">
                      <label-box
                        label="文本x框"
                        indexcomp="3"
                        uuid="8947e267"
                      />
                      <el-input placeholder="" v-model="id" />
                    </el-form-item> </component-box
                ></logic-box>
              </div>
            </div>

            <div slot="tab_third">
              <div style="margin-top: 20px;">
                <logic-box :uuid="'84b69c89'" :label="'tab_item'" />
              </div>
            </div>

            <div slot="tab_fourth">
              <div style="margin-top: 20px;">
                <logic-box :uuid="'b69c8947'" :label="'tab_item'" />
              </div>
            </div>
          </tabs-box>
        </div>

        <div style="margin-bottom: 20px;">
          <logic-box :uuid="'47e26739'" :label="'logic'" v-if="" />
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
      name: "",
      id: "",
      age: "",
      radionboxOptions84afa672: [
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
      selectOptionsac8d9a2d: [
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
      ]
    };
  }
};
</script>
