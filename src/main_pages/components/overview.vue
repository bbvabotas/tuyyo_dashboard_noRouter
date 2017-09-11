<template>
    <div class="landing">
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css">
           
<!--
            <div style="margin: 10px; z-index:100;">
                <button class="btn btn-default" v-popover:nav_menu.right><i class="fa fa-bars"></i></button>    
            </div>
            
            <popover class="side_menu" name="nav_menu">
                    <ul>
                        <li><a href="#top_nav">Top</a></li>
                        <li><a href="#app_rating">App Ratings</a></li>
                        <li>
                            <i>Stats</i>
                            <ul>
                                <li><a href="#stats_overview">- Overview</a></li>
                                <li><a href="#stats_date_range">- Date Range</a></li>
                                <li><a href="#stats_geo_location">- Geo Location</a></li>
                            </ul>
                        </li>
                        <li><a href="#metrics">Metrics</a></li>
                    </ul>
            </popover>
-->
            
            
            
           
            <div class="row">
                
                <div class="col-sm-10">
                   
<!--
                    
                        App Ratings
                    
-->
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 id="app_rating">App Ratings</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div style="border: 1px solid lightgray; border-radius: 5px">
                                <overview-app-rating :rating_data="icon.android"></overview-app-rating>    
                            </div>
                            
                        </div>
                        <div class="col-sm-6">
                            <div style="border: 1px solid lightgray; border-radius: 5px">
                                <overview-app-rating :rating_data="icon.ios"></overview-app-rating>
                            </div>
                            
                        </div>
                    </div>
                    <hr>
                    
<!--
                    
                        Stats
                    
-->
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 id="stats_overview">Stats</h3>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-sm-12">
                            <overview-live-data></overview-live-data>
                        </div>
                    </div>
                    
                    <div class="row">
                       
                        <div class="col-sm-3" style="min-width:280px;">
                            <div>Today</div>
                            <div class="quick_stats">
                                <div>
                                    <i class="fa fa-user"></i> New Registrations <strong>2</strong>
                                </div>
                                <div>
                                    <i class="fa fa-child"></i> Logins <strong>12</strong>
                                </div>
                                <div>
                                    <i class="fa fa-exchange"></i> Transfers <strong>20</strong>
                                </div>
                                <div>
                                    <i class="fa fa-money"></i> Transfer Amount <strong>$1,400</strong>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3" style="min-width:280px;">
                            <div>Yesterday</div>
                            <div class="quick_stats">
                                <div>
                                    <i class="fa fa-user"></i> New Registrations <strong>2</strong>
                                </div>
                                <div>
                                    <i class="fa fa-child"></i> Logins <strong>5</strong>
                                </div>
                                <div>
                                    <i class="fa fa-exchange"></i> Transfers <strong>15</strong>
                                </div>
                                <div>
                                    <i class="fa fa-money"></i> Transfer Amount <strong>$470</strong>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3" style="min-width:280px;">
                            <div>Last Week</div>
                            <div class="quick_stats">
                                <div>
                                    <i class="fa fa-user"></i> New Registrations <strong>27</strong>
                                </div>
                                <div>
                                    <i class="fa fa-child"></i> Logins <strong>39</strong>
                                </div>
                                <div>
                                    <i class="fa fa-exchange"></i> Transfers <strong>9</strong>
                                </div>
                                <div>
                                    <i class="fa fa-money"></i> Transfer Amount <strong>$768.35</strong>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3" style="min-width:280px;">
                            <div>All Time</div>
                            <div class="quick_stats">
                                <div>
                                    <i class="fa fa-user"></i> New Registrations <strong>10,100</strong>
                                </div>
                                <div>
                                    <i class="fa fa-child"></i> Logins <strong>100,120</strong>
                                </div>
                                <div>
                                    <i class="fa fa-exchange"></i> Transfers <strong>200,563</strong>
                                </div>
                                <div>
                                    <i class="fa fa-money"></i> Transfer Amount <strong>$100,000,000</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h4 id="stats_date_range">Date Range</h4>
                                    <div><i>last week</i></div>
                                    <div id="date_range" class="date_range_wrapper"></div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-3"><info-box :info_data="info_box_data.registeredCustomersData"></info-box></div>
                                <div class="col-sm-3"><info-box :info_data="info_box_data.activeCustomersData"></info-box></div>
                                <div class="col-sm-3"><info-box :info_data="info_box_data.transfersData"></info-box></div>
                                <div class="col-sm-3"><info-box :info_data="info_box_data.amountTransferedData"></info-box></div>
                            </div>

                            <div class="row" style="height:250px">
                                <div class="col-sm-3">
                                    <overview-stat-breakdown :breakdown_data="info_box_data.statBreakdownRegistrations"></overview-stat-breakdown>
                                </div>
                                <div class="col-sm-3">
                                    <overview-stat-breakdown :breakdown_data="info_box_data.statBreakdownLogins"></overview-stat-breakdown>
                                </div>
                                <div class="col-sm-3">
                                    <overview-stat-breakdown :breakdown_data="info_box_data.statBreakdownTransfers"></overview-stat-breakdown>
                                </div>
                                <div class="col-sm-3">
                                    <overview-stat-breakdown :breakdown_data="info_box_data.statBreakdownTransferAmount"></overview-stat-breakdown>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-6">
                                    <overview-stat-breakdown :breakdown_data="info_box_data.transferBreakdown"></overview-stat-breakdown>
                                </div>
                                <div class="col-sm-6">
                                    <overview-stat-breakdown :breakdown_data="info_box_data.transferAmountBreakdown"></overview-stat-breakdown>
                                </div>
                            </div>
                            
                            <div class="row">
                                <h4 id="stats_geo_location">Geo Locations</h4>
                                <div class="col-sm-5 countries">
                                    <countries-us></countries-us>
                                </div>
                                <div class="col-sm-2 countries">
                                    <div class="countries-transfers">
                                        <div>Transfers: 312</div>
                                        <div><i class="fa fa-long-arrow-right fa-5x"></i></div>
                                        <div>Transfer Amount: $2,765</div>
                                    </div>

                                </div>
                                <div class="col-sm-5 countries">
                                    <countries-mx></countries-mx>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <hr>
                    
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 id="metrics">Metrics</h3>
                            <metrics-table></metrics-table>
                        </div>
                    </div>
                    <hr>
                </div>
                
                <div class="col-sm-2">
                    <div class="side_menu_wrapper">
                        <div class="side_menu">
                            <ul>
                                <li style="margin:10px 0"><a href="#top_nav" v-smooth-scroll="{ duration: 2000, offset: -30 }">Top</a></li>
                                <li style="margin:10px 0"><a href="#app_rating" v-smooth-scroll="{ duration: 2000, offset: -30 }">App Ratings</a></li>
                                <li style="margin:10px 0">
                                    <i>Stats</i>
                                    <ul>
                                        <li style="margin-left:16px"><a href="#stats_overview" v-smooth-scroll="{ duration: 2000, offset: -30 }">Overview</a></li>
                                        <li style="margin-left:16px"><a href="#stats_date_range" v-smooth-scroll="{ duration: 2000, offset: -30 }">Date Range</a></li>
                                        <li style="margin-left:16px"><a href="#stats_geo_location" v-smooth-scroll="{ duration: 2000, offset: -30 }">Geo Location</a></li>
                                    </ul>
                                </li>
                                <li style="margin:10px 0"><a href="#metrics" v-smooth-scroll="{ duration: 2000, offset: -40 }">Metrics</a></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        
    </div>
</template>

<script>
    import OverviewLiveData from './overview-live-data'
    import DonutChart from './donut-chart.vue'
    import InfoBox from './info-box.vue'
    import OverviewStatBreakdown from './overview-stat-breakdown'
    import CountriesUs from './countries-us.vue'
    import CountriesMx from './countries-mx.vue'
    import OverviewAppRating from './overview-app-rating.vue'
    import MetricsTable from './metrics-table.vue'
    
    import moment from 'moment'
    import jquery from 'jquery'
    import daterangepicker from 'daterangepicker'
    
    import axios from 'axios'
    
    
    
    export default {
        mounted() {
            this.dateRange();
            this.appStore();
        },
        data() {
            return {
                show_side_menu: false,
                icon: {
                    android: 'iconAndroid',
                    ios: 'iconIOS'
                },
                info_box_data: {
                    totalStatBreakdown: {
                        loading_data: true,
                        name: 'Stats per platform',
                        categories: ['New Registrations', 'Logins', 'Transfers', 'Transfer Amount'],
                        android: [1900, 2189, 2987, 5679],
                        ios: [590, 1111, 1234, 5124]
                    },
                    totalStatBreakdownRegistrations: {
                        loading_data: true,
                        name: 'New Registrations per platform',
                        categories: ['Android', 'iOS'],
                        data: [1900, 590],
                        android: [1900],
                        ios: [590] 
                    },
                    totalStatBreakdownLogins: {
                        loading_data: true,
                        name: 'Logins per platform',
                        categories: ['Android', 'iOS'],
                        data: [2189, 1111],
                        android: [2189],
                        ios: [1111] 
                    },
                    totalStatBreakdownTransfers: {
                        loading_data: true,
                        name: 'Transfers per platform',
                        categories: ['Android', 'iOS'],
                        data: [2987, 1234],
                        android: [2987],
                        ios: [1234] 
                    },
                    totalStatBreakdownTransferAmount: {
                        loading_data: true,
                        name: 'Transfer Amount per platform',
                        categories: ['Android', 'iOS'],
                        data: [5679, 5124],
                        android: [5679],
                        ios: [5124] 
                    },
                    totalTransferBreakdown: {
                        loading_data: true,
                        name: 'Transfers by method per platform',
                        categories: ['ATM Pickup', 'Cash Pickup', 'Bank Transfers'],
                        android: [690, 1789, 387],
                        ios: [345, 876, 34]
                    },
                    totalTransferAmountBreakdown: {
                        loading_data: true,
                        name: 'Transfer Amount by method per platform',
                        categories: ['ATM Pickup', 'Cash Pickup', 'Bank Transfers'],
                        android: [1990, 3789, 1387],
                        ios: [2345, 3876, 234]
                    },
                    statBreakdown: {
                        loading_data: true,
                        name: 'Stats per platform',
                        categories: ['New Registrations', 'Logins', 'Transfers', 'Transfer Amount'],
                        android: [20, 29, 7, 579],
                        ios: [7, 10, 2, 194]
                    },
                    
                    statBreakdownRegistrations: {
                        loading_data: true,
                        name: 'New Registrations per platform',
                        categories: ['New Registrations'],
                        android: [20],
                        ios: [7] 
                    },
                    statBreakdownLogins: {
                        loading_data: true,
                        name: 'Logins per platform',
                        categories: ['Logins'],
                        android: [29],
                        ios: [10] 
                    },
                    statBreakdownTransfers: {
                        loading_data: true,
                        name: 'Transfers per platform',
                        categories: ['Transfers'],
                        android: [7],
                        ios: [2] 
                    },
                    statBreakdownTransferAmount: {
                        loading_data: true,
                        name: 'Transfer Amount per platform',
                        categories: ['Transfer Amount'],
                        android: [579],
                        ios: [194] 
                    },
                    transferBreakdown: {
                        loading_data: true,
                        name: 'Transfers by method per platform',
                        categories: ['ATM Pickup', 'Cash Pickup', 'Bank Transfers'],
                        android: [4, 2, 1],
                        ios: [2, 0, 0]
                    },
                    transferAmountBreakdown: {
                        loading_data: true,
                        name: 'Transfer Amount by method per platform',
                        categories: ['ATM Pickup', 'Cash Pickup', 'Bank Transfers'],
                        android: [352, 209, 50],
                        ios: [194, 0, 0]
                    },
                    totalRegisteredCustomersData: {
                        name: 'New Registrations',
                        val: '',
                        icon: 'user'
                    },
                    totalActiveCustomersData: {
                        name: 'Logins',
                        val: '',
                        icon: 'repeat'
                    },
                    totalTransfersData: {
                        name: 'Transfers',
                        val: '',
                        icon: 'exchange'
                    },
                    totalAmountTransferedData: {
                        name: 'Transfer Amount',
                        val: '',
                        mxn: 0,
                        icon: 'money'
                    },
                    registeredCustomersData: {
                        name: 'New Registrations',
                        val: '',
                        icon: 'user'
                    },
                    activeCustomersData: {
                        name: 'Logins',
                        val: '',
                        icon: 'repeat'
                    },
                    transfersData: {
                        name: 'Transfers',
                        val: '',
                        icon: 'exchange'
                    },
                    amountTransferedData: {
                        name: 'Transfer Amount',
                        val: '',
                        mxn: 0,
                        icon: 'money'
                    }
                },
                donut_chart_data: {
                    totalTransfersData: {
                        loading_data: true,
                        name: 'Transfers',
                        data: [{
                            name: 'ATM Pickup',
                            y: 0
                        }, {
                            name: 'Cash Pickup',
                            y: 0
                        }, {
                            name: 'Bank Transfer',
                            y: 0
                        }]
                    },
                    totalAmountTransferedData: {
                        loading_data: true,
                        name: 'Transfer Amount',
                        data: [{
                            name: 'ATM Pickup',
                            y: 0
                        }, {
                            name: 'Cash Pickup',
                            y: 0
                        }, {
                            name: 'Bank Transfer',
                            y: 0
                        }]
                    },
                    transfersData: {
                        loading_data: true,
                        name: 'Transfers',
                        data: [{
                            name: 'ATM Pickup',
                            y: 0
                        }, {
                            name: 'Cash Pickup',
                            y: 0
                        }, {
                            name: 'Bank Transfer',
                            y: 0
                        }]
                    },
                    amountTransferedData: {
                        loading_data: true,
                        name: 'Transfer Amount',
                        data: [{
                            name: 'ATM Pickup',
                            y: 0
                        }, {
                            name: 'Cash Pickup',
                            y: 0
                        }, {
                            name: 'Bank Transfer',
                            y: 0
                        }]
                    }
                }
            }
        },
        methods: {
            appStore(){
//                axios.get(`http://jsonplaceholder.typicode.com/posts`)
//                .then(response => {
//                  // JSON responses are automatically parsed.
//                  this.posts = response.data
//                })
//                .catch(e => {
//                  this.errors.push(e)
//                })
            },
            getCustomerData(start, end){
                
                
                //console.log('get data from ' + start + ' to ' + end)
                
                /*
                    Blank out the data so that the loading spinner will display           
                */
                this.info_box_data.totalRegisteredCustomersData.val = '';
                this.info_box_data.totalActiveCustomersData.val = '';
                this.info_box_data.totalTransfersData.val = '';
                this.info_box_data.totalAmountTransferedData.val = '';
                
                this.info_box_data.registeredCustomersData.val = '';
                this.info_box_data.activeCustomersData.val = '';
                this.info_box_data.transfersData.val = '';
                this.info_box_data.amountTransferedData.val = '';
                
                this.donut_chart_data.totalTransfersData.data[0].y = ''; //total atm pickup
                this.donut_chart_data.totalTransfersData.data[1].y = ''; //total cash pickup
                this.donut_chart_data.totalTransfersData.data[2].y = ''; //total bank transfer

                this.donut_chart_data.totalAmountTransferedData.data[0].y = ''; //total atm pickup
                this.donut_chart_data.totalAmountTransferedData.data[1].y = ''; //total cash pickup
                this.donut_chart_data.totalAmountTransferedData.data[2].y = ''; //total bank transfer

                this.donut_chart_data.transfersData.data[0].y = ''; //atm pickup
                this.donut_chart_data.transfersData.data[1].y = ''; //cash pickup
                this.donut_chart_data.transfersData.data[2].y = ''; //bank transfer

                this.donut_chart_data.amountTransferedData.data[0].y = ''; //atm pickup
                this.donut_chart_data.amountTransferedData.data[1].y = ''; //cash pickup
                this.donut_chart_data.amountTransferedData.data[2].y = ''; //bank transfer
                
                this.info_box_data.totalStatBreakdown.loading_data = true
                
                this.info_box_data.totalStatBreakdownRegistrations.loading_data = true
                this.info_box_data.totalStatBreakdownLogins.loading_data = true
                this.info_box_data.totalStatBreakdownTransfers.loading_data = true
                this.info_box_data.totalStatBreakdownTransferAmount.loading_data = true
                
                this.info_box_data.statBreakdownRegistrations.loading_data = true
                this.info_box_data.statBreakdownLogins.loading_data = true
                this.info_box_data.statBreakdownTransfers.loading_data = true
                this.info_box_data.statBreakdownTransferAmount.loading_data = true
                
                //For testing purposes
                setTimeout( () => {
                    this.info_box_data.totalRegisteredCustomersData.val = 2490;
                    this.info_box_data.totalActiveCustomersData.val = 3300;
                    this.info_box_data.totalTransfersData.val = 4098;
                    this.info_box_data.totalAmountTransferedData.val = '$' + 109820;
                    
                    this.info_box_data.registeredCustomersData.val = 27;
                    this.info_box_data.activeCustomersData.val = 39;
                    this.info_box_data.transfersData.val = 9;
                    this.info_box_data.amountTransferedData.val = '$' + 768.35;
                    
                    this.donut_chart_data.totalTransfersData.data[0].y = 52; //total atm pickup
                    this.donut_chart_data.totalTransfersData.data[1].y = 35; //total cash pickup
                    this.donut_chart_data.totalTransfersData.data[2].y = 12; //total bank transfer

                    this.donut_chart_data.totalAmountTransferedData.data[0].y = 300; //total atm pickup
                    this.donut_chart_data.totalAmountTransferedData.data[1].y = 2987; //total cash pickup
                    this.donut_chart_data.totalAmountTransferedData.data[2].y = 978; //total bank transfer
                    
                    this.donut_chart_data.transfersData.data[0].y = 6; //atm pickup
                    this.donut_chart_data.transfersData.data[1].y = 2; //cash pickup
                    this.donut_chart_data.transfersData.data[2].y = 1; //bank transfer
                    
                    this.donut_chart_data.amountTransferedData.data[0].y = 61.03; //atm pickup
                    this.donut_chart_data.amountTransferedData.data[1].y = 501.39999999999; //cash pickup
                    this.donut_chart_data.amountTransferedData.data[2].y = 216.32; //bank transfer
                    
                    this.info_box_data.totalStatBreakdown.loading_data = false
                    this.info_box_data.totalTransferBreakdown.loading_data = false
                    this.info_box_data.totalTransferAmountBreakdown.loading_data = false
                    
                    this.info_box_data.statBreakdown.loading_data = false
                    this.info_box_data.transferBreakdown.loading_data = false
                    this.info_box_data.transferAmountBreakdown.loading_data = false
                    
                    this.info_box_data.totalStatBreakdownRegistrations.loading_data = false
                    this.info_box_data.totalStatBreakdownLogins.loading_data = false
                    this.info_box_data.totalStatBreakdownTransfers.loading_data = false
                    this.info_box_data.totalStatBreakdownTransferAmount.loading_data = false
                    
                    this.info_box_data.statBreakdownRegistrations.loading_data = false
                    this.info_box_data.statBreakdownLogins.loading_data = false
                    this.info_box_data.statBreakdownTransfers.loading_data = false
                    this.info_box_data.statBreakdownTransferAmount.loading_data = false
                    
                    console.log(this.customer_data);
                }, 4000)
                
                /*
                    Now get the actual data
                */
                
//                let this_vm = this
//                axios.get('/registrations?start=' + start + '&end=' + end) //Get registration data
//                .then(response => {
//                    if(response.data.length > 0){
//                        this_vm.info_box_data.registeredCustomersData.val = response.data[0].count;
//                        
//                    } else {
//                        this_vm.info_box_data.registeredCustomersData.val = 0;
//                    }
//                    
//                    
//                    axios.get('/active?start=' + start + '&end=' + end) //Get active customer data
//                    .then(response => {
//                        if(response.data.length > 0){
//                            this_vm.info_box_data.activeCustomersData.val = response.data[0].count;
//                        } else {
//                            
//                            this_vm.info_box_data.activeCustomersData.val = 0;
//                        }
//                        
//                        axios.get('/transferCount?start=' + start + '&end=' + end) //Get transfer data
//                        .then(response => {
//                            
//                            let atm_pickup = 0, cash_pickup = 0, bank_transfer = 0;
//                            
//                            console.log(response);
//                            
//                            if(response.data.length > 0){
//                                atm_pickup = response.data[0].count
//                                cash_pickup = response.data[1].count
//                                bank_transfer = response.data[2].count
//                            }                            
//                            
//                            this_vm.info_box_data.transfersData.val = atm_pickup + cash_pickup + bank_transfer;
//                            this_vm.donut_chart_data.transfersData.data[0].y = atm_pickup; //atm pickup
//                            this_vm.donut_chart_data.transfersData.data[1].y = cash_pickup; //cash pickup
//                            this_vm.donut_chart_data.transfersData.data[2].y = bank_transfer; //bank transfer
//                            
//                            console.log(this_vm.info_box_data.transfersData);
//                            
//                            axios.get('/transferAmount?start=' + start + '&end=' + end) //Get transfer amount data
//                            .then(response => {
//                                let atm_pickup = 0, cash_pickup = 0, bank_transfer = 0;
//                            
//                                console.log(response);
//                                
//                                if(response.data.length > 0){
//                                    atm_pickup = response.data[0].total_from_amount
//                                    cash_pickup = response.data[1].total_from_amount
//                                    bank_transfer = response.data[2].total_from_amount
//                                }                                
//
//                                this_vm.info_box_data.amountTransferedData.val = '$' + ((atm_pickup + cash_pickup + bank_transfer).toFixed(0));
//                                this_vm.donut_chart_data.amountTransferedData.data[0].y = atm_pickup; //atm pickup
//                                this_vm.donut_chart_data.amountTransferedData.data[1].y = cash_pickup; //cash pickup
//                                this_vm.donut_chart_data.amountTransferedData.data[2].y = bank_transfer; //bank transfer
//                                
//                                console.log(this_vm.info_box_data.amountTransferedData);
//                                
//                                this_vm.donut_chart_data.transfersData.loading_data = false;
//                                this_vm.donut_chart_data.amountTransferedData.loading_data = false;
//                            })
//                            .catch(e => {
//                                console.log(e)
//                            }) 
//                        })
//                        .catch(e => {
//                            console.log(e)
//                        }) 
//                    })
//                    .catch(e => {
//                        console.log(e)
//                    }) 
//                })
//                .catch(e => {
//                    console.log(e)
//                })                
            },
            convertDateToEpoch(start, end){
                //return ((moment(date).valueOf()) / 1000).toFixed(0) + 's';
                let temp_start = moment(start).format('YYYY-MM-DD')
                let temp_end = moment(end).format('YYYY-MM-DD')
                
                let new_start = (moment(temp_start).startOf('day').valueOf() / 1000).toFixed(0) + 's'
                let new_end = (moment(temp_end).endOf('day').valueOf() / 1000).toFixed(0) + 's'
                
                
                //console.log('new_start: ' + new_start + ' new_end: ' + new_end)
                
                this.getCustomerData(new_start, new_end)
            },
            dateRange(){
                
                setTimeout(() => {
                    let start = moment().subtract(1, 'weeks').day(0),
                        end = moment().subtract(1, 'weeks').day(6);

                    this.convertDateToEpoch(start, end)

                    let this_vm = this;

                    function updateDate(start, end){    
                        jquery("#date_range").html(
                            start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') +
                            ' <span><i class="fa fa-chevron-down" style="float:right"></i></span>'
                        );
                        
                        jquery("#date_range2").html(
                            start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') +
                            ' <span><i class="fa fa-chevron-down" style="float:right"></i></span>'
                        );
                    }

                    jquery("#date_range").daterangepicker({
                        opens: 'center',
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last Week': [moment().subtract(1, 'weeks').day(0), moment().subtract(1, 'weeks').day(6)],
                            'All Time': [moment().subtract(1, 'month'), moment()]
                        },
                        startDate: start,
                        endDate: end,
                        maxDate: moment(),
                        alwaysShowCalendars: true
                    }, updateDate(start, end));

                    //When the user clicks on Apply from the date range picker
                    jquery('#date_range').on('apply.daterangepicker', function(ev, picker) {

                        updateDate(picker.startDate, picker.endDate)
                        this_vm.convertDateToEpoch(picker.startDate, picker.endDate)
                    });
                    
                    
                    jquery("#date_range2").daterangepicker({
                        opens: 'center',
                        ranges: {
                           'Today': [moment(), moment()],
                           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                           'Last 7 Days': [moment().subtract(8, 'days'), moment().subtract(1, 'days')],
                           'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
                           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        startDate: start,
                        endDate: end,
                        maxDate: moment(),
                        alwaysShowCalendars: true
                    }, updateDate(start, end));

                    //When the user clicks on Apply from the date range picker
                    jquery('#date_range2').on('apply.daterangepicker', function(ev, picker) {

                        updateDate(picker.startDate, picker.endDate)
                        this_vm.convertDateToEpoch(picker.startDate, picker.endDate)
                    });
                }, 500)
                
            }
        },
        components: {
            DonutChart,
            InfoBox,
            OverviewStatBreakdown,
            CountriesUs,
            CountriesMx,
            OverviewAppRating,
            OverviewLiveData,
            MetricsTable
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .row {
        margin: 10px 0 20px 0;
    }
    
    .donut-chart {
/*        height: 200px;*/
    }
    
    .nav_sub {
        list-style-type: none;
        background-color: #b6bec8;
        text-align: left;
        margin: -10px 0;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    
    .nav_sub li:hover {
        cursor: pointer;
    }
    
    .nav_sub li {
        display: inline-block;
        padding: 5px 20px;
/*        margin: 0 10px;*/
    }
    
    .nav_sub_active {
        background-color: #072146;
        color: white;
    }
    
    .countries {
/*        height: 400px;*/
    }
    
    .countries-transfers {
        padding: 150px 0;
    }
    
    .date_range_wrapper {
        background: #fff;
        cursor: pointer;
        padding: 6px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 400px;
        margin: auto;
        display: inline-block;
    }
    
    .quick_stats {
        text-align: left;
        border: 1px solid gray;
        border-radius: 5px;
/*        background-color: #d9e6f2;*/
/*        padding: 10px;*/
    }
    
    .quick_stats div {
        margin: 10px;
    }
    
    .quick_stats strong {
        float: right;
    }
    
    .side_menu_wrapper {
        position: relative;
        text-align: center;
        width: inherit;
    }
    .side_menu {
/*
        border: 1px solid gray;
        border-radius: 5px;
*/
        padding: 0 10px;
        position: fixed;
        width: inherit;
    }
    
    .side_menu ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: left;
    }
</style>
