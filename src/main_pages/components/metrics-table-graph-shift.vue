<template>
    <highcharts :options="options"></highcharts>
</template>

<script>
    
    export default {
        //name: 'donut-chart',
        props: ['shift_data'],
        data() {
            return {
                options: this.calculateOptions()
            }
        },
        methods:{
            calculateOptions(){
                let this_data = this.shift_data;
                //console.log(this_data);
                
                let shift_color = '',
                    temp_shift = 0,
                    max_bar_height = 2;
                
                temp_shift = this_data - 1;
                //console.log(temp_shift);
//                if(this_data < 1){
//                    temp_shift = this_data * -1;
//                } else {
//                    temp_shift = this_data;
//                }
                
                if(this_data >= 1.25){
                    shift_color = 'green'
                } else if (this_data <= 0.75){
                    shift_color = 'red'
                } else {
                    shift_color = '#7cb5ec'
                }
                
                if(this_data > 2){
                    max_bar_height = this_data
                }
                
                return {
                    chart: {
                        spacingRight: 2,
                        spacingLeft: 2                        
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'Shift'  
                    },
                    xAxis: {
                        visible: false
                    },
                    yAxis: {
                        plotLines:[{
                            value: 0,
                            color: 'gray',
                            width: 1
                        }],
                        title: {
                            text: ''  
                        },
                        gridLineWidth: 0,
                        labels: {
                            enabled: false  
                        },
                        min: -1,
                        max: max_bar_height
                    },
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Shift',
                        type: 'column',
                        color: shift_color,
                        borderWidth: 0,
                        data: [
                            temp_shift
                        ],
                        showInLegend: false,
                        dataLabels: {
                            enabled: true,
                            formatter(){
                                return this_data
                            }
                        }
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .plot_line_width {
        padding: 20px;
    }
</style>
