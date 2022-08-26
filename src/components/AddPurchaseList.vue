<template>
  <div id="add-main">
    <div class="add-header">
      <h4>采购单基本信息</h4>
    </div>
    <el-form :inline="true" :model="purchaselist" class="demo-form-inline">
      <el-form-item label="负责人工号">
        <el-input v-model="purchaselist.staffId" placeholder="工号" />
      </el-form-item>
      <el-form-item label="采购日期">
        <el-date-picker v-model="purchaselist.date" type="date" placeholder="Pick a day" />
      </el-form-item>
      <el-form-item label="采购总额">
        <el-input v-model.lazy="purchaselist.cost" />
      </el-form-item>
      <el-form-item label="备注" :span="3">
        <el-input v-model="purchaselist.comment" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div class="add-header">
      <h4>采购物品详情</h4>
    </div>
    <div id="add-items" v-for="(item, index) in purchaselistitem" :key="index">
      <h4>采购物品{{ index + 1 }}</h4>
      <el-form :inline="true" :label-position="left">
        <el-form-item label="产品号">
          <el-input v-model="item.itemid" placeholder="itemid" />
        </el-form-item>
        <el-form-item label="采购数量">
          <el-input v-model.number="item.itemCount" placeholder="itemCount" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="item.purchaseListItemType">
            <el-option label="医疗器械" value="MedicalEquipment" />
            <el-option label="医药" value="Medicine" />
          </el-select>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model.number="item.price" placeholder="price" />
        </el-form-item>
        <el-form-item label="生产商">
          <el-input v-model="item.producer" placeholder="producer" />
        </el-form-item>
        <!-- </el-form>
      <el-form :inline="true"> -->
        <el-form-item label="物品说明">
          <el-input v-model="item.description" placeholder="description" style="width: 400px;" />
        </el-form-item>
      </el-form>
    </div>
    <el-form>
      <el-form-item :inline="true">
        <el-button v-if="purchaselistitem.length != 1" @click="removeItem()" type="danger">删除该项</el-button>
        <el-button @click="addItem" type="success">添加新项</el-button>
        <el-button @click="submitAll">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'AddPurchaseList',
  emits: ["submit"],
  data() {
    return {
      purchaselistitem: [
        {
          itemid: "",
          purchaseListItemType: "",
          price: 0,
          itemCount: 0,
          producer: "",
          description: "",
        },
      ],
      purchaselist: {
        date: null,
        cost: 0,
        staffId: "",
        comment: "",
        purchaseListItems: [],
      },
    };
  },
  methods: {
    computeCost() {
      let ccost = 0;
      this.purchaselistitem.forEach((element) => {
        ccost += element.price * element.itemCount;
      });
      this.purchaselist.cost = ccost;
      console.log("计算cost");
    },
    addItem() {
      let statusType = false;
      this.purchaselistitem.forEach((element) => {
        if (
          element.itemid !== "" &&
          element.purchaseListItemType !== "" &&
          element.price !== 0 &&
          element.itemCount !== 0 &&
          element.producer !== "" &&
          element.description !== ""
        ) {
          statusType = true;
        } else {
          this.$message({
            message: "请完善信息后添加",
            type: "warning",
          });
        }
      });
      if (statusType) {
        this.purchaselistitem.push({
          itemid: "",
          purchaseListItemType: "",
          price: null,
          itemCount: null,
          producer: "",
          description: "",
        });
      }
      this.computeCost();
      console.log("添加");
    },
    removeItem() {
      this.purchaselistitem.splice(this.purchaselistitem.length - 1, 1);
      this.$message({
        message: "删除成功",
        type: "success",
      });
      // console.log(this.purchaselistitem);
    },
    submitAll() {
      if (this.purchaselist.date == null || this.purchaselist.cost == 0 || this.purchaselist.staffId == "" || this.purchaselist.comment == "") {
        this.$message({
          message: '请完整填写信息',
          type: 'warning'
        });
        return;
      }
      this.purchaselist.purchaseListItems = this.purchaselistitem;
      console.log(this.purchaselist.purchaseListItems[0].price, 'submitALL');
      this.$emit("submit", this.purchaselist);
    },
  },
};
</script>

<style>
.add-header {
  border-left: 4px solid #39a9ff;
  padding-left: 8px;
  line-height: initial;
  font-size: initial;
  margin-top: 10px;
  margin-bottom: 10px;
}

.add-main {
  background-color: #fff;
}
</style>