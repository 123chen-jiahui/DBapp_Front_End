<template>
    <v-container>
        <view-intro heading="采购管理" />
        <div>
            <el-form :inline="true" :label-position="left">
                <el-form-item>
                    <el-input placeholder="请输入内容" v-model="searchcontent" class="input-with-select"
                        style="text-align:left">
                        <el-select v-model="searchoption" slot="prepend">
                            <el-option label="查看全部" value="1"></el-option>
                            <el-option label="采购单编号" value="2"></el-option>
                            <el-option label="负责人编号" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="showList()"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item style="text-align:right">
                    <el-button icon="el-icon-upload2" @click="createNewList()" style="float: right;">创建新的采购单</el-button>
                </el-form-item>
                <el-button style="float: right;" v-if="!showlists" @click="showList()">返回</el-button>
            </el-form>
        </div>

        <el-table :data="purchaselist" border height="auto" style="width:100%" v-if="showlists">
            <!-- <el-table-column prop="id" label="编号" ></el-table-column> -->
            <el-table-column prop="date" label="创建日期"></el-table-column>
            <el-table-column prop="cost" label="采购总额"></el-table-column>
            <el-table-column prop="staffId" label="责任人"></el-table-column>
            <el-table-column prop="comment" label="备注"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showDetail(scope.$index)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="!showsubmit">
            <div id="detail" v-if="!showlists">
                <el-descriptions class="margin-top" title="采购单详情" :column="3" border :label-position="left">
                    <el-descriptions-item span="3">
                        <template slot="label">
                            <i class="el-icon-more"></i>
                            采购单编号
                        </template>
                        {{ detailcontent.id }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-date"></i>
                            创建日期
                        </template>
                        {{ detailcontent.date }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            负责人
                        </template>
                        {{ detailcontent.staffId }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-money"></i>
                            总金额
                        </template>
                        {{ detailcontent.cost }}
                    </el-descriptions-item>
                    <el-descriptions-item span="3">
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            备注
                        </template>
                        {{ detailcontent.comment }}
                    </el-descriptions-item>
                </el-descriptions>
                <div class="add-header">
                    <h4>采购品详情</h4>
                </div>
                <el-table :data="detailcontent.purchaseListItems" border height="auto" style="width:100%">
                    <el-table-column prop="itemid" label="物品编号"></el-table-column>
                    <el-table-column prop="name" label="物品名称"></el-table-column>
                    <el-table-column prop="price" label="单价"></el-table-column>
                    <el-table-column prop="itemCount" label="采购数量"></el-table-column>
                    <el-table-column prop="producer" label="生产商"></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                </el-table>
            </div>
        </div>
        <div v-if="showsubmit">
            <AddPurchaseList @submit="(submitNewP(pl))" />
        </div>

    </v-container>
</template>

<script>
import axios from 'axios'
import AddPurchaseList from '../components/AddPurchaseList.vue';

export default {
    components: { AddPurchaseList },
    name: "PurchaseList",
    data() {
        return {
            showlists: true,
            showsubmit: false,
            searchoption: "",
            searchcontent: "",
            detailcontent: {},
            purchaselist: [
                {
                    id: "asdfher",
                    date: "asdfher",
                    cost: 0,
                    staffId: 200000,
                    comment: "asdfher",
                    purchaseListItems: [
                        {
                            itemid: "asdfher",
                            purchaseListItemType: "asdfher",
                            name: "asdfher",
                            price: 0,
                            itemCount: 0,
                            producer: "asdfher",
                            description: "asdfher",
                            purchaseListId: "asdfher",
                        },
                        {
                            itemid: "asdfher",
                            purchaseListItemType: "asdfher",
                            name: "asdfher",
                            price: 0,
                            itemCount: 0,
                            producer: "asdfher",
                            description: "asdfher",
                            purchaseListId: "asdfher",
                        }
                    ]
                },
            ]
        };
    },
    methods: {
        showList() {
            console.log("showList() start");
            let outerthis = this;
            this.showlists = true;
            this.showsubmit = false;
            let URL = '';
            if (this.searchoption === "2")
                URL = "/" + searchcontent;
            else if (this.searchoption === "3")
                URL = '?staffid=' + this.searchcontent;
            else { URL = '' }
            axios({
                method: "get",
                url: "/purchaselist" + URL,
            }).then(function (response) {
                if (outerthis.searchoption === "2") {
                    outerthis.purchaselist = []
                    outerthis.purchaselist.push(response.data)
                }
                else
                    outerthis.purchaselist = response.data;
                if (response.data.length === 0) {
                    outerthis.$message({
                        message: "未查询到采购单",
                    });
                }
            }).catch(() => {
                outerthis.$message({
                    message: "请求失败",
                    type: "error",
                });
            });
        },
        createNewList() {
            console.log("createNewList() start");
            this.showlists = false;
            this.showsubmit = true;
        },
        showDetail(index) {
            console.log("showDetail() start");
            this.detailcontent = this.purchaselist[index];
            this.showlists = false;
        },
        submitNewP(pl) {
            // console.log(pl);
            console.log('submitNewp() start')
            let outerthis = this
            axios({
                method: "post",
                url: "/purchaselist",
                data: pl,
            }).then(
                () => {
                    outerthis.$message({
                        message: "上传成功",
                        type: "success",
                    });
                    outerthis.showlists = true
                    outerthis.showsubmit = false
                },
                () => {
                    outerthis.$message({
                        message: "上传失败",
                        type: "error",
                    });
                }
            );
        },
    },
    mounted: () => {
        console.log("mounted");
        this.showList();
    },
}

</script>


<style>
.el-select .el-input {
    width: 100px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

.add-header {
    border-left: 4px solid #39a9ff;
    padding-left: 8px;
    line-height: initial;
    font-size: initial;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>