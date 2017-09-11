<template>
    <div class="landing">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
        <overview v-if="authenticated"></overview>
<!--
        <div class="row">
            <div class="col-sm-12">
                <ul class="nav_sub">
                    <li v-bind:class="{ nav_sub_active: showOverview}" @click="toggleViews('showOverview')">Overview</li>
                    <li v-bind:class="{ nav_sub_active: showMetrics}" @click="toggleViews('showMetrics')">Metrics</li>
                </ul>
            </div>
        </div>
        <div v-if="showOverview">
            <overview></overview>
        </div>
        <div v-if="showMetrics">
            <div class="row">
                <div class="col-sm-12">
                    <metrics-table></metrics-table>
                </div>
            </div>
        </div>
-->
    </div>
</template>

<script>
    import Overview from './components/overview.vue'
    import MetricsTable from './components/metrics-table.vue'
    
    export default {
        
        data() {
            return {
                showOverview: true,
                showMetrics: false
            }
        },
        props: ['auth', 'authenticated'],
        methods: {
            toggleViews(view){
                if(view == 'showOverview'){
                    this.showOverview = true;
                    this.showMetrics = false;
                } else if(view == 'showMetrics'){
                    this.showOverview = false;
                    this.showMetrics = true;
                }
            }
        },
        components: {            
            MetricsTable,
            Overview
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
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 300px;
        margin:auto
    }
</style>
