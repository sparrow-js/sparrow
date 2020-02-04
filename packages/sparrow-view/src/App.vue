<template>
  <div id="app"> 
    <router-view/>
    <toolbar 
      :list="toolbarList" 
      :is-show-toolbar="isShowToolbar" 
      @change="showToolbarChange"
    />
  </div>
</template>
<script>
import message from './utils/message';
import { Event } from '@sparrow-vue/boxs'

export default {
  data () {
    return {
      toolbarList: [],
      boxIndex: null,
      isShowToolbar: false
    }
  },
  created () {
    window.addEventListener('message',(e) => {
      const {data} = e;
      if (data && data.handler === 'document-click') {
        this.isShowToolbar = false;
      }
    },false);
    this.getToolbarList();
    Event.on('block-selected', (data) => {
      this.boxIndex = data.index;
    });
    Event.on('insert_handler', (data) => {
      setTimeout(() => {
        message.emit('client.dashboard.show', {
          boxIndex: this.boxIndex,
          data,
        });
      }, 300);
    })
  },
  methods: {
    async getToolbarList () {
      const result = await message.emit('generator.data.getBoxList')
      this.toolbarList = result.list;
    },
    showToolbarChange (data) {
      this.isShowToolbar = data;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
