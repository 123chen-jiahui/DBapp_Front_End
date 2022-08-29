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

    <div class="table-left">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
        size="mini">

        <el-form-item label="开始时间" prop="startTime">
          <el-col :span="8">
            <el-input v-model.number="ruleForm.startTime" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="结束时间" prop="endTime">
          <el-col :span="8">
            <el-input v-model.number="ruleForm.endTime" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>

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
  name: 'TimeSlot',
  data() {
    var validateStartTime = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入开始时间'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0 || value > 23) {
            callback(new Error('必须时间必须在0-23之间'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validateEndTime = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入结束时间'))
      } else if (value <= this.ruleForm.startTime) {
        return callback(new Error('结束时间必须晚于开始时间'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0 || value > 23) {
            callback(new Error('时间必须在0-23之间'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      timeslots: [],
      ruleForm: {
        startTime: '',
        endTime: '',
      },
      rules: {
        startTime: [
          { validator: validateStartTime, trigger: 'blur' }
        ],
        endTime: [
          { validator: validateEndTime, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      const outerthis = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          axios({
            method: 'post',
            url: `/time_slot`,
            data: {
              StartTime: Number(this.ruleForm.startTime),
              EndTime: Number(this.ruleForm.endTime), 
            },
          }).then(function(response) {
            outerthis.showMessage('创建成功')
          }).catch(function(error) {
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

.create-left {
  float: right;
  width: 50%
}
</style>
