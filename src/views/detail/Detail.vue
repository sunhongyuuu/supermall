<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="goodsList"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'

  import {itemListenerMixin,backTopMixin} from 'common/mixin'

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodList,
      Scroll,
    },
    data() {
        return {
          iid: null,
          topImages: null,
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          commentInfo: {},
          goodsList: [],
          themeTopYs: [],
          currentIndex: 0,
        }
    },
    //混入
    mixins: [itemListenerMixin,backTopMixin],
    created() {
      //1.获取数据
      // console.log(this.$route.params.iid);
      // keep-alive exclude="Detail" 每次进入获取新数据
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        //2.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result
        this.topImages = res.result.itemInfo.topImages

        //3.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //4.创建店铺信息
        this.shop = new Shop(data.shopInfo)

        //5.获取商品详细信息
        this.detailInfo = data.detailInfo

        //6.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //7.获取评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }

        //第一次获取值不对：this.$refs.param.$el没有渲染完
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);


        //第二次获取值不对：没有将图片计算在内
        //等数据加载渲染完，进行一次回调
        //   this.$nextTick(() => {
        //     //根据最新的数据，对应的DOM是已经被渲染出来，但图片依然是没有加载完（目前获取到的offsetTop不包含图片）
        //     //offsetTop值不对的时候，都是因为图片的问题
        //     this.themeTopYs = []
        //
        //     this.themeTopYs.push(0)
        //     this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //     console.log(this.themeTopYs);
        //   })
      })

      //获取推荐数据
      getRecommend(this.iid).then(res => {
        this.goodsList = res.data.list
        // console.log(res);
      })

    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()

        //获取各个主题的高度
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position) {
        //获取y值
        const positionY = -position.y
        let length = this.themeTopYs.length
        //positionY和主题中的值进行对比
        for (let i in this.themeTopYs) {
          //i是字符串
          i = parseInt(i)
          if (this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i])))
          {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //是否显示回到顶部按钮
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        //1.获取购物车需要展示的信息，加入购物车
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2.将商品添加到购物车里(1.Actions可以返回一个Promise 2.mapActions映射关系)
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        this.addCart(product).then(res => {
            // console.log(res);
            // this.show = true;
            // this.message = res;
            //
            // setTimeout(() => {
            //   this.show = false
            //   this.message = ''
            // },1500)
          this.$toast.show(res)
        })
      }
    }

    }
</script>

<style scoped>
  #detail {
    /*遮住tab-bar*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 54px);

  }
</style>
