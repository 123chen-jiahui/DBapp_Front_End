<!-- <template> -->
<!-- <div>
  <el-upload action='' :on-change="getFile" :limit="1" list-type="picture" :auto-upload=false>
    <el-button size="small">选择图片上传</el-button>
  </el-upload>
  <el-button @click="changeImg"><u>提交修改</u></el-button>
  </div> -->
  <!-- <h1>欢迎来到同济大学医院管理系统</h1> -->
  <!-- <img src="https://tongjihospital-data.oss-cn-shanghai.aliyuncs.com/logo.svg" /> -->
<!-- </template> -->



<!-- <script>
import axios from 'axios';
export default {
  data() {
    return {
      imageUrl: '',
      hostImg:"",//默认为空
      new_img:"",//用户更改的新头像
      change_img_show:false,
    };
  },
  methods: {
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
    getFile(file)
    {
      const isJPG=file.raw.type==='image/jpeg';
      const isPNG=file.raw.type==='image/png' ;
      const isLt5M=file.raw.size/1024/2024<5;
      if(!isJPG&&!isPNG){
        this.$message.error('上传图片大小不能超过5MB！');
      }
      if((isJPG||isPNG)&&isLt5M){
        this.getBase64(file.raw).then(res=>{
        });
      }
    },
    getBase64(file)
    {
      let sel=this;//promise作用域问题，在promise内部无法获取到this

      return new Promise(function(resolve,reject){
        let reader=new FileReader();

        reader.readAsDataURL(file);
        let imgResult="";
        reader.onload=function(){
          imgResult=reader.result;
          //现在就可以调用api进行图像的更新

          sel.new_img=imgResult;
          sel.change_img_show=true;

          this.new_img=imgResult;//新的头像路径存储
        };
        reader.onerror=function (error){
          reject(error);
        };
        reader.onloadend=function (){
          resolve(imgResult);
        }
      });
    },
    changeImg: function() {
      const outerthis = this

      let data = {
        photo: this.new_img,
      }
      let param = new URLSearchParams(data)
      axios({
        method: 'post',
        // 这里一定不能用get请求啊啊啊啊啊，被坑死了
        url: '/staff/test',
        data: param,
      }).then(function(response) {
        console.log(response.status)
      }).catch(function(error) {
        outerthis.showMessage('something wrong' + error.message, 'error')
      })
    }
  }
}
</script> -->

<template>
  <div>
    <label for="upload" class="img-choose" :class="{upLoading: isUploading}">图片上传</label>
    <input type="file" name="" id="upload" accept="image/*" multiple style="display: none;" :disabled="isUploading" @change="onChange" ref="file">
    <p class="tips">一次可以选择多张图片，每次最多选择9张图片（单张图片大小 &lt; 1M）</p>
    <ul class="img-list">
      <li v-for="(item, index) in imgList" :key="index" :style="{background: `url(${item}) no-repeat center/cover`}"></li>
    </ul>
  </div>
</template>

<script>
// 引入阿里云oss包
import OSS from 'ali-oss'
const ACCESSKEY = {
  ID: 'LTAI5t8A5fZEVnXHDvmagwZt',
  SECRET: 'b23SvypcKCkVgUoQXAfI5A9kgVH98I'
}
export default {
  data () {
    return {
      // 创建OSS对象
      client: new OSS({
        region: 'oss-cn-shanghai',
        bucket: 'tongjihospital-data',
        accessKeyId: ACCESSKEY.ID,
        accessKeySecret: ACCESSKEY.SECRET
      }),
      imgList: [],
      isUploading: false
    }
  },
  methods: {
    onChange () {
      // 可选链
      const picFiles = this.$refs?.file?.files
      console.log(picFiles)
      // 校验
      if (picFiles.length > 9) {
        alert('每次最多选择9张图片')
        return false
      }
      const files = []
      for (const file of picFiles) {
        const picSize = file.size / 1024 / 1024 // 单位转换成 M
        if (picSize > 1) {
          alert('单张图片大小不得超过 1M')
          return false
        }
        files.push(file)
      }
      // 图片上传至OSS
      // this.ossUploadPic(files)
      this.ossUploadPic2(files)
    },
    // 方法一：异步上传图片至阿里云OSS（Promise）
    ossUploadPic (files) {
      this.isUploading = true
      const upLoadRequest = []
      for (const file of files) {
        upLoadRequest.push(new Promise((resolve, reject) => {
          this.client.put(`${Math.random()}-${file.name}`, file).then(res => {
            resolve(res.url)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        }))
      }
      // 读取上传的图片
      Promise.allSettled(upLoadRequest).then(res => {
        console.log(res)
        const imgUrls = []
        for (const item of res) {
          if (item.status === 'fulfilled') {
            imgUrls.push(item.value)
          }
        }
        this.imgList = imgUrls
        this.isUploading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 方法二：异步同步化 async + await
    async ossUploadPic2 (files) {
      this.isUploading = true
      const imgUrls = []
      for (const file of files) {
        const res = await this.client.put(`${Math.random()}-${file.name}`, file)
        imgUrls.push(res.url)
      }
      this.imgList = imgUrls
      this.isUploading = false
    }
  }
}
</script>

<style scoped>
.img-choose {
  display: block;
  width: 100px;
  height: 50px;
  margin-left: 60px;
  line-height: 50px;
  color: #fff;
  background-color: #42B983;
  border-radius: 5px;
}
.tips {
  color: #999;
}
.upLoading {
  background-color: #ccc;
}
.img-list {
  margin-left: 60px;
}
.img-list > li{
  float: left;
  list-style: none;
  width: 150px;
  height: 100px;
  margin: 0 30px 30px 0;
  border: 1px solid #ccc;
}
</style>>

