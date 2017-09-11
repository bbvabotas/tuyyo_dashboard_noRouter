<template>
    <div class="wrapper">
        <div>
            <div v-if="info_data.icon == 'user'" class="info_header" style="background-color:#d9e6f2">
                <i class="fa fa-user"></i> {{info_data.name}}
            </div>
            <div v-if="info_data.icon == 'repeat'" class="info_header" style="background-color:#ffe0b3">
                <i class="fa fa-child"></i> {{info_data.name}}
            </div>
            <div v-if="info_data.icon == 'exchange'" class="info_header" style="background-color:#ecd9c6">
                <i class="fa fa-exchange"></i> {{info_data.name}}
            </div>
            <div v-if="info_data.icon == 'money'" class="info_header" style="background-color:#c2f0c2">
                <i class="fa fa-money"></i> {{info_data.name}}
            </div>
            <div class="info_body">
                <div v-if="info_data.val == ''">
                    <i class="fa fa-spinner fa-pulse fa-fw"></i>
                </div>
                <div v-else>
                    <strong>{{info_data.val}}</strong>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import OverviewStatBreakdown from './overview-stat-breakdown'
    export default {
        //name: 'info-box',
        props: ['info_data']
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrapper {
        width:100%;
        border: 1px solid gray;
        border-radius: 3px;
    }
    .info_header {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        padding: 5px 0;
    }
    .info_body {
        padding: 5px 0;
    }
</style>
