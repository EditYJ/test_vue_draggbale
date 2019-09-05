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
          <el-button type="success">编辑</el-button>
          <el-button type="primary">确认</el-button>
        </el-button-group>
        <el-button style="float:right;margin-right:15px;" type="danger" plain>重置</el-button>
      </h4>

      <el-table :data="app.selectWidget.options.dataList" style="width: 100%">
        <el-table-column prop="name" label="名称" width="150">
          <template slot-scope="item">
            <el-input v-model="item.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="iconImg" label="icon图标" width="100">
          <template>
            <el-button type="primary" plain size="small">
              上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sortId" width="100" label="排序">
          <template slot-scope="item">
            <el-input type="number" v-model="item.row.sortId"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="modelRouteUrl" label="模块路由地址">
          <template slot-scope="item">
            <el-input v-model="item.row.modelRouteUrl"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["app"],
  data() {
    return {
      navNumRadio: 8
    };
  },
  mounted() {
    console.log("update");
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