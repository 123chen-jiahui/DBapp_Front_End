<template>
    <v-row justify="center">
        <v-btn v-if="Schedules.length" color="primary" dark @click.stop="dialog = true">
            挂号
        </v-btn>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <p>剩余容量：{{capacity}}</p>
                <v-card-title class="text-h5">请选择挂号时间</v-card-title>
                <DateMenu @GetDay="GetDay" />

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="dialog = false">
                        取消
                    </v-btn>

                    <v-btn color="green darken-1" text @click="Registration">
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import DateMenu from './DateMenu.vue'
import { sync } from 'vuex-pathify'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
    name: "RegistrationBoard",
    data() {
        return {
            dialog: false,
            Day: (new Date).getDay(),
            Schedules: [],
        };
    },
    props: ['StaffId'],
    computed: {
        jwt: sync('app/jwt'),

        capacity: function() {
            // 选中那天的容量
            if (this.Schedules === null || this.Schedules[this.Day] === {}) {
                return 0
            } else {
                return this.Schedules[this.Day].capacity
            }
        }
    },
    components: { DateMenu },
    methods: {
        GetDay(val) {
            const decode = jwtDecode(this.jwt)
            console.log(decode)
            const prop = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            console.log(decode[prop])

            console.log("got it! jwt token is", this.jwt)
            console.log("got it! staffid is", this.StaffId)
            console.log("got it! it's", val)
            this.Day = val
        },
        Registration() {
            const outerthis = this;
            this.dialog = false;
            axios({
                method: 'post',
                url: '/registration/checkout',
                headers: {
                    'Authorization': `bearer ${this.jwt}`
                },
                data: {
                    StaffId: this.StaffId, // 这个参数也是传进来的
                    Day: this.Day,
                }
            })
                .then(function (response) {
                    outerthis.showMessage('挂号成功！请前往“挂号查询”查看详情')
                })
                .catch(function (error) {
                    outerthis.showError(error, '挂号失败！', outerthis)
                })
        }
    },
    created() {
        // 查询排班信息，还有多少容量
        const outerthis = this
        axios({
            method: 'get',
            url: '/schedule/' + `${this.StaffId}`,
        })
            .then(function (response) {
                console.log('here')
                outerthis.Schedules = response.data;
            })
    }
}
</script>
