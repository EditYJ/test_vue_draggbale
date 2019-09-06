
// 左侧组件初始化数据
const leftWeidgetList = [
  {
    title: "示例组件",
    list: [
      {
        name: "示例组件1",
        type: "type01",
        imgSrc: "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type01",
        options: {
          marginTop: 0,
          marginBottom: 0,
          anythingElse: {}
        }
      },
      {
        name: "示例组件2",
        type: "type02",
        imgSrc: "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type02",
        options: {
          marginTop: 0,
          marginBottom: 0,
          anythingElse: {}
        }
      },
      {
        name: "示例组件3",
        type: "type03",
        imgSrc: "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type03",
        options: {
          marginTop: 0,
          marginBottom: 0,
          anythingElse: {}
        }
      },
      {
        name: "示例组件4",
        type: "type04",
        imgSrc: "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type04",
        options: {
          marginTop: 0,
          marginBottom: 0,
          anythingElse: {}
        }
      }
    ]
  },
  {
    title: "导航组件",
    list: [
      { 
        name: "导航组件",
        type: "navigation_widget",
        imgSrc: require("../../assets/imgs/Nav_Eight.png"),
        isConfirm: false,
        options: {
          marginTop: 0,
          marginBottom: 0,
          navNum: 8,
          dataList:[{},{},{},{},{},{},{},{}]
        }
      }
    ]
  }
];

export default leftWeidgetList;
