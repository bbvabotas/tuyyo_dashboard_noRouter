<template>
<div class="row">
    <div class="col-sm-12">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
       
        <div class="wrapper" style="width:800px; margin:auto;">
        
        <div class="row" style="text-align:center;">
            <div class="col-sm-12">
<!--
                <label for="select_channel">Channel: </label>
                <select id="select_channel">
                    <option>Mobile</option>
                    <option>Wallet</option>
                </select>
-->
                
                <label for="select_platform">Platform: </label>
                <select id="select_platform">
                    <option>Android</option>
                    <option>IOS</option>
                </select>
                
                <label for="select_country">Country: </label>
                <select id="select_country">
                    <option>US</option>
                    <option>Spain</option>
                    <option>Mexico</option>
                    <option>Argentina</option>
                    <option>Chile</option>
                    <option>Colombia</option>
                    <option>Peru</option>
                    <option>Venezuela</option>
                    <option>Paraguay</option>
                    <option>Turkey</option>
                </select>
                
                <label for="date_range">Date Range: </label>
                <input id="date_range" class="select_date_range">
                
            </div>
            
        </div>
        
        <hr>
        
        <div id="app">
            
            <div v-if="!show_loading" id="graph_and_frequency">

                <div class="row">
                    <div class="col-sm-12">
                        <div class="trend_chart" id="ratings_over_time_chart">
<!--                            <highcharts :options="options" ref="highcharts"></highcharts>-->
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-12" style="text-align:center;">
                        <div class="row">
                            <div class="col-sm-12">
                                <h5>Negative Reviews</h5>
                                <div class="neg_circle_big">{{ (((star_one_count + star_two_count) / review_num) * 100).toFixed(0) }}%</div>
                                <h5><span>{{ star_one_count + star_two_count }}</span> out of <span class="total_review_count">{{ review_num }}</span> reviews are negative</h5>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div><img class="star_img" :src="images.star_1_image"></div>
                                <div>
                                    <div class="red neg_circle_sm">{{ ((star_one_count / review_num) * 100).toFixed(0) }}%</div>
                                    <span>
                                        <span style="font-weight:bold">{{ star_one_count }}</span> out of a total of 
                                        <span class="total_review_count" style="font-weight:bold">{{ review_num }}</span> reviews are one star
                                    </span>
                                </div>
                                <div><i>word frequency with review count</i></div>
                                <div class="frequency_chart" id="one_star_frequency"></div>
                            </div>
                            <div class="col-sm-6">
                                <div><img class="star_img" :src="images.star_2_image"></div>
                                <div>
                                    <div class="orange neg_circle_sm">{{ ((star_two_count / review_num) * 100).toFixed(0) }}%</div>
                                    <span>
                                        <span style="font-weight:bold">{{ star_two_count }}</span> out of a total of 
                                        <span class="total_review_count" style="font-weight:bold">{{ review_num }}</span> reviews are two stars
                                    </span>
                                </div>
                                <div><i>word frequency with review count</i></div>
                                <div class="frequency_chart" id="two_star_frequency"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <hr>

            <div v-if="!show_loading" class="row" style="margin:40px 0">
                <div class="col-sm-12">
                    <div style="text-align:center;">
                        <div class="copybtn_popup_wrapper" v-if="show_copy_success">
                            Successfuly copied the table to the clipboard!
                        </div>
                        <button data-clipboard-target="#app_recent_comments_table" id="btn_copy">Copy table</button>
                        <div style="font-size:0.8em; font-style:italic">clicking on this button will copy the below table to your clipboard.  This enables you to paste this table into an email easily</div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div v-if="!show_loading" id="app_recent_comments" style="text-align:left">
                        <div id="app_comments_toolbar" class="btn-group">
                            <span><i>Number of reviews: {{ review_num }}</i></span>
                        </div>
                        <table id="app_recent_comments_table" class="table table-striped">
                            <thead>
                            <tr>
                                <th class="col-xs-2">Date</th>
                                <th class="col-xs-9">Comment</th>
                                <th class="col-xs-1">Rating</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in selected_reviews">
                                    <td>{{ item.date }}</td>
                                    <td>
                                        <div v-if="item.english_subject != ''"><strong>English Subject:</strong><br> {{ item.english_subject }}</div>
                                        <div v-if="item.english_body != ''"><strong>English Comment:</strong><br> {{ item.english_body }}<br><br></div>
                                        <div v-if="item.translated_subject != ''">
                                            <strong>
                                                <span v-if="selected_country == 'turkey'">Turkey Subject:</span>
                                                <span v-if="selected_country != 'turkey'">Spanish Subject:</span>
                                            </strong><br> {{ item.translated_subject }}</div>
                                        <div v-if="item.translated_body != ''">
                                            <strong>
                                                <span v-if="selected_country == 'turkey'">Turkey Comment:</span>
                                                <span v-if="selected_country != 'turkey'">Spanish Comment:</span>
                                            </strong><br> {{ item.translated_body }}</div>
                                    </td>
                                    <td style="text-align:right">
                                        {{ item.rating }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="show_loading" style="text-align:center;">Getting data <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i></div>
                </div>
            </div>
        
        </div>
        <br><br>
    </div>
    </div>
</div>
</template>

<script>
    
    import jquery from 'jquery'
    import moment from 'moment'
    import Clipboard from 'clipboard'
    import daterangepicker from 'daterangepicker'
    import Highcharts from 'highcharts'
    import axios from 'axios'
    
    export default {
        data() {
            return {
                images: {
                    star_1_image: require("assets/img/star_1.png"),
                    star_2_image: require("assets/img/star_2.png")
                },
                show_loading: true,
                show_copy_success: false,
                review_num: 0,
                star_one_count: 0,
                star_two_count: 0,
                selected_country: '',
                selected_reviews: [],
                start_date: '',
                end_date: '',
                collection: ''
            }
        },
        mounted(){
            this.initSetup();
        },
        methods: {
            initSetup(){
                let i = 0, comments_data = [], this_vm = this

                this_vm.start_date = moment().subtract(1, 'weeks').day(0).format('YYYY-MM-DD')
                this_vm.end_date = moment().subtract(1, 'weeks').day(6).format('YYYY-MM-DD')
                this_vm.collection = "mobile-android-us"


                /*      Change data based on dropdown selection     */

                jquery('select').on('change', function(){
                    this_vm.collection = 'mobile-' + jquery('#select_platform').val().toLowerCase() + '-' + jquery('#select_country').val().toLowerCase()

                    this_vm.getData();
                });


                /*      Date range picker       */

                jquery('#date_range').daterangepicker({
                    maxDate: moment().format('YYYY-MM-DD'),
                    opens: 'left',
                    locale: {
                      format: 'YYYY-MM-DD'
                    },
                    startDate: moment().subtract(1, 'weeks').day(0).format('YYYY-MM-DD'),
                    endDate: moment().subtract(1, 'weeks').day(6).format('YYYY-MM-DD')
                }, function(start, end, label) {
                    this_vm.start_date = start.format('YYYY-MM-DD'), this_vm.end_date = end.format('YYYY-MM-DD');
                    
                    
                    this_vm.getData();

                });


                /*      Clipboard       */

                let clipboard = new Clipboard('#btn_copy');

                clipboard.on('success', function(e) {
                    this_vm.show_copy_success = true
                    setTimeout(()=>{
                        this_vm.show_copy_success = false
                    }, 2000)
                    e.clearSelection();
                });
                
                this.getData()
            },
            getData(){
                let this_vm = this;

                //console.log(this_vm.collection + ' ' + this_vm.start_date + ' to ' + this_vm.end_date)
                
                this_vm.show_loading = true;
                
                this.star_one_count = 0;
                this.star_two_count = 0;

                //console.log(start_date + ' to ' + end_date + ' for ' + collection)
                //https://botas-mlab-appreviews.herokuapp.com/api/get_wallet_data
                axios.get('https://botas-mlab-appreviews.herokuapp.com/api/get_mobile_data?start_date=' + this_vm.start_date + '&end_date=' + this_vm.end_date + '&current_collection=' + this_vm.collection)
                .then(function (response) {
                    //console.log(response)
                    this_vm.selected_reviews = response.data.reviews
                    this_vm.review_num = response.data.reviews.length
                    this_vm.selected_country = this_vm.collection.split('-')[2]
                    

                    this_vm.show_loading = false
                    
                    setTimeout(function(){
                        
                        this_vm.showGraph(response.data.trend)
                        this_vm.showNegativeReviews(response.data.reviews)
                    }, 1000)


                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            showGraph(data){
                //console.log(data);

                let i = 0, j = 0, this_vm = this,
                    chart_data = {
                        categories: [],
                        data: [],
                        review_counts: []
                    }

                for(i = 0; i < data.length; i++){
                    if(this_vm.collection in data[i]){
                        //console.log(data[i][collection])

                        for(j = 0; j < data[i][this_vm.collection].length; j++){
                            chart_data.categories.push(
                                moment(data[i][this_vm.collection][j].date_range.from).format('MMM-DD') + '<br>to<br>' + moment(data[i][this_vm.collection][j].date_range.to).format('MMM-DD')
                            )
                            if(data[i][this_vm.collection][j].review_average_rating === null){
                                chart_data.data.push(0)
                            } else {
                                chart_data.data.push(data[i][this_vm.collection][j].review_average_rating)
                            }

                            chart_data.review_counts.push(data[i][this_vm.collection][j].review_count)
                        }

                        break;
                    }
                }
                
                Highcharts.chart('ratings_over_time_chart', {
    //                chart: {
    //                    type: 'line'  
    //                },
                    title: {
                        text: 'Average Rating Trend For Last 7 Weeks'
                    },
    //                subtitle: {
    //                    text: 'avg: '
    //                },
                    xAxis: {
                        categories: chart_data.categories,
                        labels: {
                            //rotation: -80,
    //                        formatter: function(){
    //                            return (this.value) + '<br> reviews: ';
    //                        }
                        }
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
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
    //                            formatter: function(){
    //                                if(this.y === null){
    //                                    return 0
    //                                } else {
    //                                    return this.y
    //                                }
    //                            }
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
                        data: chart_data.data
                    },{
                        type: 'column',
                        yAxis: 1,
                        data: chart_data.review_counts
                    }]
                });

//                this.$refs.highcharts.chart.update({
//                    categories: chart_data.categories,
//                    series: [{
//                        type: 'line',
//                        yAxis: 0,
//                        zIndex: 10,
//                        data: chart_data.data
//                    },{
//                        type: 'column',
//                        yAxis: 1,
//                        data: chart_data.review_counts
//                    }]
//                })
            },
            showNegativeReviews(data){
                let this_vm = this;
                let i = 0, j = 0, k = 0;
                let search_words = [
                    "update", "app", "bank", "deposit", "error", "account", "fund", "transactions", "logon", "login", "budget", "money", "security",
                    "crash", "password", "card", "bbva", "mobile", "version", "support", "register", "data", "transfer", "enter", "access", "key",
                    "check", "experience", "charge", "register", "receipt", "load", "service", "photo", "fix", "activate", "text", "link", "cell",
                    "install", "pay", "stuck", "token", "registration", "telephone", "payment", "payroll", "data"
                ];

                let excluded_words = [
                    "1", "2",
                    "15",
                    "s", "t", 
                    "101", "a", "able", "after", "all", "am", "any", "apparently", "are", "asterisks", "be", "better", "but", "cannot", "do",
                    "even", "ever", "generated", "handle", "have", "having", "idea", "into", "late", "leading", "let", "like", "longer", "make", "me",
                    "means", "more", "my", "no", "not", "now", "or", "personal", "placeholders", "recommend", "same", "should", "since", "than", "that",
                    "the", "their", "they're", "there", "them", "they", "this", "to", "trailing", "use", "with", "without", "won", "worst", "worthless",
                    "years"
                ]

                //Combine the one and two star reviews to do the word search
                let star_one_reviews = '',
                    star_two_reviews = '';

                let star_one_frequency = [], star_two_frequency = [], can_add = true


                let star_one_total = 0,
                    star_two_total = 0

                for(i = 0; i < data.length; i++){
                    if(parseInt(data[i].rating) == 1){
                        star_one_total++

                        for(j = 0; j < search_words.length; j++){
                            if(data[i].english_body.toLowerCase().match(search_words[j])){

                                can_add = true;

                                for(k = 0; k < star_one_frequency.length; k++){
                                    if(star_one_frequency[k].word == search_words[j]){
                                        can_add = false;
                                        star_one_frequency[k].count++
                                    }
                                }

                                if(can_add){
                                    star_one_frequency.push({
                                        word: search_words[j],
                                        count: 1
                                    })
                                }
                            }
                        }

                    } else if(parseInt(data[i].rating) == 2){
                        star_two_total++

                        for(j = 0; j < search_words.length; j++){
                            if(data[i].english_body.toLowerCase().match(search_words[j])){

                                can_add = true;

                                for(k = 0; k < star_two_frequency.length; k++){
                                    if(star_two_frequency[k].word == search_words[j]){
                                        can_add = false;
                                        star_two_frequency[k].count++
                                    }
                                }

                                if(can_add){
                                    star_two_frequency.push({
                                        word: search_words[j],
                                        count: 1
                                    })
                                }
                            }
                        }
                    }
                }

                this.star_one_count = star_one_total;
                this.star_two_count = star_two_total;

                star_one_frequency.sort(function(a,b){
                    return b.count - a.count
                })
                star_two_frequency.sort(function(a,b){
                    return b.count - a.count
                })

                //console.log(star_one_frequency)
                //console.log(star_two_frequency)


                function displayWordFrequencyTables(star_one_frequency, star_one_total, star_two_frequency, star_two_total){

                    let star_1_data = {
                            categories: ['Total'],
                            data: [star_one_total]
                        },
                        star_2_data = {
                            categories: ['Total'],
                            data: [star_two_total]
                        }

                    for(i = 0; i < 5; i++){
                        if(star_one_frequency[i] != undefined){
                            star_1_data.categories.push(star_one_frequency[i].word)
                            star_1_data.data.push(star_one_frequency[i].count)
                        } else {
                            star_1_data.categories.push('')
                            star_1_data.data.push(0)
                        }

                        if(star_two_frequency[i] != undefined){
                            star_2_data.categories.push(star_two_frequency[i].word)
                            star_2_data.data.push(star_two_frequency[i].count)
                        } else {
                            star_2_data.categories.push('')
                            star_2_data.data.push(0)
                        }
                    }


                    let red_colors = ['#595959', '#ff8b5a', '#ff8b5a', '#ff8b5a', '#ff8b5a', '#ff8b5a'],
                        orange_colors = ['#595959', '#ffb234', '#ffb234', '#ffb234', '#ffb234', '#ffb234'];
                    Highcharts.chart('one_star_frequency', {
                        chart: {
                            type: 'bar'
                        },
                        colors: red_colors,
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: star_1_data.categories,
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
                            max: star_1_data.data[0] + 1,
                            visible: false
                        },
                        tooltip: {enabled: false},legend: {enabled: false},credits: {enabled: false},
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true,
                                    formatter: function(){
                                        if(this.y > 0){
                                            return this.y;
                                        }
                                    }
                                },
                                colorByPoint: true,
                                groupPadding: 0.1
                            }
                        },
                        series: [{
                            name: 'words',
                            data: star_1_data.data
                        }]
                    });
                    Highcharts.chart('two_star_frequency', {
                        chart: {
                            type: 'bar'
                        },
                        colors: orange_colors,
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: star_2_data.categories,
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
                            max: star_2_data.data[0] + 1,
                            visible: false
                        },
                        tooltip: {enabled: false},legend: {enabled: false},credits: {enabled: false},
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true,

                                    formatter: function(){
                                        if(this.y > 0){
                                            return this.y;
                                        }
                                    }
                                },
                                colorByPoint: true,
                                groupPadding: 0.1
                            }
                        },
                        series: [{
                            name: 'words',
                            data: star_2_data.data
                        }]
                    });          
                }

                displayWordFrequencyTables(star_one_frequency, star_one_total, star_two_frequency, star_two_total)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .row {
        margin: 0;
    }
    select {
        margin: 20px 10px 10px 10px;
        padding: 6px 10px;
        border-radius: 5px;
    }
    .select_date_range {
        padding: 5px 10px;
        text-align: center;
        border-radius: 5px;
        width: 250px;
    }
    .trend_btn {
        background-color: white;
        padding: 5px 10px;
        margin: 5px;
        border: 1px solid gray;
        border-radius: 5px;
    }
    .trend_btn_active {
        border: 2px solid blue;
    }
    .neg_circle_big {
        font-size: 3em;
        font-weight: bold;
        width: 120px;
        height: 120px;
        text-align: center;
        line-height: 114px;
        vertical-align: middle;
        border: 3px solid gray;
        border-radius: 50%;
        margin: auto;
    }
    .neg_circle_sm {
        font-size: 1em;
        font-weight: bold;
        width: 50px;
        height: 50px;
/*            padding: 10px 5px 10px 5px;*/
        text-align: center;
        border-radius: 50%;
        display: inline-block;
        line-height: 44px;
        vertical-align: middle;
    }
    .red {
        border: 3px solid #ff8b5a;
    }
    .orange {
        border: 3px solid #ffb234;
    }
    .star_img {
        height: 20px;
    }
    .frequency_chart {
        height: 150px;
        width: 100%;
    }
    .trend_chart {
        height: 300px;
    }
    
    @keyframes fadeIn {
        from {opacity: 0;}
        to {opacity:1 ;}
    }

    .copybtn_popup_wrapper {
        width: 300px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -150px;
        animation: fadeIn 1s;
    }
    
    .copybtn_popup_wrapper::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
        
    }
    
</style>
