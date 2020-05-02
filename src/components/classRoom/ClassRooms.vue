<template>
    <div>
        <el-row style="height: 840px;">
            <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
            <view-switch class="switch"></view-switch>
            <el-tooltip effect="dark" placement="right"
                        v-for="item in rooms.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        :key="item.roomId">
                <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.roomName}}</p>
                <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                    <span>{{item.roomNum}}</span> /
                    <span>{{item.roomName}}</span> /
                    <span>{{item.description}}</span>
                </p>
                <p slot="content" style="width: 300px" class="abstract">{{item.status}}</p>
                <el-card class="room"
                         bodyStyle="padding:10px" shadow="hover">
                    <div class="cover cover-blur" @click="bookRoom(item)">
<!--                        <el-image :src="imgSrc" fit="fill" alt="封面" class="classroomsImg"></el-image>-->
                        <span>教室名称:{{item.roomName}}</span>
                        <br>
                        <span>教室容量:{{item.capacity}}</span>
                        <br>
                        <span>教室位置:{{item.position}}</span>
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="">{{item.roomName}}</a>
                        </div>
                    </div>
                    <div class="author">{{item.description}}</div>
                </el-card>
            </el-tooltip>
            <booking-classroom-form @onSubmit="loadRooms()" ref="edit"></booking-classroom-form>
        </el-row>
        <el-row>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="rooms.length">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>

    import ViewSwitch from "@/components/classRoom/ViewSwitch";
    import SearchBar from '@/components/classRoom/SearchBar'
    import BookingClassroomForm from "@/components/classRoom/BookingClassroomForm";
    export default {
        name: 'Rooms',
        components: { SearchBar,BookingClassroomForm,ViewSwitch},
        data () {
            return {
                rooms: [],
                currentPage: 1,
                pageSize: 12,
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
                        _this.rooms = resp.data.result
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

            bookRoom (item) {
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
    .room{
        width: 230px;
        margin-bottom: 20px;
        height: 233px;
        float: left;
        margin-right: 15px
    }

    .cover {
        /*background: url("https://i.loli.net/2020/04/28/nxHODu13kEArRyf.jpg");*/
        width: 230px;
        height: 172px;
        margin-bottom: 7px;
        overflow: hidden;
        cursor: pointer;


    }
    .cover-blur{
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

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
        width: 250px;
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

