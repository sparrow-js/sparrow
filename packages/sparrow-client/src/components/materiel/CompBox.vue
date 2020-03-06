<template>
  <div class="comp-box">
    <div class="comp-nav">
      <div class="comp-category">
        <div class="comp-category__header">表单</div>
        <ul class="comp-category__list">
          <li class="comp-category__item"
            :class="{isActive: index === isActiveComp ? true : false}" 
            v-for="(item,index) in list"
            :key="index"
            @click="compClick(index, $event)"
          >
            {{item.title}}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="dialogVisible" class="dialog" :style="{top: compDialogPosition}">
      <div class="add-component">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="变量名:" size="mini">
            <el-input v-model="form.name" placeholder="请输入内容" size="small"></el-input>
          </el-form-item>
          <div class="add-component__operate">
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addComponent" size="mini">确 定</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
 
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import socket from '@/util/socket.js';
import { AppModule } from '@/store/modules/app';
import Loading  from '@/util/loading';


@Component({})
export default class CompBox extends Vue {
  private list = [];
  private dialogVisible = false;
  private compDialogPosition = '';
  private form = {
    name: ''
  };
  private isActiveComp = null;

  get insertData () {
    return AppModule.insertData;
  }

  async created () {
    const result = await socket.emit('generator.data.getComponentList');
    if (result) {
      this.list = result.list;
    }
    window.EventCustomer.addListener('click_json_tree_callback', (data) => {
      this.form.name = data.path.replace('JSON.', '');
		});
  }

  private compClick (index, event) {
    this.isActiveComp = index;
    const {clientY} = event;
    this.compDialogPosition = clientY + 'px';
    this.dialogVisible = true;
  }

    private async addComponent () {
    const params = {
      boxIndex: this.insertData.boxIndex,
      data: {
        boxData: this.insertData.data,
        key: '',
        name: this.form.name,
      }
    };
    Loading.open();
    await socket.emit('generator.scene.addComponent', params);
    Loading.close();
    this.dialogVisible = false;
    AppModule.SetShowDashboard(false);
  }
}
</script>
<style lang="scss" scoped>
.comp-box{
  background: #ffffff;
  padding: 20px 0;
  height: 100%;
}
.comp-nav{
  width: 100px;
  border-right: 1px solid #DCDFE6;
}
.comp-category{
  &__header{
    padding: 5px 0;
    margin: 0 5px;
    border-bottom: 1px solid #409EFF;
    color: #409EFF;
    font-size: 16px;
  }
  &__list{}
  &__item{
    padding: 6px 10px; 
    font-size: 13px;
    color: #606266;
    cursor: pointer;
  }
  .isActive{
    color: #409EFF;
  }
}

.dialog{
  position: fixed;
  top: 10px;
  left: 120px;
  background: #ffffff;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
}
.add-component__operate{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>