<style scoped>
	img{
		width: 100%;
	}
</style>
<template>
    <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for='item in swiperArr' :key='item.id'>
			<img :src="item.imgurl" alt="">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	props:['swiperArr'],
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>
