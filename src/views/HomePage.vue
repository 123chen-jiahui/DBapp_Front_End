<template>
    <v-container>
        <el-container v-if="!showdetail">
            <el-header>
                <!-- <img src="https://tongjihospital-data.oss-cn-shanghai.aliyuncs.com/logo.svg" alt=""> -->
                <p class="homepage-header">健康呵护，同济担当</p>
            </el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <el-carousel trigger="click" @change="changeText">
                                <el-carousel-item v-for="(item, index) in imgurl" :key="index">
                                    <el-image :src="item.img" fit="cover"></el-image>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <h3 style="margin: 10px auto;">{{ article_title }}</h3>
                            <p>{{ article_text }}</p>
                        </div>
                    </el-col>
                </el-row>
                <div class="homegap"></div>
                <el-row :gutter="20">
                    <el-card shadow="never">
                        <el-col :span="12">
                            <el-card shadow="never" style="border: none;">
                                <div slot="header" class="clearfix">
                                    <span>新闻活动</span>
                                    <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
                                </div>
                                <el-table :data="newsactivity" style="width: 100%;" :show-header="false" height="250"
                                    @row-click="showNewsD">
                                    <el-table-column prop="title" :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column prop="time" :formatter="formatTime" align="right">
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card shadow="never" style="border: none;">
                                <div slot="header" class="clearfix">
                                    <span>通知公告</span>
                                    <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
                                </div>
                                <el-table :data="notofication" style="width: 100%;" :show-header="false" height="250"
                                    @row-click="showNotesD">
                                    <el-table-column prop="title" :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column prop="time" :formatter="formatTime" align="right"></el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                    </el-card>
                </el-row>
                <div class="homegap"></div>
                <el-row :gutter="20">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span>友情链接</span>
                        </div>
                        <el-row :gutter="20">
                            <el-col v-for="item in friendlink" :key="item.name" :span="6">
                                <i :class="item.icon"></i>
                                <a :href="item.url" style="text-decoration:none ; color: black; margin-left: 5px;">{{
                                        item.name
                                }}</a>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-row>
            </el-main>
            <el-footer>

            </el-footer>
        </el-container>
        <el-container id="detailpage" v-if="showdetail">
            <!-- 新闻公告详情 -->
            <el-header>
                <el-button type="text" icon="el-icon-arrow-left" @click="returnHome">返回主页</el-button>
            </el-header>
            <h2 style="text-align: center; line-height: 50px;">{{ detailitem.title }}</h2>
            <div style="text-align: center;">
                <span>{{ formatTime(0, 0, detailitem.time) + ' ' }}</span>
                <span>{{ ' ' + detailitem.author }}</span>
            </div>
            <div class="homegap"></div>
            <div v-for="(item, index) in detailitem.imgAdress" :key="index" style="text-align: center;">
                <el-image :src="`https://tongjihospital-data.oss-cn-shanghai.aliyuncs.com/${item}`"></el-image>
            </div>
            <p style="text-indent: 2em;">
                {{ detailitem.content }}
            </p>
        </el-container>
    </v-container>
</template>

<script>
import axios from 'axios';


export default {
    name: 'HomePage',
    data() {
        return {
            imgurl: [
                {
                    img: 'https://ts1.cn.mm.bing.net/th/id/R-C.89a3d093218812f0d196df0575505110?rik=VXIqOYHCXFZfSA&riu=http%3a%2f%2fsheencity-bj.oss-cn-hangzhou.aliyuncs.com%2fofficial-site%2fpictures%2f2015-02%2f12%2f36f76d6d055013b03d30a2d2aa2fbaf3.jpg&ehk=J%2bVyxNxO8X8%2foJU0%2f3BgW6wigquqYrVsldO2%2fOUKN1k%3d&risl=&pid=ImgRaw&r=0',
                    title: '同济社区医院',
                    text: '同济社区医院正式落户于上海市同济大学，为所在区域的万余居民、22个社区、8所幼儿园、5所小学、5所中学以及2所大学提供医疗保健、家庭医生、预防接种、预约转诊、传染病报告与管理、0～6岁儿童健康管理和孕产妇健康管理等优质',
                },
                {
                    img: 'https://ts1.cn.mm.bing.net/th/id/R-C.8133d1eeb11c1cdde37eefc7debd7d0d?rik=MuuuFmN3jiyAMg&riu=http%3a%2f%2fwww.cdtf.gov.cn%2fcdtfxq%2fyaowen%2f2021-05%2f07%2ff372bb865d8a4a8d89c8060d253fd45d%2fimages%2ff001d047e0a94fbd9109df21094d734e.jpg&ehk=v4lnwyHNo8SNT3ty69R1lQxY6gFD3ROIJAo7fdy%2ff7A%3d&risl=&pid=ImgRaw&r=0',
                    title: '同济社区医院',
                    text: '同济社区医院正式落户于上海市同济大学，为所在区域的万余居民、22个社区、8所幼儿园、5所小学、5所中学以及2所大学提供医疗保健、家庭医生、预防接种、预约转诊、传染病报告与管理、0～6岁儿童健康管理和孕产妇健康管理等优质',
                },
                {
                    img: 'https://www.aisa.com.cn/media/materials/3/origin/ffb144f918917d9d9e8133401fd73cf4_Ujfs3JX_origin.jpg',
                    title: '同济社区医院',
                    text: '同济社区医院正式落户于上海市同济大学，为所在区域的万余居民、22个社区、8所幼儿园、5所小学、5所中学以及2所大学提供医疗保健、家庭医生、预防接种、预约转诊、传染病报告与管理、0～6岁儿童健康管理和孕产妇健康管理等优质',
                },
                {
                    img: 'https://ts1.cn.mm.bing.net/th/id/R-C.c3cc236f7a06155950f527bbc10d530f?rik=7FYnrXuxCAyLWQ&riu=http%3a%2f%2fwww.jactgs.com%2fuploadfile%2f109%2fAttachment%2fd6fa39a42d.jpg&ehk=KGxCXBfn179s36kFFBgVJz3Nm8UUf7XG0GYjIJDgYNU%3d&risl=&pid=ImgRaw&r=0',
                    title: '同济社区医院',
                    text: '同济社区医院正式落户于上海市同济大学，为所在区域的万余居民、22个社区、8所幼儿园、5所小学、5所中学以及2所大学提供医疗保健、家庭医生、预防接种、预约转诊、传染病报告与管理、0～6岁儿童健康管理和孕产妇健康管理等优质',
                },
            ],
            newsactivity: [],
            notofication: [],
            friendlink: [
                {
                    icon: 'el-icon-delete-solid',
                    name: '中国医科大学',
                    url: ''
                },
                {
                    icon: 'el-icon-s-tools',
                    name: '华山医院',
                    url: '',
                },
                {
                    icon: 'el-icon-s-ticket',
                    name: '湘雅医学院',
                    url: '',
                },
                {
                    icon: 'el-icon-medal',
                    name: '北京协和医院',
                    url: '',
                }
            ],
            article_title: ' this.imgurl[0].title',
            article_text: 'this.imgurl[0].text',
            detailitem: {},
            showdetail: false,
        }
    },
    methods: {
        changeText(index) {
            this.article_title = this.imgurl[index].title;
            this.article_text = this.imgurl[index].text;
            return index;
        },
        showNewsD(row) {
            console.log('新闻活动', row)
            this.detailitem.title = row.title;
            this.detailitem.author = row.author;
            this.detailitem.time = row.time;
            this.showDetail(row.id);
        },
        showNotesD(row) {
            console.log('通知公告', row)
            this.detailitem.title = row.title;
            this.detailitem.author = row.author;
            this.detailitem.time = row.time;
            this.showdetail = true;

            this.showDetail(row.id)
        },
        returnHome() {
            this.showdetail = false;
        },
        showDetail(articleid) {
            let outerthis = this;
            axios({
                method: 'get',
                url: 'article/' + articleid,
            }).then((res) => {
                outerthis.detailitem = res.data
                outerthis.showdetail = true;
            }).catch((error) => {
                outerthis.showError(error, '加载失败：', outerthis)
            });
        },
        pullArticle() {
            let outerthis = this;
            axios({
                method: 'get',
                url: 'article',
            }).then((res) => {
                outerthis.newsactivity = [];
                outerthis.notofication = [];
                res.data.forEach(element => {
                    if (element.type === 'news') {
                        outerthis.newsactivity.push(element);
                    } else {
                        outerthis.notofication.push(element);
                    }
                    outerthis.showdetail = false;
                }).catch((error) => {
                    outerthis.showError(error, '加载失败：', outerthis)
                    console.log('pullArticle something wrong')
                    outerthis.$message({
                        message: '加载失败',
                        type: 'error'
                    })
                });
            })
        },
        formatTime(row, column, cellValue) {
            var date = new Date(cellValue);  // 参数需要毫秒数，所以这里将秒数乘于 1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y + M + D + h + m + s
        }
    },
    mounted() {
        this.article_title = this.imgurl[0].title;
        this.article_text = this.imgurl[0].text;
        console.log('hello')
        this.pullArticle();
    },
}

function toReadTime(v) {
    var date = new Date(v);  // 参数需要毫秒数，所以这里将秒数乘于 1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s
}
</script>

<style>
.text-box {
    float: right;
    font-size: 2em;
}

.logo-div {
    width: 200px;
    height: 120px;
    background-image: url(../assets/logo.svg);
}

.homegap {
    width: 100%;
    height: 20px;
}

el-card {
    border: none;
}

.homepage-header {
    text-align: left;
    font-size: 30px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.logo-img {
    width: 250px;
    height: 50px;

}

#detailpage img {
    width: 50%;
    /* height: ; */
    margin: 10px auto;
}
</style>