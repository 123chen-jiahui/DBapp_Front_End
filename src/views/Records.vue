<template>
    <v-expansion-panels>
        <v-expansion-panel v-for="(record, i) in records" :key="i">
            <v-expansion-panel-header>第{{ i + 1 }}条就医记录</v-expansion-panel-header>
            <v-expansion-panel-content>
                记录ID:{{ records[i].id }}
                <p class="text" v-html="requestText"></p>
                病人ID:{{ records[i].patientId }}
                <p class="text" v-html="requestText"></p>
                医生ID:{{ records[i].staffId }}
                <p class="text" v-html="requestText"></p>
                医生姓名:{{ records[i].staff.name }}
                <p class="text" v-html="requestText"></p>
                诊断时间:{{ records[i].diagnosisTime }}
                <p class="text" v-html="requestText"></p>
                诊断结果:{{ records[i].diagnosticResult }}
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import axios from 'axios';
import jwtDecode  from 'jwt-decode';
import { Script } from "vm";
import { sync } from 'vuex-pathify'
export default {
    data: function () {
        return {
            records: [],
            requestText: "",
        }
    },
    computed: {
        jwt: sync('app/jwt'),
          
    },
    mounted() {
        this.GetAllReords()
    },
    methods: {
        GetAllReords() {
            console.log("got it! jwt is", this.jwt)
            const outerthis = this
            const decode =jwtDecode(this.jwt)
          const patientId=decode['sub']

          const rLoading = this.openLoading();
            axios({
                method: 'get',
                url: `/api/medicalRecord/${patientId}`,
                headers: {
                    'Authorization': `bearer ${this.jwt}`
                },
            })
                .then(function (response) {
                    rLoading.close();
                    outerthis.records = response.data;
                    console.log("data is", response.data);
                })
        },
    }
}


</Script>