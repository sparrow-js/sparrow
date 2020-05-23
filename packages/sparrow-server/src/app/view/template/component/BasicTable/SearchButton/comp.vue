<template>
  
</template>
<script>
export default {
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  }
}
</script>