<template>
    <el-menu
            class="capacity"
            default-active="0"
            @select="handleSelect"
            active-text-color="red">
        <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item index="50">
            <i class="el-icon-menu"></i>
            <span slot="title">50人</span>
        </el-menu-item>
        <el-menu-item index="100">
            <i class="el-icon-menu"></i>
            <span slot="title">100人</span>
        </el-menu-item>
        <el-menu-item index="150">
            <i class="el-icon-menu"></i>
            <span slot="title">150人</span>
        </el-menu-item>
        <el-menu-item index="200">
            <i class="el-icon-menu"></i>
            <span slot="title">200人</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'SideMenu',
        data () {
            return {
                cid: ''
            }
        },
        methods: {
            // eslint-disable-next-line no-unused-vars
            handleSelect (key, keyPath) {
                this.cid = key;
                this.$emit('indexSelect')
            }
        }
    }
</script>

<style scoped>
    .capacity {
        position: fixed;
        margin-left: 50%;
        left: -600px;
        top: 100px;
        width: 150px;
    }
</style>

