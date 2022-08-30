  <template>
  <div>

    <div class="table-left">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
        size="mini">
        <el-form-item label="员工编号" prop="staffId">
          <el-col :span="8">
            <el-input v-model="ruleForm.staffId" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getSchedule('ruleForm')">查询</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 显示排班信息 -->
      <el-table :data="schedules" stripe style="width: 100%">
        <el-table-column prop="staffId" label="员工编号">
        </el-table-column>
        <el-table-column prop="day" label="星期">
        </el-table-column>
        <el-table-column prop="timeSlotId" label="时间段编号">
        </el-table-column>
        <el-table-column prop="timeSlot.startTime" label="开始时间">
        </el-table-column>
        <el-table-column prop="timeSlot.endTime" label="结束时间">
        </el-table-column>
      </el-table>

      <div class="padding"></div>

      <el-form :inline="true" :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-form-inline" size="mini">
        <el-form-item label="哪一天" prop="choooseDay">
          <el-select v-model="ruleForm2.chooseDay">
            <el-option label="星期日" :value="0"> </el-option>
            <el-option label="星期一" :value="1"> </el-option>
            <el-option label="星期二" :value="2"> </el-option>
            <el-option label="星期三" :value="3"> </el-option>
            <el-option label="星期四" :value="4"> </el-option>
            <el-option label="星期五" :value="5"> </el-option>
            <el-option label="星期六" :value="6"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间段" prop="chooseTimeSlotId">
          <el-select v-model="ruleForm2.chooseTimeSlotId">
            <el-option v-for="(item) in timeslots" :key="item.id" :label=item.id :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间" prop="chooseRoomId">
          <el-select v-model="ruleForm2.chooseRoomId">
            <el-option label="201" value="201"></el-option>
            <el-option label="101" value="101"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="updateSchedule('ruleForm2')">修改</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="padding-shu">.</div>

    <div class="table-left">
      <div class="padding-large"></div>
      <p>时间段信息一览表</p>
      <el-table :data="timeslots" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

  <script>
import axios from 'axios';
export default {
  name: 'ChangeSchedule',
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
    var validateDay = (rule, value, callback) => {
      if (value === -1) {
        return callback(new Error('请选择哪一天'));
      } else {
        callback()
      }
    }
    return {
      timeslots: [],
      schedules: [],
      ruleForm: {
        staffId: '',
      },
      rules: {
        staffId: [
          { validator: validatestaffId, trigger: 'blur' }
        ],
      },

      ruleForm2: {
        chooseDay: '',
        chooseTimeSlotId: '',
        chooseRoomId: '',
      },
      rules2: {
        chooseDay: [
          // { required: true, message: '请选择活动区域', trigger: 'change' }
          { validator: validateDay, trigger: 'change'}
        ],
        chooseTimeSlotId: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getSchedule(formName) {
      const outerthis = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'get',
            url: `/schedule/${this.ruleForm.staffId}`
          }).then(function (response) {
            outerthis.schedules = response.data
          }).catch(function (error) {
            outerthis.showError(error, '找不到排班信息！', outerthis)
          })
        } else {
          outerthis.showMessage('请检查信息再提交！', 'error')
          return false;
        }
      })
    },
    updateSchedule(formName) {
      const outerthis = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'put',
            url: `/schedule/${this.ruleForm.staffId}`,
            data: {
              Day: this.ruleForm2.chooseDay,
              TimeSlotId: this.ruleForm2.chooseTimeSlotId,
              RoomId: this.ruleForm2.chooseRoomId,
            }
          }).then(function(response) {
            outerthis.showMessage('更新成功')
          }).catch(function(error) {
            outerthis.showError(error, '更新失败!', outerthis)
          })
        } else {
          outerthis.showMessage('请检查信息再提交！', 'error')
          return false;
        }
      })
    },
    submitForm(formName) {
      const outerthis = this
      this.$refs[formName].validate((valid) => {
        if (valid) {

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
    width: 47%;
  }
  
  .create-left {
    float: right;
    width: 50%
  }
  
  .padding {
    height: 30px;
  }
  
  .padding-large {
    height: 60px;
  }
  
  .padding-shu {
    float: left;
    width: 6%;
  }
  </style>
