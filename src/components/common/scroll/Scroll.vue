<template>
<!-- ref绑定 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // this.scroll = new BScroll (document.querySelector('.wrapper'),{
      //
      // })
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        // pullUpLoad: this.pullUpLoad,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) =>{
          this.$emit('scroll',position)
        })
      }

      //3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //回到（x,y）的位置
      // this.scroll.scrollTo(0,0)
      //time=300如果不传入值的话使用默认值
      scrollTo(x, y, time=300) {
        //在scroll出现后再执行this.scroll.scrollTo(x, y, time)
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        //this.scroll.y小写
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
</style>
