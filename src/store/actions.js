import * as types from './mutations-type'

export default {
  addCart(context,payload) {
    return new Promise((resolve, reject) => {
      //payload是新添加的商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //判断oldProduct是否有值
      if (oldProduct) {//数量加一
        context.commit(types.ADD_COUNTER,oldProduct)
        resolve('商品数量+1')
      }else {//添加新的商品
        context.commit(types.ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}
