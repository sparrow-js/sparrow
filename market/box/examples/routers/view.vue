<template>
  <div class="home">
    <ul class="block-list">
      <li class="block-item">
        <box :index="0">
          <paragraph></paragraph>
        </box>
      </li>
      <li class="block-item">
        <box :index="1">
          <layout :col="3" :row="2">
            <div slot="0_1" @click="handlerClickLabel">
              <el-form :model="form" class="demo-form-inline" label-width="80px">
                <el-form-item label="审批人">
                  <el-input v-model="form.user" placeholder="审批人"></el-input>
                </el-form-item>
              </el-form> 
            </div>
            <el-switch slot="1_1" v-model="form.delivery"></el-switch>
            <el-switch slot="0_0" v-model="form.delivery"></el-switch>
            <el-switch v-model="form.delivery"></el-switch>
          </layout>
        </box>
      </li>
      <li>
        <div>
          <toolbar :list="toolbarList"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Event from '../../src/utils/Event'
export default {
  name: "home",
  data () {
    return {
      form: {
        delivery: '',
        user: '',
      },
       toolbarList: [
          {
            id: 10001,
            name: '文本'
          },
          {
            id: 10002,
            name: '搜索'
          },
          {
            id: 10003,
            name: '布局'
          },
          {
            id: 10004,
            name: 'list'
          },
          {
            id: 10005,
            name: '表格'
          }
        ]
    }
  },
  created () {
    Event.on('operate_pivot', (data) => {
    })
  },
  methods: {
    handlerClickLabel (event) {
      console.log('************')
      console.log(event);
    }
  }
};
</script>
<style lang="scss" scoped>
.block-list{
  list-style: none;
  .block-item{
    margin-bottom: 12px;
  }
}
</style>
