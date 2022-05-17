<template>
 <div class="cart">
   <!--导航-->
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
   </nav-bar>
   <!--商品列表-->
   <cart-list></cart-list>
   <!--底部汇总-->
   <cart-botton-bar></cart-botton-bar>
 </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottonBar from './childComps/CartBottonBar'

  //从Vuex中导入！
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottonBar
    },
    computed: {
      //两种语法
      //数组语法
      ...mapGetters(['cartLength'])
      //对象语法：可以给getters中的属性起别名
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // })
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }
</style>
