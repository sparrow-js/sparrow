<template>
  <div>
    <div class="rule-list">
      <div class="rule-item" 
        v-for="(item, index) in rules" 
        :key="index"
      >
          <el-form-item 
            label="正则"
          >
            <el-input v-model="item.message" placeholder="输入内容"></el-input>
          </el-form-item>
           <el-form-item 
            label="错误提示"
          >
            <el-input v-model="item.message" placeholder="输入内容"></el-input>
          </el-form-item>
          <i class="el-icon-circle-close delete-item" @click="deleteItem(index)"></i>
      </div>
    </div>
    <div class="add-rule" @click="add">
      <i class="el-icon-circle-plus-outline"></i> 添加规则
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'RuleList'
})
export default class extends Vue {
  @Prop({ default: () => [{
    rule: '',
    message: ''
  }] }) private rules: any;

  private add () {
    this.rules.push({
      rule: '',
      message: ''
    })
  }

  private deleteItem (index) {
    this.rules.splice(index, 1);
  }
}
</script>
<style lang="scss" scoped>
.add-rule{
  color: #409EFF;
  padding: 10px;
}
.rule-item{
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding-top: 10px;
  padding-right: 10px;
  position: relative;
}
.delete-item{
  position: absolute;
  left: 5px;
  top: 5px;
  background-color: #fff;
  font-size: 16px;
}
</style>