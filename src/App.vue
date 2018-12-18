<style lang='stylus' scoped>
    header{
        width: 100%;height: 40px;background: #C20C0C;position: relative;
        ul{
            overflow: hidden;list-style: none;width: 65%;margin: 0 auto;
            li{
                width: 33.33%;font-size: 26px;height: 40px;line-height: 40px;text-align: center;float: left;color: #fff;
                &.cur{
                    background: #9B0909;
                }
            }
        }
        span.icon-zhuanjiguangpan{
            position: absolute;top: 0;right: 5px;color: #fff;text-align: center;
            width: 40px;height: 40px;line-height: 40px;font-size: 26px;
        }
        span.icon-caidan{
            position: absolute;top: 0;left: 5px;color: #fff;text-align: center;
            width: 40px;height: 40px;line-height: 40px;font-size: 26px;
        }
    }

</style>
<template>
    <pull-to :top-load-method="refresh" v-height>
        <div id="app">
            <header>
                <span class="iconfont icon-caidan"></span>
                <ul>
                    <v-touch tag="li" v-for='item in tabNav' :class="[item.className,{cur:$route.name == item.title}]" class="iconfont"  @tap="routerGo(item.url)" :key='item.id'></v-touch>
                </ul>
                <v-touch tag='span' class="iconfont icon-zhuanjiguangpan" @tap='showPlayer'></v-touch>
            </header>
            <transition name='haha'>
                <router-view/>
            </transition>
            <transition name='haha'>
               <album :player='player'></album>
            </transition>
            <transition name='haha' >
               <audioplayer :audio='audio'></audioplayer>
            </transition>
        </div>
    </pull-to>
</template>
<script>
import album from './components/album.vue'
import audioplayer from './components/audioplayer.vue'
import VuePullRefresh from 'vue-pull-refresh';
import PullTo from 'vue-pull-to'
export default { 
    data() {
        return {
            tabNav:[{
                title:'音乐首页',
                className:'icon-wangyiyunyinlezizhi-copy',
                url:'/musicindex'
            },{
                title:'音乐电台',
                className:'icon-diantai',
                url:'/musicradio'
            },{
                title:'主播电台',
                className:'icon-music',
                url:'/radiozhubo'
            }]
        }
    },

    computed:{
        player(){
            return this.$store.state.player
        },
        audio(){
            return this.$store.state.audio
        }
    },
    methods:{
        routerGo(url){
            this.$router.push({path:url})
        },
        showPlayer(){
            this.$store.commit('SHOWORHIDEPLAYER',{
                isShowAudio: true
            })
        },
        refresh(loaded) {
            console.log('可以请求数据');
            this.$store.dispatch("PULLREFESH",{
                loaded
            })
        }
    },
    components:{
        album,audioplayer,VuePullRefresh,PullTo
    }

}

</script>
