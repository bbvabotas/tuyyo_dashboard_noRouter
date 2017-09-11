<template>
    <div>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <div class="row">
            <div class="col-sm-12">
                <div style="font-size:0.8em; font-style:italic">Click on a metric name to display it's graph</div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="metrics_search">Search Metrics: <input style="width:200px;" type="text" name="query" v-model="query"></div>
            </div>
            <div class="col-sm-6">
                <div style="text-align:right"><i class="fa fa-download fa-2x export_button" title="Download to CSV" @click="exportDataToCSV()"></i></div>
            </div>
        </div>
        
        <table class="table table-bordered metrics_table">
            <thead>
                <tr>
                    <th>
                        <div>Metric</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('name', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('name', 'down')"></i>
                        </div>
                    </th>
                    <th>
                        <div>Shift</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('shift', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('shift', 'down')"></i>
                        </div>
                    </th>
                    <th>
                        <div>Yesterday</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('yesterday', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('yesterday', 'down')"></i>
                        </div>
                    </th>
                    <th>
                        <div>Y - 1</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('y_1', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('y_1', 'down')"></i>
                        </div>
                    </th>
                    <th>
                        <div>Y - 2</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('y_2', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('y_2', 'down')"></i>
                        </div>
                    </th>
                    <th>
                        <div>Y - 3</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('y_3', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('y_3', 'down')"></i>
                        </div>
                    </th>
                    <th>
                        <div>Y - 4</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('y_4', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('y_4', 'down')"></i>
                        </div>
                    </th>
                    <th>
                        <div>Y - 5</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('y_5', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('y_5', 'down')"></i>
                        </div>
                    </th>
                    <th>
                        <div>Avg</div>
                        <div>
                            <i class="fa fa-chevron-circle-up hover_cursor" @click="sortColumn('avg', 'up')"></i>
                            <i class="fa fa-chevron-circle-down hover_cursor" @click="sortColumn('avg', 'down')"></i>
                        </div>
                    </th>
                </tr>
            </thead>
            
        </table>
        <div class="metrics_table_wrapper">
            <table style="width:100%">
                <tbody>
                    <tr v-for="item in tableFilter" :key="item.id">
                        <table class="table table-bordered table-hover metrics_table">
                            <tbody>
                                <tr>
                                    <td @click="displayTrendGraph(item)" style="cursor:pointer">{{ item.name }}</td>
                                    <td v-if="item.shift < 1.25 && item.shift > 0.75">
                                        {{ item.shift }}
                                    </td>
                                    <td v-else-if="item.shift >= 1.25" style="background-color:green; color:white">
                                        {{ item.shift }}
                                    </td>
                                    <td v-else-if="item.shift <= 0.75" style="background-color:red; color:white">
                                        {{ item.shift }}
                                    </td>
                                    <td>{{ item.yesterday }}</td>
                                    <td>{{ item.y_1 }}</td>
                                    <td>{{ item.y_2 }}</td>
                                    <td>{{ item.y_3 }}</td>
                                    <td>{{ item.y_4 }}</td>
                                    <td>{{ item.y_5 }}</td>
                                    <td>{{ item.avg }}</td>
                                </tr>
                                
                                <tr v-if="item.showGraph" style="background-color:white">
                                    <td></td>
                                    <td style="border-right:none">
                                        <metrics-table-graph-shift :shift_data="item.shift" style="height:200px;"></metrics-table-graph-shift>
                                    </td>
                                    <td colspan="7" style="border-left:none">

                                        <div style="width:100%;">
                                            <metrics-table-metric-graph :chart_data="item" style="height:200px;"></metrics-table-metric-graph>
                                        </div>

                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
</template>

<script>
    import papaparse from 'papaparse'
    import MetricsTableMetricGraph from './metrics-table-metric-graph.vue'
    import MetricsTableGraphShift from './metrics-table-graph-shift.vue'
    export default {
        //name: 'metrics-table',
        props: ['table_data'],
        data() {
            return {                
                query: '',
                metrics: [
                    {id:1, name:'Total Logins', shift:2.5, yesterday:20, y_1:10, y_2:12, y_3:4, y_4:7, y_5:9, avg:8, showGraph:false},
                    {id:2, name:'Logins By Android', shift:3.4, yesterday:17, y_1:6, y_2:10, y_3:3, y_4:4, y_5:5, avg:5, showGraph:false},
                    {id:3, name:'Logins By iOS', shift:0.5, yesterday:1, y_1:4, y_2:2, y_3:1, y_4:3, y_5:4, avg:2, showGraph:false},
                    {id:4, name:'Total Money Transfered', shift:1.0, yesterday:2120, y_1:1230, y_2:2310, y_3:1920, y_4:1910, y_5:2990, avg:2120, showGraph:false},
                    {id:5, name:'Money Transfered Via ATM', shift:1.2, yesterday:230, y_1:340, y_2:540, y_3:50, y_4:30, y_5:50, avg:340, showGraph:false},
                    {id:6, name:'Money Transfered Via Cash Pickup', shift:0.8, yesterday:980, y_1:670, y_2:770, y_3:606, y_4:780, y_5:990, avg:890, showGraph:false},
                    {id:7, name:'Money Transfered Via Bank Transfer', shift:0.9, yesterday:100, y_1:230, y_2:120, y_3:300, y_4:210, y_5:102, avg:110, showGraph:false},
                    {id:8, name:'Total Transfers', shift:1.32, yesterday:98, y_1:78, y_2:87, y_3:76, y_4:87, y_5:67, avg:78, showGraph:false},
                    {id:9, name:'Transfers Via ATM', shift:0.74, yesterday:12, y_1:21, y_2:11, y_3:21, y_4:13, y_5:12, avg:11, showGraph:false},
                    {id:10, name:'Transfers Via Cash Pickup', shift:1.0, yesterday:34, y_1:43, y_2:54, y_3:34, y_4:33, y_5:44, avg:34, showGraph:false},
                    {id:11, name:'Transfers Via Bank Transfer', shift:0.8, yesterday:12, y_1:22, y_2:16, y_3:15, y_4:5, y_5:21, avg:10, showGraph:false},
                    {id:12, name:'Launches', shift:1.1, yesterday:56, y_1:76, y_2:43, y_3:23, y_4:32, y_5:43, avg:35, showGraph:false},
                    {id:13, name:'Crashes', shift:1.2, yesterday:2, y_1:1, y_2:0, y_3:0, y_4:0, y_5:2, avg:1, showGraph:false},
                    {id:14, name:'New Registrations', shift:2.0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:15, name:'First Time Transfers', shift:0.9, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:16, name:'Repeat Transfers', shift:1.0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:17, name:'New Recipients Added', shift:1.0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:18, name:'Payment Methods Added', shift:1.0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:19, name:'Delivery Methods Added', shift:0.85, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:20, name:'Successful Transactions', shift:1.9, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:21, name:'Failed Transactions', shift:1.0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:22, name:'Errors', shift:1.0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:23, name:'Downloads', shift:1.0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                ]
            }
        },
        computed: {
            tableFilter: function () {
                //this.commentCount++;
                return this.findBy(this.query)
            }
        },
        methods: {
            getData(){
                
            },
            displayTrendGraph(this_item){
                //console.log(this_item);
                this_item.showGraph = !this_item.showGraph
            },
            findBy(value){
                let search_regex = new RegExp(value, "i"),
                    list = this.metrics;

                return list.filter(function (item) {
                    return item.name.match(search_regex);                                                
                });
            },
            exportDataToCSV(){
                console.log("Exporting table...");
                let new_csv = papaparse.unparse(this.tableFilter);
                //console.log(new_csv);
                this.downloadCSV(new_csv);
            },
            downloadCSV(csv) {
                
                //let object_test = [{"test": "things"}];
                //let json_test = JSON.stringify(object_test);
                
                let blob = new Blob([csv]),
                    a = window.document.createElement("a");
                
                a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
                a.download = "Tuyyo_Metrics.csv";
                
                document.body.appendChild(a);
                
                a.click();
                
                document.body.removeChild(a);
                
                
            },
            sortColumn(column, direction){
                let list = this.metrics;
                
                if(column == 'name'){
                    if(direction == 'up'){
                        return list.sort(function(a,b){
                            if(a.name < b.name) return -1;
                            if(a.name > b.name) return 1;
                            return 0;
                        }); 
                    } else if(direction == 'down'){
                        return list.sort(function(a,b){
                            if(a.name > b.name) return -1;
                            if(a.name < b.name) return 1;
                            return 0;
                        }); 
                    }                                        
                } else {
                    if(direction == 'up'){
                        return list.sort(function(a,b){
                            return a[column] - b[column];
                        }); 
                    } else if(direction == 'down'){
                        return list.sort(function(a,b){
                            return b[column] - a[column];
                        }); 
                    }
                      
                }                               
            }
        },
        components: {
            MetricsTableMetricGraph,
            MetricsTableGraphShift
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .metrics_table {
        margin: 0;
    }
    
    .metrics_table th {
        padding: 5px 10px;
        text-align: center;
    }
    .metrics_table th:nth-child(n+2):nth-child(-n+9) {
        width: 8%;
        min-width: 90px;
    }
    
    .metrics_table td {
        text-align: left;
    }
    
    .metrics_table td:nth-child(n+2):nth-child(-n+9) {
        text-align: right;
        width: 8%;
        min-width: 90px;
    }
    
    .metrics_table tr {
        margin: 0;
        padding: 0;
    }
    .metrics_table_wrapper {
/*        height: 565px;*/
/*        overflow-y: scroll;*/
    }
    
    .header_option {
/*
        text-decoration: underline;
        font-weight: normal;
        color: blue;
*/
        font-size: 0.8em;
    }

/*
    .header_option:hover {
        cursor: pointer;
    }
*/
    .hover_cursor:hover {
        cursor: pointer;
    }
    .metrics_search {
        width: 100%;
        text-align: left;
        font-size: 0.8em;
        margin: 10px 0;
    }
    
    .metrics_search input {
        border: 1px solid gray;
    }
    
    .export_button {
        text-align: right;
        padding: 0 10px;
    }
    
    .export_button:hover {
        cursor: pointer;
    }
</style>
