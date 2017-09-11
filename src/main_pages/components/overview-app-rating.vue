<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="row">
                <div class="col-sm-12" style="font-size:2em;">
                    <img class="icon_size" :src="determinePlatformIcon"> {{ platform_name }}
                </div>
            </div>
            <div class="row">
    <!--
                <div class="col-sm-1" style="height:120px; position:relative;">
                    <img class="icon_size align_middle" :src="determinePlatformIcon">
                </div>
    -->
                <div class="col-sm-2" style="text-align:center; height:110px; position:relative;">
                    <div class="align_middle">
                        <div style="font-size: 3em">4.3</div>
                        <div><i class="fa fa-user"></i> 1,234</div>
                    </div>
                </div>
                <div class="col-sm-10">
                    <highcharts :options="options" style="height:120px;"></highcharts>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
    
    export default {
        props: ['rating_data'],
        data() {
            return {                
                icons: {
                    iconAndroid: require("assets/img/icon_android.png"),
                    iconIOS: require("assets/img/icon_ios.svg")
                },
                platform_name: '',
                options: this.calculateChart()
            }
        },
        computed: {
            determinePlatformIcon(){
                if(this.rating_data == 'iconAndroid'){
                    this.platform_name = 'Android'
                } else if(this.rating_data == 'iconIOS'){
                    this.platform_name = 'iOS'
                }
                return this.icons[this.rating_data]
            }  
        },
        methods: {
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
                    chart: {
                        type: 'bar'  
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false  
                    },
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        categories: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star']
                    },
                    yAxis: {
                        title: '',
                        labels: {
                            enabled: false
                        },
                        gridLineWidth: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                formatter(){
                                    console.log(this_app.bar_colors);
                                    return this_app.convertNumberToHaveCommas(this.y);
                                }
                            },
                            groupPadding: 0
                        }
                    },
                    legend: {
                        enabled: false  
                    },
                    series: [{
                        data: [{
                            name: '5 Stars',
                            y: 20,
                            color: bar_colors.star_5
                        },{
                            name: '4 Stars',
                            y: 8,
                            color: bar_colors.star_4
                        },{
                            name: '3 Stars',
                            y: 2,
                            color: bar_colors.star_3
                        },{
                            name: '2 Stars',
                            y: 2,
                            color: bar_colors.star_2
                        },{
                            name: '1 Stars',
                            y: 8,
                            color: bar_colors.star_1
                        }]
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .icon_size {
        height: 80px;
/*        padding: 10px;*/
    }
    .align_middle {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
