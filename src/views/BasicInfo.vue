<template>
  <v-container id="basic-info-view" fluid tag="section">
    <material-card icon="mdi-clipboard-text" icon-small title="基本信息" color="accent">
      <div style="text-align:center">
        <v-btn color="primary" @click="GetSchedules">显示排班信息</v-btn>
      </div>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              员工ID
            </th>
            <th class="primary--text">
              星期
            </th>
            <!-- <th class="primary--text">
              上班时间
            </th>
            <th class="primary--text">
              下班时间
            </th> -->
            <th class="primary--text">
              时间段
            </th>
            <th class="primary--text">
              房间号
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in Schedules" :key="item.id">
            <td>{{ item.staffId }}</td>
            <td>{{ DayToChinese(item.day) }}</td>
            <td>{{ item.timeSlotId }}</td>
            <td>{{ item.roomId }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </material-card>
  </v-container>
</template>

<script>
import { sync } from 'vuex-pathify'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  name: 'BasicInfoView',
  data: function () {
    return {
      Schedules: [],
      Timeslots: [],
    }
  },
  computed: {
    jwt: sync('app/jwt'),
  },
  methods: {
    GetSchedules() {
      console.log("got it! jwt is", this.jwt)
      const outerthis = this
      const decode = jwtDecode(this.jwt)
      const staffId = decode['sub']
      axios({
        method: 'get',
        url: '/schedule/' + `${staffId}`,
      })
        .then(function (response) {
          outerthis.Schedules = response.data;
        })
        .catch(function (error) {
          alert("找不到您的排班信息！" + error.message);
        })
    },
    GetTimeSlot(timeSlotId) {
      console.log("got it! jwt is", this.jwt)
      axios({
        method: 'get',
        url: '/time_slot',
      })
        .then(function (response) {
          outerthis.Timeslots = response.data;
        })
        .catch(function (error) {
          alert("找不到您的上班时间段！" + error.message);
        })
      for(let i = 0;;i++){
        if(Timeslots[i].timeSlotId === timeSlotId){
          return i;
          break;
        }
      }
    },
    DayToChinese(day) {
      if (day === 0) {
        return '星期日'
      } else if (day === 1) {
        return '星期一'
      } else if (day === 2) {
        return '星期二'
      } else if (day === 3) {
        return '星期三'
      } else if (day === 4) {
        return '星期四'
      } else if (day === 5) {
        return '星期五'
      } else if (day === 6) {
        return '星期六'
      }
    },
  }
}
</script>
