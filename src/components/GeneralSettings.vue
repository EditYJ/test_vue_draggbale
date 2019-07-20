<template>
  <div class="form-config-container">
    <el-form label-position="left">
      <el-form-item label="主页名称">
        <el-input v-model="data.indexPageName"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="data.indexId"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>