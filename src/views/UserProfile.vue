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

        <v-card v-if="(state === 1)" class="mx-auto" max-width="700">
          <div>
            <headers title="新建记录"></headers>
            <div class="text-area">
              <textarea v-model="message" placeholder="请输入诊断结果...">

            </textarea>
            </div>
          </div>
          <div style="text-align:center">
            <v-btn color="primary" @click="CommitDiagnosisResult">提交</v-btn>
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
                      <v-btn color="primary" @click="SearchMedicine">
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
                      <v-list-item v-for="(item) in medicineSearched" :key="item.id">

                        <v-list-item-content @click="Sayhello()">
                          <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-icon>
                          <v-icon v-text="'mdi-playlist-plus'"></v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
                <!-- <v-list>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        止咳糖浆
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        清热止咳
                      </v-list-item-subtitle>
                      <v-btn>
                        hello
                      </v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-list> -->
                hello world
                要素：搜索框输入药品关键词，按钮点击显示查找结果，查找结果中也有按钮，可以点击添加，
                还有有一个列表显示当前选择的药品信息，每个都有个按钮表示删除。最后有个生成订单按钮
              </v-card>

            </v-col>

            <v-col cols="6">

              <v-card max-width="350">
                当前处方列表：
                <v-list>
                    <v-list-item-group :multiple="multiple" :mandatory="mandatory" color="indigo">
                      <v-list-item v-for="(item) in medicineSearched" :key="item.id">

                        <v-list-item-content @click="Sayhello()">
                          <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-icon>
                          <v-icon v-text="'mdi-playlist-plus'"></v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
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
              这里填病人姓名
            </h4>

            <p class="text--secondary">
              这里多行显示病人的年龄、性别。再用一段话介绍以往病史
            </p>

            <v-btn class="mr-0" color="primary" min-width="100" rounded>
              上一个
            </v-btn>
            <v-btn class="mr-0" color="primary" min-width="100" rounded>
              下一个
            </v-btn>
          </v-card-text>
        </app-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { sync } from 'vuex-pathify'
import axios from 'axios'
export default {

  name: 'UserProfileView',

  data: () => ({
    items: [
      {
        icon: 'mdi-pill-multiple',
        text: '编辑处方',
      },
      {
        icon: 'mdi-needle',
        text: '编辑医疗项目',
      },
      {
        icon: 'mdi-book-open-outline',
        text: '编辑诊断结果'
      },
      {
        icon: 'mdi-hospital-box-outline',
        text: '编辑手术'
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

    keyword: '',
    model: 1,
    multiple: false,
    mandatory: false,
    flat: false,
    dense: false,
    count: 4,
  }),
  computed: {
    jwt: sync('app/jwt'),
    patientId: function () { // 计算属性用函数表示
      return this.waitLine[this.patientPointer].patientId
    },
    medicineSearchedLength: function() {
      return this.medicineSearched.length
    },
  },
  methods: {
    Sayhello() {
      alert('hello')
    },
    GetWaitLine() {
      const outerthis = this
      axios({
        method: 'get',
        url: `/waitline/${this.day}`,
        headers: {
          'Authorization': `bearer ${this.jwt}`,
        },
      })
        .then(function (response) {
          console.log(response.data)
          alert('获取病人信息成功！')
          outerthis.waitLine = response.data
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            alert('用户信息过期，请重新登录')
            outerthis.$router.push({ name: 'Login' })
          } else {
            alert('获取信息失败！' + error.response.data)
          }
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
      // const outerthis = this
      // axios({
      //   method: 'post',
      //   url: '/xxxxxxxx',
      //   headers: {
      //     'Authorization': `breaer ${this.jwt}`,
      //   },
      // })
      // .then(function(response) {
      //   alert("诊断结果提交成功！")
      // })
      // .catch(function (error) {
      //   if (error.response.status === 401) {
      //     alert('用户信息过期，请重新登录')
      //     outerthis.$router.push({name: 'Login'})
      //   } else {
      //     alert('诊断结果提交失败！' + error.message)
      //   }
      // })

      alert('hello world')
    },
    GetShoppingCart() {
      const outerthis = this
      axios({
        method: 'get',
        url: `/api/shoppingCart/${this.patientId}`,
        headers: {
          'Authorization': `bearer ${this.jwt}`,
        },
      })
      .then(function(response) {
        // console.log(response.data)
        outerthis.shoppingCart = response.data
        console.log(outerthis.shoppingCart)
      })
      .catch(function(error) {
        if (error.response.status === 401) {
            alert("用户信息过期，请重新登录")
            outerthis.$router.push({ name: 'Login' })
        } else {
            alert("获取病人处方信息失败！" + error.message)
        }
      })
    },
    SearchMedicine() {
      const outerthis = this
      axios({
        method: 'get',
        url: `medicine`,
        params: {
          keyWord: this.keyword,
        },
        headers: {
          'Authorization': `bearer ${this.jwt}`,
        }
      })
        .then(function (response) {
          console.log(response.data)
          outerthis.medicineSearched = response.data
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            alert('用户信息过期，请重新登录')
            outerthis.$router.push({ name: 'Login' })
          } else {
            alert('获取信息失败！' + error.data + error.message)
          }
        })
    },
    AddToShoppingCart(i) {
      this.shoppingCart.push(this.medicineSearched[i])
      axios.push
    }
  },
  created() {
    this.GetWaitLine();
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
</style>
