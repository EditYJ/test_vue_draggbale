<template>
  <el-container style="width:100%">
    <el-form label-position="left" label-width="90px" style="width:100%">
      <el-form-item label="主页名称：">
        <el-input :value="app.generalSettingsData.indexPageName" @input="val=>{app.setGeneralIndexPageName(val)}" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input :value="app.generalSettingsData.indexId" @input="val=>{app.setGeneralindexId(val)}" style="width:70%"></el-input>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  inject: ["app"],

};
</script>