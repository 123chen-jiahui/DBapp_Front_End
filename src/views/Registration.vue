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

          <!-- <v-list>
            <v-list-item-group v-model="departmentPointer" :multiple="multiple" :mandatory="mandatory" color="indigo">
              <v-list-item v-for="(item) in departments" :key="item.id" @input="GetPagesAndShowStaff">

                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list> -->

          <v-list>
            <v-list-item-group v-model="departmentPointer" :multiple="multiple" :mandatory="mandatory" color="indigo">
              <v-list-item v-for="(item) in departmentsDetail" :key="item.id" @input="changeStaffChosen">

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
              <v-list-item v-for="(item, index) in staffChosen" :key="item.id">

                <v-list-item-content>
                  <el-descriptions class="margin-top" :column="3" :size="mini" border>
                    <el-descriptions-item>
                      <template slot="label">
                        <i class="el-icon-user"></i>
                        姓名
                      </template>
                      {{ item.name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        员工编号
                      </template>
                      {{ item.id }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        职位
                      </template>
                      {{ item.position }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template slot="label">
                        <i class="el-icon-tickets"></i>
                        照片
                      </template>
                      <!-- <el-tag size="small">学校</el-tag> -->
                      <div>
                        <img height="50px" width="35px"
                          :src="`https://tongjihospital-data.oss-cn-shanghai.aliyuncs.com/${item.photo}`">
                      </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template slot="label">
                        <i class="el-icon-office-building"></i>
                        专长及简介
                      </template>
                      {{ item.skilled }}
                    </el-descriptions-item>
                  </el-descriptions>

                  <RegistrationBoard :Staff="staffChosen[index]" />
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


      departmentsDetail: [
        {
          id: ''
        }
      ],
      staffChosen: [
        {
          id: ''
        }
      ],
    }
  },
  computed: {
    // staffChosen: function() {
    //   return this.departmentsDetail[this.departmentPointer].staff
    // }
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
    GetDepartmentsDetail() {
      const outerthis = this
      axios({
        method: 'get',
        url: '/department/detail',
      }).then(function (response) {
        outerthis.departmentsDetail = response.data
      }).catch(function (error) {
        alert('what')
        // outerthis.showMessage('获取科室信息失败', 'error')
        outerthis.showError(error, '获取科室信息失败', outerthis)
      })
    },
    async changeStaffChosen() {
      this.staffChosen = this.departmentsDetail[this.departmentPointer].staff
    },
    SayHello() {
      // this.showMessage('hello')
      console.log(this.departmentPointer)
    },
    async GetPagesAndShowStaff() {
      let self = this
      this.pageNumber = 1
      new Promise(function (resolve, reject) {
        console.log('hello')
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
    // 一上来就获取所有数据，并且
    // this.GetDepartments()
    this.GetDepartmentsDetail()
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


