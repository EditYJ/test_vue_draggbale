import { makeKey, copyObj } from "../util/common";

export default {
  data() {
    return {
      // 总体设置数据
      generalSettingsData: {
        indexPageName: "",
        indexId: ""
      },
      //当前选中组件数据
      selectWidget: {},
      // 主体组合组件配置信息
      centerDataList: []
    };
  },
  methods: {
    ////////////////////==总体设置部分==////////////////////
    setGeneralIndexPageName(title) {
      console.log("设置表单属性-主页名称==>>", title);
      this.generalSettingsData.indexPageName = title;
    },
    setGeneralindexId(index) {
      console.log("设置表单属性-排序==>>", index);
      this.generalSettingsData.indexId = index;
    },

    ////////////////////==主体部分==////////////////////

    //给数组的某一项添加唯一key 记录自己的祖先key
    //index => 数组索引
    //dataList => 需要设置的数组，默认centerDataList
    setPrimaryKey(index, dataList = this.centerDataList) {
      const key = makeKey(); //
      this.$set(dataList, index, {
        ...copyObj(dataList[index]),
        key,
        model: dataList[index].type + "_" + key
      });
    },

    //从某个数组选中index索引的项 设定为当前选中组件
    //index => 数组索引
    //fromDataList => 数据来源，默认centerDataList
    setSelectWidget(index, fromDataList = this.centerDataList) {
      console.log("设定当前选中组件==>>", index);
      if (index === undefined) {
        this.selectWidget = {};
      } else {
        this.selectWidget = fromDataList[index];
      }
    },

    //传入key 和图片地址 改变组件展示图片
    changeWidgetShowImg(key, imgUrl) {
      this.centerDataList.forEach(element => {
        if (element.key === key) {
          element.imgSrc = imgUrl;
        }
      });
    },

    // 传入导航个数 产生对应数量的设置项
    changeNavOptionListNum(num) {
      this.selectWidget.options.dataList.length = 0;
      for (let i = 0; i < num; i++) {
        this.selectWidget.options.dataList.push({});
      }
    }
  }
};
