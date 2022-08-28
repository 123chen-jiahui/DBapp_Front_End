<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mx-auto" max-width="700">
          <!-- <v-card-title>科室一览</v-card-title> -->
          <!-- <v-divider></v-divider> -->
          <v-toolbar color="primary" dark>
            <v-toolbar-title>科室一览</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-item-group v-model="model" :multiple="multiple" :mandatory="mandatory" color="indigo">
              <v-list-item v-for="(item, index) in departments" :key="item.id">

                <v-list-item-content @click="ShowInfo(index)">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card v-if="departmentPointer != -1" class="mx-auto" max-width="700">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>选择医生</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-item-group v-model="model2" :multiple="multiple2" :mandatory="mandatory2" color="indigo">
              <v-list-item v-for="(item, index) in staff" :key="item.id">

                <v-list-item-content>
                  <!-- <p>姓名：{{item.name}}</p>
                  <p>Id：{{item.id}}</p>
                  <p>年龄：{{item.age}}</p> -->
                  <v-list-item-title v-text="'姓名：' + item.name"></v-list-item-title>
                  <v-list-item-title v-text="'Id：' + item.id"></v-list-item-title>
                  <v-list-item-title v-text="'年龄：' + item.age"></v-list-item-title>
                  <RegistrationBoard :StaffId="staff[index].id" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <div class="text-center">
            <v-pagination v-model="pageNumber" :length="pageCount" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"
              @input="onPageChange">
            </v-pagination>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <div class="main">
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
  </div> -->
</template>

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

      model: 1,
      model2: 1,
      multiple: false,
      multiple2: false,
      mandatory: false,
      mandatory2: false,

      pageNumber: 1,
      pageSize: 4,

      paceCount: 0,
    }
  },
  methods: {
    async onPageChange(page) {
      console.log(page)
    },
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
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        }
      }).then(response => {
        outerthis.staff = response.data;
      })
    }
  },
  created() {
    this.GetDepartments()
  }
}
</script>


