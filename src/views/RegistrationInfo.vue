<template>
  <v-container id="regular-tables-view" fluid tag="section">
    <view-intro heading="挂号信息" />
    <material-card icon="mdi-clipboard-text" icon-small title="挂号信息一览表" color="accent">
      <div class="mask" v-if="showModal" @click="showModal = false"></div>
      <button class="button button1" @click="GetAllRegistrations"> 查询所有 </button>
      <button class="button button2" @click="showModal = true"> 查询详情 </button>
      <div class="pop" v-if="showModal">
        <GetInput />
        
        <!-- <v-btn color="primary">hello</v-btn>
        <button @click="showModal = false" class="button button2">点击关闭</button>
        <input> -->
      </div>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              单号
            </th>
            <th class="primary--text">
              医生Id
            </th>
            <th class="primary--text">
              医生姓名
            </th>
            <th class="primary--text">
              诊断时间
            </th>
            <th class="primary--text">
              房间
            </th>
            <th class="text-right primary--text">
              状态
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in Registrations" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.staffId }}</td>
            <td>{{ item.staff.name}}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.roomId }}</td>
            <td class="text-right">{{ StateToChinese(item.state) }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </material-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import { sync } from 'vuex-pathify'
import Index from '../layouts/default/Index.vue';
import MaterialCard from '../components/MaterialCard.vue';
import GetInput from '../components/GetInput.vue';
// import GainInput from '../components/GainInput.vue'
export default {
  name: 'RegistrationInfo',

  components: { Index, MaterialCard, GetInput },
  //   components: { GainInput },
  data: function () {
    return {
      Registrations: [],
      showModal: false,
    }
  },
  computed: {
    jwt: sync('app/jwt'),
  },
  methods: {
    GetAllRegistrations() {
      console.log("got it! jwt is", this.jwt)
      const outerthis = this
      axios({
        method: 'get',
        url: '/registration',
        headers: {
          'Authorization': `bearer ${this.jwt}`
        },
      })
        .then(function (response) {
          outerthis.Registrations = response.data;
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
  }
}
</script>

<style scoped>
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
  top: 100px;
  left: 300px;
  width: calc(100% - 600px);
  height: calc(100% - 200px);
  z-index: 2
}

.button {
  background-color: #4CAF50;
  /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s;
  /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
}

.button1:hover {
  background-color: #4CAF50;
  color: white;
}

.button2 {
  background-color: white;
  color: black;
  border: 2px solid #008CBA;
}

.button2:hover {
  background-color: #008CBA;
  color: white;
}


/* 输入框 */
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
}

.wrapper {
  width: 850px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.wrapper .input-data {
  width: 100%;
  height: 40px;
  position: relative;
}

.wrapper .input-data input {
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 2px solid silver;
  font-size: 17px;
}

.input-data input:focus~label,
.input-data input:valid~label {
  transform: translateY(-20px);
  font-size: 15px;
  color: #4158D0;
}

.wrapper .input-data label {
  position: absolute;
  bottom: 10px;
  left: 0;
  color: grey;
  pointer-events: none;
  transition: all 0.3s ease;
}

.wrapper .input-data .underline {
  position: absolute;
  bottom: 0px;
  height: 2px;
  width: 100%;
}

.input-data .underline:before {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background: #4158D0;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.input-data input:focus~.underline:before,
.input-data input:valid~.underline:before {
  transform: scaleX(1);
}
</style>
