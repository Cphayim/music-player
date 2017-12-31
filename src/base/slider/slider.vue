<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span v-for="(item, index) in dots" :key="item" 
        class="dot" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }

      // resize 事件
      window.addEventListener('resize', () => {
        if (!this.slider) return
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    }, 20)
  },
  methods: {
    /**
     * 设置 slider 的宽度
     * @method _setSliderWidth
     * @param {boolean} isResize 是否是 resize 事件触发
     */
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth

      /** 
       * 为 slot 中的 item 添加 class 与设置宽度 
       */
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      /**
       * 轮播组件将在头部和尾部分别添加一个 slider-item 来保证循环滚动
       */
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      // 设置 sliderGroup 的宽度
      this.$refs.sliderGroup.style.width = width + 'px'
    },

    /**
     * 初始化 dots 指示器
     * @method _initDots    
     */
    _initDots() {
      this.dots = new Array(this.children.length)
    },

    /**
     * 初始化 better-scroll 组件
     * @method _initSlider
     */
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false, // 惯性
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      // 监听滚动结束事件
      this.slider.on('scrollEnd', this._onScrollEnd)
    },

    /**
     * 滚动结束执行的方法
     * @method _onScrollEnd
     */
    _onScrollEnd() {
      /**
       * this.slider.getCurrentPage() 会返回当前 slider 的一个状态对象
       * 例如 {x: -750, y: 0, pageX: 1, pageY: 0}
       * x/y 表示当前 横/纵偏移量
       * pageX/pageY 表示当前横/纵显示元素的索引
       */
      let pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex

      if (this.autoPlay) {
        this._play()
      }
    },

    /**
     * 播放下一张
     * @method _play
     */
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // slider.next() 移动到下一张
        this.slider.next()
      }, this.interval)
    }
  },

  destoryed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.slider
  min-height: 1px
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slider-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>