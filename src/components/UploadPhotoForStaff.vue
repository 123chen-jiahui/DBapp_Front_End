<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
      size="mini">

      <el-form-item label="员工编号" prop="staffId">
        <el-input v-model="ruleForm.staffId" autocomplete="off"></el-input>
      </el-form-item>


      <el-form-item label="员工照片" prop="new_img">
        <el-upload action='' :on-change="getFile" :limit="1" list-type="picture" :auto-upload=false>
          <el-button size="small">选择图片上传</el-button>
        </el-upload>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>


    <!-- <el-button @click="changeImg"><u>提交修改</u></el-button> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UploadPhotoForStaff',
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
          { validator: validatestaffId, trigger: 'blur' }
        ],
      },
      imageUrl: '',
      hostImg: '', // 默认为空
      new_img: '', // 用户更改的新头像
      change_img_show: false,
    };
  },
  methods: {
    submitForm(formName) {
      const outerthis = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');

          let data = {
            photo: this.new_img,
          }
          let param = new URLSearchParams(data)
          axios({
            method: 'put',
            // 这里一定不能用get请求啊啊啊啊啊，被坑死了
            url: `/staff/uploadPhoto/${this.ruleForm.staffId}`,
            data: param,
          }).then(function (response) {
            // console.log(response.status)
            outerthis.showMessage('操作成功!')
          }).catch(function (error) {
            outerthis.showMessage('something wrong' + error.message, 'error')
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    getFile(file) {
      const isJPG = file.raw.type === 'image/jpeg';
      const isPNG = file.raw.type === 'image/png';
      const isLt5M = file.raw.size / 1024 / 2024 < 5;
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片大小不能超过5MB！');
      }
      if ((isJPG || isPNG) && isLt5M) {
        this.getBase64(file.raw).then(res => {
        });
      }
    },
    getBase64(file) {
      let sel = this;//promise作用域问题，在promise内部无法获取到this

      return new Promise(function (resolve, reject) {
        let reader = new FileReader();

        reader.readAsDataURL(file);
        let imgResult = "";
        reader.onload = function () {
          imgResult = reader.result;
          //现在就可以调用api进行图像的更新

          sel.new_img = imgResult;
          sel.change_img_show = true;

          this.new_img = imgResult;//新的头像路径存储
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        }
      });
    },
    changeImg: function () {
      const outerthis = this

      let data = {
        photo: this.new_img,
      }
      let param = new URLSearchParams(data)
      axios({
        method: 'put',
        // 这里一定不能用get请求啊啊啊啊啊，被坑死了
        url: `/staff/uploadPhoto/${this.ruleForm.staffId}`,
        data: param,
      }).then(function (response) {
        console.log(response.status)
      }).catch(function (error) {
        outerthis.showMessage('something wrong' + error.message, 'error')
      })
    }
  }
}
</script>
