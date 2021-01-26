<template>
  <div class="carousel-container">
    <!-- 图片列表 -->
    <ul class="img-list" style="left:0;" :style="{width: imgListWidth}">
      <li class="list-item left" v-for="(item, index) in list" :key="index" :style="{width: itemWidth + 'px'}">
        <img @click="handleClick(item)" class="img" :src="item.imageUrl" alt="">
      </li>
    </ul>
    <!-- 圆点列表 -->
    <ul class="dot-list">
      <li v-for="(item, index) in list" :key="index" :class="{'on': index===activeIdx}"></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'carousel',
  props: {
    options: {
      type: Object,
      default () {
        return {
          direction: 'horizontal', // 切换方向：horizontal,vertical
          slidesPerView: 1, // 显示在视区的个数
          loop: true, // 是否循环播放
          autoplay: true, // 是否自动播放
          gapTime: 3000, // 间隔时间
          progressBar: false, // 是否显示进度条
          size: [],
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
      activeIdx: 0, // 当前轮播索引
      playFlag: null, // 定时轮转
      // dom元素存储
      imgList: null,
      imgNum: 0, // 轮播数量
      dotList: null,
      dots: null
    }
  },
  computed: {
    itemWidth () { // 单个轮播宽度
      return this.size[0]
    },
    imgListWidth () {
      // 图片总张数 * 单张图片宽度
      return this.list.length * this.itemWidth + 'px'
    }
  },
  methods: {
    handleClick (item) {

    },
    // 左移
    leftMove () {
      if (!this.imgList) return
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
    dotHover () {
      for (let i = 0; i < this.imgNum; i++) {
        this.dots[i].onmouseover = function () {
          console.log('houver', i)
          for (let i = 0; i < this.imgNum; i++) {
            if (this.dotList[i].className === 'on') {
              this.dots[i].className = ''
            }
          }
          this.className = 'on'
          // 让点的index对应图片index
          for (let i = 0; i < this.imgNum; i++) {
            if (this.dots[i].className === 'on') {
              this.imgList.style.left = -this.itemWidth * i + 'px'
            }
          }
        }
      }
    },
    // 点击的时候，正好对应这个点
    tabFun () {
      const index = Math.abs(parseInt(this.imgList.style.left) / this.itemWidth)
      for (let i = 0; i < this.imgNum; i++) {
        if (i !== index) {
          if (this.dots[i].className === 'on') {
            this.dots[i].className = ''
          } else {
            this.dots[i].className = 'on'
          }
        }
      }
    },
    goFun () {
      console.log('this.options.gapTime', this.options.gapTime)
      this.playFlag = setInterval(() => {
        this.rightMove()
        this.tabFun()
      }, this.options.gapTime)
    },
    init () {
      this.container = document.querySelectorAll('.carousel-container')[0]
      this.imgList = document.querySelectorAll('.img-list')[0]
      console.log('imgList', this.imgList)
      console.log('imgList.style', this.imgList)
      this.dotList = document.querySelectorAll('.dot-list')[0]
      this.dots = this.dotList.children
      this.playFlag && clearInterval(this.playFlag)
      this.goFun()
      this.dotHover() // 锚点事件
    }
  },
  created () {
    console.log('options', this.options)
    console.log('list', this.list)
    this.imgNum = this.list.length
  },
  mounted () {
    this.init()
  },
  updated () {
    console.log('update')
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
.img-list {
  position: relative;
  // transition: all .3s ease-in-out;
}
.list-item {
  height: 100%;
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
</style>
