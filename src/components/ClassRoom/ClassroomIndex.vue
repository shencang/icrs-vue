<template>
    <el-container>
        <el-aside style="width: 200px;margin-top: 20px">
            <switch></switch>
            <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
        </el-aside>
        <el-main>
            <rooms class="rooms-area" ref="roomsArea"></rooms>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from './SideMenu'
    import Rooms from "@/components/ClassRoom/ClassRooms";

    export default {
        name: 'AppClassRoom',
        components: {Rooms,  SideMenu},
        methods: {
            listByCategory () {
                const _this = this;
                const cid = this.$refs.sideMenu.cid;
                const url = 'categories/' + cid + '/books';
                this.$axios.get(url).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.$refs.booksArea.books = resp.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .rooms-area {
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    }
</style>

