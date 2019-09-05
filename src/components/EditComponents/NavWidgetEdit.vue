<template>
  <div class="nav-widget-edit">
    <h4>导航数目选择{{app.testInfo}}</h4>
    <div style="margin-top: 15px">
      <el-radio-group v-model="data.options.navNum" size="medium">
        <el-radio-button :label="4">4个导航项</el-radio-button>
        <el-radio-button :label="8">8个导航项</el-radio-button>
        <el-radio-button :label="16">16个导航项</el-radio-button>
      </el-radio-group>
    </div>
    <button @click="changeVlue">改变值</button>
  </div>
</template>

<script>
export default {
  props: ["data"],
  inject: ["app"],
  data() {
    return {
      navNumRadio: 8
    };
  },
  methods:{
    changeVlue(){
      this.app.getTestInfo()
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