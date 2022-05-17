<template>
  <div class="button-bar">
    <div class="check-content">
      <check-button  :is-checked="isSelectAll"
                     @click.native="checkClick"
                     class="check-button"/>
      <div>全选</div>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'
  export default {
    name: "CartBottonBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '¥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return item.price*item.count + preValue
        },0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        //法一:filter
        // return !(this.cartList.filter(item => !item.checked).length)

        //法二:find
        if (this.cartList.length === 0) return false
        return !(this.cartList.find(item => !item.checked))

        //法三：普通遍历
        // for (let item in cartList) {
        //   if (!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          //遍历所有
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择所购买的商品')
        }
      }
    }
  }
</script>

<style scoped>
  .button-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    border-color: #eee;
    font-size: 15px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: #ff6699;
    color: white;
    text-align: center;
  }
</style>
