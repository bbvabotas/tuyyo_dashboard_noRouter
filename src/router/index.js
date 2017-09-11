import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/main_pages/Landing'
import CustomerFeedback from '@/main_pages/Customer-Feedback'
import Errors from '@/main_pages/Errors'
import Emails from '@/main_pages/Emails'
import MobileDownload from '@/main_pages/Mobile-Download'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/overview'
        },
        {
            path: '/overview',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/customer-feedback',
            name: 'Customer-Feedback',
            component: CustomerFeedback
        },
        {
            path: '/errors',
            name: 'Errors',
            component: Errors
        },
        {
            path: '/emails',
            name: 'Emails',
            component: Emails
        },
        {
            path: '/mobile_download',
            name: 'MobileDownload',
            component: MobileDownload
        }
    ]
})
