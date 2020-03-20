<template>
  <div>
    <component :list="componentList" :is="componentIs"></component>
  </div>
 
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import FormBox from './FormBox';
import TableBox from './TableBox';
import socket from '@/util/socket.js';

@Component({
  components: {
    formBox: FormBox,
    tableBox: TableBox
  }
})
export default class CompBox extends Vue {
  private componentList = [];
  private componentMap = {};
  get componentIs () {
    return AppModule.componentIs + 'Box';
  }
	@Watch('componentIs', { immediate: true })
  private onjsonDataChange() {
    const {type} = this.insertData.data;
    this.componentList = this.componentMap[type];
  }

  get insertData () {
    return AppModule.insertData;
  }
  async created () {
    const {type} = this.insertData.data;
    const componentMap = await socket.emit('generator.data.getCompList');
    this.componentMap = componentMap;
    this.componentList = componentMap[type];
  }

 
  

}
</script>