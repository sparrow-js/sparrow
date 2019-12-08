<template>
    <div class="block">
        <slot></slot>
    </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
    .block{
        padding: 15px 30px;
        background-image: linear-gradient(17deg,rgba(243,248,255,.03) 63.45%,rgba(207,214,229,.27) 98%);
        border-radius: 3px;
    }
</style>