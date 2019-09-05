<template>
  <div class="nav-widget-edit">
    <h4>导航数目选择</h4>
    <div style="margin-top: 15px">
      <el-radio-group v-model="app.selectWidget.options.navNum" @change="navNumChangeCallBack" size="medium">
        <el-radio-button :label="4">4个导航项</el-radio-button>
        <el-radio-button :label="8">8个导航项</el-radio-button>
        <el-radio-button :label="16">16个导航项</el-radio-button>
      </el-radio-group>
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
  methods:{
    navNumChangeCallBack(val){
      let tempUrl = require("../../assets/imgs/Nav_Eight.png");
      switch (val) {
        case 4:
          tempUrl = require("../../assets/imgs/Nav_Four.png")
          break;
        case 8:
          tempUrl = require("../../assets/imgs/Nav_Eight.png")
          break;
        case 16:
          tempUrl = require("../../assets/imgs/Nav_Sixteen.png")
          break;
      }
      this.app.changeWidgetShowImg(this.app.selectWidget.key, tempUrl)
    }
  }
};
</script>

<style lang="scss">
.nav-widget-edit {
  h4 {
    margin-top: 15px;
  }
}
</style>