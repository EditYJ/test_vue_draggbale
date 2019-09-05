<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import operator_store from "./components/provider/OperatorStore";
export default {
  name: "app",
  // 混入运营主页管理模块数据管理
  mixins: [operator_store],
  //暴露全局app
  provide() {
    return {
      app: this
    };
  }
};
</script>

<style lang="scss">
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}
.fa-icon {
  width: auto;
  height: 1em; /* 或任意其它字体大小相对值 */

  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
</style>
