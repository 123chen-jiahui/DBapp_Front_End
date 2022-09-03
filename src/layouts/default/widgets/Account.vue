<template>
  <v-menu bottom left min-width="200" offset-y origin="top right" transition="scale-transition">
    <template v-slot:activator="{ attrs, on }">
      <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>


    <v-list :tile="false" flat nav>
      Id：{{ user.id }}
    </v-list>

    <v-list :tile="false" flat nav>
      姓名：{{ user.name }}
    </v-list>

    <v-list :tile="false" flat nav>
      年龄：{{ user.age }}
    </v-list>

    <v-list :tile="false" flat nav>
      性别：{{ user.gender }}
    </v-list>

    <v-list v-if="role != 'Patient'" :tile="false" flat nav>
      身份：{{ user.role }}
    </v-list>

    <v-list>
      <v-btn color="primary" @click="Logout">退出登录</v-btn>
    </v-list>
  </v-menu>
</template>

<script>
import { sync } from 'vuex-pathify'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  name: 'DefaultAccount',

  data: () => ({
    token: '',
    user: {},
    Id: 0,
    role: '',
  }),
  methods: {
    Logout() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'Login' })
    },
    CheckRoleAndId(resolve) {
      const decode = jwtDecode(this.token)
      const prop = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      this.role = decode[prop]
      this.Id = decode['sub']
      resolve()
    },
    GetInfo() {
      const outerthis = this

      if (this.role === 'Patient') {
        axios({
          method: 'get',
          url: `/patients/${this.Id}`,
        }).then(function (response) {
          outerthis.user = response.data
        }).catch(function (error) {
          outerthis.showError(error, '用户信息获取失败！', outerthis)
        })
      } else {
        axios({
          method: 'get',
          url: `/staff/info`,
        }).then(function (response) {
          outerthis.user = response.data
        }).catch(function (error) {
          outerthis.showError(error, '用户信息获取失败！', outerthis)
        })
      }
    }
  },
  async created() {
    // 判断是什么用户身份
    // 获取用户信息
    this.token = localStorage.getItem('token')
    let self = this
    new Promise(function (resolve, reject) {
      this.CheckRoleAndId(resolve)
    }.bind(this)).then(function () {
      self.GetInfo()
    })
  }
}
</script>
