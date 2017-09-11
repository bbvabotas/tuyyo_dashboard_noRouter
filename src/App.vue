<template>
<div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>

<!--
    <div class="row tuyyo_header">
        <div class="col-sm-4" style="text-align:left;"><img :src="images.logoSrc" /></div>
        <div class="col-sm-4"><img :src="images.logoTuyyo"></div>
        <div class="col-sm-4"></div>
    </div>
-->
    <div id="top_nav">
        <ul class="nav_main">
            <li>
                <div><img :src="images.logoSrc" /></div>
            </li>
            <li>
                <div><img :src="images.logoTuyyo"></div>
            </li>
            <li>
                <div v-bind:class="{ active_page: showOverview }" @click="changePage('showOverview')"><i class="fa fa-tachometer fa-2x"></i><br>Dashboard</div>
            </li>
            <li>
                <div v-bind:class="{ active_page: showMobileDownload }" @click="changePage('showMobileDownload')"><i class="fa fa-mobile fa-2x"></i><br>Mobile Download</div>
            </li>
            <li style="float:right">
                <div @click="logout"><i><img style="border-radius:50%" :src="images.profilePic"></i><br>Logout</div>
            </li>
        </ul>
    </div>
    <div>
        <div v-if="showOverview">
            <overview></overview>
        </div>
        <div v-if="showMobileDownload">
            <mobile-download></mobile-download>    
        </div>

    </div>

</div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    
    import axios from 'axios'

    import Overview from './main_pages/components/overview.vue'
    import MobileDownload from './main_pages/Mobile-Download.vue'

    export default {
        name: 'app',
        mounted(){
            let this_vm = this
            
            //Get the profile pic
            setTimeout(()=>{
                axios.get('/getProfile')
                    .then((response)=>{
                    this_vm.images.profilePic = response.data
                })
            }, 1000)
        },
        data() {
            return {
                images: {
                    logoSrc: require("assets/img/logo.png"),
                    logoTuyyo: require("assets/img/tuyyo_logo.png"),
                    profilePic: ''
                },
                showOverview: true,
                showMobileDownload: false
            }
        },
        methods: {
            changePage(page){
                this.showOverview = false
                this.showMobileDownload = false

                this[page] = true
            },
            logout(){
                window.location = "/logout"
            }
        },
        components: {
            Overview,
            MobileDownload
        }
    }

</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: white;
    }
    
    .row {
        margin: 0;
    }

    img {
        height: 40px;
    }
    
    .tuyyo_header {
        background-color: #072146;
/*        height: 60px;*/
        padding: 10px;
    }

/*
    .nav_main {
        position: fixed;
        width: 100%;
        z-index: 100;
        margin-top: -60px;
    }
*/
    .nav_main a {
        text-decoration: none;
    }

    .nav_main {
        list-style-type: none;
        background-color: #072146;
        text-align: left;
    }

    .nav_main li {
        display: inline-block;
/*        color: white;*/
        color: #337ab7;
        text-align: center;
        vertical-align: middle;
        padding: 10px 15px;
    }
    
    .nav_main li:hover {
        cursor: pointer;
        color: white;
    }

    .active_page {
        color: white;
    }

</style>
