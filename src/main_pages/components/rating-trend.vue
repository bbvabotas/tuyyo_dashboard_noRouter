<template>
    <div class="row">
        <div class="col-sm-12">
            <highcharts :options="options" style="height:200px; width:100%;"></highcharts>
        </div>
    </div>
    
</template>

<script>
    
    export default {
        data() {
            return {                
                options: this.calculateChart()
            }
        },
        methods:{
            convertNumberToHaveCommas(num){
                let new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                return new_num
            },
            calculateChart(){
                let this_app = this,
                    bar_colors = {
                        star_1: '#ff8b5a', star_2: '#ffb234', star_3: '#ffd834', star_4: '#add633', star_5: '#9fc05a'
                    };
                
                return {
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    subtitle: {
                        text: 'Rating Trend'
                    },
                    yAxis: [{
                        visible: true,
                        title: {
                            text: 'Average Review Rating'
                        },
                        //tickInterval: 2,
                        min: 0,
                        max: 6
                    },{
                        visible: true,
                        title: {
                            text: 'Number of reviews',
                            style: {
                                "color": "#7cb5ec"
                            }
                        },
                        opposite: true,
                        //tickInterval: 2
    //                    min: 0,
    //                    max: 4
                    }],
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    legend: {
                        enabled: false
//                        layout: 'vertical',
//                        align: 'right',
//                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true,
                                formatter(){
                                    console.log(this_app.bar_colors);
                                    return this_app.convertNumberToHaveCommas(this.y);
                                }
                            },
                            color: "black",
                            shadow: true
                        },
                        column: {
                            dataLabels: {
                                enabled: true,
                                formatter: function(){
                                    if(this.y > 0){
                                        return this.y
                                    }
                                },
                                inside: true,
                                verticalAlign: 'bottom'
                            },
                            color: "#7cb5ec"
                            //borderWidth: 0,
                            //shadow: true
                        }
                    },
                    series: [{
                        type: 'line',
                        yAxis: 0,
                        zIndex: 10,
                        data: [3.2, 3.4, 4.3, 4.1, 3.9, 4.2, 3.4, 4.3, 4.1, 3.9, 4.5, 4.6]
                    },{
                        type: 'column',
                        yAxis: 1,
                        data: [120, 100, 90, 45, 90, 95, 103, 121, 130, 109, 99, 78]
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chart {
        height: 200px;
    }
</style>
