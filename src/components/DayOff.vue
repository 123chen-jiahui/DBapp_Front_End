<template>
  <div id="dayoff-main">
    <el-descriptions v-for="(item, index) in approvelist" :key="item.id" class="margin-top"
      v-bind:title="'请假单' + (index + 1)" :column="2 + (showbutton ? 0 : 1)" border>
      <!-- 两个按钮 -->
      <template #extra v-if="showbutton">
        <el-button type="primary" @click="allowOrReject(index, 1)">批准</el-button>
        <el-button type="danger" @click="allowOrReject(index, 2)">拒绝</el-button>
      </template>
      <!-- 申请人 -->
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <i class="el-icon-user"></i>
            申请人
          </div>
        </template>
        {{ item.staffId }}
      </el-descriptions-item>
      <!-- 请假时间 -->
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <i class="el-icon-time"></i>
            起讫时间
          </div>
        </template>
        {{ item.fromTime.split("T")[0] + " 至 " + item.toTime.split("T")[0] }}
      </el-descriptions-item>
      <!-- 是否准允 -->
      <el-descriptions-item v-if="!showbutton">
        <template #label>
          <div class="cell-item">
            <i class="el-icon-tickets"></i>
            审批结果
          </div>
        </template>
        {{ item.state }}
      </el-descriptions-item>
      <!-- 缘由 -->
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <i class="el-icon-tickets"></i>
            申请缘由
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

export default {
  name: 'DayOff',
  data() {
    return {
      approvelist: [],
      noHistory: true,
      showbutton: true,
    };
  },
  methods: {
    getapproveList() {
      let outerthis = this;
      const rLoading = this.openLoading()
      axios({
        method: "get",
        url: "/break/approveList",
      })
        .then(function (response) {
          rLoading.close()
          outerthis.showbutton = true;
          outerthis.approvelist = response.data;
          if (outerthis.approvelist.length === 0) {
            outerthis.$message({
              message: "未查询到待处理请假申请",
              type: "warning",
            });
          }
          console.log("获取待处理请假记录成功", outerthis.approvelist);
        })
        .catch(function () {
          rLoading.close()
          outerthis.$message({
            message: "请求出错",
            type: "error",
          });
        });
    },
    allowOrReject(index, state) {
      let outerthis = this;
      axios({
        method: "post",
        url: "/break/approve",
        data: {
          Id: outerthis.approvelist[index].id,
          State: state,
        },
      })
        .then(function () {
          outerthis.$message({
            message: "处理成功",
            type: "success",
          });
          outerthis.approvelist.splice(index, 1);
          console.log(1234567);
        })
        .catch(function () {
          outerthis.$message({
            message: "处理失败",
            type: "error",
          });
        });
    },
    showHistory() {
      let outerthis = this;
      axios({
        method: "get",
        url: "/resign/history",
      })
        .then(function (response) {
          outerthis.showbutton = false;
          outerthis.approvelist = response.data;
          if (outerthis.approvelist.length === 0) {
            outerthis.$message({
              message: "未查询到相关历史记录",
              type: "warning",
            });
          }
        })
        .catch(function () {
          outerthis.$message({
            message: "请求出错",
            type: "error",
          });
        });
    },
  },
  mounted: function () {
    this.getapproveList();
    this.showbutton = true;
  },
};
</script>

<style>
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