<template>
   
<div class="row">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqcloud/1.0.4/jqcloud.css">
    <div class="col-sm-12">
        <div class="row">
            <div class="col-sm-12">
                <h3>App Store Rating</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <img class="icon_size" :src="icons.iconAndroid">
                <all-time-rating></all-time-rating>
                <rating-trend></rating-trend>
            </div>
            <div class="col-sm-6">
                <img class="icon_size" :src="icons.iconIOS">
                <all-time-rating></all-time-rating>
                <rating-trend></rating-trend>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <h3>App Store Reviews</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <span><img class="icon_size icon_active" :src="icons.iconAndroid"></span>
                        <div style="display:inline-block">
                            <div><strong>Date Range:</strong></div>
                            <div id="date_range" class="date_range_wrapper"></div>
                        </div>
                        <span><img class="icon_size" :src="icons.iconIOS"></span>
                    </div>
                </div>
                
<!--
                <div><strong>Date Range:</strong></div>
                <div id="date_range" class="date_range_wrapper"></div>
                <div>
                    <span><img class="icon_size icon_active" :src="icons.iconAndroid"></span>
                    <span><img class="icon_size" :src="icons.iconIOS"></span>
                </div>
-->
               <div v-if="showReviews == false" style="margin-bottom: 100px;">Getting reviews <span class="fa fa-spinner fa-pulse fa-fw"></span></div>
            </div>
        </div>
        <div v-if="showReviews">
            <div class="row">
                <div class="col-sm-12">
                    <app-store-reviews :reviewData="reviewData"></app-store-reviews>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <reviews-negative-comments :reviewData="reviewData"></reviews-negative-comments>
                </div>
            </div>
        </div>
        
        <hr>
    </div>
</div>
    
<!--
    <div class="row">
        <div class="col-sm-12">
            <rating-trend></rating-trend>
        </div>
    </div>
-->
</template>

<script>
    import moment from 'moment'
    import papaparse from 'papaparse'
    
    import jquery from 'jquery'
    import daterangepicker from 'daterangepicker'
    
    import AllTimeRating from './all-time-rating.vue'
    import RatingTrend from './rating-trend.vue'
    import AppStoreReviews from './app-store-reviews.vue'
    import ReviewsNegativeComments from './reviews-negative-comments.vue'
    
    export default {
        mounted() {
            this.dateRange();
            this.getReviews();
        },
        data() {
            return {
                showReviews: false,
                reviewData: [],
                icons: {
                    iconAndroid: require("assets/img/icon_android.png"),
                    iconIOS: require("assets/img/icon_ios.svg")
                }
            }
        },
        methods:{
            getReviews(){
                setTimeout( () => {
                    this.reviewData.push({
                        isDisabled: false,
                        date: '2017-06-03',
                        english_subject: "It's ok",
                        english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                        spanish_subject: "Es bueno",
                        spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                        rating: 3
                    },{
                        isDisabled: false,
                        date: '2017-06-03',
                        english_subject: "good",
                        english: "' very good. .",
                        spanish_subject: "buena",
                        spanish: "' muy buena. .",
                        rating: 4
                    },{
                        isDisabled: false,
                        date: '2017-06-03',
                        english_subject: "access problem",
                        english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                        spanish_subject: "acceso problema",
                        spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                        rating: 4
                    },{
                        isDisabled: false,
                        date: '2017-06-03',
                        english_subject: "BAD!",
                        english: "Can't connect to the app",
                        spanish_subject: "MALA!",
                        spanish: "No se puede conectar a la aplicación",
                        rating: 1
                    },{
                        isDisabled: false,
                        date: '2017-06-02',
                        english: "Excellent",
                        spanish: "Excelente",
                        rating: 5
                    },{
                        isDisabled: false,
                        date: '2017-06-02',
                        english: "Why does my app not let me login?",
                        spanish: "Por qué mi aplicación no me deja ingresar?",
                        rating: 1
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "Multiple login errors",
                        spanish: "Varios errores de inicio de sesión",
                        rating: 1
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                        spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                        rating: 2
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "It saves you time and is very reliable",
                        spanish: "Te ahorra tiempo y es muy confiable",
                        rating: 5
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "Technical errors",
                        spanish: "Errores técnicos",
                        rating: 1
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                        spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                        rating: 5
                    },{
                        isDisabled: false,
                        date: '2017-06-03',
                        english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                        spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                        rating: 3
                    },{
                        isDisabled: false,
                        date: '2017-06-03',
                        english: "' very good. .",
                        spanish: "' muy buena. .",
                        rating: 4
                    },{
                        isDisabled: false,
                        date: '2017-06-03',
                        english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                        spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                        rating: 4
                    },{
                        isDisabled: false,
                        date: '2017-06-03',
                        english: "The app won't send me notifications",
                        spanish: "La aplicación no me enviará notificaciones",
                        rating: 1
                    },{
                        isDisabled: false,
                        date: '2017-06-02',
                        english: "Excellent",
                        spanish: "Excelente",
                        rating: 5
                    },{
                        isDisabled: false,
                        date: '2017-06-02',
                        english_subject: "fail",
                        english: "Constant crashes",
                        spanish_subject: "falla",
                        spanish: "Choques constantes",
                        rating: 1
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "For a couple of days it has stopped working, connection error",
                        spanish: "Desde hace un par de días ha dejado de funcionar, error de conexión",
                        rating: 1
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                        spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                        rating: 2
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "It saves you time and is very reliable",
                        spanish: "Te ahorra tiempo y es muy confiable",
                        rating: 5
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "He asks me if I give it to him and he tells me that I have gone from trying",
                        spanish: "Me pide clavé se la doy y me dice que me he pasado de intentos",
                        rating: 1
                    },{
                        isDisabled: false,
                        date: '2017-06-01',
                        english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                        spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                        rating: 5
                    }); 
                    
                    this.showReviews = true;
                }, 1000)
                              
            },
            dateRange(){
                let start = moment().subtract(7, 'days'),
                    end = moment();
                
                let this_vm = this;

                function displayDate(start, end){                    
                    jquery("#date_range").html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') + ' <span><i class="fa fa-chevron-down" style="float:right"></i></span>');
                }

                jquery("#date_range").daterangepicker({
                    opens: 'center',
                    ranges: {
                       'Today': [moment(), moment()],
                       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                       'Last 7 Days': [moment().subtract(7, 'days'), moment()],
                       'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    startDate: start,
                    endDate: end,
                    maxDate: moment(),
                    alwaysShowCalendars: true
                }, displayDate);
                
                //When the user clicks on Apply from the date range picker
                jquery('#date_range').on('apply.daterangepicker', function(ev, picker) {
                    
                    //Blank out the review data so we start fresh
                    this_vm.reviewData = [];
                    
                    //Dont show the reviews so that we see the Getting reviews loading text
                    this_vm.showReviews = false;
                    
                    //Get the reviews
                    this_vm.getReviews();
                    
                    //Display the date range in the date range picker
                    displayDate(picker.startDate, picker.endDate)
                    
                });

                displayDate(start, end);
            }
        },
        components: {
            AllTimeRating,
            RatingTrend,
            AppStoreReviews,
            ReviewsNegativeComments
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .row {
        margin: 20px 0;
    }
    
    .page_header {
        display: inline-block;
        margin: 0 20px;
        vertical-align: middle;
    }
    
    .icon_size {
        height: 60px;
        padding: 4px;
        margin: 0 10px;
    }
    
    .icon_size:hover {
        cursor: pointer;
    }
    
    .icon_active {
        border: 1px solid blue;
        border-radius: 5px;
    }
    
    .date_range_wrapper {
        background: #fff;
        cursor: pointer;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 300px;
        margin: 0 auto 20px auto;
    }
</style>
