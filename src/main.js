import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import { sync } from 'vuex-router-sync'
// import axios from 'axios'
import Vuetify from 'vuetify'
// 引入element ui

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(Vuetify)

Vue.config.productionTip = false
// axios.post('/auth/login_patient', {
//   Id: 1000000,
//   Password: '12345678',
// })
//   .then(function (response) {
//     console.log(response.data)
//     console.log(response)
//   })
//   .catch(function (error) {
//     if (error.response.status === 400) {
//       alert(error.response.data)
//     } else {
//       alert(error.message)
//     }
//     console.log(error)
//   })

sync(store, router)

// 全局函数
Vue.prototype.showError = function(error, error_string, outerthis) {
  if (error.response.status === 401) {
    this.$message({
      message: '用户信息过期，请重新登录！',
      type: 'warning',
    })
    outerthis.$router.push({ name: 'Login' })
  } else {
    this.$message({
      message: error_string + error.response.data,
      type: 'error'
    })
  }
}

Vue.prototype.showMessage = function(message, type = 'success') {
  this.$message({
    message: message,
    type: type,
  })
}

// 用于和后台交互，发送请求
import axios from 'axios' 

// 设置全局变量
import global_ from './base.vue'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
