<template>
  <v-container id="basic-info-view" fluid tag="section">
    <material-card icon="mdi-clipboard-text" icon-small title="基本信息" color="accent">
      <!-- <div style="text-align:center">
        <v-btn color="primary" @click="GetSchedules">显示排班信息</v-btn>
      </div> -->
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              员工ID
            </th>
            <th class="primary--text">
              星期
            </th>
            <th class="primary--text">
              上班时间
            </th>
            <th class="primary--text">
              下班时间
            </th>
            <th class="primary--text">
              房间号
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in Schedules" :key="item.id">
            <td>{{ item.staffId }}</td>
            <td>{{ item.day }}</td>
            <td>{{ item.timeSlot.startTime }}点</td>
            <td>{{ item.timeSlot.endTime }}点</td>
            <td>{{ item.roomId }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </material-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  name: 'BasicInfoView',
  data: function () {
    return {
      token: '',
      Schedules: [],
      Timeslots: [],
    }
  },
  mounted: function () {
    this.GetSchedules()
  },
  methods: {
    GetSchedules() {
      const outerthis = this
      const decode = jwtDecode(this.token)
      const staffId = decode['sub']
      axios({
        method: 'get',
        url: '/schedule/' + `${staffId}`,
      })
        .then(function (response) {
          outerthis.Schedules = response.data;
        })
        .catch(function (error) {
          outerthis.showError(error, '找不到您的排班信息！', outerthis)
          // alert("找不到您的排班信息！" + error.message);
        })
    },
    GetTimeSlot(timeSlotId) {
      axios({
        method: 'get',
        url: '/time_slot'+`${timeSlotId}`,
      })
        .then(function (response) {
          outerthis.Timeslots = response.data;
        })
        .catch(function (error) {
          alert("找不到您的上班时间段！" + error.message);
        })
    },
  },
  created() {
      this.token = localStorage.getItem('token')
      // this.GetSchedules()
    }
}
</script>