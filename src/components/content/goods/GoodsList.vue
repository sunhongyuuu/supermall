<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods" :goodsItem="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {GoodsListItem},
    props: {
      goods: {
        type: Array,
        default() {
          return []
        },
      },
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /*根据GoodsListItem的宽度设置一行内放几个*/
    flex-wrap: wrap;
    /*中间均等分 两边是中间的一半*/
    justify-content: space-around;
    padding: 2px;
  }
</style>
