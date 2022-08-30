<template>
  <div>
    <div class="table-left">
      <el-table :data="timeslots" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
        </el-table-column>
      </el-table>
    </div>

    <div class="create-right">

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
        size="mini">
        <el-form-item label="员工编号" prop="staffId">
          <el-col :span="8">
            <el-input v-model="ruleForm.staffId" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline" size="mini">
        <el-form-item label="星期一" prop="one_time">
          <el-select v-model="ruleForm.one_time" placeholder="时间段">
            <el-option v-for="(item) in timeslots" :key="item.id" :label=item.id :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-select v-model="ruleForm.one_room" placeholder="房间">
            <el-option label="201" value="201"></el-option>
            <el-option label="101" value="101"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="ruleForm" class="demo-form-inline" size="mini">
        <el-form-item label="星期二">
          <el-select v-model="ruleForm.two_time" placeholder="时间段">
            <el-option v-for="(item) in timeslots" :key="item.id" :label=item.id :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-select v-model="ruleForm.two_room" placeholder="房间">
            <el-option label="201" value="201"></el-option>
            <el-option label="101" value="101"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="ruleForm" class="demo-form-inline" size="mini">
        <el-form-item label="星期三">
          <el-select v-model="ruleForm.three_time" placeholder="时间段">
            <el-option v-for="(item) in timeslots" :key="item.id" :label=item.id :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-select v-model="ruleForm.three_room" placeholder="房间">
            <el-option label="201" value="201"></el-option>
            <el-option label="101" value="101"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="ruleForm" class="demo-form-inline" size="mini">
        <el-form-item label="星期四">
          <el-select v-model="ruleForm.four_time" placeholder="时间段">
            <el-option v-for="(item) in timeslots" :key="item.id" :label=item.id :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-select v-model="ruleForm.four_room" placeholder="房间">
            <el-option label="201" value="201"></el-option>
            <el-option label="101" value="101"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="ruleForm" class="demo-form-inline" size="mini">
        <el-form-item label="星期五">
          <el-select v-model="ruleForm.five_time" placeholder="时间段">
            <el-option v-for="(item) in timeslots" :key="item.id" :label=item.id :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-select v-model="ruleForm.five_room" placeholder="房间">
            <el-option label="201" value="201"></el-option>
            <el-option label="101" value="101"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="ruleForm" class="demo-form-inline" size="mini">
        <el-form-item label="星期六">
          <el-select v-model="ruleForm.six_time" placeholder="时间段">
            <el-option v-for="(item) in timeslots" :key="item.id" :label=item.id :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-select v-model="ruleForm.six_room" placeholder="房间">
            <el-option label="201" value="201"></el-option>
            <el-option label="101" value="101"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="ruleForm" class="demo-form-inline" size="mini">
        <el-form-item label="星期日">
          <el-select v-model="ruleForm.zero_time" placeholder="时间段">
            <el-option v-for="(item) in timeslots" :key="item.id" :label=item.id :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-select v-model="ruleForm.zero_room" placeholder="房间">
            <el-option label="201" value="201"></el-option>
            <el-option label="101" value="101"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
        size="mini">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CreateSchedule',
  data() {
    var validatestaffId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入员工编号'));
      } else if (value.length != 7 || value[0] != '2') {
        callback(new Error('员工编号格式错误'));
      } else {
        callback()
      }
    };
    return {
      timeslots: [],
      ruleForm: {
        staffId: '',

        one_time: '',
        two_time: '',
        three_time: '',
        four_time: '',
        five_time: '',
        six_time: '',
        zero_time: '',

        one_room: '',
        two_room: '',
        three_room: '',
        four_room: '',
        five_room: '',
        six_room: '',
        zero_room: '',

        region: '',
      },
      rules: {
        staffId: [
          { validator: validatestaffId, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      const outerthis = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: `/schedule`,
            data: {
              StaffId: Number(this.ruleForm.staffId),
              Day: [0, 1, 2, 3, 4, 5, 6],
              TimeSlotId: [
                this.ruleForm.zero_time,
                this.ruleForm.one_time,
                this.ruleForm.two_time,
                this.ruleForm.three_time,
                this.ruleForm.four_time,
                this.ruleForm.five_time,
                this.ruleForm.six_time,
              ],
              RoomId: [
                this.ruleForm.zero_room,
                this.ruleForm.one_room,
                this.ruleForm.two_room,
                this.ruleForm.three_room,
                this.ruleForm.four_room,
                this.ruleForm.five_room,
                this.ruleForm.six_room,
              ],
            },
          }).then(function (response) {
            outerthis.showMessage('创建成功')
          }).catch(function (error) {
            outerthis.showError(error, '创建失败：', outerthis)
          })
        } else {
          outerthis.showMessage('请检查信息再提交！', 'error')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    // 获取timeslot信息
    const outerthis = this
    axios({
      method: 'get',
      url: `/time_slot`,
    }).then(function (response) {
      outerthis.timeslots = response.data
    }).catch(function (error) {
      outerthis.showError(error, '获取信息失败', outerthis)
    })
  }
}
</script>

<style scoped>
.table-left {
  float: left;
  width: 50%;
}

.create-right {
  float: right;
  width: 50%
}
</style>
