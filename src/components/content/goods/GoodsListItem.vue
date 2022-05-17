<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {}
      },
    },
    computed: {
      showImage() {
        //this.goodsItem.image如果找不到是undefined，this.goodsItem.show.img找不到报错，所以将this.goodsItem.image放在前面
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      //法一：通过路由的方式，对首页和详情页等不同页面加载的商品数据进行刷新
      // imageLoad() {
      //   if(this.$route.path.indexOf('/home'))
      //   {
      //     this.$bus.$emit('homeItemImageLoad')
      //   }else if(this.$route.path.indexOf('/detail'))
      //   {
      //     this.$bus.$emit('detailItemImageLoad')
      //   }
      // },
      //法二：离开首页时取消对商品数据的刷新，这样详情页数据加载完成后发出信息，首页接收不到，可以解决bug
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      },
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  /*伪元素*/
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
