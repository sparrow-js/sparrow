<template>
    <div class="operate">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="2">
                <template slot="title">布局</template>
                <el-menu-item index="2-1">一列</el-menu-item>
                <el-menu-item index="2-2">三列</el-menu-item>
            </el-submenu>
            <el-menu-item index="1">源代码</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.operate{

}
</style>