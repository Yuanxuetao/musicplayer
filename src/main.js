// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import App from './App'
import router from './router'
// 引入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
// 引入移动端点击插件
import VueTouch  from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
import directives  from './plugins/directives.js'
Vue.use(directives)
import _ from 'underscore'
window._ = _
const store = new Vuex.Store({
	state:{
		mapList:[],
		player:{
			// 默认专辑页面不显示
			isShowAlbum:false,
			// 专辑数组
			album:[],
			// 专辑的下标
			index:null
		},
		audio:{
			// 默认隐藏播放器
			isShowAudio:false,
			// 播放列表
			playerList:[],
			// 默认歌曲下标
			index:null,
			// 默认歌手头像
			singerImg:'',
			// 默认播放器背景图
			playerbg:'',
			// 默认专辑下标
			albumIndex:null
		}
	},
	mutations:{
		GETALL(state,payload){
			state.mapList = payload.mapList
		},
		SHOWALBUM(state,payload){
			// 显示专辑页面
			state.player.isShowAlbum = payload.isShowAlbum
			state.player.album = payload.album
			state.player.index = payload.index
		},
		HIDEALBUM(state,payload){
			// 隐藏专辑页面
			state.player.isShowAlbum = payload.isShowAlbum
		},
		SHOWPLAYER(state,payload){
			// 显示播放器页面
			state.audio.isShowAudio = payload.isShowAudio;
			// 播放列表
			state.audio.playerList = payload.playerList;
			// 你点的是第几首歌
			state.audio.index = payload.index;
			// 作者头像
			state.audio.singerImg = payload.singerImg;
			// 专辑的背景 （播放器的背景）
			state.audio.playerbg = payload.playerbg;
			// 点击的是哪一张专辑 如果点击的是单曲 albumIndex 就为null，否则就是 0.1.2.3.4.
			state.audio.albumIndex = payload.albumIndex;
		},
		SHOWORHIDEPLAYER(state,payload){
			state.audio.isShowAudio = payload.isShowAudio;
		},
		CHANGEMUSIC(state,payload){
			// 你点的是第几首歌
			state.audio.index = payload.index;
			state.audio.playerbg = payload.playerbg;
			state.audio.singerImg = payload.singerImg;
		}
	},
	actions:{
		async GETALL({commit}){
			var arr = await fetch('../static/data.json').then(res => res.json())
			await commit('GETALL',arr)
		},
		async PULLREFESH({commit},payload){
			var arr = await fetch('../static/data.json').then(res => res.json())
			await commit('GETALL',arr);
			await payload.loaded('done')
		}
	}
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
