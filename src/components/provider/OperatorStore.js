export default {
  data() {
    return {
      // 总体设置
      generalSettingsData: {
        indexPageName: "",
        indexId: ""
      },
      // 主体组合组件配置信息
      centerDataList: [],
    };
  },
  methods: {
    getTestInfo() {
      this.testInfo = "你好玩";
    }
  },
  // mounted() {
  //   this.getTestInfo();
  // }
};
