<template>
  <div class="nav-widget-edit">
    <div class="widget-item">
      <h4>导航数目选择</h4>
      <div>
        <el-radio-group
          v-model="app.selectWidget.options.navNum"
          @change="navNumChangeCallBack"
          size="medium"
        >
          <el-radio-button :label="4">4个导航项</el-radio-button>
          <el-radio-button :label="8">8个导航项</el-radio-button>
          <el-radio-button :label="16">16个导航项</el-radio-button>
        </el-radio-group>
      </div>
      <h4>组件背景图(选填)</h4>
      <el-button type="primary" plain size="small">
        上传背景图
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>
    <div class="widget-item">
      <h4>
        具体设置
        <el-button-group style="float:right">
          <el-button type="success" @click="editContent">编辑</el-button>
          <el-button type="primary" @click="confirmContent">确认</el-button>
        </el-button-group>
        <el-button style="float:right;margin-right:15px;" type="danger" plain @click="resetContent">重置</el-button>
      </h4>

      <el-table :data="app.selectWidget.options.dataList" style="width: 100%;">
        <el-table-column prop="name" label="名称" width="150" header-align="center">
          <template slot-scope="item">
            <el-input v-model="item.row.name" :disabled="app.selectWidget.isConfirm"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="iconImg" label="icon图标" width="100" header-align="center">
          <template>
            <el-button type="primary" plain size="small" :disabled="app.selectWidget.isConfirm">
              上 传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sortId" width="60" label="排序" header-align="center">
          <template slot-scope="item">
            <el-input-number
              style="width:50px;"
              size="small"
              :min="0"
              :max="16"
              :controls="false"
              controls-position="right"
              v-model="item.row.sortId"
              :disabled="app.selectWidget.isConfirm"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="modelRouteUrl" label="模块路由地址" header-align="center">
          <template slot-scope="item">
            <el-input v-model="item.row.modelRouteUrl" :disabled="app.selectWidget.isConfirm"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { isNumber, isEmpty, popNotify } from "../util/common";
export default {
  inject: ["app"],
  data() {
    return {
      navNumRadio: 8,
      isDisabled: false
    };
  },
  mounted() {
    this.app.changeNavOptionListNum(this.app.selectWidget.options.navNum);
  },
  methods: {
    // 根据不同的类型更改表现和设置项
    navNumChangeCallBack(val) {
      let tempUrl = require("../../assets/imgs/Nav_Eight.png");
      switch (val) {
        case 4:
          tempUrl = require("../../assets/imgs/Nav_Four.png");
          break;
        case 8:
          tempUrl = require("../../assets/imgs/Nav_Eight.png");
          break;
        case 16:
          tempUrl = require("../../assets/imgs/Nav_Sixteen.png");
          break;
      }
      this.app.changeNavOptionListNum(val);
      this.app.changeWidgetShowImg(this.app.selectWidget.key, tempUrl);
      this.app.setSelectWidgetConfirm(false)
    },

    // 确认按钮，确认具体设置
    confirmContent() {
      console.log("确认总体设置...");
      // 校验数据
      this.app.selectWidget.options.dataList.forEach(val => {
        try {
          isEmpty(val.name, val.sortId, val.modelRouteUrl); // 校验是否为空值
          isNumber(val.sortId); // 校验数字
        } catch (e) {
          switch (e.message) {
            case "null_message":
              popNotify(this, "数据校验", "请将信息输入完整！", "warning", 150);
              throw "存在空值！";
            case "not_a_number":
              popNotify(this, "数据校验", "排序索引应该是个数字！", "warning", 150);
              throw "sortId应该是个数字";
          }
        }
      });
      this.app.setSelectWidgetConfirm(true)
    },

    // 编辑按钮，编辑具体设置
    editContent() {
      console.log("编辑总体设置...");
      this.app.setSelectWidgetConfirm(false)
    },

    //重置按钮
    resetContent() {
      this.app.resetSelectWidgetContent()
    }
  }
};
</script>

<style lang="scss">
.nav-widget-edit {
  .widget-item {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 15px;
    h4 {
      margin: 15px 0;
    }
  }
}
</style>