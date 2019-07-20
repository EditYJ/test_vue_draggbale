<template>
  <div v-if="show">
    <el-form label-position="left">
      <h3 style="margin-bottom: 10px">组件类型：{{ data.type }}</h3>
      <div>
        <span>设置上边距</span>
        <el-slider v-model="data.options.marginTop" show-input></el-slider>
      </div>
      <div>
        <span>设置下边距</span>
        <el-slider v-model="data.options.marginBottom" show-input></el-slider>
      </div>
    </el-form>
  </div>
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
