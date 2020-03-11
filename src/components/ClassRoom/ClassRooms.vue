<template>
    <div>
        <el-row style="height: 840px;">
            <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
            <el-tooltip effect="dark" placement="right"
                        v-for="item in rooms.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        :key="item.roomId">
                <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.roomName}}</p>
                <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                    <span>{{item.roomNum}}</span> /
                    <span>{{item.roomName}}</span> /
                    <span>{{item.description}}</span>
                </p>
                <p slot="content" style="width: 300px" class="abstract">{{item.status}}</p>
                <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="room"
                         bodyStyle="padding:10px" shadow="hover">
                    <div class="cover" @click="editRoom(item)">
                        <br>
                        {{item.roomNum}}
                        <br>
                        <span>{{item.roomName}}</span>
                        <br>
                        <span>{{item.capacity}}</span>
                        <br>
                        <span>{{item.position}}</span>
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="">{{item.roomName}}</a>
                        </div>
                        <i class="el-icon-delete" @click="deleteRoom(item.id)"></i>
                    </div>
                    <div class="author">{{item.description}}</div>
                </el-card>
            </el-tooltip>
            <edit-form @onSubmit="loadRooms()" ref="edit"></edit-form>
        </el-row>
        <el-row>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :total="rooms.length">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import EditForm from './EditForm'
    import SearchBar from './SearchBar'
    export default {
        name: 'Rooms',
        components: {EditForm, SearchBar},
        data () {
            return {
                rooms: [],
                currentPage: 1,
                pagesize: 17
            }
        },
        mounted: function () {
            this.loadRooms()
        },
        methods: {
            loadRooms () {
                const _this = this;
                this.$axios.get('/rooms').then(resp => {
                    if (resp && resp.status === 200) {
                        _this.rooms = resp.data
                    }
                })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
            },
            searchResult () {
                const _this = this;
                this.$axios
                    .get('/search?keywords=' + this.$refs.searchBar.keywords, {
                    }).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.rooms = resp.data
                    }
                })
            },
            deleteRoom (id) {
                this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.$axios
                            .post('/delete', {id: id}).then(resp => {
                            if (resp && resp.status === 200) {
                                this.loadRooms()
                            }
                        })
                    }
                ).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
                // alert(id)
            },
            editRoom (item) {
                this.$refs.edit.dialogFormVisible = true;
                this.$refs.edit.form = {
                    roomId: item.roomId,
                    roomNum: item.roomNum,
                    roomName: item.roomName,
                    capacity: item.capacity,
                    status: item.status,
                    position: item.position,
                    description: item.description,

                }
            }
        }
    }
</script>
<style scoped>

    .cover {
        width: 115px;
        height: 172px;
        margin-bottom: 7px;
        overflow: hidden;
        cursor: pointer;
    }

    img {
        width: 115px;
        height: 172px;
        /*margin: 0 auto;*/
    }

    .title {
        font-size: 14px;
        text-align: left;
    }

    .author {
        color: #333;
        width: 102px;
        font-size: 13px;
        margin-bottom: 6px;
        text-align: left;
    }

    .abstract {
        display: block;
        line-height: 17px;
    }

    .el-icon-delete {
        cursor: pointer;
        float: right;
    }

    .switch {
        display: flex;
        position: absolute;
        left: 780px;
        top: 25px;
    }

    a {
        text-decoration: none;
    }

    a:link, a:visited, a:focus {
        color: #3377aa;
    }

</style>

