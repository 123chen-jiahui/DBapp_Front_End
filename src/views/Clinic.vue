<!-- 刚进入网页的时候，获取waitline，以及所有病人的基本信息，诊疗记录 -->
<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div>
          <v-card class="mx-auto" max-width="700">
            <v-list>
              <v-list-item-group v-model="model" :multiple="multiple" :mandatory="mandatory" color="indigo">
                <v-list-item v-for="(item, index) in items" :key="item.icon">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-content @click="SetState(index)">
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
        <div class="interval"></div>

        <!-- 这里是工作面板 -->
        <!-- 分成四种情况，分别对应三个按钮和什么都不选 -->

        <!-- 诊断结果 -->

        <v-card v-if="(state === 2)" class="mx-auto" max-width="700">
          <div>
            <headers title="新建记录"></headers>
            <div class="text-area">
              <textarea v-model="message" placeholder="请输入诊断结果...">

            </textarea>
            </div>
          </div>
          <div style="text-align:center">
            <v-btn color="primary" @click="CommitDiagnosisResult">提交</v-btn>
            &nbsp;
            <v-btn color="primary" @click="Referral">转诊</v-btn>
          </div>
        </v-card>

        <!-- 编辑处方 -->
        <v-card v-if="(state === 0)" class="mx-auto" max-width="700">
          <!-- 当前任务：搜索框 -->
          <v-row>
            <v-col cols="6">

              <v-card max-width="350">
                <div class="text-length">
                  <v-text-field v-model="keyword" clearable label="药品名" type="text">
                    <template v-slot:append>
                      <v-fade-transition leave-absolute>
                        <v-progress-circular v-if="loading" size="15" color="info" indeterminate></v-progress-circular>
                      </v-fade-transition>
                    </template>
                    <template v-slot:append-outer>
                      <v-btn color="primary" @click="GetPageCountAndSearchMedicine">
                        <v-icon>mdi-button</v-icon>
                        查询
                      </v-btn>
                    </template>
                  </v-text-field>
                </div>
                <!-- 以下是搜索得到的药品列表 -->
                <v-card v-if="medicineSearchedLength" class="mx-auto" max-width="350">
                  <v-list>
                    <v-list-item-group :multiple="multiple" :mandatory="mandatory" color="indigo">
                      <v-list-item v-for="(item, index) in medicineSearched" :key="item.id">

                        <v-list-item-content>
                          <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-icon>
                          <v-icon v-text="'mdi-playlist-plus'" @click="NewAddToShoppingCart(index)"></v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>

                  <!-- 分页 -->
                  <div class="text-center">
                    <v-pagination v-model="pageNumber" :length="pageCount" prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right" @input="onPageChange">
                    </v-pagination>
                  </div>
                </v-card>
                
              </v-card>

            </v-col>

            <v-col cols="6">

              <v-card max-width="350">
                当前处方列表：
                <v-list>
                  <v-list-item-group :multiple="multiple" :mandatory="mandatory" color="indigo">
                    <v-list-item v-for="(item, index) in current_shoppingCart" :key="item.id">

                      <v-list-item-content @click="Sayhello()">
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-icon>
                        <v-icon v-text="'mdi-trash-can-outline'" @click="NewRemoveFromShoppingCart(index)"></v-icon>
                      </v-list-item-icon>
                    </v-list-item>

                  </v-list-item-group>
                </v-list>
                <div style="text-align:center">
                  <v-btn color="primary" @click="NewGenerateOrder">生成订单</v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>


        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <app-card class="mt-4 text-center">

          <v-card-text class="text-center">
            <h6 class="text-h6 mb-2 text--secondary">
              病人信息
            </h6>

            <h4 class="text-h4 mb-3 text--primary">
              {{  current_patient.patient.name  }}
            </h4>

            <p class="text--secondary">
              年龄：{{  current_patient.patient.age  }}
            </p>
            <p class="text--secondary">
              性别：{{  current_patient.patient.gender  }}
            </p>
            <p v-if="current_patient.patient.medicalRecords.length" class="text--secondary">
              <!-- <v-btn>获取病史</v-btn> -->
              以往病史：
              <!-- <p v-for="(item, index) in patient.medicalRecords" :key="item.id">
                {{item.}}
              </p> -->
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text">
                      诊疗时间
                    </th>
                    <th class="primary--text">
                      医生Id
                    </th>
                    <th class="text-right primary--text">
                      诊疗结果
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item) in current_patient.patient.medicalRecords" :key="item.id">
                    <td>{{  item.diagnosisTime.slice(0, 10)  }}</td>
                    <td>{{  item.staffId  }}</td>
                    <td class="text-right">{{  item.diagnosticResult  }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <!-- <p>hello world</p> -->
              <!-- {{patient.medicalRecords[0].diagnosticResult}} -->
            </p>
            <v-btn v-if="!IsFirstOne()" class="mr-0" color="primary" min-width="100" rounded @click="LastOne">
              上一个
            </v-btn>
            <v-btn v-if="!IsLastOne()" class="mr-0" color="primary" min-width="100" rounded @click="NextOne">
              下一个
            </v-btn>
          </v-card-text>
        </app-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { type } from 'os'
export default {

  name: 'UserProfileView',

  data: () => ({
    items: [
      {
        icon: 'mdi-pill-multiple',
        text: '编辑处方',
      },
      {
        // icon: 'mdi-needle',
        // text: '编辑医疗项目',
        icon: '',
        text: '',
      },
      {
        icon: 'mdi-book-open-outline',
        text: '编辑诊断结果'
      },
      {
        // icon: 'mdi-hospital-box-outline',
        // text: '编辑手术',
        icon: '',
        text: '',
      },
    ],
    message: '',
    state: -1,
    waitLine: [], // 病人队列
    patientPointer: 0, // 表示当前是第0个病人
    day: (new Date).getDay(), // 表示今天星期几
    medicineSearched: [], // 表示搜索药品的返回结果
    medicine: {}, // 表示选中的药物是什么
    shoppingCart: {},
    patient: {},
    medicalRecords: [],

    keyword: '',
    model: 1,
    multiple: false,
    mandatory: false,
    flat: false,
    dense: false,
    count: 4,

    // 分页
    pageNumber: 1,
    pageSize: 5,
    pageCount: 0,

    token: '',

    current_shoppingCart: [], // 数组，里面的元素是药品Id和药品名
  }),
  computed: {
    patientId: function () { // 计算属性用函数表示
      return this.waitLine[this.patientPointer].patientId
    },
    medicineSearchedLength: function () {
      return this.medicineSearched.length
    },

    current_name: function () {
      return this.patient.name
    },


    current_patient: function() {
      return this.waitLine[this.patientPointer]
    }
  },
  methods: {
    Referral() {
      this.message += '\n-----------------------------------------------------\n由同济社区医院转诊至'
    },
    async onPageChange(page) {
      const outerthis = this
      axios({
        method: 'get',
        url: `medicine`,
        params: {
          keyWord: this.keyword,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
      }).then(function (response) {
        console.log(response.data)
        outerthis.medicineSearched = response.data
      }).catch(function (error) {
        outerthis.showError(error, '获取信息失败！', outerthis)
      })
    },
    Sayhello() {
      alert('hello')
      return
      console.log('olleh')
    },
    GetWaitLineDetail() {
      const outerthis = this
      const rLoading = this.openLoading();
      axios({
        method: 'get',
        url: `/waitline/detail/${this.day}`,
      }).then(function(response) {
        rLoading.close()
        // if (response.data.length === 0) {
          // outerthis.showMessage('暂无诊断队列', 'warning')
        // } else {
          outerthis.showMessage('获取病人信息成功！')
          outerthis.waitLine = response.data
        // }
      }).catch(function(error) {
        rLoading.close()
        outerthis.showError(error, '获取信息失败', outerthis)
      })
    },
    GetWaitLine(resolve) {
      const outerthis = this
      axios({
        method: 'get',
        url: `/waitline/${this.day}`,
      })
        .then(function (response) {
          outerthis.showMessage('获取病人信息成功！')
          outerthis.waitLine = response.data
          resolve()
        })
        .catch(function (error) {
          outerthis.showError(error, '获取信息失败', outerthis)
        })
    },
    SetState(i) {
      this.state = i
      if (i === 0) { // 医生点击“编辑处方”，会获得病人购物车
        this.GetShoppingCart()
      }
    },
    CommitDiagnosisResult() {
      // 由于api还没有写，所以这段先注释掉
      const outerthis = this
      const decode = jwtDecode(this.token)
      const staffId = decode['sub']

      axios({
        method: 'post',
        url: '/api/medicalRecord',
        data: {
          PatientId: this.current_patient.patientId,
          StaffId: staffId,
          DiagnosticResult: this.message,
        }
      })
        .then(function (response) {
          outerthis.showMessage('诊断结果提交成功！')
        })
        .catch(function (error) {
          outerthis.showError(error, '诊断结果提交失败！', outerthis)
        })
    },
    GetShoppingCart() {
      const outerthis = this
      axios({
        method: 'get',
        url: `/api/shoppingCart/${this.patientId}`,
      })
        .then(function (response) {
          outerthis.shoppingCart = response.data
          console.log(outerthis.shoppingCart)
        })
        .catch(function (error) {
          outerthis.showError(error, '获取病人处方信息失败！', outerthis)
        })
    },
    GetPatient() {
      const outerthis = this
      axios({
        method: 'get',
        url: `/patients/detail/${this.patientId}`,
      }).then(function (response) {
        outerthis.patient = response.data
        // return response.data
      }).catch(function (error) {
        outerthis.showError(error, '获取病人信息失败！', outerthis)
      })
    },
    GetMedicalRecord() {
      const outerthis = this
      axios({
        method: 'get',
        url: `api/medicalRecord/${this.patientId}`,
      }).then(function (response) {
        outerthis.medicalRecords = response.data
      }).catch(function (error) {
        outerthis.showError(error, '获取病人诊断记录失败！', outerthis)
      })
    },
    GetPages(resolve) {
      const outerthis = this
      axios({
        methods: 'get',
        url: `/medicine/count`,
        params: {
          keyWord: this.keyword,
        },
      }).then(function (response) {
        outerthis.pageCount = Math.ceil((response.data / outerthis.pageSize)) // 向上取整有几页
        resolve()
      }).catch(function (error) {
        outerthis.showError(error, '获取页面数失败！', outerthis)
      })
    },
    SearchMedicine() {
      const outerthis = this
      axios({
        method: 'get',
        url: `medicine`,
        params: {
          keyWord: this.keyword,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
      })
        .then(function (response) {
          console.log(response.data)
          outerthis.medicineSearched = response.data
        })
        .catch(function (error) {
          outerthis.showError(error, '获取信息失败！', outerthis)
        })
    },
    async GetPageCountAndSearchMedicine() {
      let self = this
      new Promise(function (resolve, reject) {
        this.GetPages(resolve)
      }.bind(this)).then(function () {
        self.SearchMedicine()
      })
    },
    NewAddToShoppingCart(i) {
      let item = {
        id: this.medicineSearched[i].id,
        name: this.medicineSearched[i].name,
      }
      this.current_shoppingCart.push(item)
    },
    AddToShoppingCart(i) { // 发送http请求，成功后调用GetShoppingCart函数来重新获取购物车
      // this.shoppingCart.push(this.medicineSearched[i])
      const outerthis = this
      axios({
        method: 'post',
        url: `api/shoppingCart/items/${this.patientId}`,
        data: {
          Id: this.medicineSearched[i].id,
        },
      })
        .then(function (response) {
          console.log('helloworld')
          outerthis.shoppingCart = response.data
          console.log(outerthis.shoppingCart)
          outerthis.showMessage('添加处方成功！')
        })
        .catch(function (error) {
          outerthis.showError(error, '添加处方失败！', outerthis)
        })
    },
    NewRemoveFromShoppingCart(i) {
      this.current_shoppingCart.splice(i, 1)
    },
    RemoveFromShoppingCart(i) {
      const outerthis = this
      axios({
        method: 'delete',
        url: `/api/shoppingCart/items/${this.patientId}/${this.shoppingCart.shoppingCartItems[i].id}`,
      })
        .then(function (response) {
          outerthis.showMessage('删除药品成功！')
          // 两种方法都可以，这里采用第1种
          outerthis.shoppingCart = outerthis.GetShoppingCart()
          // outerthis.shoppingCart.shoppingCartItems.splice(i, 1)
        })
        .catch(function (error) {
          outerthis.showError(error, '删除药品失败！', outerthis)
        })
    },
    NewGenerateOrder() {
      if (this.current_shoppingCart.length === 0) {
        this.showMessage('购物车为空，不能生成订单！', 'warning')
        return
      }
      const outerthis = this
      // 将数据加入
      let params = []
      this.current_shoppingCart.forEach(element => {
        params.push(element.id)
      })
      axios({
        method: 'post',
        url: `/api/orders/${this.current_patient.patientId}`,
        data: {
          medicineId: params,
        }
      }).then(function(response) {
        outerthis.showMessage('订单创建成功！')
        // 清空购物车
        outerthis.current_shoppingCart = []
      }).catch(function(error) {
        outerthis.showError(error, '订单生成失败！', outerthis)
      })
    },
    GenerateOrder() {
      if (this.shoppingCart.shoppingCartItems.length === 0) {
        this.showMessage('购物车为空，不能生成订单！', 'warning')
        return
      }
      const outerthis = this
      axios({
        method: 'post',
        url: `/api/shoppingCart/checkout/${this.patientId}`,
      }).then(function () {
        outerthis.showMessage('订单创建成功！')

        // 订单创建成功后需要将购物车清空
        // 两种方法可以将购物车清空
        // 一种是重新获取购物车
        // 另一种是手动清空本地变量
        // 这里采用的是第一种方法，比较保险，虽然效率比较低

        // outerthis.shoppingCart = outerthis.GetShoppingCart()
        outerthis.shoppingCart = {}
      }).catch(function (error) {
        outerthis.showError(error, '订单生成失败！', outerthis)
      })
    },
    IsFirstOne() {
      return (this.patientPointer === 0) ? true : false
    },
    IsLastOne() {
      return (this.patientPointer === this.waitLine.length - 1) ? true : false
    },
    NextOne() {
      if (!this.IsLastOne()) {
        this.patientPointer += 1
        // this.GetShoppingCart()
        // this.GetPatient()
        // this.GetMedicalRecord()
      }
    },
    LastOne() {
      if (!this.IsFirstOne()) {
        this.patientPointer -= 1
        // this.GetShoppingCart()
        // this.GetPatient()
        // this.GetMedicalRecord()
      }
    }
  },
  async created() {
    // 一上来就获取所有的数据
    this.token = localStorage.getItem('token')
    this.GetWaitLineDetail();


    // let self = this
    // new Promise(function (resolve, reject) {
    //   this.GetWaitLine(resolve)
    // }.bind(this)).then(function () {
    //   self.GetPatient()
    // })
  }
}
</script>

<style scoped>
.interval {
  height: 30px;
}

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

.text-length {
  width: 70%;
  margin: auto;
}

.card-left {
  margin: left;
}

.card-all {
  width: 100%;
}

.button-middle {
  margin: right;
}
</style>
