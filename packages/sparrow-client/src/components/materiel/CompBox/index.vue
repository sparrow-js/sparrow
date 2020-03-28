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
import CustominlineBox from './CustominlineBox';
import socket from '@/util/socket.js';

@Component({
  components: {
    formBox: FormBox,
    tableBox: TableBox,
    custominlineBox: CustominlineBox
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
    const {type, params} = this.insertData.data;
    if (type !== 'custominline') {
      this.componentList = this.componentMap[type];
    } else {
      this.componentList = this.componentMap[params.compBox]
    }
  }

  get insertData () {
    return AppModule.insertData;
  }
  async created () {
    const {type, params} = this.insertData.data;
    const componentMap = await socket.emit('generator.data.getCompList');
    this.componentMap = componentMap;
    if (type !== 'custominline') {
      this.componentList = componentMap[type];
    } else {
      this.componentList = componentMap[params.compBox]
    }

  }

 
  

}
</script>