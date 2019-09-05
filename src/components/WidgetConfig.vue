<template>
  <el-container v-if="show" class="widget-config">
    <el-form label-position="left" label-width="80px" style="width:100%">
      <div class="general-heading">
        <h3 style="margin-bottom: 10px">组件类型：{{ data.type }}</h3>
        <el-row>
          <el-form-item label="上边距：">
            <el-slider v-model="data.options.marginTop" show-input style="width: 70%;"></el-slider>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="下边距：">
            <el-slider v-model="data.options.marginBottom" show-input style="width: 70%;"></el-slider>
          </el-form-item>
        </el-row>
      </div>
      <nav-widget-edit :data="data"></nav-widget-edit>
    </el-form>
  </el-container>
</template>

<script>
import NavWidgetEdit from "./EditComponents/NavWidgetEdit";

export default {
  components: {
    NavWidgetEdit
  },
  props: ["data"],
  data() {
    return {};
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
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
