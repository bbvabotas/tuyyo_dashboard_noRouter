<template>
    <div v-if="chart_data.loading_data">
        <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
    </div>
    <div v-else>
        <highcharts :options="options"></highcharts>
    </div>
    
</template>

<script>
    //import Highcharts-3d from 'highcharts-3d'
    export default {
        //name: 'donut-chart',
        props: ['chart_data'],
        data() {
            return {
                options: this.calculateOptions()
            }
        },
        methods:{
            calculateOptions(){
                
                let this_data = this.chart_data;
                
                let chart_height = 200 + (this_data.data.length * 16);
                
                return {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        height: chart_height + 'px',
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    //colors: chart_colors,
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: this_data.name
                    }, credits: {enabled:false},
                    tooltip: {
                        headerFormat: '',
                        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
//                        formatter(){
//                            return this
//                        }
                    },
                    plotOptions: {
                        pie: {
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                distance: 0,
                                formatter: function(){
                                    if(this_data.name == 'Transfer Amount'){
                                        return '$' + this.y.toFixed(2);
                                    } else {
                                        return this.y;
                                    }

                                },
                                style: {
                                    fontWeight: 'bold'
                                }
                            },
//                            startAngle: -90,
//                            endAngle: 90,
//                            center: ['50%', '100%'],
//                            size: '150%',
                            showInLegend: true
                        }
                    },
                    legend: {
                        align: 'left',
                        layout: 'vertical',
                        verticalAlign: 'middle'
                    },
                    series: [{
                        type: 'pie',
//                        innerSize: '50%',
                        data: this_data.data
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
