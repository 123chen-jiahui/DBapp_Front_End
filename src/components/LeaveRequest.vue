<template>
    <v-container id="leave-request" fluid tag="section">
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                    offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="startdate" label="起始时间" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="startdate" :allowed-dates="allowedDates" @input="menu2 = false">
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4">
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                    offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="enddate" label="结束时间" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                            v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="enddate" @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-card class="mx-auto" max-width="700">
            <div>
                <headers title="请假申请"></headers>
                <div class="text-area">
                    <textarea v-model="message" placeholder="请输入请假原因...">

            </textarea>
                </div>
            </div>
            <div style="text-align:center">
                <v-btn color="primary" @click="CommitLeaveRequest">提交</v-btn>
            </div>
        </v-card>
        <br />
        <material-card icon="mdi-clipboard-text" icon-small title="请假记录" color="accent">
            <div style="text-align:center">
                <v-btn color="primary" @click="GetLeaves">显示请假记录</v-btn>
            </div>
            <v-simple-table>
                <thead>
                    <tr>
                        <th class="primary--text">
                            员工ID
                        </th>
                        <th class="primary--text">
                            起始时间
                        </th>
                        <th class="primary--text">
                            结束时间
                        </th>
                        <th class="primary--text">
                            请假理由
                        </th>
                        <th class="text-right primary--text">
                            审批状态
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in LeaveRequest" :key="item.fromTime">
                        <td>{{ item.staffId }}</td>
                        <td>{{ item.fromTime.substr(0, 10) }}</td>
                        <td>{{ item.toTime.substr(0, 10) }}</td>
                        <td>{{ item.reason }}</td>
                        <td class="text-right">{{ item.state }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </material-card>
    </v-container>
</template>

<script>
import { sync } from 'vuex-pathify'
import axios from 'axios'
export default {

    name: 'LeaveRequest',

    data: () => ({
        startdate: new Date().toISOString().substr(0, 10),
        enddate: new Date().toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        message: '',
        LeaveRequest: [],
    }),
    computed: {
        jwt: sync('app/jwt'),
    },
    methods: {
        CommitLeaveRequest() {
            const outerthis = this;
            axios({
                method: 'post',
                url: '/break/askForBreak',
                headers: {
                    'Authorization': `bearer ${this.jwt}`
                },
                data: {
                    FromTime: this.startdate,
                    ToTime: this.enddate,
                    Reason: this.message,
                }
            })
                .then(function (response) {
                    alert("请假申请提交成功！请等待审核！");
                })
                .catch(function (error) {
                    alert("请假申请提交失败！" + error.message);
                })
        },
        GetLeaves() {
            console.log("got it! jwt is", this.jwt)
            const outerthis = this
            axios({
                method: 'get',
                url: '/break/history',
                headers: {
                    'Authorization': `bearer ${this.jwt}`
                },
            })
                .then(function (response) {
                    outerthis.LeaveRequest = response.data;
                })
            // allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
        },

    }
}
</script>

<style scoped>
.text-area {
    width: 100%;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
}

.text-area textarea {
    width: 100%;
    margin: 0.75rem 0;
    border: none;
    outline: none;
    padding-left: 1.125rem;
    height: 10rem;
}

.text-area textarea::-webkit-input-placeholder {
    color: #9E9E9E;
}
</style>
