<template>
  <div class="main">
      <div class="left">
        <div class="app">
          <button class="appHeader" v-on:click="GetDepartments">
            <h2>科室一览</h2>
          </button>
          <div class="robotList">
            <div v-for="(item, index) in departments" :key="item.id">
              <div class="cardContainer" v-on:click="ShowInfo(index)">
                {{ index + 1 }} {{ item.name }} {{ item.id }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <h2>科室介绍</h2>
        <div v-if="departmentPointer != -1">
          <h3>当前科室：{{ departments[departmentPointer].name }}</h3>
          <h3>科室位置：{{ departments[departmentPointer].building }}</h3>
          <h3>联系电话：{{ departments[departmentPointer].phone }}</h3>
          <h3>以下是可预约医生</h3>
          <div calss="robotList">
            <div v-for="(item, index) in staff" :key="item.name">
              <div class="cardContainer">
                {{ index }} {{ item.name }} {{ item.age }}
                <RegistrationBoard :StaffId="staff[index].id" />
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
.main {
  height: 800px;
  width: 1500px;
  background-color: pink;
}

.left {
  height: 800px;
  width: 800px;
  border: 5px;
  float: left;
}

.right {
  height: 800px;
  width: 300px;
  float: left;
}

.app {
  text-align: center;
}

.appHeader {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  margin-bottom: 24px;
}

h1 {
  font-family: 'Slidefu';
  font-size: 72px;
}

.appLogo {
  height: 10vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .appLogo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.robotList {
  /* 控制每个格子的宽度 */
  width: 50vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* 控制每个格子的间隔 */
  grid-gap: 20px;
}

.container {
  height: 500px;
  width: 1000px;
  background-color: pink;
}

.departmentsArea {
  height: 400px;
  width: 1000px;
  background-color: green;
}

.departmentCard {
  height: 50px;
  width: 100px;
  background-color: brown;
  float: left;
}

.cardContainer {
  display: flex;
  flex-direction: column;
  background-color: #00BDAB;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 25px;
  cursor: pointer;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
}

.cardContainer:hover {
  transform: scale(1.05);
}

.aa {
  margin: auto;
  height: auto;
  width: 50%;
}
</style>
<script>
import axios from 'axios'
import RegistrationBoard from '../components/RegistrationBoard.vue'
export default {
  name: 'Registration',

  components: { RegistrationBoard },
  data: function () {
    return {
      departments: [],
      staff: [],
      departmentPointer: -1,
    }
  },
  methods: {
    GetDepartments() {
      let outerthis = this;
      axios.get('/department')
        .then(response => {
          console.log(response.data);
          outerthis.departments = response.data;
        })
    },
    SayHello() {
      console.log("hello");
    },
    ShowInfo(i) {
      this.departmentPointer = i;
      console.log("hello");
      let outerthis = this;
      axios({
        method: 'get',
        url: `/staff/${outerthis.departments[i].id}`,
        params: {
          pageNumber: 1,
          pageSize: 2,
        }
      }).then(response => {
        outerthis.staff = response.data;
      })
    }
  }
}
</script>


