<template>
<div class="row">
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
    <div class="col-sm-12">
<!--
        <div class="row">
            <div class="col-sm-12">
                <h4>Reviews</h4>
            </div>
        </div>
-->
        
        <div class="row">
            <div class="col-sm-12">
                
                <div class="row">
                    <div class="col-sm-4">
                        <div class="row">
                            <div class="col-sm-12">
                                
<!--                                Average Review Rating <br> <strong>{{ averageRatingNum }}</strong>-->
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12">
                                <h3>Average Review Rating</h3>
                                <div class="info_subtitle">
                                    Disable any of the reviews to toggle their rating effectiveness. Doing so will remove the comment's rating from the Average Review Rating to see what the score would look like without the comment. The "modified" rating will automatically update.
                                    <br><br> Example: Disable comments with a 1 or 2 rating that mention technical issues. Then you can see what your score would be if those issues wern't there.
                                </div>
                                <div>
                                    
                                    <ratings-gauge :rating_data="ratingGauge"></ratings-gauge>
                                </div>
                                <div class="row" style="margin: 20px 0">
                                    <div class="col-sm-12">
                                        <div>Disabled Reviews <br> <strong>{{ disabledNum }} / {{ reviewData.length }}</strong></div>
                                    </div>
<!--
                                    <div class="col-sm-6">
                                        <div>New Average Review Rating <br> <strong>{{ averageNumChange }}</strong></div>
                                    </div>
-->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row">
                            <div class="col-sm-6">
                                <div class="table_search_box">Search Reviews: <input style="width:200px;" type="text" name="query" v-model="query"></div>
                            </div>
                            <div class="col-sm-6">
                                <div style="text-align:right"><i class="fa fa-download fa-2x export_button" title="Download to CSV" @click="exportDataToCSV()"></i></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered comments_table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>Disable</div>
                                                <div class="header_option" @click="enableAllComments">Enable All</div>
                                            </th>
                                            <th>
                                                <div>Date</div>
                                                <div class="header_option" @click="sortDate">Sort</div>
                                            </th>
                                            <th>
                                                <div>Reviews ( {{ tableFilter.length }} showing )</div>
                                                <div>
                                                    <span class="header_option" @click="changeLanguage('english')" v-bind:class="{ highlight_language_selection: language == 'english'}">English</span>
                                                    <span> - </span>
                                                    <span class="header_option" @click="changeLanguage('spanish')" v-bind:class="{ highlight_language_selection: language == 'spanish'}">Spanish</span>
                                                </div>

                                            </th>
                                            <th>
                                                <div>Rating</div>
                                                <div class="header_option" @click="sortRating">Sort</div>
                                            </th>
                                        </tr>
                                    </thead>


                                </table>
                                <div class="comments_table_wrapper">
                                    <table class="table table-striped table-bordered table-hover comments_table">
                                        <tbody>
                                            <tr v-for="item in tableFilter" v-bind:class="{disable_row: item.isDisabled}">

                                                <td><input type="checkbox" v-model="item.isDisabled" @click="updateNumberOfDisabledComments(item)"></td>
                                                <td>{{ item.date }}</td>
                                                <td style="text-align:left">
                                                    <div v-if="language == 'english'">
                                                        <div v-if="item.english_subject != ''">
                                                            <strong>{{ item.english_subject }}</strong> <br>
                                                        </div>
                                                        {{ item.english }}
                                                    </div>
                                                    <div v-else>
                                                        <div v-if="item.spanish_subject != ''">
                                                            <strong>{{ item.spanish_subject }}</strong> <br>
                                                        </div>
                                                        {{ item.spanish }}
                                                    </div>
                                                </td>
                                                <td>{{ item.rating }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    
    import moment from 'moment'
    import papaparse from 'papaparse'
    
    import RatingsGauge from './ratings-gauge.vue'
    
    export default {
        mounted: function () {
            this.getAverageRating();
        },
        props: ['reviewData'],
        data(){
            return {
                query: '',
                language: 'english',
                ratingGauge: {
                    averageRatingNum: 0,
                    averageNumChange: 0
                },
                averageRatingNum: 0,
                disabledNum: 0,
                averageNumChange: 0
            }
        },
        computed: {
            tableFilter: function () {                
                return this.findBy(this.query)
            },
            wordFrequencyWordList: function(){
                return this.sortWordFrequencyWordList();
            }
        },
        methods: {
            exportDataToCSV(){
                console.log("Exporting table...");
                let new_csv = papaparse.unparse(this.tableFilter);
                //console.log(new_csv);
                this.downloadCSV(new_csv);
            },
            downloadCSV(csv) {
                let blob = new Blob([csv]),
                    a = window.document.createElement("a");
                
                a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
                a.download = "App_Reviews.csv";
                
                document.body.appendChild(a);
                
                a.click();
                
                document.body.removeChild(a);
            },
            sortWordFrequencyWordList: function () {
                let list = this.search_words;
                return list.sort(function(a,b){
                    if(a.word < b.word) return -1;
                    if(a.word > b.word) return 1;
                    return 0;
                });
            },
            addWordToWordFrequencyList: function(){
                this.search_words.push({isDisabled: false, word: this.addWord.toLowerCase()})  
            },
            getAverageRating: function () {
                let allData = this.reviewData,
                    temp_num = 0;

                for (let i = 0; i < allData.length; i++) {
                    temp_num += allData[i].rating;
                }

                this.averageRatingNum = (temp_num / allData.length).toFixed(1);
                this.ratingGauge.averageRatingNum = (temp_num / allData.length).toFixed(1);
            },
            updateNumberOfDisabledComments: function (item) {
                //Check to see how many items are disabled
                let allData = this.reviewData,
                    temp_disabled_num = 0;

                for (let i = 0; i < allData.length; i++) {
                    if (allData[i].isDisabled) {
                        temp_disabled_num++;
                    }
                }

                //Update the number of disabled items
                this.disabledNum = temp_disabled_num;

                this.updateAverageRatingChange();
            },
            updateAverageRatingChange: function () {

                let allData = this.reviewData,
                    temp_change_num = 0;

                temp_change_num = 0;
                
                for (let i = 0; i < allData.length; i++) {
                    if (!allData[i].isDisabled) {
                        temp_change_num += allData[i].rating;
                    }
                }
                
                if(this.disabledNum == 0){
                    this.averageNumChange = 0;
                    this.ratingGauge.averageNumChange = 0;
                } else {
                    
                    temp_change_num = (temp_change_num / (allData.length - this.disabledNum)).toFixed(1);

                    this.averageNumChange = temp_change_num;
                    this.ratingGauge.averageNumChange = temp_change_num;
                }
                
            },
            enableAllComments: function () {

                //Change all of the items to enabled
                let allData = this.reviewData;
                for (let i = 0; i < allData.length; i++) {
                    allData[i].isDisabled = false;
                }

                //Update the number of disabled items
                this.disabledNum = 0;

                this.averageNumChange = 0;
                this.ratingGauge.averageNumChange = 0;
            },
            sortRating: function(){
                let list = this.reviewData;
                return list.sort(function(a,b){
                    return a.rating - b.rating;
                });
            },
            sortDate: function(){
                let list = this.reviewData;
                return list.sort(function(a,b){
                    return new Date(a.date) - new Date(b.date); 
                });
            },
            findBy: function (value) {
                let search_regex = new RegExp(value, "i"),
                    search_language = this.language,
                    list = this.reviewData;

                return list.filter(function (item) {

                    //Update the table rows with the word that is being searched for in the search box
                    item.date = moment(item.date).format('MMM-DD-YYYY');
                    return item[search_language].match(search_regex);                                                
                });
            },
            changeLanguage: function(this_language){
                //console.log(this_language);
                if(this_language == 'english'){
                    this.language = 'english';
                } else {
                    this.language = 'spanish';
                }
            }
        },
        components: {
            RatingsGauge
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .comments_table_wrapper {
        height: 520px;
        overflow-y: scroll;
    }

    .comments_table {
        width: 100%;
        margin: 0;
    }

    .comments_table th {
        text-align: center;
    }

    .comments_table th:nth-child(1) {
        width: 70px;
    }

    .comments_table th:nth-child(2) {
        width: 70px;
    }

    .comments_table th:nth-child(4) {
        width: 65px;
    }

    .comments_table td:nth-child(1) {
        width: 70px;
    }

    .comments_table td:nth-child(2) {
        width: 70px;
    }

    .comments_table td:nth-child(4) {
        width: 65px;
    }

    .comment_table_info {
        width: 100%;
    }

    .comment_table_info th {
        width: 50%;
        text-align: center;
    }

    .comment_info {
        width: 33%;
    }
    
    .table_search_box {
        width: 100%;
        text-align: left;
        font-size: 0.8em;
        margin: 10px 0;
    }
    
    .table_search_box input {
        border: 1px solid gray;
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

    .disable_row {
        text-decoration: line-through;
        color: lightgray;
    }

    .info_subtitle {
        font-size: 0.8em;
    }

    .highlight_language_selection {
        font-weight: bold;
        text-transform: uppercase;;
    }
    
    .export_button {
        text-align: right;
        padding: 0 10px;
    }
    
    .export_button:hover {
        cursor: pointer;
    }
    
    .page_header {
        display: inline-block;
        margin: 0 20px;
        vertical-align: middle;
    }
   
    
    
</style>
