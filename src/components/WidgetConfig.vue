<template>
  <el-container v-if="show">
    <el-form label-position="left" label-width="80px" style="width:100%">
      <h3 style="margin-bottom: 10px">组件类型：{{ data.type }}</h3>
      <el-row>
        <el-form-item label="上边距：">
          <el-slider v-model="data.options.marginTop" show-input style="width: 70%;"></el-slider>
        </el-form-item>
      </el-row>

      <el-form-item label="下边距：">
        <el-slider v-model="data.options.marginBottom" show-input style="width: 70%;"></el-slider>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
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

<style>
</style>
