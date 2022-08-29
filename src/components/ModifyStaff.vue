<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
    size="mini">

    <el-form-item label="员工编号" prop="staffId">
      <el-input v-model="ruleForm.staffId" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="职位" prop="position">
      <el-radio-group v-model="ruleForm.position">
        <el-radio label="主治医生"></el-radio>
        <el-radio label="实习医生"></el-radio>
        <el-radio label="主任"></el-radio>
        <el-radio label="副主任"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="擅长" prop="skilled">
      <el-input v-model="ruleForm.skilled" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="introduction">
      <el-input v-model="ruleForm.introduction" autocomplete="off"></el-input>
    </el-form-item>

    <!-- <el-form-item label="员工照片">
      <el-upload action='' :on-change="getFile" :limit="1" list-type="picture" :auto-upload=false>
        <el-button size="small">选择图片上传</el-button>
      </el-upload>
    </el-form-item> -->

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ModifyStaff',
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
        position: '',
        skilled: '',
        introduction: '',

        // imageUrl: '',
        // hostImg: '', // 默认为空
        // new_img: '', // 用户更改的新头像
        // change_img_show: false,
      },
      rules: {
        staffId: [
          { validator: validatestaffId, trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ],
        skilled: [
          { required: true, message: '请输入擅长', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const outerthis = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          axios({
            method: 'put',
            url: `/staff/refine/${this.ruleForm.staffId}`,
            data: {
              Position: position2number(this.ruleForm.position),
              Skilled: this.ruleForm.skilled,
              Introduction: this.ruleForm.introduction,
            }
          }).then(function(response) {
            outerthis.showMessage('操作成功')
          }).catch(function(error) {
            outerthis.showError(error, '操作失败：', outerthis)
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
    // getFile(file)
    // {
    //   const isJPG=file.raw.type==='image/jpeg';
    //   const isPNG=file.raw.type==='image/png' ;
    //   const isLt5M=file.raw.size/1024/2024<5;
    //   if(!isJPG&&!isPNG){
    //     this.$message.error('上传图片大小不能超过5MB！');
    //   }
    //   if((isJPG||isPNG)&&isLt5M){
    //     this.getBase64(file.raw).then(res=>{
    //     });
    //   }
    // },
    // getBase64(file)
    // {
    //   let sel=this;//promise作用域问题，在promise内部无法获取到this

    //   return new Promise(function(resolve,reject){
    //     let reader=new FileReader();

    //     reader.readAsDataURL(file);
    //     let imgResult="";
    //     reader.onload=function(){
    //       imgResult=reader.result;
    //       //现在就可以调用api进行图像的更新

    //       sel.ruleForm.new_img=imgResult;
    //       sel.ruleForm.change_img_show=true;

    //       this.ruleForm.new_img=imgResult;//新的头像路径存储
    //     };
    //     reader.onerror=function (error){
    //       reject(error);
    //     };
    //     reader.onloadend=function (){
    //       resolve(imgResult);
    //     }
    //   });
    // },
  }
}

function position2number(position)
{
  if (position === '实习医生') {
    return 0
  } else if (position === '主治医生') {
    return 1
  } else if (position === '副主任') {
    return 2
  } else {
    return 3
  }
}
</script>