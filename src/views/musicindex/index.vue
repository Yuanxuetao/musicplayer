<style lang='stylus' scoped>
.content {
    h3 {
        font-weight: normal;
        font-size: 18px;
        height: 40px;
        line-height: 40px;
    }
    h3:before {
        content: "|";
        color: #C20C0C;
        background: #C20C0C;
        font-size: 15px;
        margin: 0 6px;
    }
    .album {
        ul {
            display: flex;
            li {
                width: 33.33%;
                padding: 5px;
                img {
                    width: 100%;
                }
                p {
                    text-align: center;
                }
            }
        }
    }
    .recommend {
        ul {
            li {
                position: relative;
                height: 40px;
                margin: 10px 0;
                span.index {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                }
                div {
                    position: absolute;
                    top: 0;
                    left: 40px;
                    p.musicName {
                        color: #323233;
                        line-height: 24px;
                    }
                    p.musicSinger {
                        color: #7d7d7e;
                        font-size: 10px;
                    }
                }
                span.icon-bofang {
                    position: absolute;
                    top: 0;
                    right: 5px;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 26px;
                }
                &.cur {
                    div {
                        p {
                            color: #C20C0C!important;
                        }
                    }
                    span {
                        color: #C20C0C!important;
                    }
                    span.icon-laba {
                        font-size: 26px;
                    }
                }
            }
        }
    }
}

</style>
<template>
    <div v-height='40' style='overflow-y:auto;'>
        <VuiSwiperX :swiperArr='swiperArr'></VuiSwiperX>
        <div class="content">
            <h3>专辑列表</h3>
            <div class="album">
                <ul>
                    <v-touch tag="li" v-for='(item,index) in album' @tap='showAlbum(item,index)' :key='item.id'>
                        <img :src="item.albumImg" alt="">
                        <p>{{item.albumTitle}}</p>
                    </v-touch>
                </ul>
            </div>
            <h3>热门歌曲</h3>
            <div class="recommend">
                <ul>
                    <v-touch tag='li' v-for='(item,index) in recommend' :key='item.id' @tap='playRecommend(recommend, index)' :class='{cur : index == $store.state.audio.index}'>
                        <span class="index iconfont" :class='{"icon-laba" : index == $store.state.audio.index && $store.state.audio.albumIndex == null}'>{{index == $store.state.audio.index && $store.state.audio.albumIndex == null ? '' : index + 1}}</span>
                        <div>
                            <p class="musicName">{{item.musicName}}</p>
                            <p class="musicSinger">{{item.musicSinger}}</p>
                        </div>
                        <span class="iconfont icon-bofang"></span>
                    </v-touch>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import VuiSwiperX from '../../components/vuiSwiperX.vue'
export default {
    data() {
        return {
            swiperArr: [{
                imgurl: 'http://p1.music.126.net/94FFF7arKqdOSrjPaGSe3w==/109951163271324491.jpg'
            }, {
                imgurl: 'http://p1.music.126.net/eHasYt2s5_H6wm7qffVAyw==/109951163271324954.jpg'
            }, {
                imgurl: 'http://p1.music.126.net/op6mnw1MGhD5Maidh9sN-A==/109951163271327985.jpg'
            }, {
                imgurl: 'http://p1.music.126.net/PLpQRRO6sCSQP7a4IiPh9w==/109951163271331867.jpg'
            }, {
                imgurl: 'http://p1.music.126.net/7koGOqN44QEeZf7qBcpGtA==/109951163271326934.jpg'
            }]
        }
    },
    created() {
        this.$store.dispatch("GETALL")
    },
    computed: {
        album() {
            return this.$store.state.mapList.album
        },
        recommend() {
            return this.$store.state.mapList.recommend
        }
    },
    methods: {
        showAlbum(item, index) {
            this.$store.commit('SHOWALBUM', {
                isShowAlbum: true,
                album: item,
                index: index
            })
        },
        playRecommend(itemList, index){
            // 播放单曲 传进来的是 所有单曲列表中数组
        	this.$store.commit('SHOWPLAYER',{
                // 显示播放器
                isShowAudio:true,
                // 传一个播放列表
                playerList:itemList,
                // 你点的是第几首歌
                index:index,
                // 作者头像
                singerImg:this.recommend[index].singerImg,
                // 专辑的背景 （播放器的背景）
                playerbg:this.recommend[index].playerbg,
                // 点击的是哪一张专辑 如果点击的是单曲 albumIndex 就为null，否则就是 0.1.2.3.4.
                albumIndex:null
            })
        }
    },
    components: {
        VuiSwiperX
    }
}

</script>
