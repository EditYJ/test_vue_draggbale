<template>
  <el-container>
    <!-- 组件选择区域 -->
    <el-aside>
      <div class="components-list">
        <div class="widget-group-title">一排4个或者轮播8个</div>
        <!-- 拖动复制，禁止外部拖入，禁止拖动排序 -->
        <draggable
          element="ul"
          :list="basicComponents"
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          <li class="widget-edit-label"  v-for="(item, index) in basicComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </div>
    </el-aside>
    <!-- 预览区 -->
    <el-aside class="center-container" style="width:750px" direction="vertical">
      <el-header class="title-bar">
        <h3>
          <i class="el-icon-view"></i> 手机预览
        </h3>
      </el-header>
      <el-main>
        <main-weidget ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></main-weidget>
      </el-main>
    </el-aside>
    <!-- 组件设置区 -->
    <el-container style="width: 500px;"></el-container>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";
import MainWeidget from "./MainWeidget"
export default {
  name: "demo",
  components: {
    draggable,
    MainWeidget
  },
  data() {
    return {
      basicComponents: [
        {
          type: "input",
          name: "单行文本",
          icon: "regular/keyboard",
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            dataType: "string",
            pattern: ""
          }
        },
        {
          type: "textarea",
          name: "多行文本",
          icon: "regular/keyboard",
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            pattern: ""
          }
        }
      ],
            widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top'
        },
      },
      widgetFormSelect:null
    };
  },
  methods: {
    handleMoveEnd(evt) {
      console.log("end", evt);
    },
    handleMoveStart({ oldIndex }) {
      console.log("start", oldIndex, this.basicComponents);
    },
    handleMove() {
      return true;
    }
  }
};
</script>

<style lang="scss">
@import "../style/cover_el.scss";
@import "../style/index.scss";
</style>
