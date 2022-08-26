<template>
  <div id="joboff-main">
    <el-descriptions v-for="(item, index) in jobofflist" :key="item.id" class="margin-top" :title="'离职申请' + (index + 1)"
      :column="2 + (showbutton ? 0 : 1)" border>
      <!-- 按钮 批准/拒绝 -->
      <template #extra v-if="showbutton">
        <el-button type="primary" @click="allowOrReject(index, 1)">准允</el-button>
        <el-button type="danger" @click="allowOrReject(index, 2)">再议</el-button>
      </template>
      <!-- 离职信息 -->
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <i class="el-icon-user"></i>
            离职人
          </div>
        </template>
        {{ item.staffId }}
      </el-descriptions-item>
      <!-- 离职日期 -->
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <i class="el-icon-time"></i>
            离职时间
          </div>
        </template>
        {{ item.time.split("T")[0] }}
      </el-descriptions-item>
      <!-- 是否批准 -->
      <el-descriptions-item v-if="!showbutton">
        <template #label>
          <div class="cell-item">
            <i class="el-icon-question"></i>
            审批结果
          </div>
        </template>
        {{ item.state }}
      </el-descriptions-item>
      <!-- 离职缘由 -->
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <i class="el-icon-tickets"></i>
            离职缘由
          </div>
        </template>
        {{ item.reason }}
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="default" @click="showHistory()">查看历史记录</el-button>
  </div>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      jobofflist: [],
      showbutton: true,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDAwMDIwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiRG9jdG9yIiwibmJmIjoxNjYxMzQ1OTA5LCJleHAiOjE2NjQwMjQzMDksImlzcyI6IlRvbmdqaUhvc3BpdGFsLmNvbSIsImF1ZCI6IlRvbmdqaUhvc3BpdGFsLmNvbSJ9.4ZMFemcKupqc8MabmhSLGEmK_DhBbs1tyQ2YZM-Wb5Y",
    };
  },
  methods: {
    // 批准离职/拒绝离职申请
    allowOrReject(index, state) {
      let outerthis = this;
      axios({
        method: "post",
        url: "/api/resign/approve",
        data: {
          Id: outerthis.jobofflist[index].id,
          State: state,
        },
        headers: {
          Authorization: `bearer ${this.jwt}`,
        },
      })
        .then(() => {
          outerthis.$message({
            message: "操作成功",
            type: "success",
          });
          outerthis.jobofflist.splice(index, 1);
        })
        .catch(() => {
          outerthis.$message({
            message: "操作失败",
            type: "error",
          });
        });
    },
    // 展示历史申请记录
    showHistory() {
      let outerthis = this;
      axios({
        method: "get",
        url: "/api/resign/history",
        headers: {
          Authorization: `bearer ${this.jwt}`,
        },
      })
        .then(function (response) {
          outerthis.showbutton = false;
          outerthis.jobofflist = response.data;
          if (outerthis.jobofflist.length === 0) {
            outerthis.$message({
              message: "未查询到历史记录",
              type: "warning",
            });
          }
        })
        .catch(function () {
          outerthis.$message({
            message: "查询失败",
            type: "error",
          });
        });
    },
    // 查看带审批记录
    showOffList() {
      let outerthis = this;
      axios({
        method: "get",
        url: "/api/resign/approveList",
        headers: {
          Authorization: `bearer ${this.jwt}`,
        },
      })
        .then(function (response) {
          outerthis.showbutton = true;
          outerthis.jobofflist = response.data;
          console.log("获取待审批离职申请成功", response.data);
        })
        .catch(function (error) {
          outerthis.$message({
            message: "网络请求失败",
            type: "error",
          });
          console.log("获取待审批离职申请失败", error);
        });
    },
  },
  mounted: function () {
    this.showbutton = true;
    this.showOffList();
  },
  computed: {
    // jwt: sync('app/jwt')
  }
};
</script>

<style>
#joboff-main {
  width: 100%;
}

.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}
</style>