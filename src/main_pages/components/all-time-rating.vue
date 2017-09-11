<template>
   
        <div class="row">
            <div class="col-sm-3" style="text-align:center;">
                <div style="font-size: 5em">
                    4.3
                </div>
                <div style="margin:10px 0;">
                    <span class="star_image_wrapper">
                        <div class="star_image_background" :style="{ width: star_rating_fill.star_1 + '%' }">
                            <img class="star_image" :src="images.starImage">
                        </div>
                    </span>
                    <span class="star_image_wrapper">
                        <div class="star_image_background" :style="{ width: star_rating_fill.star_2 + '%' }">
                            <img class="star_image" :src="images.starImage">
                        </div>
                    </span>
                    <span class="star_image_wrapper">
                        <div class="star_image_background" :style="{ width: star_rating_fill.star_3 + '%' }">
                            <img class="star_image" :src="images.starImage">
                        </div>
                    </span>
                    <span class="star_image_wrapper">
                        <div class="star_image_background" :style="{ width: star_rating_fill.star_4 + '%' }">
                            <img class="star_image" :src="images.starImage">
                        </div>
                    </span>
                    <span class="star_image_wrapper">
                        <div class="star_image_background" :style="{ width: star_rating_fill.star_5 + '%' }">
                            <img class="star_image" :src="images.starImage">
                        </div>
                    </span>
                </div>
<!--                <div><i class="fa fa-user"></i><span style="margin-left:10px;">2,000</span></div>-->
            </div>
            <div class="col-sm-6">
                <highcharts :options="options" style="height:150px; width:100%;"></highcharts>
            </div>
            <div class="col-sm-3" style="text-align:left">
                <div class="row">
                    <div class="col-sm-12">
                        <div style="font-size:1em">Total ratings</div>                        
                        <div style="font-size:1.3em"><strong>156</strong></div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-12">
                        <div style="font-size:1em">Ratings with reviews</div>
                        <div style="font-size:1.3em"><strong>22</strong></div>
                    </div>
                </div>
            </div>
        </div>    
   
    
</template>

<script>
    
    export default {
        data() {
            return {
                images: {
                    starImage: require("assets/img/star_img.png")
                },
                star_rating_fill: {
                    star_1: 0,
                    star_2: 0,
                    star_3: 0,
                    star_4: 0,
                    star_5: 0
                },
                options: this.calculateChart()
            }
        },
        mounted(){
            this.calculateRatings()  
        },
        methods:{
            convertNumberToHaveCommas(num){
                let new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                return new_num
            },
            calculateRatings(){
                let rating_temp = 4.3;
                
                this.star_rating_fill = {
                    star_1: 0,
                    star_2: 0,
                    star_3: 0,
                    star_4: 0,
                    star_5: 0
                }
                
                for(let i = 1; i < 6; i++){
                    if(rating_temp > 1){
                        this.star_rating_fill['star_' + i] = 100
                        rating_temp--;
                    } else {
                        this.star_rating_fill['star_' + i] = parseInt((rating_temp * 100).toFixed(0))
                        break;
                    }
                }
                
                //console.log(this.star_rating_fill)
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
    .chart {
        height: 200px;
    }
    .star_image_wrapper {
        background-color: lightgray;
        display: inline-block;
        width: 22px;
        height: 22px;
        text-align: center;
    }
    .star_image_background {
        background-color: #7cb5ec;
        width: 22px;
        height: 22px;
    }
    .star_image {
        height: 22px;
    }
</style>
