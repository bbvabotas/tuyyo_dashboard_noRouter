<template>
    <div v-if="chart_data.loading_data">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>
    <div v-else>
        <highcharts :options="options" ref="highcharts" style="height: 200px;"></highcharts>
    </div>
    
</template>

<script>

    export default {

        props: ['chart_data'],
        data() {
            return {
                options: this.calculateOptions()
            }
        },
        methods:{
            calculateOptions(){
                
                
                let red_colors = ['#595959', '#ff8b5a', '#ff8b5a', '#ff8b5a', '#ff8b5a', '#ff8b5a'],
				    orange_colors = ['#595959', '#ffb234', '#ffb234', '#ffb234', '#ffb234', '#ffb234'],
                    new_colors = []
                    
                if(this.chart_data.rating == 1){
                    new_colors = red_colors
                } else if(this.chart_data.rating == 2){
                    new_colors = orange_colors
                } else {
                    new_colors = red_colors;
                }
                
                return {
                    chart: {
						type: 'bar'
					},
					colors: new_colors,
					title: {
						text: ''
					},
					xAxis: {
						categories: this.chart_data.categories,
                        //categories: ["stuff", "things", "thingy"],
						lineWidth: 0,
						tickWidth: 0,
						labels: {
							formatter: function(){
								if(this.value == 'Total'){
									return '<b>' + this.value + '</b>';
								} else {
									return this.value;
								}
							}
						}
					},
					yAxis: {
						//max: star_1_data.data[0] + 1,
						visible: false
					},
					tooltip: {enabled: false},legend: {enabled: false},credits: {enabled: false},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true,
                                formatter: function(){
                                    if(this.y > 0){
                                        return this.y
                                    }
                                }
							},
							colorByPoint: true,
							groupPadding: 0.1
						}
					},
					series: [{
						name: 'words',
						data: this.chart_data.data
                        //data: [10, 4, 3]
					}]
                }
            },
            updateChart(){
                let this_chart = this.$refs.highcharts.chart;
                this_chart.update({
                    xAxis: {
						categories: this.chart_data.categories
                    },
                    series: [{
						name: 'words',
						data: this.chart_data.data
                        //data: [10, 4, 3]
					}]
                })
            }
        },
        watch: {
            'chart_data'(){
                this.updateChart();
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
