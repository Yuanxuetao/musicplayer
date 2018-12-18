import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/musicindex',
        name:'音乐首页',
        component() {
            return import ('@/views/musicindex/index.vue')
        }
    }, {
        path: '/musicradio',
        name:'音乐电台',
        component() {
            return import ('@/views/musicradio/index.vue')
        }
    }, {
        path: '/radiozhubo',
        name:'主播电台',
        component() {
            return import ('@/views/radiozhubo/index.vue')
        }
    }, { 
    	path: '*', 
	    redirect: '/musicindex' 
	}]
})
