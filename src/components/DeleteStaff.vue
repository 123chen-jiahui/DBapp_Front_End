<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
    size="mini">

    <el-form-item label="员工编号" prop="staffId">
      <el-input v-model="ruleForm.staffId" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">删除</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import axios from 'axios';

export default {
  name: 'DeleteStaff',

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
      ruleForm: {
        staffId: '',
        
      },
      rules: {
        staffId: [
          {validator: validatestaffId, trigger: 'blur'}
        ],
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
            method: 'delete',
            url: `/staff/${this.ruleForm.staffId}`,
          }).then(function(response) {
            outerthis.showMessage('删除成功')
          }).catch(function(error) {
            outerthis.showError(error, '删除失败：', outerthis)
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
  }
}
</script>
