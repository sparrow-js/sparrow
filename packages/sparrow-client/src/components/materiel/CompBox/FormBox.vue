<template>
  <div class="comp-box">

    <div class="comp-nav">
      <div class="comp">
        <div class="comp__title">表单</div>
        <div class="comp-content" 
          v-for="(item,index) in list" 
          :key="index"
        >
          <h3 class="comp-content__title">{{item.label}}</h3>
          <div class="comp-content__list">
            <div class="comp-content__item" 
              v-for="(comp, compIndex) in item.children" 
              :key="compIndex"
              @click="compClick(comp, $event)"
            >
              {{comp.label}}
            </div>
          </div>
        </div>
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
  @Prop({default: () => []}) private list: any;
  private dialogVisible = false;
  private compDialogPosition = '';
  private form = {
    name: ''
  };
  private isActiveComp = null;

  get insertData () {
    return AppModule.insertData;
  }

  get componentIs () {
    return AppModule.componentIs;
  }
  

  async created () {
    const {type} = this.insertData.data;

    window.EventCustomer.addListener('click_json_tree_callback', (data) => {
      this.form.name = data.path ===  'JSON' ? '' : data.path.replace('JSON.', '');
		});
  }

  private compClick (comp, event) {
    this.isActiveComp = comp;
    const {clientY} = event;
    this.compDialogPosition = clientY + 'px';
    this.dialogVisible = true;
  }

  private async addComponent () {
    const params = {
      boxIndex: this.insertData.boxIndex,
      data: {
        boxData: this.insertData.data,
        key: this.isActiveComp.key,
        name: this.form.name,
        params: {
          type: this.isActiveComp.type
        },
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
.comp{
  &__title{
    padding: 5px 0;
    margin: 0 5px;
    border-bottom: 1px solid #409EFF;
    color: #409EFF;
    font-size: 16px;
  }

  &-content__title{
    border-bottom: 1px solid #DCDFE6;
    padding: 5px 0;
    margin: 0 10px;
    color: #303133;
    font-size: 14px;
    font-weight: normal;
  }

  &-content__list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 5px;
  }

  &-content__item{
    background: #ecf5ff;
    width: 80px;
    margin-top: 5px;
    margin-right: 5px;
    padding: 5px;
    text-align: center;
    font-size: 12px;
    color: #606266;
    cursor: pointer;
  }
  &-content__item:hover{
    color: #409EFF;
  }
}



.comp-box{
  background: #ffffff;
  padding-top: 10px;
  padding-bottom: 80px;
}

.comp-category{
  &__header{
    padding: 5px 0;
    margin: 0 5px;
    border-bottom: 1px solid #409EFF;
    color: #409EFF;
    font-size: 16px;
  }
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