<template>
    <div class=live_ticker_wrapper>
        <div style="padding: 10px 0"><strong>Today</strong><div style="font-size:0.8em; font-style: italic">live</div></div>
        <div class="live_ticker">
            <div style="white-space: nowrap;">
                <div class="ticker_animation">
                    <div class="ticker_item registered_customers_width">
                        <i class="fa fa-user"></i> <strong>New Registrations: </strong>{{ liveRegisteredCustomersAnimated }}
                    </div>
                    <div class="ticker_item active_customers_width">
                        <i class="fa fa-child"></i> <strong>Logins: </strong>{{ liveLoginsAnimated }}
                    </div>
                    <div class="ticker_item transfers_width">
                        <i class="fa fa-exchange"></i> <strong>Transfers: </strong>{{liveTransfersAnimated}}
                    </div>
                    <div class="ticker_item amount_width">
                        <i class="fa fa-money"></i> <strong>Transfer Amount: </strong>${{liveTransferAmountAnimated}}
                    </div>
                    <div class="ticker_item registered_customers_width">
                        <i class="fa fa-user"></i> <strong>New Registrations: </strong>{{ liveRegisteredCustomersAnimated }}
                    </div>
                    <div class="ticker_item active_customers_width">
                        <i class="fa fa-child"></i> <strong>Logins: </strong>{{ liveLoginsAnimated }}
                    </div>
                    <div class="ticker_item transfers_width">
                        <i class="fa fa-exchange"></i> <strong>Transfers: </strong>{{liveTransfersAnimated}}
                    </div>
                    <div class="ticker_item amount_width">
                        <i class="fa fa-money"></i> <strong>Transfer Amount: </strong>${{liveTransferAmountAnimated}}
                    </div>
                </div>
            </div>
        </div> 
    </div>
    
</template>

<script>
    import TWEEN from '@tweenjs/tween.js'
    import moment from 'moment'
    
    export default {
        //props: ['rating_data'],
        mounted(){
            this.initialSetup();  
        },
        data() {
            return {                
                liveTransfers: 2,
                liveTransfersAnimated: 2,
                liveTransferAmount: 50,
                liveTransferAmountAnimated: 50,
                liveRegisteredCustomers: 50,
                liveRegisteredCustomersAnimated: 50,
                liveLogins: 132,
                liveLoginsAnimated: 132
            }
        },
        watch: {
            liveTransferAmount: function(newValue, oldValue) {
                var vm = this
                var animationFrame
                
                function animate (time) {
                    TWEEN.update(time)
                    animationFrame = requestAnimationFrame(animate)
                }
                
                new TWEEN.Tween({ tweeningNumber: oldValue })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: newValue }, 500)
                .onUpdate(function () {
                    vm.liveTransferAmountAnimated = this.tweeningNumber.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                    vm.liveTransferAmountAnimated = vm.convertNumberToHaveCommas(newValue)
                })
                .start()
                
                animationFrame = requestAnimationFrame(animate)
                
            },
            liveTransfers: function(newValue, oldValue) {
                var vm = this
                var animationFrame
                
                function animate (time) {
                    TWEEN.update(time)
                    animationFrame = requestAnimationFrame(animate)
                }
                
                new TWEEN.Tween({ tweeningNumber: oldValue })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: newValue }, 500)
                .onUpdate(function () {
                    vm.liveTransfersAnimated = this.tweeningNumber.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                    vm.liveTransfersAnimated = vm.convertNumberToHaveCommas(newValue)
                })
                .start()
                
                animationFrame = requestAnimationFrame(animate)
            },
            liveRegisteredCustomers: function(newValue, oldValue) {
                var vm = this
                var animationFrame
                
                function animate (time) {
                    TWEEN.update(time)
                    animationFrame = requestAnimationFrame(animate)
                }
                
                new TWEEN.Tween({ tweeningNumber: oldValue })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: newValue }, 500)
                .onUpdate(function () {
                    vm.liveRegisteredCustomersAnimated = this.tweeningNumber.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                    vm.liveRegisteredCustomersAnimated = vm.convertNumberToHaveCommas(newValue)
                })
                .start()
                
                animationFrame = requestAnimationFrame(animate)
            },
            liveLogins: function(newValue, oldValue) {
                var vm = this
                var animationFrame
                
                function animate (time) {
                    TWEEN.update(time)
                    animationFrame = requestAnimationFrame(animate)
                }
                
                new TWEEN.Tween({ tweeningNumber: oldValue })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: newValue }, 500)
                .onUpdate(function () {
                    vm.liveLoginsAnimated = this.tweeningNumber.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                    vm.liveLoginsAnimated = vm.convertNumberToHaveCommas(newValue)
                })
                .start()
                
                animationFrame = requestAnimationFrame(animate)
            }
        },
        methods: {
            initialSetup(){
                let start = moment().subtract(8, 'days'),
                    end = moment().subtract(1, 'days')
                
                let temp_start = moment(start).format('YYYY-MM-DD')
                let temp_end = moment(end).format('YYYY-MM-DD')
                
                let new_start = (moment(temp_start).startOf('day').valueOf() / 1000).toFixed(0) + 's'
                let new_end = (moment(temp_end).endOf('day').valueOf() / 1000).toFixed(0) + 's'
                
                this.liveData(new_start, new_end)
            },
            liveData(start, end){
                //let rnd_time = 100;
                //console.log("time is between " + start + " and " + end)
                let this_vm = this
                
                setInterval(()=>{
                    
                    this.liveTransfers += 13
                    this.liveTransferAmount += 532
                    this.liveRegisteredCustomers += 2
                    this.liveActiveCustomers += 15

//                axios.get('/registrations?start=' + start + '&end=' + end) //Get registration data
//                .then(response => {
//                    if(response.data.length > 0){
//                        this_vm.liveRegisteredCustomers = response.data[0].count;
//                        
//                    } else {
//                        this_vm.liveRegisteredCustomers = 0;
//                    }
//                    
//                    
//                    axios.get('/active?start=' + start + '&end=' + end) //Get active customer data
//                    .then(response => {
//                        if(response.data.length > 0){
//                            this_vm.liveActiveCustomers = response.data[0].count;
//                        } else {
//                            
//                            this_vm.liveActiveCustomers = 0;
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
//                            this_vm.liveTransfers = atm_pickup + cash_pickup + bank_transfer;
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
//                                this_vm.liveTransferAmount = (atm_pickup + cash_pickup + bank_transfer).toFixed(0);
//                                
//                                console.log(this_vm.info_box_data.amountTransferedData);
//                                
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
                }, 3000);
            },
            convertNumberToHaveCommas(num){
                let new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                return new_num
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .live_ticker_wrapper {
        width: 100%;
        text-align: center;
    }
    
    .live_ticker {
        margin: auto;
        width: 50%;
        overflow: hidden;
    }
    
    .ticker_item {
        display: inline-block;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    
    .registered_customers_width {
        width: 250px;
    }
    
    .active_customers_width {
        width: 250px;
    }
    
    .transfers_width {
        width: 150px;
    }
    
    .amount_width {
        width: 250px;
    }
    
    @keyframes example {
        from {
            left: 0;
        }
        to {
            left: -916px;
        }
    }
    
    .ticker_animation {
        position: relative;
        animation-name: example;
        animation-duration: 19s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
</style>
