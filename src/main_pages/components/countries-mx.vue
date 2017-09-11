<template>
    <div class="wrapper">
        <highmaps :options="options"></highmaps>
        
        <div>
            <h4>Top 5 States</h4>
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            <div>
                                State
                            </div>
                            <div>
                                <span class="header_option">Sort</span>
                            </div>
                        </th>
                        <th>
                            <div>
                                Transfers
                            </div>
                            <div>
                                <span class="header_option">Sort</span>
                            </div>
                        </th>
                        <th>
                            <div>
                                Transfer Amount
                            </div>
                            <div>
                                <span class="header_option">Sort</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mexico City</td>
                        <td>243</td>
                        <td>$235</td>
                    </tr>
                    <tr>
                        <td>Chihuahua</td>
                        <td>21</td>
                        <td>$235</td>
                    </tr>
                    <tr>
                        <td>Durango</td>
                        <td>12</td>
                        <td>$235</td>
                    </tr>
                    <tr>
                        <td>Yucatan</td>
                        <td>92</td>
                        <td>$235</td>
                    </tr>
                    <tr>
                        <td>Coahuila</td>
                        <td>35</td>
                        <td>$235</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import mexico_map from 'assets/maps/mx-all'

    export default {
        
        data() {
            return {
                options: {
                    credits: {enabled:false},mapNavigation: {enabled: false},
                    title: {
                        text: 'Mexico'
                    },
                    colorAxis: {
                        min: 0,
                        minColor: 'white'
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        backgroundColor: {
                            linearGradient: [0, 0, 0, 60],
                            stops: [
                                [0, '#FFFFFF'],
                                [1, '#E0E0E0']
                            ]
                        },
                        borderWidth: 1,
                        borderColor: '#AAA',
                        borderRadius: 2,
                        headerFormat: '',
                        pointFormat: '{point.name} <br> Transfers Sent: {point.value} <br> Amount Sent: $235'
                    },
                    plotOptions: {
                        map: {
                            dataLabels: {
                                enabled: true,
                                color: 'black',
                                formatter: function () {
                                    if (this.point.value) {
                                      return this.point.value;
                                    }
                                }
                            },
                        }
                    },
                    series: [{
                        name: 'Mexico',
                        mapData: mexico_map.mexico_map_data,
                        data: [
                            ['mx-mx', 243],
                            ['mx-ch', 21],
                            ['mx-dg', 12],
                            ['mx-yu', 92],
                            ['mx-co', 35]
                        ],
                        states: {
                            hover: {
                                color: '#a4edba'
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
    .table th {
        text-align: center;
    }
    
    .header_option {
        text-decoration: underline;
        font-weight: normal;
        color: blue;
        font-size: 0.8em;
    }

    .header_option:hover {
        cursor: pointer;
    }
</style>
