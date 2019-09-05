<template>
  <el-container v-if="show" class="widget-config">
    <el-form label-position="left" label-width="80px" style="width:100%">
      <div class="general-heading">
        <h3 style="margin-bottom: 10px">组件类型：{{ app.selectWidget.name }}</h3>
        <el-row>
          <el-form-item label="上边距：">
            <el-slider v-model="app.selectWidget.options.marginTop" show-input style="width: 70%;"></el-slider>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="下边距：">
            <el-slider v-model="app.selectWidget.options.marginBottom" show-input style="width: 70%;"></el-slider>
          </el-form-item>
        </el-row>
      </div>
      <nav-widget-edit v-if="app.selectWidget.type ==='navigation_widget'"></nav-widget-edit>
    </el-form>
  </el-container>
</template>

<script>
import NavWidgetEdit from "./EditComponents/NavWidgetEdit";

export default {
  components: {
    NavWidgetEdit
  },
  inject: ["app"],
  computed: {
    show() {
      if (this.app.selectWidget && Object.keys(this.app.selectWidget).length > 0) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss">
.widget-config {
  .general-heading {
    border-bottom: 1px solid #e4e4e4;
  }
}
</style>
