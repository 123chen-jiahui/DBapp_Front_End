<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" small="1" dark v-bind="attrs" v-on="on">
          详情
        </v-btn>
      </template>
      <v-card>
        <v-card-title>药品</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-list>
            <v-list-item-group :multiple="multiple" :mandatory="mandatory" color="indigo">
              <v-list-item v-for="(item) in orderDetail.orderItems" :key="item.id">

                <v-list-item-content>
                  <v-list-item-title v-text="item.medicine.name"></v-list-item-title>
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
          <v-btn color="blue darken-1" text @click="Pay">
            支付
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'OrderDetail',
  data() {
    return {
      dialogm1: '',
      dialog: false,

      orderDetail: {},
    }
  },
  props: ['orderId'],
  methods: {
    Pay() {
      const outerthis = this
      axios({
        method: 'post',
        url: `/api/orders/${this.orderId}/placeOrder`,
      }).then(function (response) {
        outerthis.showMessage('支付成功')
        outerthis.$emit('paid', response.data)
      }).catch(function (error) {
        outerthis.showError(error, '支付失败！', outerthis)
      })
      this.dialog = false
    },
  },



  created() {
    const outerthis = this
    axios({
      methods: 'get',
      url: `/api/orders/${this.orderId}`,
    }).then(function (response) {
      outerthis.orderDetail = response.data
    }).catch(function (error) {
      outerthis.showError(error, '获取订单详情失败！', outerthis)
    })
  },
}
</script>