<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
    <el-form-item label="身份证号" prop="globalId">
      <el-input v-model="ruleForm.globalId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="出生日期" prop="birth">
      <el-input v-model="ruleForm.birth"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="电话号码" prop="phone">
      <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="职务" prop="role">
      <el-radio-group v-model="ruleForm.role">
        <el-radio label="医生"></el-radio>
        <el-radio label="前台"></el-radio>
        <el-radio label="管理员"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="科室" prop="dept">
      <el-radio-group v-model="ruleForm.dept">
        <el-radio label="内科"></el-radio>
        <el-radio label="儿科"></el-radio>
        <el-radio label="皮肤科"></el-radio>
        <el-radio label="急诊科"></el-radio>
        <el-radio label="神经科"></el-radio>
        <el-radio label="中医科"></el-radio>
        <el-radio label="外科"></el-radio>
        <el-radio label="眼科"></el-radio>
        <el-radio label="口腔科"></el-radio>
        <el-radio label="妇科"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddStaff',
  data() {
    var validateGlobalId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('身份证号不能为空'));
      } else if (!identityIDCard(value)) {
        callback(new Error('身份证号有误'));
      } else {
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (!isPoneAvailable(value)) {
        callback(new Error('手机号码输入有误'));
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
        globalId: '',
        name: '',
        pass: '',
        checkPass: '',
        gender: '',
        phone: '',
        birth: '',
        role: '',
        dept: '',
        address: '',
      },
      rules: {
        globalId: [
          { validator: validateGlobalId, trigger: 'blur' } // 当光标失去焦点时触发
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入出生日期', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur'}
        ],
        role: [
          { required: true, message: '请选择职务', trigger: 'change' }
        ],
        dept: [
          { required: true, message: '请选择科室', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const outerthis = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发一条请求
          axios.post('/auth/register_staff', {
            GlobalId: this.ruleForm.globalId,
            Password: this.ruleForm.pass,
            ConfirmPassword: this.ruleForm.checkPass,
            Role: role2number(this.ruleForm.role),
            Name: this.ruleForm.name,
            Gender: gender2number(this.ruleForm.gender),
            Birthday: this.ruleForm.birth,
            Address: this.ruleForm.address,
            Phone: this.ruleForm.phone,
            DepartmentId: dept2number(this.ruleForm.dept),
          })
            .then(function (response) {
              let alt = '生成的员工编号\n'
              alt = alt + response.data
              outerthis.showMessage(alt)
            })
            .catch(function (error) {
              outerthis.showError(error, '注册失败！', outerthis)
            })
        } else {
          outerthis.showMessage('请检查信息再提交！', 'error')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

function gender2number(gender) {
  if (gender === '男') {
    return 0
  } else {
    return 1
  }
}

function role2number(role) {
  if (role === '管理员') {
    return 0
  } else if (role === '医生') {
    return 1
  } else {
    return 2
  }
}

function dept2number(dept) {
  if (dept === '内科') {
    return 1
  } else if (dept === '儿科') {
    return 2
  } else if (dept === '皮肤科') {
    return 3
  } else if (dept === '急诊科') {
    return 4
  } else if (dept === '神经科') {
    return 5
  } else if (dept === '中医科') {
    return 6
  } else if (dept === '外科') {
    return 7
  } else if (dept === '眼科') {
    return 8
  } else if (dept === '口腔科') {
    return 9
  } else {
    return 10
  }
}

function identityIDCard(code) {
  // 身份证号前两位代表区域
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  }
  const idCardReg = /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i // 身份证格式正则表达式
  let isPass = true // 身份证验证是否通过（true通过、false未通过）

  // 如果身份证不满足格式正则表达式
  if (!code) {
    isPass = false
  } else if (!code.match(idCardReg)) {
    isPass = false
  } else if (!city[code.substr(0, 2)]) {
    // 区域数组中不包含需验证的身份证前两位
    isPass = false
  } else if (code.length === 18) {
    // 18位身份证需要验证最后一位校验位
    code = code.split('')
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    // 校验位
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    let ai = 0
    let wi = 0
    for (let i = 0; i < 17; i++) {
      ai = parseInt(code[i])
      wi = factor[i]
      sum += ai * wi // 开始计算并相加
    }
    const last = parity[sum % 11] // 求余
    if (last.toString() !== code[17]) {
      isPass = false
    }
  }
  return isPass
}

function isPoneAvailable(phone) {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(phone)) {
    return false
  } else {
    return true
  }
}
</script>