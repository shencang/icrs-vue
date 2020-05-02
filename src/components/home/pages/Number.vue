<template>
    <div class="content">
        <div class="title"> 
            <h2>当日教室使用情况</h2>
            <span class="border-bottom"></span>
        </div>
        <div id="myChart" :style="{width: '900px', height:'900px'}"></div>
    
    </div>
</template>
<script>
var hoursList = []
//import $ from 'jquery'
export default {
    name: 'HomeNumber',

    // props:{
    //     number:Object
    // },
    data () {
    return {
        //[会议室序号,开始时间,人数]
//         data: [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4]],//,[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]
//         rooms:['一号会议室', '二号会议室','二号会议室'],
        rooms:[],
        hours:['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00',
            '7:00', '8:00', '9:00','10:00','11:00',
            '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
            '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        }
  },
    // created:function(){
    //     data = this.data.map(function (item) {
    //         return [item[1], item[0], item[2]];
    //     });
    //     hours = this.hours,
    //     rooms = this.rooms
    // },
    mounted: function(){
        this.getRoomList()
        this.creatE();
        hoursList = this.hours
    },
    // computed: {
    //     ChartHeight(){
    //         return this.rooms.length*100 + 'px'
    //     } 
    // },
    methods: {
        getRoomList(){
            const _this =this;
            const url ='/queryReservationOfCurrentDateRoom'
            this.$axios.get(url).then(resp=>{
                if (resp && resp.data.code ===200 ){
                    _this.rooms = resp.data.result
                    console.log(_this.rooms)
                }
            })
        },

        creatE: function(){
            let myChart = this.$echarts.init(document.getElementById('myChart'))//获取图表
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '教室',
                    link: '#'
                },
                legend: {
                    data: ['使用人数'],
                    left: 'right'
                },
                // tooltip: {
                //     position: 'top',
                //     formatter: function (params) {
                //         return hours[params.value[0]] +'有'+params.value[2] + '人在'+rooms[params.value[1]]+'开会 ';
                //     }
                // },
                grid: {
                    left: 2,
                    bottom: 10,
                    right: 10,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: this.hours,
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#999',
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    min:0,
                    data:[],
                    axisLine: {
                        show: false
                    }
                },
                series: [{
                    name: '使用人数',
                    type: 'scatter',
                    symbolSize: function (val) {
                        return val[2] * 2;
                    },
                    data: [],
                    animationDelay: function (idx) {
                        return idx * 5;
                    }
                }]
            });

                myChart.showLoading();//数据没加载时显示loading动画
            //   $.get('static/mock/number.json').done(function (data) {

            this.$axios
                .get('/queryReservationOfCurrentDate', {
                }).then(resp => {
                if (resp && resp.status === 200) {

            //     }
            // })
             //   $.get('/api/queryReservationOfCurrentDate').done(function (resp) {
                    console.log(resp.data.result)
                // 填入数据
                myChart.hideLoading()
                myChart.setOption({
                    // xAxis: {
                    //     data: data.hours
                    // },
                    yAxis: {
                    max:(this.rooms.length-1),
                    data: this.rooms,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '使用人数',
                        data: resp.data.result.map(function (item) {
                                return [item[1], item[0], item[2]];
                            })

                    }],
                    tooltip: {
                    position: 'top',
                    formatter: function (params) {
                        return hoursList[params.value[0]] +'有'+params.value[2] + '人在进行活动 ';
                    }
                    }
                });
                        }
                    })
        },
    }
}


</script>
<style lang="stylus" scoped>
    @import '../../../styles/varibles.styl'
    .content
        padding 100px
        .title
            text-align  center
         h2
            font-size 28px
            font-weight 600
            margin-bottom 10px
         .border-bottom
            position relative
            display block
            width 100px
            left 0
            right 0
            margin auto 
            margin-bottom 50px
            border-bottom 1px solid #000
        #myChart
            position relative
            left 0
            right 0
            margin  0 auto 
</style>
