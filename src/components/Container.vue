<template>
  <el-container style="height:100%;">
    <el-aside></el-aside>
    <!-- 左侧内容 -->
    <el-aside class="left-container">
      <div class="widget-group-title">布局一</div>
      <draggable
        class="list-group"
        tag="ul"
        :list="list"
        v-bind="leftDragOptions"
        :move="onMove"
        @start="isDragging=true"
        @end="isDragging=false"
      >
        <transition-group type="transition" :name="'flip-list'">
          <li v-for="element in list" :key="element.order">
            <img width="100%" :src="element.src" alt="占位图" srcset />
          </li>
        </transition-group>
      </draggable>
    </el-aside>
    <!-- 主体内容 -->
    <el-aside style="width:450px" class="center-container">
      <draggable element="span" v-model="list2" v-bind="mainDragOptions" :move="onMove">
        <transition-group name="no" class="list-group" tag="ul">
          <li class="list-group-item" v-for="element in list2" :key="element.order">
            <img width="100%" :src="element.src" alt="占位图" srcset />
          </li>
        </transition-group>
      </draggable>
    </el-aside>
    <el-container style="background:blue">
      <pre>{{listString}}</pre>
      <pre>{{list2String}}</pre>
    </el-container>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";
const images = [
  "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type01",
  "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type02",
  "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type03",
  "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type04",
  "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type05",
  "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type06",
  "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type07",
  "https://dummyimage.com/750x400/cccccc/ffffff.png&text=Type08"
];
export default {
  name: "hello",
  components: {
    draggable
  },
  data() {
    return {
      list: images.map((src, index) => {
        return { src, order: index + 1 };
      }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      console.log(relatedContext, draggedContext);
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  computed: {
    leftDragOptions() {
      return {
        animation: 200, // number 单位：ms，定义排序动画的时间；
        group: { name: "description", pull: "clone", put: false },
        sort: true,
        disabled: !this.editable, // 为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，
        ghostClass: "ghost" // 此配置项就是来给这个影子单元添加一个class，
      };
    },
    mainDragOptions() {
      return {
        animation: 200, // number 单位：ms，定义排序动画的时间；
        group: { name: "description", pull: "clone", put: true },
        disabled: !this.editable, // 为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，
        ghostClass: "ghost" // 此配置项就是来给这个影子单元添加一个class，
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style lang="scss">
@import "../style/cover_el.scss";
@import "../style/index.scss";
</style>