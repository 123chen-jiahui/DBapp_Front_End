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
import { Loading } from 'element-ui';

// 设置全局变量
import global_ from './base.vue'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;


Vue.prototype.openLoading = function() {
  const loading = this.$loading({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    text: '加载中',                         // 加载动画的文字
    spinner: 'el-icon-loading',             // 引入的loading图标
    background: 'rgba(0, 0, 0, 0.8)',       // 背景颜色
    target: '.el-table, .table-flex, .region',       // **需要遮罩的区域，这里写要添加loading的选择器**
    fullscreen: false,
    customClass: 'loadingclass'             // **遮罩层新增类名，如果需要修改loading的样式**
  })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  },5000)
  return loading;
}


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
