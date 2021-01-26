<template>
  <div class="carousel-box">
    <carousel :list="imgList" :size="[800, 533]"></carousel>
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
      ]
    }
  },
  components: {
    carousel
  },
  methods: {},
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
