<template>
  <v-container>
      <el-container>
          <el-form :model="article" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
              <el-form-item label="文章标题" prop="title">
                  <el-input v-model="article.title"></el-input>
              </el-form-item>

              <el-form-item label="作者" prop="author">
                  <el-input v-model="article.author"></el-input>
              </el-form-item>

              <el-form-item label="文章类型" prop="type">
                  <el-select v-model="article.type" placeholder="请选择发布文章类型">
                      <el-option label="新闻活动" value="news"></el-option>
                      <el-option label="通知公告" value="notes"></el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label="是否存在图片" prop="hasimg">
                  <el-switch v-model="article.hasimg"></el-switch>
              </el-form-item>

              <el-form-item v-if="article.hasimg" label="图片" prop="imgurl">
                  <el-upload class="avatar-uploader" action="" :show-file-list="false"
                      :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="upLoad">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>

              <el-form-item label="文章内容" prop="text">
                  <el-input type="textarea" v-model="article.text"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
          </el-form>
      </el-container>
  </v-container>
</template>

<script>
import { axios } from "axios";
import OSS from 'ali-oss'


export default {
  name: 'EditArtile',
  data() {
      return {
          imgUrl: '',
          article: {
              title: '',
              time: null,
              author: '',
              type: '',
              hasimg: false,
              imgurl: '',
              text: '',
          },
          rules: {
              title: [
                  { required: true, message: '请输入文章标题', trigger: 'blur' },
                  { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
              ],
              author: [
                  { required: true, message: '请输入文章标题', trigger: 'blur' },
                  { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
              ],
              type: [
                  { required: true, trigger: 'blur' }
              ],
              text: [
                  { required: true, trigger: 'blur' },
                  { min: 2, message: '长度至少 2 个字符', trigger: 'blur' }
              ]
          }
      }
  },
  methods: {
      handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
              this.$message.error('上传图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
      },
      upLoad(item) {
          let client = new OSS({
              region: 'oss-cn-shanghai',
              accessKeyId: "LTAI5t8A5fZEVnXHDvmagwZt",
              accessKeySecret: "b23SvypcKCkVgUoQXAfI5A9kgVH98I",
              bucket: "tongjihospital-data",
          });
          let timeid = new Date().getTime();
          let key = 'article/imgs/' + timeid + '.jpg';
          let result = client.put(key, item.file);
          console.log(result);
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  alert('submit!');
                  console.log(this.article)

              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
      }
  },
  mounted() {


  }
}

</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>