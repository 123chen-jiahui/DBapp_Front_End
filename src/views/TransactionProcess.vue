<template>
  <v-container id="trans-mian">
    <view-intro heading="事务处理" />
    <!-- <h2 id="title">{{ hopital_name }}医院事务处理信息系统</h2> -->
    <el-tabs type="card" class="demo-tabs">
      <el-tab-pane label="请假处理" name="first">
        <DayOff v-if="option" />
      </el-tab-pane>
      <el-tab-pane label="离职处理" name="second">
        <JobOff v-if="option" />
      </el-tab-pane>
    </el-tabs>
  </v-container>
</template>

<script>
import DayOff from "../components/DayOff.vue";
import JobOff from "../components/JobOff.vue";
export default {
  name: "TransactionProcess",
  components: { DayOff, JobOff },
  data() {
    return {
      hopital_name: "同仁",
      option: true,
    };
  },
  methods: {
    handleClick() {
      console.log('handleClick() start')
    },
  },
};
</script>

<style>
#title {
  color: black;
  margin: auto auto;
  font-size: 20px;
  /* margin-left: 1em; */
}

#title::before {
  content: "📃";
  margin-left: 2em;
  margin-right: 0.5em;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>