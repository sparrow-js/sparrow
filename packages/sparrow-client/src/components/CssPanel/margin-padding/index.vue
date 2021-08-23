<template>
  <div>
    <el-form-item :colon="false">
      <div slot="label" @click="handlChildOpen">
        <i class="el-icon-caret-bottom" v-if="childOpen"/>
        <i class="el-icon-caret-right" v-else />
        <span>{{prefix}}</span>
      </div>
      <DistanceSelect 
        type="base" 
        :value="base" 
        @change="handlePaddingChange('base', $event)"
      />
    </el-form-item>
    
    <div class="card-box" v-show="childOpen" >
      <el-form-item :colon="false" :label="`上${prefix}`">
        <DistanceSelect :value="top" @change="handlePaddingChange('top', $event)"/>
      </el-form-item>
      <el-form-item :colon="false" :label="`右${prefix}`">
        <DistanceSelect :value="right" @change="handlePaddingChange('right', $event)"/>
      </el-form-item>
      <el-form-item :colon="false" :label="`下${prefix}`">
        <DistanceSelect :value="bottom" @change="handlePaddingChange('bottom', $event)"/>
      </el-form-item>
      <el-form-item :colon="false" :label="`左${prefix}`">
        <DistanceSelect :value="left" @change="handlePaddingChange('left', $event)"/>
      </el-form-item>
    </div>
  </div>
</template>
<script>
import DistanceSelect from './DistanceSelect.vue';
export default {
  name: 'MarginPadding',
  props: {
    prefix: {
      type: String,
      default: '内边距',
    },
    base: {
      type: Object,
      default() {return {}}
    },
    top: {
      type: Object,
      default() {return {}}
    },
    right: {
      type: Object,
      default() {return {}}
    },
    bottom: {
      type: Object,
      default() {return {}}
    },
    left: {
      type: Object,
      default() {return {}}
    },
  },
  components: {
    DistanceSelect
  },
  data () {
    return {
      childOpen: true,
      selectName: '',
    };
  },
  methods: {
    handlChildOpen () {
      this.childOpen = !this.childOpen;
    },
    handleCustomChange () {
      this.childOpen = true;
    },
    handlePaddingChange (type, data) {
      
    }
  },
  // setup(props, {emit}) {

  //   const handlePaddingChange = (type, data) => {
  //     if (type === 'base') {
  //       customEventList.forEach(item => {
  //         emit(item as any, data);
  //       })
  //     } else {
  //       emit(`update:base` as any, {
  //         value: '',
  //         unit: '',
  //       });
  //       emit(`update:${type}` as any, data);
  //     }
  //   }
  //   const handleCustomChange = () => {
  //     state.childOpen = true;
  //   }
  //   return {
  //     ...toRefs(state),
  //     handlChildOpen,
  //     handlePaddingChange,
  //     handleCustomChange
  //   };
  // },
};
</script>
<style lang="scss" scoped>
.card-box{
  background-color: rgba(31,56,88,.04);
  padding: 8px;
}
</style>