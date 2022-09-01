<template>
    <v-row justify="center">
        <v-btn v-if="Staff.schedules != undefined && Staff.schedules.length > 0" color="primary" dark @click.stop="dialog = true">
            挂号
        </v-btn>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <p>剩余容量：{{Staff.schedules[Day].capacity}}</p>
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
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
    name: "RegistrationBoard",
    data() {
        return {
            token: '',
            dialog: false,
            Day: (new Date).getDay(),
            Schedules: [],
        };
    },
    props: ['Staff'],
    computed: {
        staffId: function() {
            return this.Staff.id
        }
    },
    components: { DateMenu },
    methods: {
        GetDay(val) {
            const decode = jwtDecode(this.token)
            console.log(decode)
            const prop = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            console.log(decode[prop])

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
                data: {
                    StaffId: this.staffId, // 这个参数也是传进来的
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
        this.token = localStorage.getItem('token')
    }
}
</script>
