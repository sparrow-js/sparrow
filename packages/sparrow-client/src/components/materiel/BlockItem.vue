<template>
  <div class="block">
    <div class="block__toolbar">
      <div 
        class="block__preview" 
        style="background-image: url(https://gitee.com/ant-design/ant-design-blocks/raw/master/select-basic/snapshot.png);"
      ></div>
      <div class="block__operate">
        <div style="margin-bottom: 4px;">
          <el-button type="primary" size="small" @click="openComponentDialog">添加组件</el-button>
        </div>
        <div>
          <el-button size="small">预览图片</el-button>
        </div>
      </div>
    </div>
    <div class="block-content">
      <h2 class="block-title">{{info.title}}</h2>
      <p class="block-des">{{info.description}}</p>
      <div class="block-label__box">
        <span 
          class="block-label__item" 
          v-for="(tagItem, index) in info.tags"
          :key="index"
        >{{tagItem}}</span>
      </div>
    </div>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="300px"
    >
      <div class="add-component">
        <span class="add-component__label">变量名:</span>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComponent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js';
import Loading  from '@/util/loading';

@Component({})
export default class BlockItem extends Vue {
  @Prop({ default: () => {} }) private info: any;
  @Prop({ default: () => {} }) private type: string|number;

  private dialogVisible = false;
  private name = '';
  // insertData

   get insertData () {
    return AppModule.insertData;
  }

  private openComponentDialog () {
    if (this.type === '0') {
      this.dialogVisible = true;
    } else if (this.type === '1') {
      this.addBlock();
    }
  }
  
  private async addComponent () {
    const params = {
      boxIndex: this.insertData.boxIndex,
      data: {
        boxData: this.insertData.data,
        key: this.info.key,
        name: this.name,
      }
    };
    Loading.open();
    await socket.emit('generator.scene.addComponent', params);
    Loading.close();
    this.dialogVisible = false;
    AppModule.SetShowDashboard(false);
  }

  private async addBlock () {
    const params = {
      boxIndex: this.insertData.boxIndex,
      data: {
        boxData: this.insertData.data,
        key: this.info.key,
        name: this.name,
        originData: this.info.originData
      }
    };
    AppModule.SetShowDashboard(false);
    Loading.open();
    await socket.emit('generator.scene.addBlock', params);
  }
}
</script>
<style lang="scss" scoped>
.block{
  &__toolbar{
    background-color: #30303d;
    height: 150px;
    position: relative;
  }
  &__preview{
    width: 100%;
    height: 100%;
    background-position: top center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #fff;
  }
  &__operate{
    opacity: 0;
    background: rgba(0, 0, 0, 0.65);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  &__operate:hover{
    opacity: 1;
  }

  &-content{
    background-color: #30303d;
    padding: 10px;
    margin-top: 1px;
    text-align: left;
  }
  &-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
  }
  &-des{
    margin-top: 4px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0;
    line-height: 20px;
    height: 40px;
    margin-bottom: 0;
  }
  &-label__box{
    margin-top: 5px;
  }
  &-label__item{
    margin-right: 4px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.45);
  }
}
.add-component{
  display: flex;
  flex-direction: column;
  &__label{
    text-align: left;
    margin-bottom: 3px;
  }
}
</style>