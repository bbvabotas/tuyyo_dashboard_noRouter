<template>
<!--
    <div v-if="breakdown_data.loading_data">
        <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
    </div>
-->
    <div v-if="!breakdown_data.loading_data">
        <highcharts :options="options" style="height:200px;"></highcharts>
    </div>
</template>

<script>
    
    export default {
        props: ['breakdown_data'],
        data() {
            return {                
                icons: {
                    iconAndroid: require("assets/img/icon_android.png"),
                    iconIOS: require("assets/img/icon_ios.svg")
                },
                options: this.calculateChart()
            }
        },
        computed: {
            determinePlatformIcon(){
                return this.icons[this.rating_data]
            }  
        },
        methods: {
            convertNumberToHaveCommas(num){
                let new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                return new_num
            },            
            calculateChart(){
                let this_app = this
                
                if(this_app.breakdown_data.categories.length < 3){
                    return {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: ''
                        },
                        subtitle: {
                            text: this_app.breakdown_data.name
                        },
                        tooltip: {
                            enabled: false
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    enabled: true,
                                    distance: 10,
                                    formatter: function(){
                                        return this.key + ' <br> ' + this_app.convertNumberToHaveCommas(this.y)
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false  
                        },
                        series: [{
                            name: 'Data',
                            colorByPoint: true,
                            data: [{
                                name: 'Android',
                                y: this_app.breakdown_data.android[0]
                            },{
                                name: 'iOS',
                                y: this_app.breakdown_data.ios[0]
                            }]
                        }]
                    }
                } else {
                    return {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: ''
                        },
                        subtitle: {
                            text: this_app.breakdown_data.name
                        },
                        xAxis: {
                            categories: this_app.breakdown_data.categories
                        },
                        yAxis: {
                            visible: false,
                            title: {
                                text: ''
                            },
                            labels: {
                                enabled: false
                            }
                        },
                        tooltip: {
                            enabled: false
                        },
                        credits: {
                            enabled: false  
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true,
                                    formatter: function(){
                                        return this_app.convertNumberToHaveCommas(this.y)
                                    }
                                },
                                groupPadding: 0.1
                            }
                        },
                        series: [{
                            name: 'Android',
                            data: this_app.breakdown_data.android
    
                        }, {
                            name: 'iOS',
                            data: this_app.breakdown_data.ios
    
                        }]
                    }
                }
                
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
