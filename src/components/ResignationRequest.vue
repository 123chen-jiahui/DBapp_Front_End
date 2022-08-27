<template>
    <v-container id="resignation-request" fluid tag="section">
        <v-card class="mx-auto" max-width="700">
            <div>
                <headers title="离职申请"></headers>
                <div class="text-area">
                    <textarea v-model="message" placeholder="请输入离职原因...">

            </textarea>
                </div>
            </div>
            <div style="text-align:center">
                <v-btn color="primary" @click="CommitResignationRequest">提交</v-btn>
            </div>
        </v-card>
        <br />
        <material-card icon="mdi-clipboard-text" icon-small title="离职申请" color="accent">
            <!-- <div style="text-align:center">
                <v-btn color="primary" @click="GetResignation">显示离职记录</v-btn>
            </div> -->
            <v-simple-table>
                <thead>
                    <tr>
                        <th class="primary--text">
                            员工ID
                        </th>
                        <th class="primary--text">
                            申请时间
                        </th>
                        <th class="primary--text">
                            离职理由
                        </th>
                        <th class="text-right primary--text">
                            审批状态
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in Resignations" :key="item.time">
                        <td>{{ item.staffId }}</td>
                        <td>{{ item.time.substr(0, 10) }}</td>
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

    name: 'ResignationRequest',

    data: () => ({
        message: '',
        Resignations: [],
    }),
    mounted: function () {
        this.GetResignation()
    },
    computed: {
        jwt: sync('app/jwt'),
    },
    methods: {
        CommitResignationRequest() {
            const outerthis = this;
            axios({
                method: 'post',
                url: '/resign/askForResign',
                headers: {
                    'Authorization': `bearer ${this.jwt}`
                },
                data: {
                    Time: new Date().toISOString().substr(0, 10),
                    Reason: this.message,
                }
            })
                .then(function (response) {
                    alert("离职申请提交成功！请等待审核！");
                })
                .catch(function (error) {
                    alert("离职申请提交失败！" + error.message);
                })
        },
        GetResignation() {
            console.log("got it! jwt is", this.jwt)
            const outerthis = this
            axios({
                method: 'get',
                url: '/resign/history',
                headers: {
                    'Authorization': `bearer ${this.jwt}`
                },
            })
                .then(function (response) {
                    outerthis.Resignations = response.data;
                })
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