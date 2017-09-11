<template>
<div class="customer-feedback">
    <overall-app-rating></overall-app-rating>
<!--
   <div class="row">
        <div class="col-sm-12">
            <ul class="nav_sub">
                <li v-bind:class="{ nav_sub_active: showRatings}" @click="toggleViews('showRatings')">App Store Rating</li>
                <li v-bind:class="{ nav_sub_active: showReviews}" @click="toggleViews('showReviews')">App Store Reviews</li>
                <li v-bind:class="{ nav_sub_active: showNegativeReviews}" @click="toggleViews('showNegativeReviews')">Negative App Review Analysis</li>
            </ul>
        </div>
    </div>
    
    <div v-if="showRatings">
        <div class="row">
            <div class="col-sm-12">
                <overall-app-rating></overall-app-rating>
            </div>
        </div>
    </div>
    
    <div v-else-if="showReviews">
        <div class="row">
            <div class="col-sm-12">
                <app-store-reviews></app-store-reviews>
            </div>
        </div>
    </div>
    
    <div v-else-if="showNegativeReviews">
        <div class="row">
            <div class="col-sm-12">
                <reviews-negative-comments></reviews-negative-comments>
            </div>
        </div>
    </div>
-->
    
</div>
</template>

<script>
    
    import ReviewsNegativeComments from './components/reviews-negative-comments.vue'
    import AppStoreReviews from './components/app-store-reviews.vue'
    import OverallAppRating from './components/overall-app-rating.vue'
    
    export default {
        data() {
            return {
                showRatings: true,
                showReviews: false,
                showNegativeReviews: false,
            }
        },
        methods: {
            toggleViews(view){
                this.showRatings = false;
                this.showReviews = false;
                this.showNegativeReviews = false;
                
                switch(view){
                    case 'showRatings':
                        this.showRatings = true;
                        break;
                    case 'showReviews':
                        this.showReviews = true;
                        break;
                    case 'showNegativeReviews':
                        this.showNegativeReviews = true;
                        break;
                    default:
                        this.showRatings = true;
                }
            }   
        },
        components: {
            ReviewsNegativeComments,
            AppStoreReviews,
            OverallAppRating
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .row {
        margin: 10px 0 20px 0;
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
    
</style>
