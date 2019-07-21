<template>
  <el-container style="width:100%">
    <el-form label-position="left" label-width="90px" style="width:100%">
      <el-form-item label="主页名称：">
        <el-input v-model="data.indexPageName" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="data.indexId" style="width:70%"></el-input>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  props: ["data"]
};
</script>