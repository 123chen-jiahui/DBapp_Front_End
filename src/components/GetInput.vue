<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="message" clearable label="单号" type="text">
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
              </v-fade-transition>
            </template>
            <template v-slot:append-outer>
              <v-btn color="primary" @click="clickMe">
                <v-icon>mdi-button</v-icon>
                查询
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-simple-table>
            <thead>
              <tr>
                <th class="primary--text">
                  医生Id
                </th>
                <th class="primary--text">
                  诊断时间
                </th>
                <th class="primary--text">
                  房间
                </th>
                <th class="primary--text">
                  次序
                </th>
                <th class="primary--text">
                  挂号费
                </th>
                <th class="primary--text">
                  状态
                </th>
                <th class="text-right primary--text">
                  订单产生时间
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ RegistrationDetail.staffId }}</td>
                <td>{{ RegistrationDetail.time }}</td>
                <td>{{ RegistrationDetail.roomId }}</td>
                <td>{{ RegistrationDetail.order }}</td>
                <td>{{ RegistrationDetail.fee }}</td>
                <td>{{ StateToChinese(RegistrationDetail.state) }}</td>
                <td class="text-right">{{ RegistrationDetail.createDateLocal }}</td>
                <!-- <td> {{tmp}}</td>
                <td> {{tmp}}</td>
                <td> {{tmp}}</td>
                <td> {{tmp}}</td>
                <td> {{tmp}}</td>
                <td> {{tmp}}</td>
                <td> {{tmp}}</td>
                <td> {{tmp}}</td> -->
              </tr>
            </tbody>
          </v-simple-table>
          <div v-if="!Paid">
            <div style="color: pink; font-size: 20px">此次挂号还尚未支付，请点击支付按钮进行支付</div>
            <v-btn color="primary" @click="PayRegistration">
                <v-icon>mdi-button</v-icon>
                支付
              </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'
import { sync } from 'vuex-pathify'
import MaterialCard from './MaterialCard.vue'
export default {
  components: { MaterialCard },
  name: 'GetInput',
  data: () => ({
    message: '',
    loading: false,

    RegistrationDetail: {},
    Paid: true,
  }),
  computed: {
    jwt: sync('app/jwt'),
  },
  methods: {
    clickMe() {
      this.loading = true
      const outerthis = this
      axios({
        method: 'get',
        url: `/registration/${this.message}`,
        headers: {
          'Authorization': `bearer ${this.jwt}`,
        }
      })
        .then(function (response) {
          outerthis.RegistrationDetail = response.data
          outerthis.loading = false
          if (response.data.state === 'Pending') {
            outerthis.Paid = false
          }
        })
        .catch(function (error) {
          outerthis.showError(error, '获取信息失败！', outerthis)
        })
    },
    StateToChinese(s) {
      if (s === 'Pending') {
        return '未支付'
      } else if (s === 'Completed') {
        return '已完成'
      } else if (s === 'Processing') {
        return '处理中'
      } else if (s === 'Cancelled') {
        return '已取消'
      } else if (s === 'Declined') {
        return '已失败'
      } else if (s === 'returned'){
        return '已退单'
      } else {
        return ''
      }
    },
    PayRegistration() {
      const outerthis = this
      axios({
        method: 'post',
        url: `/registration/${this.message}/placeOrder`,
        headers: {
          'Authorization': `bearer ${this.jwt}`,
        },
      })
      .then(function (response) {
        outerthis.showMessage('支付成功！')
        // alert('支付成功！')
        outerthis.Paid = true
        outerthis.RegistrationDetail.state = 'Completed'
      })
      .catch(function (error) {
        outerthis.showError(error, '支付失败！', outerthis)
      })
    }
  },
}
</script>

<style scoped>
.p {
  color: pink;
  font-size: 80px;
}
</style>