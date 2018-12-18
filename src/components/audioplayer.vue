<style lang='stylus' scoped src='./audioplayer.styl'></style>
<template>
    <div class="audioPlayerPage" v-show='audio.isShowAudio' :style="{background:`#2c3490 url(${audio.playerbg}) 0 0 / 100% 100% no-repeat`}" v-height>
        <div class="shade" :class='{cur : isShowDrawer}'></div>
        <header>
            <v-touch tag='span' class="iconfont icon-houtui1" @tap='goback'></v-touch>
            {{typeof audio.index == "number" ? audio.playerList[audio.index].musicName : '播放器'}}
        </header>
        <span v-if='typeof audio.index == "number"'>
			<audio :src="audio.playerList[audio.index].musicUrl" autoplay @timeupdate='play'></audio> 
		</span>
        <div class="content" v-height='200'>
            <div class="cd">
                <div class="cd-mine">
                    <img src="../../static/img/cd-mine.png" v-if='typeof audio.index == "number"'>
                    <img src="../../static/img/cd.png" v-else='typeof audio.index == "number"'>
                </div>
                <div class="singerImg" :class='{cur : isPlay}'>
                    <img :src="audio.singerImg" v-if='audio.singerImg'>
                </div>
            </div>
            <div class="swith" :class='{cur : isPlay}'>
                <img src="../../static/img/swith.png" alt="">
            </div>
        </div>
        <div class="setting">
            <ul>
                <li class="iconfont icon-xin1"></li>
                <li class="iconfont icon-icon--"></li>
                <li class="iconfont icon-BAI-pinglun"></li>
                <li class="iconfont icon-more-vert"></li>
            </ul>
        </div>
        <div class="progressBar">
            <div class="currentTime">{{currentTime | zhuanhuan}}</div>
            <div class="progress">
                <span class="durationBar" @click='goTime($event)'>
                    <span class="currentTimeBar" :style='{width : currentTime / duration * 100 + "%"}'></span>
                </span>
            </div>
            <div class="duration">{{duration | zhuanhuan}}</div>
        </div>
        <div class="controller">
            <span class="playstate iconfont " @click='changeplayState' :class="[{'icon-xunhuan':playState == 'all'},{'icon-shunxubofang':playState == 'order'},{'icon-bofangye-caozuolan-suijibofang':playState == 'random'},{'icon-singlecycle':playState == 'once'}]"></span>
            <ul>
                <li class="iconfont icon-previous" @click='goPrev'></li>
                <li class="iconfont" @click='pause_play' :class="[isPlay ? 'icon-pause-20' : 'icon-bofang']"></li>
                <li class="iconfont icon-next" @click='goNext'></li>
            </ul>
            <span class="iconfont icon-zhankaicaidan" @click='showDrawer'></span>
        </div>
        <div class="drawer" :class="{cur : isShowDrawer}">
            <!-- 抽屉 里面是 这张专辑的列表 -->
            <ul>
                <li v-for='(item,index) in audio.playerList ' class="ovh" :class='{cur : index == audio.index }' @click='playList(index)'>
                    <!-- 是否显示喇叭 是看看index 是不是等于 播放列表中index序号就行了！！ -->
                    <span class="fl iconfont icon-laba" v-if='index == audio.index '></span>
                    <p class="fl">
                        <span class="musicName">{{item.musicName}}</span>
                        <span class="musicSinger"> - {{item.musicSinger}}</span>
                    </p>
                    <span class="iconfont icon-bofang fl"></span>
                </li>
            </ul>
            <div class="close" @click='close'>关闭</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['audio'],
    data() {
        return {
            currentTime: 0, // 当前播放时间
            duration: 0, // 总播放时间
            isPlay: true,// 由于audio标签有autoplay 所以这里默认是播放的状态
            isShowDrawer: false, // 是否显示抽屉
            playState : 'all',// 播放模式 
            // all 全曲循环
            // order 顺序播放
            // random 随机播放
            // once 单曲循环
            randomList:[],
            // 随机循环时候 下标默认是0
            randomIndex: 0
        }
    },
    filters:{
        zhuanhuan(s) {
            // 将秒转换成 0:00 的格式
            // 网址 https://blog.csdn.net/chritina/article/details/69397810
            var t;
            if(s > -1){
                var min = Math.floor(s/60) % 60;
                var sec = s % 60;
                if(min < 10){t += "0";}
                t = min + ":";
                if(sec < 10){t += "0";}
                t += sec | 0;
            }
            return t;
        }
    },
    computed:{
        // 当前专辑的播放序号
        audioIndex(){
            return this.$store.state.audio.index
        }
    },
    methods: {
        goback() {
            this.$store.commit('SHOWORHIDEPLAYER', {
                isShowAudio: false
            })
        },
        play(){
            var vm = this;
            // 网址 ：http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp
            // 通过api 得到 这首歌的总时间个当前播放的时间
            this.currentTime = $('audio')[0].currentTime
            this.duration = $('audio')[0].duration
            if(!$('audio')[0].paused){
                this.isPlay = true
            }else{
                this.isPlay = false
            }
            // 在这首歌播放完毕的时候（ended）  根据 播放模式 进行下一首歌的播放 
            if($('audio')[0].ended){
                if(this.playState == 'all'){
                    this.goNext()
                }else if(this.playState == 'order'){
                    if(this.audioIndex >= this.audio.playerList.length - 1){
                        $('audio')[0].pause()
                    }else {
                        this.goNext()
                    }
                }else if(this.playState == 'once'){
                    this.changeMusic(this.audioIndex)
                    $('audio')[0].load();
                }else if(this.playState == 'random'){
                    // 根据酷狗逻辑 它并不是 随机一首歌 而是将播放列表的数组随机打乱 然后再根据打乱以后的数组的顺序播放
                    this.goNext()
                }
            }
        },
        changeplayState(){
            // 改变播放模式
            if(this.playState == 'all'){
                this.playState = 'order'
            }else if(this.playState == 'order'){
                this.playState = 'random'
                // 在这里设置备份一个随机的数组
                this.randomList = _.shuffle(this.audio.playerList)
                // 同时将随机的下标设置为当前播放的下标
                this.randomIndex = this.audioIndex
            }else if(this.playState == 'random'){
                this.playState = 'once'
            }else if(this.playState == 'once'){
                this.playState = 'all'
            }
        },
        goTime(event){
            // 点击进度条的时候 根据点击的位置 设置 当前时间！！
            $('audio')[0].currentTime = (event.offsetX / $('.durationBar').width()) * $('audio')[0].duration
        },
        pause_play(){
            // 暂停或播放
            // 由于audio标签身上有autoplay 首先要有一个变量去记录当前是不是在播放
            if(this.isPlay){
                $('audio')[0].pause()
            }else if(!this.isPlay){
                $('audio')[0].play()
            }
            this.isPlay = !this.isPlay
        },
        goPrev(){
            // 上一曲 思路就是拿到全局播放列表中需要进行 减减 ，注意加不能无限减
            if(this.audioIndex <= 0 && this.randomIndex <= 0){
                this.randomIndex = this.randomList.length - 1
                this.changeMusic(this.audio.playerList.length - 1,this.randomList.length - 1)
            }else {
                this.randomIndex--
                this.changeMusic(this.audioIndex - 1,this.randomIndex)
            }
        },
        goNext(){ 
            if(this.audioIndex >= this.audio.playerList.length - 1 && this.randomIndex >= this.randomList.length - 1){
                this.randomIndex = 0
                this.changeMusic(0,0)
            }else {
                this.randomIndex++
                this.changeMusic(this.audioIndex + 1,this.randomIndex)
            }
        },
        playList(index){
            // 点击抽屉中的播放列表 需要接受点击的下标
            this.changeMusic(index,null)
        },
        changeMusic(index,randomIndex){
            // 换专辑的时候 暂时不传 专辑的头像，和 播放器背景图
            var vm = this;
            // 下一曲 思路就是拿到全局播放列表中需要进行 加加 ，注意加不能无限加
            if(this.playState == 'random'){
                this.audio.playerList.forEach(function(_item, _index){ 
                    // 原始数组里找名字 匹配 随机后的数组中名字 找下标 然后传给store
                    if(_item.musicName == vm.randomList[randomIndex].musicName){
                        if(vm.$store.state.audio.albumIndex == null){
                            vm.$store.commit('CHANGEMUSIC',{
                                index: _index,//当前歌曲下标
                                playerbg:vm.audio.playerList[_index].playerbg,
                                singerImg:vm.audio.playerList[_index].singerImg
                            });
                        }else if(typeof vm.$store.state.audio.albumIndex == 'number'){
                            vm.$store.commit('CHANGEMUSIC',{
                                index: _index,//当前歌曲下标
                                playerbg:vm.audio.playerbg,
                                singerImg:vm.audio.singerImg
                            });
                        }
                    }
                });
            }else {
                if(this.$store.state.audio.albumIndex == null){
                    this.$store.commit('CHANGEMUSIC',{
                        index: index,//当前歌曲下标
                        playerbg:this.audio.playerList[index].playerbg,
                        singerImg:this.audio.playerList[index].singerImg
                    });
                }else if(typeof this.$store.state.audio.albumIndex == 'number'){
                    this.$store.commit('CHANGEMUSIC',{
                        index: index,//当前歌曲下标
                        playerbg:this.audio.playerbg,
                        singerImg:this.audio.singerImg
                    });
                }
                
            }
        },
        showDrawer(){
            // 显示抽屉
            this.isShowDrawer = !this.isShowDrawer
        },
        close(){
            // 关闭抽屉
            this.showDrawer()
        }
    }
}

</script>
