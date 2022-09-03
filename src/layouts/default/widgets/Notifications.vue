<template>
  <v-menu bottom left offset-y origin="top right" transition="scale-transition">
    <template v-slot:activator="{ attrs, on }">
      <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
        <v-badge v-if="notifications.length" bordered color="red" overlap>
          <template v-slot:badge>
            <span>{{ Object.keys(notifications).length }}</span>
          </template>

          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <div v-else>
          <v-icon>mdi-bell</v-icon>
        </div>
      </v-btn>
    </template>

    <v-list v-if="notifications.length" flat nav>
      <app-bar-item v-for="(n, i) in notifications" :key="i" link>
        <v-list-item-content>
          <v-list-item-title>{{ n }} </v-list-item-title>
        </v-list-item-content>
      </app-bar-item>
    </v-list>

    <v-list v-else flat nav>
      <app-bar-item link>
        <v-list-item-content>
          <v-list-item-title>暂无通知公告 </v-list-item-title>
        </v-list-item-content>
      </app-bar-item>
    </v-list>
  </v-menu>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DefaultNotifications',
  data: () => ({
    Registrations: [],
    // notifications: [
    // 'hello world',
    // '7月消费统计',
    // '您有了新的报告结果',
    // 'You\'re now friends with Andrew',
    // 'Another Notification',
    // 'Another one',
    // ],
  }),
  computed: {
    notifications: function () {
      let count = 0
      this.Registrations.forEach(element => {
        if (element.state === 'Pending') {
          count += 1
        }
      })
      if (count) {
        return [`您还有${count}条未支付的挂号，请前往“挂号信息”页面支付`]
      } else {
        return []
      }
    }
  },
  methods: {
    // GetAllRegistrations() {
    //   const outerthis = this
    //   axios({
    //     method: 'get',
    //     url: '/registration',
    //   }).then(function (response) {
    //     outerthis.Registrations = response.data;
    //   })
    // },
  },
  mounted() {
    const outerthis = this
    axios({
      method: 'get',
      url: '/registration',
    }).then(function (response) {
      outerthis.Registrations = response.data;
    })
  },
  created() {
    // 存在的问题：如果不会动态改变，除非刷新
    // const outerthis = this
    // axios({
    //   method: 'get',
    //   url: '/registration',
    // }).then(function (response) {
    //   outerthis.Registrations = response.data;
    // })
  }
}
</script>
