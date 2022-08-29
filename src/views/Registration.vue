<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="700">
          <!-- <v-card-title>科室一览</v-card-title> -->
          <!-- <v-divider></v-divider> -->
          <v-toolbar color="primary" dark>
            <v-toolbar-title>科室一览</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-item-group v-model="departmentPointer" :multiple="multiple" :mandatory="mandatory" color="indigo">
              <v-list-item v-for="(item) in departments" :key="item.id" @input="GetPagesAndShowStaff">

                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card v-if="departmentPointer != -1" class="mx-auto" max-width="700">

          <v-toolbar color="primary" dark>
            <v-toolbar-title>选择医生</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-item-group v-model="model2" :multiple="multiple2" :mandatory="mandatory2" color="indigo">
              <v-list-item v-for="(item, index) in staff" :key="item.id">

                <v-list-item-content>
                  <el-descriptions class="margin-top" :column="3" :size="small" border>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-user"></i>
                      姓名
                    </template>
                    {{item.name}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-mobile-phone"></i>
                      员工编号
                    </template>
                    {{item.id}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-location-outline"></i>
                      职位
                    </template>
                    {{item.position}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-tickets"></i>
                      照片
                    </template>
                    <!-- <el-tag size="small">学校</el-tag> -->
                    <div>
                      <img height="50px" width="40px"
                      :src="`https://tongjihospital-data.oss-cn-shanghai.aliyuncs.com/${item.photo}`">
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      <i class="el-icon-office-building"></i>
                      专长及简介
                    </template>
                    {{item.skilled}}
                  </el-descriptions-item>
                </el-descriptions>
                  <!-- <p>姓名：{{item.name}}</p>
                  <p>Id：{{item.id}}</p>
                  <p>年龄：{{item.age}}</p> -->
                  <!-- <div>
                    <img height="50px" width="40px"
                      :src="`https://tongjihospital-data.oss-cn-shanghai.aliyuncs.com/${item.photo}`">
                  </div>
                  <v-list-item-title v-text="'姓名：' + item.name"></v-list-item-title>
                  <v-list-item-title v-text="'Id：' + item.id"></v-list-item-title>
                  <v-list-item-title v-text="'年龄：' + item.age"></v-list-item-title>
                  <v-list-item-title v-text="'职位：' + item.position"></v-list-item-title>
                  <v-list-item-title v-text="'擅长：' + item.skilled"></v-list-item-title>
                  <v-list-item-title v-text="'简介：' + item.introduction"></v-list-item-title> -->
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

      model2: 1,
      multiple: false,
      multiple2: false,
      mandatory: false,
      mandatory2: false,

      pageNumber: 1,
      pageSize: 2,

      pageCount: 0,

      size: '',
    }
  },
  methods: {
    async onPageChange() {
      const outerthis = this
      axios({
        method: 'get',
        url: `/staff/${outerthis.departments[this.departmentPointer].id}`,
        params: {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
      }).then(function (response) {
        outerthis.staff = response.data
      }).catch(function (error) {
        outerthis.showError(error, '获取医生失败！', outerthis)
      })
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
    async GetPagesAndShowStaff() {
      let self = this
      this.pageNumber = 1
      new Promise(function (resolve, reject) {
        this.GetPages(resolve)
      }.bind(this)).then(function () {
        self.ShowStaff()
      })
    },
    GetPages(resolve) {
      const outerthis = this
      axios({
        methods: 'get',
        url: `/staff/${this.departments[this.departmentPointer].id}/count`,
      }).then(function (response) {
        outerthis.pageCount = Math.ceil((response.data / outerthis.pageSize)) // 向上取整有几页
        resolve()
      }).catch(function (error) {
        outerthis.showError(error, '获取页面数失败！', outerthis)
      })
    },
    ShowStaff() {
      const outerthis = this
      axios({
        method: 'get',
        url: `/staff/${outerthis.departments[this.departmentPointer].id}`,
        params: {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        }
      }).then(response => {
        outerthis.staff = response.data;
      })
    },
    ShowInfo() {
      console.log("hello");
      let outerthis = this;
      axios({
        method: 'get',
        url: `/staff/${outerthis.departments[this.departmentPointer].id}`,
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

<style scoped>
.total {
  height: 200px;
  width: 200px;
}

.location_left {
  float: left;
  width: 40px;
}

.location_left2 {
  float: left;
  width: 100px;
}
</style>


