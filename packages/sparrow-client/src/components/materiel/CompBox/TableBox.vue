<template>
  <div class="comp-box">

    <div class="comp-nav">
      <div class="comp">
        <div class="comp__title">表格</div>
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
  private compDialogPosition = '';
  private isActiveComp = null;
  
  created() {
    window.addEventListener("message", async event => {
      const {data} = event;
      if (!data.handler) return;
      if (data.handler === 'client.component.tableCell') {
        this.isActiveComp = data.data.params;
        this.addComponent();
      }
    });
  }


  get insertData () {
    return AppModule.insertData;
  }
  get insertPosition () {
    return AppModule.insertPosition;
  }
  
  get boxIndex () {
    return AppModule.boxIndex;
  }

  private compClick (comp, event) {
    this.isActiveComp = comp;
    const {clientY} = event;
    this.addComponent();
  }

  private async addComponent () {
    const params = {
      boxIndex: this.boxIndex,
      data: {
        ...this.insertPosition.data,
        key: this.isActiveComp.key,
        type: this.isActiveComp.type,
        cellParams: this.isActiveComp.params || {}
      }
    };

    Loading.open();
    await socket.emit('generator.scene.addComponent', params);
    Loading.close();
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