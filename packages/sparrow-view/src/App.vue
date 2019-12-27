<template>
  <div id="app"> 
    <router-view/>
    <toolbar :list="toolbarList"/>
  </div>
</template>
<script>
import message from './utils/message'
export default {
  data () {
    return {
      toolbarList: []
    }
  },
  created () {
    this.getToolbarList();
  },
  methods: {
    async getToolbarList () {
      const result = await message.emit('generator.data.getBoxList')
      this.toolbarList = result.list;
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
