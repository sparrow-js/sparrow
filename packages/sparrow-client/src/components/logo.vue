<template>
    <div class="logo">
        <div class="logo-box">
            <img class="logo-img" src="https://raw.githubusercontent.com/sparrow-js/sparrow/master/docs/images/sparrow.jpeg"/>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.logo{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    &-img{
        width: 60px;
    }
    &-box{
        width:80px;
        height: 80px;
        border-radius: 80px;
        background-color: #f6f6f6;
        overflow: hidden;
    }
}
</style>