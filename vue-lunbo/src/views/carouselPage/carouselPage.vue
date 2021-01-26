<template>
  <div class="carousel-box">
    <carousel :options="option" :list="imgList" @handleClick="viewDetail"></carousel>
  </div>
</template>
<script>
import carousel from '../../components/carousel/carousel'
export default {
  name: 'carouselPage',
  data () {
    return {
      carouseOptions: {},
      imgList: [
        {
          imageUrl: require('../../assets/images/1.jpg')
        },
        {
          imageUrl: require('../../assets/images/2.jpg')
        },
        {
          imageUrl: require('../../assets/images/3.jpg')
        },
        {
          imageUrl: require('../../assets/images/4.jpg')
        },
        {
          imageUrl: require('../../assets/images/5.jpg')
        }
      ],
      option: {
        direction: 'horizontal', // 切换方向：horizontal,vertical
        slidesPerView: 1, // 显示在视区的个数
        loop: true, // 是否循环播放
        autoplay: true, // 是否自动播放
        gapTime: 4000, // 间隔时间
        progressBar: true// 是否显示进度条
      }
    }
  },
  components: {
    carousel
  },
  methods: {
    viewDetail (item) {
      console.log('查看详情', item)
    }
  },
  created () {

  }
}
</script>
<style lang="scss" scoped>
.carousel-box {
  width: 800px;
  height: 533px;
  position: absolute;
  left: 50%;
  top: 53%;
  transform: translate(-50%, -50%);
}
</style>
