<template>
<div class="row">
    <div class="col-sm-12">
        <div class="row">
            <div class="col-sm-12" style="text-align:center;">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>
                                    <span>{{ NumberOfOneStarReviews + NumberOfTwoStarReviews }}</span> out of
                                    <span class="a_total_review_count">{{ reviewData.length }}</span> reviews are negative
                                </h4>
                                <div class="progress" style="margin:20px auto; width:50%; height:50px; background-color:#e6e6e6">
                                    <div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" style="width:45%; font-size:24px; font-weight:bold; padding:16px 0">
                                        {{ (((NumberOfOneStarReviews + NumberOfTwoStarReviews) / reviewData.length) * 100).toFixed(0) }}%
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div><img :src="images.oneStar" class="star_img"></div>
                                <br>
                                <div>
                                    <div class="red neg_circle_sm">{{ ((NumberOfOneStarReviews / reviewData.length) * 100).toFixed(0) }}%</div>
                                    <br><br>
                                    <div>
                                        <span style="font-weight:bold">{{ NumberOfOneStarReviews }}</span> out of a total of
                                        <span style="font-weight:bold">{{ reviewData.length }}</span> reviews are one star
                                    </div>
                                </div>
                                <br>
                                <div><i>word frequency with how many reviews have that word</i></div>
                                <word-frequency-chart class="word_frequency_chart" :chart_data="chart_data.one_star"></word-frequency-chart>
                            </div>
                            <div class="col-sm-6">
                                <div><img :src="images.twoStar" class="star_img"></div>
                                <br>
                                <div>
                                    <div class="orange neg_circle_sm">{{ ((NumberOfTwoStarReviews / reviewData.length) * 100).toFixed(0) }}%</div>
                                    <br><br>
                                    <div>
                                        <span style="font-weight:bold">{{ NumberOfTwoStarReviews }}</span> out of a total of
                                        <span style="font-weight:bold">{{ reviewData.length }}</span> reviews are two stars
                                    </div>
                                </div>
                                <br>
                                <div><i>word frequency with how many reviews have that word</i></div>
                                <word-frequency-chart class="word_frequency_chart" :chart_data="chart_data.two_star"></word-frequency-chart>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="word_frequency_table_wrapper">
                                    <h4>Edit words to search for in the word frequency</h4>
                                    <div class="info_subtitle">
                                        Disable a word to remove it from the word frequency.
                                        <br><br> Adding a new word will include variations of the word and is case in-sensitive.
                                        <br> Example: Searching for the word "log" will find a review with the word "log", "Log", "LoG", logs", "login", "logon", "logged", etc.
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <table class="table table-bordered word_frequency_table">
                                                <thead>
                                                    <tr>
                                                        <td>Disable</td>
                                                        <td style="text-align:center">Word (count)</td>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div class="word_frequency_word_wrapper">
                                                <table class="table table-bordered table-striped word_frequency_table">
                                                    <tbody>
                                                        <tr v-for="word in wordFrequencyWordList" v-bind:class="{ disable_row: word.isDisabled }">
                                                            <td><input type="checkbox" v-model="word.isDisabled"></td>
                                                            <td>{{ word.word }} ({{word.frequency_count}})</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="col-sm-6" style="position:relative; height:250px;">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div>Add a word:</div>
                                                    <br>
                                                    <input type="text" style="width:50%; border: 1px solid gray" v-model="addWord">
                                                    <button class="btn btn-default" @click="addWordToWordFrequencyList">Add</button>
                                                </div>


                                            </div>

                                            <div class="row" style="position:absolute; bottom:0; width:100%;">
                                                <div class="col-sm-12">
                                                    <button class="btn btn-default" @click="applyWordUpdate">Apply</button>
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
    </div>
</div>
</template>

<script>
    import moment from 'moment'
    import papaparse from 'papaparse'
    
    import wordFrequencyChart from './word-frequency-chart.vue'
    
    export default {
        mounted: function () {
            this.findUniqueSearchWords();
        },
        props: ['reviewData'],
        data(){
            return {
                images: {
                    oneStar: require("assets/img/star_1.png"),
                    twoStar: require("assets/img/star_2.png")
                },
                language: 'english',
                search_words: [],
                chart_data: {
                    one_star: {
                        loading_data: true,
                        rating: 1,
                        categories: [],
                        data: []
                    },
                    two_star: {
                        loading_data: true,
                        rating: 2,
                        categories: [],
                        data: []
                    } 
                },
                addWord: '',
                NumberOfOneStarReviews: 0,
                NumberOfTwoStarReviews: 0
                
            }
        },
        computed: {
            wordFrequencyWordList: function(){
                return this.sortWordFrequencyWordList();
            }
        },
        methods: {
            findUniqueSearchWords(){
                
                let i = 0, j = 0,
                    pattern = /\w+/g,
                    review_string = '',
                    unique_words = [],
                    words_star_one = [],
                    words_star_two = [],
                    compiled_words = '';
                
                let exclusion_words = [
                    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                    't', 'u', 'v', 'w', 'x', 'y', 'z',
                    'bad', 'how', 'and', 'ask', 'asks', 'couple', 'days', 'day', 'do', 'does', "doesn't", 'exact', 'for',
                    'from', 'give', 'gone', 'has', 'have', 'he', 'him', 'i', 'if', 'is', 'it', 'leave', 'me', 'neither', 'nor',
                    'of', 'only', 'possible', 's', 'see', 'sorry', 'specifying', 'stopped', 'talk', 'tells', 'that', 'the', 'to',
                    'very', 'what', 'who', 'without', 'you', 'ago', 'are', 'back', 'fast', 'go', 'going', 'know', 'like', 'months',
                    'most', 'my', 'not', 'opened', 'previous', 'so', 'sometimes', 'then', 'until', 'useful', 'was', 'why', 'would',
                    'lately', 'can', 'on', 'detects', 'with', 'advises', 'thought', 'happened', 'but', 'friend', 'told', 'happens',
                    'her', 'too', 'good', 'create', 'enter', 'entered', 'let', 'in', 'end', 'since', 'blocked', 'try', 'print',
                    'excellent', 'working', 'saves', 'time', 'reliable', 'trying', 'thing', 'missing', 'this', 'little', 'hole',
                    'make', 'everything', 'else', 'great'
                ]
                
                //Combine all of the review's text for one and two star rating
                for(i = 0; i < this.reviewData.length; i++){
                    if(this.reviewData[i].rating < 3){
                        review_string += this.reviewData[i].english.toLowerCase() + ' ';
                    }   
                }
                
                //Separate them into individual words
                compiled_words = review_string.match( pattern );
                
                //Get the unique words from the compiled words so there are no duplicates
                for(i = 0; i < compiled_words.length; i++){
                    
                    //If the word is not in the exclusion list or already in the unique words, then add it
                    if(exclusion_words.indexOf(compiled_words[i]) == -1 && unique_words.indexOf(compiled_words[i]) == -1){
                        unique_words.push(compiled_words[i]);
                        this.search_words.push({
                            isDisabled: false,
                            word: compiled_words[i],
                            frequency_count: 0
                        })
                    }
                }                
                
                this.calculateWordFrequencyTotals();
            },
            calculateWordFrequencyTotals(){
                let temp_pattern,
                    i = 0, j = 0;
                
                for(i = 0; i < this.search_words.length; i++){
                    this.search_words[i].frequency_count = 0;
                }
                
                //Go through the reviews with a one or two rating
                for(i = 0; i < this.reviewData.length; i++){
                    
                    if(this.reviewData[i].rating < 3){
                        
                        //Go through all of the search words to see if any of them are in the review
                        for(j = 0; j < this.search_words.length; j++){
                            temp_pattern = new RegExp(this.search_words[j].word, 'i');

                            if(this.reviewData[i].english.match(temp_pattern)){
                                this.search_words[j].frequency_count++
                            }
                        }
                    }
                }
                
                //console.log(this.search_words); 
                
                this.calculateWordFrequency();
            },
            calculateWordFrequency(){
                let i = 0, j = 0, k = 0,
                    can_add = true,
                    temp_pattern;
                
                let temp_word_frequency = {
                    one_star: [],
                    two_star: []
                }
                
                this.NumberOfOneStarReviews = 0;
                this.NumberOfTwoStarReviews = 0;
                
                //Go through the reviews with a one or two rating
                for(i = 0; i < this.reviewData.length; i++){
                    
                    if(this.reviewData[i].rating == 1){
                        this.NumberOfOneStarReviews++
                
                        //Go through all of the search words to see if any of them are in the review
                        for(j = 0; j < this.search_words.length; j++){
                            
                            if(!this.search_words[j].isDisabled){
                                temp_pattern = new RegExp(this.search_words[j].word, 'i');

                                if(this.reviewData[i].english.match(temp_pattern)){

                                    can_add = true;

                                    //Check to see if this word is already pushed into the word frequency
                                    for(k = 0; k < temp_word_frequency.one_star.length; k++){
                                        if(temp_word_frequency.one_star[k].word == this.search_words[j].word){

                                            temp_word_frequency.one_star[k].frequency++

                                            can_add = false;
                                            break;
                                        }
                                    }

                                    if(can_add){
                                        temp_word_frequency.one_star.push({
                                            word: this.search_words[j].word,
                                            frequency: 1
                                        })
                                    }

                                }
                            }
                        }
                        
                    } else if(this.reviewData[i].rating == 2){
                        this.NumberOfTwoStarReviews++
                        
                        //Go through all of the search words to see if any of them are in the review
                        for(j = 0; j < this.search_words.length; j++){
                            
                            if(!this.search_words[j].isDisabled){
                                temp_pattern = new RegExp(this.search_words[j].word, 'i');

                                if(this.reviewData[i].english.match(temp_pattern)){

                                    can_add = true;

                                    //Check to see if this word is already pushed into the word frequency
                                    for(k = 0; k < temp_word_frequency.two_star.length; k++){
                                        if(temp_word_frequency.two_star[k].word == this.search_words[j].word){

                                            temp_word_frequency.two_star[k].frequency++

                                            can_add = false;
                                            break;
                                        }
                                    }

                                    if(can_add){
                                        temp_word_frequency.two_star.push({
                                            word: this.search_words[j].word,
                                            frequency: 1
                                        })
                                    }

                                }
                            }
                        }
                    }
                }
                this.prepFrequencyForHighcharts(temp_word_frequency);
            },
            prepFrequencyForHighcharts(words){
                let new_categories = [],
                    new_data = [],
                    temp_total = 0                
                
                words.one_star.sort(function(a, b){
                    return b.frequency - a.frequency
                })
                words.two_star.sort(function(a, b){
                    return b.frequency - a.frequency
                })
                
                console.log(words);
                
                if(words.one_star.length > 5){
                    words.one_star = words.one_star.slice(0, 5)    
                } else if(words.one_star.length < 5){
                    let temp_num = 5 - words.one_star.length;
                    
                    for(let i = 0; i < temp_num; i++){
                        words.one_star.push({
                            word: '',
                            frequency: 0
                        })
                    }
                }
                
                if(words.two_star.length > 5){
                    words.two_star = words.two_star.slice(0, 5)    
                } else if(words.two_star.length < 5){
                    let temp_num = 5 - words.two_star.length;
                    
                    for(let i = 0; i < temp_num; i++){
                        words.two_star.push({
                            word: '',
                            frequency: 0
                        })
                    }
                }
                
                
                
                this.chart_data.one_star.categories.push('Total')
                this.chart_data.one_star.data.push(this.NumberOfOneStarReviews)
                
                this.chart_data.two_star.categories.push('Total')
                this.chart_data.two_star.data.push(this.NumberOfTwoStarReviews)
                
                for(let i = 0; i < words.two_star.length; i++){
                    this.chart_data.one_star.categories.push(words.one_star[i].word)
                    this.chart_data.one_star.data.push(words.one_star[i].frequency)
                }
                
                for(let i = 0; i < words.two_star.length; i++){
                    this.chart_data.two_star.categories.push(words.two_star[i].word)
                    this.chart_data.two_star.data.push(words.two_star[i].frequency)
                }
                
                this.chart_data.one_star.loading_data = false;
                this.chart_data.two_star.loading_data = false;
                
                //console.log(this.chart_data);
            },
            sortWordFrequencyWordList() {
                let list = this.search_words;
                return list.sort(function(a,b){
                    if(a.word < b.word) return -1;
                    if(a.word > b.word) return 1;
                    return 0;
                });
            },
            addWordToWordFrequencyList(){
                this.search_words.push({isDisabled: false, word: this.addWord.toLowerCase(), frequency_count: 0})
                
                //Now that the new word is added, recalculate the word frequency with this new word
                this.chart_data = {
                    one_star: {
                        loading_data: true,
                        categories: [],
                        data: []
                    },
                    two_star: {
                        loading_data: true,
                        categories: [],
                        data: []
                    } 
                };
                
                this.calculateWordFrequencyTotals();                
            },
            applyWordUpdate(){
                this.chart_data = {
                    one_star: {
                        loading_data: true,
                        categories: [],
                        data: []
                    },
                    two_star: {
                        loading_data: true,
                        categories: [],
                        data: []
                    } 
                };
                
                this.calculateWordFrequencyTotals(); 
            }
        },
        components: {
            wordFrequencyChart
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .word_frequency_table_wrapper {
        width: 50%;
        margin: auto;
    }

    .word_frequency_table {
        margin: 0;
/*        width: 300px;*/
    }

    .word_frequency_table td:nth-child(1){
        width: 70px;
    }
    
    .word_frequency_table td:nth-child(2){
        text-align: left;
        padding-left: 20px;
    }

    .word_frequency_word_wrapper {
        height: 208px;
        border-bottom: 1px solid #e6e6e6;
        overflow-y: scroll;
    }
    
    .word_frequency_add_word {
        padding: 30px 0;
/*
        border: 1px solid gray;
        border-radius: 5px;
*/
    }
    
    .word_frequency_apply {
        margin-top: 10px;
/*        text-align: right;*/
    }
    
    .avg_score_header {
        font-size: 1.5em;
    }

    .star_img {
        height: 20px;
    }

    .frequency_chart {
        height: 150px;
        width: 100%;
    }

    .info_subtitle {
        font-size: 0.8em;
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
    
    .disable_row {
        text-decoration: line-through;
        color: lightgray;
    }
    
    .word_frequency_chart {
        height: 200px;
    }
</style>
