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
            <el-autocomplete
              class="inline-input"
              v-model="item.rule"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect(index, $event)"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.label }}</div>
              </template>
            </el-autocomplete>
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

  private ruleOptions = [
    {
      label: '协议',
      value: '/^(https?:|mailto:|tel:)/',
      tips: '协议错误'
    },
    {
      label: 'URL',
      value: "/^(https?|ftp):\\/\\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\\.)*[a-zA-Z0-9-]+\\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\\/($|[a-zA-Z0-9.,?'\\\+&%$#=~_-]+))*$/",
      tips: 'URL 错误'
    },
    {
      label: 'LowerCase',
      value: `/^[a-z]+$/`,
      tips: 'LowerCase 错误'
    },
    {
      label: 'UpperCase',
      value: `/^[A-Z]+$/`,
      tips: 'UpperCase 错误'
    },
    {
      label: 'Alphabets',
      value: `/^[A-Za-z]+$/`,
      tips: 'Alphabets 错误'
    },
    {
      label: 'Email',
      value: '/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/',      
      tips: 'Email 错误'
    },
  ];

  private add () {
    this.rules.push({
      rule: '',
      message: ''
    })
  }

  private deleteItem (index) {
    this.rules.splice(index, 1);
  }

  querySearch(queryString, cb) {
    var ruleOptions = this.ruleOptions;
    var results = queryString ? ruleOptions.filter(this.createFilter(queryString)) : ruleOptions;
    // 调用 callback 返回建议列表的数据
    cb(results);
  }
  createFilter(queryString) {
    return (rule) => {
      return (rule.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    };
  }

  handleSelect(index, item) {
    this.rules[index].message = item.tips;
    setTimeout(() => {
      this.rules[index].rule = item.value;
    }, 1000)
    console.log(index,item);
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