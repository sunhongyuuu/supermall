import * as types from './mutations-type'

export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中每个方法尽可能完成的事情比较单一
  [types.ADD_COUNTER](state,payload) {
    payload.count +=1
  },
  [types.ADD_TO_CART](state,payload) {
    payload.count = 1
    payload.checked = true
    this.state.cartList.push(payload)
  }
}
