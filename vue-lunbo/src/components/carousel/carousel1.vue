<template>
  <div class="carousel-container" ref="myCarousel">
    <template v-if="options.direction=='horizontal'">
      <!-- 图片列表 -->
      <ul class="img-list" style="left:0;top:0;" :style="{width: imgListWidth}">
        <li class="list-item left" @click="handleClick(item)" v-for="(item, index) in list" :key="index" :style="{width: itemWidth + 'px', height: itemHeight + 'px'}">
          <!-- <img @click="handleClick(item)" class="img" :src="item.imageUrl" alt=""> -->
          <van-image class="img swiper-no-swiping" lazy-load fit="cover" :src="item.imageUrl" :data-src="item.imageUrl">
            <template v-slot:loading>
              <van-image class="no-img" fit="cover" :src="noImg"></van-image>
            </template>
            <template v-slot:error>
              <van-image class="no-img" fit="cover" :src="noImg"></van-image>
            </template>
          </van-image>
        </li>
        <li class="list-item left" @click="handleClick(list[0])" :style="{width: itemWidth + 'px', height: itemHeight + 'px'}">
          <van-image class="img swiper-no-swiping" lazy-load fit="cover" :src="list[0].imageUrl" :data-src="list[0].imageUrl">
            <template v-slot:loading>
              <van-image class="no-img" fit="cover" :src="noImg"></van-image>
            </template>
            <template v-slot:error>
              <van-image class="no-img" fit="cover" :src="noImg"></van-image>
            </template>
          </van-image>
        </li>
      </ul>
    </template>
    <template v-else>
      <!-- 图片列表 -->
      <ul class="vertical-list" style="left:0;top:0;" :style="{height: imgListHeight}">
        <li class="list-item" @click="handleClick(item)" v-for="(item, index) in list" :key="index" :style="{width: itemWidth + 'px', height: itemHeight + 'px'}">
          <div class="li-wrap cr-item">
            <div class="box swiper-no-swiping" :data-src="item.detailUrl">
              <p class="title ellipsis-2">{{item.title}}</p>
              <p class="info">
                <span class="subject-lab" v-if="item.type=='1'">专题</span>
                <span class="publish-time">{{item.publishTime | coverDate}}</span>
              </p>
            </div>
          </div>
        </li>
        <li class="list-item" v-if="list.length>3" @click="handleClick(list[0])" :style="{width: itemWidth + 'px', height: itemHeight + 'px'}">
          <div class="li-wrap cr-item">
            <div class="box swiper-no-swiping" :data-src="list[0].detailUrl">
              <p class="title ellipsis-2">{{list[0].title}}</p>
              <p class="info">
                <span class="subject-lab" v-if="list[0].type=='1'">专题</span>
                <span class="publish-time">{{list[0].publishTime | coverDate}}</span>
              </p>
            </div>
          </div>
        </li>
        <li class="list-item"  v-if="list.length>4" @click="handleClick(list[1])" :style="{width: itemWidth + 'px', height: itemHeight + 'px'}">
          <div class="li-wrap cr-item">
            <div class="box swiper-no-swiping" :data-src="list[1].detailUrl">
              <p class="title ellipsis-2">{{list[1].title}}</p>
              <p class="info">
                <span class="subject-lab" v-if="list[1].type=='1'">专题</span>
                <span class="publish-time">{{list[1].publishTime | coverDate}}</span>
              </p>
            </div>
          </div>
        </li>
        <li class="list-item"  v-if="list.length>4" @click="handleClick(list[2])" :style="{width: itemWidth + 'px', height: itemHeight + 'px'}">
          <div class="li-wrap cr-item">
            <div class="box swiper-no-swiping" :data-src="list[1].detailUrl">
              <p class="title ellipsis-2">{{list[1].title}}</p>
              <p class="info">
                <span class="subject-lab" v-if="list[1].type=='1'">专题</span>
                <span class="publish-time">{{list[1].publishTime | coverDate}}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <!-- 圆点列表 -->
    <ul class="dot-list" v-if="options.pagination">
      <li v-for="(item, index) in list" @mouseenter="enterDot($event, index)" :class="{'on':activeIdx===index}" :key="index"></li>
    </ul>
    <!-- 进度条 -->
    <div v-if="options.progressBar" class="bar" :style="{width: barWidth}"></div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'carousel1',
  props: {
    options: {
      type: Object,
      default () {
        return {
          direction: 'horizontal', // 切换方向：horizontal,vertical
          slidesPerView: 1, // 显示在视区的个数
          loop: true, // 是否循环播放
          autoplay: true, // 是否自动播放
          gapTime: 4000, // 间隔时间
          progressBar: true, // 是否显示进度条
          pagination: false // 是否显示锚点
        }
      }
    },
    size: {
      type: Array,
      defalut: []
    },
    list: { // 轮播项
      type: Array,
      defalut: []
    }
  },
  data () {
    return {
      noImg: require('../../images/no_img.png'),
      activeIdx: 0, // 当前轮播索引
      playFlag: null, // 定时轮转
      // dom元素存储
      imgList: null,
      imgNum: 0, // 轮播数量
      dots: null,
      wrapWidth: 0, // 轮播视区宽
      wrapHeight: 0, // 轮播视区高
      itemWidth: 0, // 单个轮播宽度
      itemHeight: 0, // 单个轮播高度
      num: 0, // 初始播放num
      playTimer: null
    }
  },
  computed: {
    imgListWidth () {
      // 图片总张数 * 单张图片宽度
      return (this.list.length + 1) * this.itemWidth + 'px'
    },
    imgListHeight () {
      return (this.list.length + 3) * this.itemHeight + 'px'
    },
    barWidth () {
      return `${this.imgNum > 0 ? (this.activeIdx + 1) / this.imgNum * this.itemWidth : ''}px`
    }
  },
  watch: {
    list: function (val) {
      console.log('val', val)
      this.init()
    }
  },
  methods: {
    handleClick (item) {
      console.log('点击', item)
      this.$emit('fHandleClick', item)
    },
    // 左移
    leftMove () {
      this.imgList.style.left = parseInt(this.imgList.style.left) + this.itemWidth + 'px'
      // 判断一下点击到头的情况
      if (parseInt(this.imgList.style.left) > 0) {
        this.imgList.style.left = -(this.itemWidth * (this.imgNum - 1)) + 'px'
      }
    },
    // 右移
    rightMove () {
      this.imgList.style.left = parseInt(this.imgList.style.left) - this.itemWidth + 'px'
      // 判断移到头的情况
      if (parseInt(this.imgList.style.left) < -(this.itemWidth * (this.imgNum - 1))) {
        this.imgList.style.left = 0 + 'px'
      }
    },
    // 上移
    topMove () {
      this.imgList.style.top = parseInt(this.imgList.style.top) + this.itemHeight + 'px'
      // 判断一下点击到头的情况
      if (parseInt(this.imgList.style.top) > 0) {
        this.imgList.style.top = -(this.itemHeight * (this.imgNum - 1)) + 'px'
      }
    },
    // 下移
    bottomMove () {
      this.imgList.style.top = parseInt(this.imgList.style.top) - this.itemHeight + 'px'
      // 判断到头的情况
      if (parseInt(this.imgList.style.top) < -(this.itemHeight * (this.imgNum - 1))) {
        this.imgList.style.top = 0 + 'px'
      }
    },
    enterDot (e, index) {
      this.activeIdx = index
      this.imgList.style.left = -this.itemWidth * index + 'px'
      console.log('index', index)
    },
    // 点击的时候，正好对应这个点
    tabFun () {
      const index = this.options.direction === 'horizontal' ? Math.abs(parseInt(this.imgList.style.left) / this.itemWidth) : Math.abs(parseInt(this.imgList.style.top) / this.itemHeight)
      console.log('当前,index', index)
      this.activeIdx = index
      console.log('activeIdx', this.activeIdx)
    },
    goFun () {
      if ((this.options.direction === 'vertical' && this.list.length > 3) || this.options.direction === 'horizontal') {
        this.playFlag = setInterval(() => {
          this.autoPlay()
        }, this.options.gapTime)
      }
    },
    init () {
      this.imgNum = this.list.length // 轮播数量
      this.wrapWidth = this.$refs.myCarousel.clientWidth
      this.wrapHeight = this.$refs.myCarousel.clientHeight
      this.num = 0
      this.activeIdx = 0
      this.playFlag && clearInterval(this.playFlag)
      if (this.options.direction === 'horizontal') { // 水平方向
        this.itemWidth = this.wrapWidth / this.options.slidesPerView
        this.itemHeight = this.wrapHeight
        $('.img-list').css('left', '0')
      } else { // 垂直方向
        this.itemHeight = this.wrapHeight / this.options.slidesPerView
        this.itemWidth = this.wrapWidth
        $('.vertical-list').css('top', '0')
      }
      this.imgList = document.querySelectorAll('.img-list')[0]
      this.verticalList = document.querySelectorAll('.vertical-list')[0]
      this.goFun()
    },
    autoPlay () {
      this.num++
      if (this.options.direction === 'horizontal') { // 水平
        if (this.num > this.list.length) {
          this.num = 0
          $('.img-list').css('left', '0').stop().animate({ left: -this.itemWidth }, 500)
          // 播放到第二张
          this.num = 1
          this.activeIdx = 1
        } else {
          $('.img-list').stop().animate({ left: -this.num * this.itemWidth }, 500)
          this.activeIdx = this.num
        }
      } else {
        console.log('this.num-0', this.num)
        if (this.num > this.list.length) {
          this.num = 0
          $('.vertical-list').css('top', '0').stop().animate({ top: -this.itemHeight }, 500)
          // 播放到第二张
          this.num = 1
          this.activeIdx = 1
        } else {
          $('.vertical-list').stop().animate({ top: -this.num * this.itemHeight }, 500)
          this.activeIdx = this.num
        }
        console.log('this.num-1', this.num)
      }
      console.log('activeIdx-1', this.activeIdx)
      if (this.num === this.list.length) {
        this.activeIdx = 0
      }
      console.log('activeIdx-2', this.activeIdx)
    }
  },
  created () {},
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.playFlag)
  }
}
</script>
<style lang="scss" scoped>
li{
  list-style-type: none;
}
.left {
  float: left;
}
/* 清除浮动 */
.clearfix{
  zoom:1;
}
.clearfix:after{
  content: "";
  height: 0;
  display: block;
  clear: both;
}
.carousel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.img-list, .vertical-list {
  position: relative;
  // transition: all .3s ease-in-out;
}
.list-item {
  height: 100%;
}
.li-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.list-item .img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.dot-list {
  height: 10px;
  position:absolute;
  left:50%;
  bottom:10px;
  margin-left: -66px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot-list li{
  height: 10px;
  width: 10px;
  border:2px solid lightskyblue;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #fff;
}
/* dot选中时颜色 */
.dot-list li.on{
  background-color: lightskyblue;
}
.bar {
  width: 100%;
  height: 2px;
  background-color: #d7000f;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  transition: all .3s ease-in-out;
}
// 轮播标题
.cr-item:hover {
  background-color: #fff;
}
.cr-item .box {
  height: 100%;
  width: 100%;
  border-bottom: 1px solid #c4c3c3;
  padding: 12px 20px 0 20px;
}
// .cr-swiper .cr-item-active {
//   background-color: #fff;
// }
.cr-item .title {
  height: 60px;
  width: 100%;
  font-size: 22px;
  color: #221815;
  cursor: pointer;
}
.cr-item .title:hover {
  color: #e4952e;
}
.cr-item .info {
  height: 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 22px;
  bottom: 8px;
}
.cr-item .subject-lab {
  color: #d7000f;
  margin-right: 12px;
}
.cr-item .publish-time {
  color: #9fa0a0;
}

</style>
