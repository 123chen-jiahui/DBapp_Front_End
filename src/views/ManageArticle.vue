<template>
    <v-container>
        <el-container>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index='1'>文稿管理</el-menu-item>
                <el-menu-item index='2'>发布文章</el-menu-item>
                <el-menu-item index='3'>主页内容</el-menu-item>
            </el-menu>
        </el-container>
        <div class="magap"></div>
        <div v-if="currentIndex === '1'">
            <el-table :data="articleList" style="width: 100%;" v-if="currentIndex === '1'">
                <el-table-column prop="title" label="标题" width="500">
                </el-table-column>
                <el-table-column prop="author" label="作者">
                </el-table-column>
                <el-table-column prop="time" label="发布时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="currentIndex === '2'">
            <el-form>
                <el-form-item label="文稿标题">
                    <el-input v-model="newArticle.title"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="newArticle.author"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="newArticle.type" placeholder="请选择文稿类型" style="width: 100%;">
                        <el-option label="新闻活动" value="news"></el-option>
                        <el-option label="通知公告" value="notes"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-input v-model="nowtime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="文章内容">
                    <el-input v-model="newArticle.content" type="textarea" :cols="20" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="是否存在图片" prop="hasimg">
                    <el-switch v-model="hasImg"></el-switch>
                </el-form-item>
                <el-form-item v-if="hasImg" label="图片" prop="imgurl">
                    <el-upload class="avatar-uploader" action="" :show-file-list="true"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="upLoad"
                        :file-list="fileList" list-type="picture">
                        <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitAll">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="currentIndex === '3'">
            <el-form>
                <el-form-item v-for="(item, index) in lunbotuList" :key="index" :label="'轮播项' + (index + 1)">
                    <el-input v-model="item.title" placeholder="请输入内容"></el-input>
                    <el-input v-model="item.imgURL" placeholder="请输入图片地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitLunBo">提交</el-button>
                    <el-button @click="addItem">新增项</el-button>
                    <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </v-container>
</template>

<script>
import axios from 'axios'
import OSS from 'ali-oss'

export default {
    name: 'ManageArticle',
    data() {
        return {
            hasImg: false,
            imageUrl: '',
            timeids: [],
            activeIndex: '1',
            currentIndex: '1',
            nowtime: null,
            fileList: [

            ],

            articleList: [
                {
                    "id": "9b8f2caa-b343-ff96-ec6b-f1d7b6df775b",
                    "title": "院领导学习党中央二十大重要指示精神",
                    "author": "新闻办",
                    "type": "news",
                    "time": 1661955237770
                },
                {
                    "id": "ee05989e-fe3d-bd24-ab12-337ec63b23ce",
                    "title": "新住院部落成仪式举行",
                    "author": "新闻办",
                    "type": "news",
                    "time": 1661955238770
                },
                {
                    "id": "7a23c3eb-d434-612c-29da-42d7b5af2a08",
                    "title": "协和医院来我院学习交流",
                    "author": "新闻办",
                    "type": "news",
                    "time": 1661955007770
                },
                {
                    "id": "3fa88a29-4649-a81e-2a34-e83632241ad0",
                    "title": "候志生同志当选二十大代表",
                    "author": "新闻办",
                    "type": "news",
                    "time": 1661955237770
                },
                {
                    "id": "cca01f40-6047-2037-e64a-7af2fee3241c",
                    "title": "节假日调休安排",
                    "author": "院长办公室",
                    "type": "notes",
                    "time": 1661955307570
                },
                {
                    "id": "a714dbcd-eb46-4e1d-341c-162f603d621e",
                    "title": "抗疫先锋评选结果公示",
                    "author": "宣传办",
                    "type": "notes",
                    "time": 1661955307770
                }
            ],
            newArticle: {
                title: "",
                author: "",
                type: "",
                time: null,
                content: "",
                imgsURL: [

                ]
            },
            lunbotuList: [
                {
                    title: '',
                    imgUrl: ''
                },
            ]
        }
    },
    methods: {
        handleSelect(key, keypath) {
            console.log('handleSelect() start', key)
            this.currentIndex = key;
            console.log(typeof key)
            if (key == 1)
                this.getArticleList();
        },
        // 获取文章列表
        getArticleList() {
            let _this = this;
            axios({
                method: 'get',
                url: '/article',
            }).then((res) => {
                _this.articleList = res.data;
            }).catch(() => {
                _this.$message({
                    message: '加载失败',
                    type: 'error'
                })
            });
        },
        // 编辑文章内容，有时间再写
        handleEdit(index, row) {
            console.log('handleEdit start', index)
        },
        handleDelete(index, row) {
            console.log('delete', index)
            let _this = this;
            axios({
                method: 'delete',
                url: '/article/' + _this.articleList[index].id,
            }).then(() => {
                _this.$message({
                    message: '删除成功',
                    type: 'success',
                })
                _this.articleList.splice(index, 1);
            }).catch(() => {
                _this.$message({
                    message: '删除失败',
                    type: 'error'
                })
            });
        },
        refreshTime() {
            let temp = Date.now();
            this.nowtime = new Date(temp) + ' ';
        },


        // 提交新增文章
        submitAll() {
            let _this = this;
            this.newArticle.time = new Date().getTime();
            axios({
                method: 'post',
                url: '/article',
                data: this.newArticle,
            }).then((res) => {
                _this.$message({
                    message: '文稿上传成功',
                    type: 'success',
                })
            }).catch(() => {
                _this.$message({
                    message: '文稿上传失败',
                    type: 'error',
                })
            });
        },
        // 提交轮播图
        submitLunBo() {

        },
        // 新增轮播项
        addItem() {
            this.lunbotuList.push({
                title: '',
                imgUrl: '',
            })
        },

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
            this.timeids.push('article/imgs/' + timeid + '.jpg')
            //   this.timeid = timeid
            let key = 'article/imgs/' + timeid + '.jpg';
            this.newArticle.imgsURL.push(key);
            console.log('上传图片', key, '\n', this.newArticle);
            let result = client.put(key, item.file);
            console.log(result);
            console.log('timeids', this.timeids)
        },
        // submitForm(formName) {
        //     alert('what')
        //     const outerthis = this
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             axios({
        //                 method: 'post',
        //                 url: '/article',
        //                 data: {
        //                     Title: this.article.title,
        //                     Author: this.article.author,
        //                     Type: this.article.type,
        //                     Time: (new Date().getTime()),
        //                     Content: this.article.text,
        //                     ImgsURL: this.timeids,
        //                 },
        //             }).then(function (response) {
        //                 outerthis.showMessage('创建新闻成功')
        //                 console.log(response.data)
        //             }).catch(function (error) {
        //                 outerthis.showError(error, '创建信息时出错', outerthis)
        //             })
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // }
    }
    ,
    mounted() {
        this.nowtime = setInterval(this.refreshTime, 1000);
        this.getArticleList()
    },
    computed: {

    }
}

</script>

<style>
.el-menu-demo {
    width: 100%;
    display: block;
}

.magap {
    width: 100%;
    height: 20px;
}

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