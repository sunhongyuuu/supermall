import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

//起别名
import toast from 'components/common/toast'

Vue.config.productionTip = false

//默认$bus没有值，所以给它赋一个Vue实例（添加事件总线对象）
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决300ms延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
