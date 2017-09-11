<template>
    <div class="wrapper">
        <div>
            <highmaps :options="options"></highmaps>
        </div>
        
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
                        <td>California</td>
                        <td>43</td>
                        <td>$235</td>
                    </tr>
                    <tr>
                        <td>Nevada</td>
                        <td>21</td>
                        <td>$235</td>
                    </tr>
                    <tr>
                        <td>Texas</td>
                        <td>141</td>
                        <td>$235</td>
                    </tr>
                    <tr>
                        <td>New Mexico</td>
                        <td>32</td>
                        <td>$235</td>
                    </tr>
                    <tr>
                        <td>Arizona</td>
                        <td>21</td>
                        <td>$235</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    
    import us_map from 'assets/maps/us-all'

    export default {
        
        data() {
            return {
                options: {
                    credits: {enabled:false},mapNavigation: {enabled: false},
                    title: {
                        text: 'USA'
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
                            }
                        }
                    },
                    series: [{
                        name: 'US',
                        mapData: us_map.us_map_data,
                        data: [
                            ['us-ca', 43],
                            ['us-nv', 21],
                            ['us-tx', 141],
                            ['us-nm', 32],
                            ['us-az', 21]
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
