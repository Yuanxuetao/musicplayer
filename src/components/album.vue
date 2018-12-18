<style scoped lang='stylus'>
    .album{
        position: fixed;top:0;left:0;width: 100%;height: 100%;background: #fff;z-index: 1;
        .header{
            height: 265px;width: 100%;
            header{
                height: 40px;width: 100%;text-align: center;color: #fff;line-height: 40px;font-size: 18px;
                span.icon-houtui1{
                    position: absolute;top: 0;left:0;
                    width: 40px;height: 40px;text-align: center;line-height: 40px;font-size: 26px;
                }
            }
            .content{
                width: 92%;margin: 0 auto;margin-top: 30px;overflow: hidden;
                .left{
                    width:36%;float: left;
                    img{
                        width: 100%;display: block;
                    }
                }
                .right{
                    float: left;width: 64%;color: #fff;padding-left: 8%;
                    p:first-child{
                        padding: 6% 0;
                    } 
                    p:last-child{
                        overflow: hidden;color: rgba(255,255,255,0.8);
                        img{
                            width: 30px;border-radius: 50%;float: left;margin-right: 10px;
                        }
                        span{
                            line-height: 30px;float: left;
                        }
                    }
                }
            }
            .setting{
                ul{
                    overflow: hidden;
                    margin-top: 20px;
                    li{
                        float: left;
                        width: 25%;height: 40px;text-align: center;line-height: 40px;color: #fff;
                        font-size: 26px;
                    }
                    li.icon-duoxuan{
                        font-size: 24px;
                    } 
                    li.icon-icon--{
                        font-size: 32px;
                    }
                    li.icon-BAI-pinglun{
                        font-size: 32px;
                    }
                }
            }
        }
        .albumList{
            overflow-y: auto;
            ul{
                li{
                    position: relative;height: 40px;margin: 10px 0;
                    span.index{
                        position: absolute;top:0;left: 0;width: 40px;
                        height: 40px;text-align: center;line-height: 40px;
                    }
                    div{
                        position: absolute;top:0;left: 40px;
                        p.musicName{
                            color: #323233;line-height: 24px;
                        }
                        p.musicSinger{
                            color: #7d7d7e;font-size: 10px;
                        }
                    }
                    span.icon-bofang{
                        position: absolute;top: 0;right: 5px;width: 40px;
                        height: 40px;text-align: center;line-height: 40px;font-size: 26px;
                    }
                    &.cur{
                        div{
                            p{
                                color:  #C20C0C!important;
                            }
                        }
                        span{
                            color:  #C20C0C!important;
                        }
                        span.icon-laba{
                            font-size: 26px;
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="album" v-if='player.isShowAlbum'>
        <div class="header" :style='{background:`url(${player.album.albumbg}) center top /100% 100% no-repeat`}'>
            <header>
                <v-touch tag='span' class="iconfont icon-houtui1" @tap='hideAlbum'></v-touch>
                {{player.album.albumTitle}}
            </header>
            <div class="content">
                <div class="left">
                    <img :src="player.album.albumImg" alt="">
                </div>
                <div class="right">
                    <p>{{player.album.albumTitle}}</p>
                    <p>
                        <img :src="player.album.albumImg">
                        <span>{{player.album.albumSinger}} ></span>
                    </p>
                </div>
            </div>
            <div class="setting">
                <ul>
                    <li class="iconfont icon-BAI-pinglun"></li>
                    <li class="iconfont icon-fenxiang1"></li>
                    <li class="iconfont icon-icon--"></li>
                    <li class="iconfont icon-duoxuan"></li>
                </ul>
            </div>
        </div>
        <div class="albumList" v-height='265'>
            <ul>
                <v-touch tag='li' v-for='(item,index) in player.album.albumList' @tap='playAudio(player.album.albumList, index)' :key='item.id' :class='{cur : index == $store.state.audio.index && albumIndex == $store.state.audio.albumIndex}'>
                    <span class="index iconfont" :class='{"icon-laba" : index == $store.state.audio.index && albumIndex == $store.state.audio.albumIndex}'>{{index == $store.state.audio.index && albumIndex == $store.state.audio.albumIndex ? '' : index + 1}}</span>
                    <div>
                        <p class="musicName">{{item.musicName}}</p>
                        <p class="musicSinger">{{item.musicSinger}}</p>
                    </div>
                    <span class="iconfont icon-bofang"></span>
                </v-touch>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:['player'],
    data() {
        return {

        }
    },
    computed:{
        albumIndex(){
            return this.$store.state.player.index
        }
    },
    methods:{
        hideAlbum(){
            this.$store.commit('HIDEALBUM',{
                isShowAlbum : false
            })
        },
        playAudio(itemList, index){
            console.log(itemList);
            this.$store.commit('SHOWPLAYER',{
                // 显示播放器
                isShowAudio:true,
                // 传一个播放列表
                playerList:itemList,
                // 你点的是第几首歌
                index:index,
                // 作者头像
                singerImg:this.player.album.albumImg,
                // 专辑的背景 （播放器的背景）
                playerbg:this.player.album.playerbg,
                // 点击的是哪一张专辑 如果点击的是单曲 albumIndex 就为null，否则就是 0.1.2.3.4.
                albumIndex:this.albumIndex
            })
        }
    }
}

</script>
