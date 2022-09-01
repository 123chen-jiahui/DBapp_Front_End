<!-- 获取病人历史订单的api还要增加一些检查的功能 -->
<!-- 新增一个返回有几条历史订单数据的api -->
<template>
  <v-container id="alerts" fluid tag="section">
    <div class="mask" v-if="showModal" @click="showModal = false"></div>
    <div class="pop" v-if="showModal">
      <div style="text-align:center">
        <h2>订单详情</h2>
      </div>
      <v-card max-width="450" class="mx-auto">
        <v-list>
          <v-list-item>
            hello
          </v-list-item>
          <v-list-item>
            world
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <view-intro heading="订单查询及缴费" />

    <v-card>
      <v-tabs v-model="tab" background-color="deep-purple accent-4" centered dark icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          根据Id查找
        </v-tab>

        <v-tab href="#tab-2">
          根据姓名查找
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :value="'tab-1'">
          <v-card flat>
            <div class="text-length">
              <v-text-field v-model="patientId" clearable label="病人Id" type="text">
                <template v-slot:append>
                  <v-fade-transition leave-absolute>
                    <v-progress-circular v-if="loading" size="15" color="info" indeterminate></v-progress-circular>
                  </v-fade-transition>
                </template>
                <template v-slot:append-outer>
                  <v-btn color="primary" @click="GetPageCountAndOrders">
                    <v-icon>mdi-button</v-icon>
                    查询订单
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </v-card>
          <v-card flat>
            <!-- 可以用这种方式居中 -->
            <div style="text-align:center">
              当前病人：
            </div>
          </v-card>
        </v-tab-item>

        <v-tab-item :value="'tab-2'">
          <v-card flat>
            <div class="text-length">
              <v-text-field v-model="patientName" clearable label="病人姓名" type="text">
                <template v-slot:append>
                  <v-fade-transition leave-absolute>
                    <v-progress-circular v-if="loading" size="15" color="info" indeterminate></v-progress-circular>
                  </v-fade-transition>
                </template>
                <template v-slot:append-outer>
                  <!-- 这个template用于选项卡 -->

                  <v-dialog v-model="dialog" scrollable max-width="300px">
                    <template v-slot:activator="{ on }">
                      <!-- 这个template用于对话框 -->

                      <v-btn color="primary" dark v-on="on" @click="GetPatientByName">
                        查询详情
                      </v-btn>

                    </template>

                    <v-card>
                      <v-card-title>选择查询到的病人</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text style="height: 300px;">
                        <v-list>
                          <v-list-item-group color="indigo" v-model="selectedItem">
                            <v-list-item v-for="(item) in patientsSearched" :key="item.id" @input="SetPatientId">

                              <v-list-item-content>
                                <v-list-item-title v-text="'ID:'+item.id+'     姓名:'+item.name+'     年龄:'+item.age"></v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>

                          </v-list-item-group>
                        </v-list>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                          关闭
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="GetPageCountAndOrders(1)">
                          查询详情
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <!-- <v-btn color="primary" @click="Sayhello">
                    <v-icon>mdi-button</v-icon>
                    查询订单
                  </v-btn> -->
                </template>
              </v-text-field>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>


    <v-row>
      <v-col cols="12" md="6">
        <app-card>
          <v-card-text>
            <div class="text-h5 text--primary">
              全部订单
            </div>

            <v-simple-table>
              <thead>
                <tr>
                  <th class="primary--text">
                    单号
                  </th>
                  <!-- <th class="primary--text">
                    病人姓名
                  </th> -->
                  <th class="primary--text">
                    状态
                  </th>
                  <th class="text-right primary--text">
                    创建时间
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in ordersOfCurrentPageOfAll" :key="item.id">
                  <td>{{ item.id }}</td>
                  <!-- <td>{{ item.patientId }}</td> -->
                  <td>{{ StateToChinese(item.state) }}</td>
                  <td class="text-right">{{ item.createDateUTC.slice(0, 19) }}</td>
                </tr>
              </tbody>
            </v-simple-table>

            <!-- 实现翻页，非常重要！！！ -->
            <!-- 你需要一个监听翻页事件 -->
            <div class="text-center">
              <v-pagination v-model="pageNumberOfAll" :length="pageCount" prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right" @input="onPageChange">
              </v-pagination>
            </div>
          </v-card-text>
        </app-card>
      </v-col>

      <v-col cols="12" md="6">
        <app-card>
          <v-card-text>
            <div class="text-h5 text--primary">
              未支付
            </div>

            <v-simple-table>
              <thead>
                <tr>
                  <th class="primary--text">
                    单号
                  </th>
                  <th class="text-right primary--text">
                    创建时间
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in ordersOfCurrentPageOfPending" :key="item.id" @click="Sayhello">
                  <td>{{ item.id }}</td>
                  <!-- <td>{{ item.patientId }}</td> -->
                  <!-- <td>{{ StateToChinese(item.state) }}</td> -->
                  <td class="text-right">{{ item.createDateUTC.slice(0, 19) }}</td>
                  <v-card>
                    <!-- 需要传入参数：本条order的id -->
                    <OrderDetail :orderId="ordersOfCurrentPageOfPending[index].id" @paid="GetOrders" />
                  </v-card>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </app-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import OrderDetail from '../components/OrderDetail.vue'
export default {
  name: 'NotificationsView',

  data: () => ({
    tab: null,

    patientId: '',
    patientName: '',
    patient: {},
    patientsSearched: [],
    selectedPatientId: 0,

    selectedItem: 0, // 默认选择第0个

    ordersOfCurrentPageOfAll: [],
    orderChosen: {},
    // ordersOfCurrentPageOfPending: [],

    pageNumberOfAll: 1,
    pageSizeOfAll: 7,

    pageNumberOfPending: 1,
    pageSizeOfPending: 7,

    pageCount: 0,

    showModal: false,
    dialog: false,
  }),
  components: { OrderDetail },

  computed: {
    parsedDirection() {
      return this.direction.split(' ')
    },
    ordersOfCurrentPageOfPending: function () {
      var res = []
      this.ordersOfCurrentPageOfAll.forEach(item => {
        if (item.state === 'Pending') {
          res.push(item)
        }
      })
      return res
    },
  },

  methods: {
    // 捕获页面变化事件
    async onPageChange(page) {
      const outerthis = this
      axios({
        method: 'get',
        url: `/api/orders/forDoctor/${this.patientId}`,
        params: {
          pageNumber: this.pageNumberOfAll,
          pageSize: this.pageSizeOfAll,
        },
      }).then(function (response) {
        outerthis.ordersOfCurrentPageOfAll = response.data
      }).catch(function (error) {
        outerthis.showError(error, '获取订单失败！', outerthis)
      })
    },
    Sayhello() {
      alert('hello')
      this.showModal = true
    },
    async SetPatientId(flag) {
      if (flag === true) {
        this.patientId = (this.patientsSearched[this.selectedItem].id).toString()
      }
    },
    GetInfo() {
      if (this.GetPatient() === true) {
        console.log('cnm!!')
        this.GetOrders()
      }
      console.log('cnm!!!')
    },
    GetPatient() {
      const outerthis = this
      axios({
        method: 'get',
        url: `/patients/${this.patientId}`,
      }).then(function (response) {
        if (response.status === 204) {
          outerthis.showMessage('不存在该病人', 'warning')
          return false
        }
        outerthis.patient = response.data
        console.log('cnm')
        return true
      }).catch(function (error) {
        outerthis.showError(error, '获取病人信息失败！', outerthis)
      })
      return false
    },
    GetPatientByName() { // 通过关键词查找病人
      const outerthis = this

      axios({
        method: 'get',
        url: `/patients`,
        params: {
          keyword: this.patientName,
        },
      }).then(function (response) {
        outerthis.patientsSearched = response.data
      }).catch(function (error) {
        outerthis.showError(error, '查找病人时出错！', outerthis)
      })
    },
    GetPages(resolve) {
      const outerthis = this
      axios({
        methods: 'get',
        url: `/api/orders/forDoctor/${this.patientId}/count`,
      }).then(function (response) {
        outerthis.pageCount = Math.ceil((response.data / outerthis.pageSizeOfAll)) // 向上取整有几页
        resolve()
      }).catch(function (error) {
        outerthis.showError(error, '获取页面数失败！', outerthis)
      })
    },
    GetOrders() {
      const outerthis = this
      axios({
        methods: 'get',
        url: `/api/orders/forDoctor/${this.patientId}`,
        params: {
          pageNumber: this.pageNumberOfAll,
          pageSize: this.pageSizeOfAll,
        },
      }).then(function (response) {
        outerthis.showMessage('获取订单成功！')
        outerthis.ordersOfCurrentPageOfAll = response.data
      }).catch(function (error) {
        outerthis.showError(error, '获取订单失败！', outerthis)
      })
    },
    async GetPageCountAndOrders(flag = false) {
      if(flag) {
        this.dialog = false
      }
      let self = this
      new Promise(function (resolve, reject) {
        this.GetPages(resolve)
      }.bind(this)).then(function () {
        self.GetOrders()
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
      } else {
        return '已退单'
      }
    },
    DropGarbage() {
      for (item in this.ordersOfCurrentPageOfAll) {
        item.createDateUTC = item.createDateUTC.slice(0, 19)
      }
    }
  },
}
</script>

<style scoped>
.text-length {
  width: 30%;
  margin: auto;
}

.text-length2 {
  margin: auto;
}

.mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1
}

.pop {
  background-color: #fff;

  position: fixed;
  top: 150px;
  left: 350px;
  width: calc(100% - 700px);
  height: calc(100% - 300px);
  z-index: 2
}
</style>
