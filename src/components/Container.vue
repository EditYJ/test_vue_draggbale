<template>
  <el-container style="height:100%;">
    <el-aside>
      <p>主体数据</p>
      <pre>{{centerDataListString}}</pre>
      <p>总体设置数据</p>
      <pre>{{generalSettingsDataString}}</pre>
    </el-aside>

    <!-- 左侧内容 -->
    <el-aside class="left-container" style="width:450px">
      <div v-for="item in leftWeidgetList" :key="item.title">
        <div class="widget-group-title">{{item.title}}</div>
        <draggable
          class="list-group"
          tag="ul"
          :list="item.list"
          v-bind="leftDragOptions"
          :move="onMove"
          @start="isDragging=true"
          @end="isDragging=false"
        >
          <transition-group type="transition" :name="'flip-list'">
            <li v-for="(element) in item.list" :key="element.type">
              <img width="100%" :src="element.imgSrc" alt="占位图" srcset />
            </li>
          </transition-group>
        </draggable>
      </div>
    </el-aside>

    <!-- 主体内容 -->
    <el-aside style="width:450px" class="center-container">
      <draggable
        element="span"
        v-model="centerDataList"
        v-bind="mainDragOptions"
        :move="onMove"
        @add="handleWidgetAdd"
      >
        <transition-group name="no" class="list-group" tag="ul">
          <li
            class="list-group-item"
            v-for="(element,index) in centerDataList"
            :class="{active: selectWidget.key == element.key}"
            :style="`margin-top: ${element.options.marginTop}px;margin-bottom: ${element.options.marginBottom}px;float:left;`"
            :key="element.key"
            @click="handleSelectWidget(index)"
          >
            <img width="100%" :src="element.imgSrc" alt="占位图" srcset />
            <el-button
              title="删除"
              @click.stop="handleWidgetDelete(index)"
              class="widget-action-delete"
              v-if="selectWidget.key == element.key"
              circle
              plain
              type="danger"
            >
              <icon name="regular/trash-alt" style="width: 12px;height: 12px;"></icon>
            </el-button>
            <el-button
              title="复制"
              @click.stop="handleWidgetClone(index)"
              class="widget-action-clone"
              v-if="selectWidget.key == element.key"
              circle
              plain
              type="primary"
            >
              <icon name="regular/clone" style="width: 12px;height: 12px;"></icon>
            </el-button>
          </li>
        </transition-group>
      </draggable>
    </el-aside>

    <!-- 设置部分 -->
    <el-container class="right-container">
      <el-header height="45px">
        <div
          class="config-tab"
          :class="{active: configTab=='only'}"
          @click="handleConfigSelect('only')"
        >字段属性</div>
        <div
          class="config-tab"
          :class="{active: configTab=='all'}"
          @click="handleConfigSelect('all')"
        >表单属性</div>
      </el-header>
      <el-main>
        <widget-config v-show="configTab=='only'" :data="selectWidget"></widget-config>
        <general-settings v-show="configTab=='all'" :data="app.generalSettingsData"></general-settings>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";
import WidgetConfig from "./WidgetConfig";
import GeneralSettings from "./GeneralSettings";
import leftWeidgetList from "./provider/LeftWeidgetList";

// 生成唯一Key
function makeKey() {
  return Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
}
export default {
  name: "hello",
  inject: ["app"],
  components: {
    draggable,
    WidgetConfig,
    GeneralSettings
  },
  data() {
    return {
      leftWeidgetList: leftWeidgetList,
      centerDataList: [],
      configTab: "only",
      isDragging: false,
      delayedDragging: false,
      selectWidget: ""
    };
  },
  methods: {
    // 处理组件添加到主容器事件
    handleWidgetAdd(event) {
      console.info("添加事件数据", event);
      const key = makeKey();
      const newIndex = event.newIndex;
      //为拖拽到容器的元素添加唯一 key
      this.$set(this.centerDataList, newIndex, {
        ...this.centerDataList[newIndex],
        options: {
          ...this.centerDataList[newIndex].options
        },
        key,
        model: this.centerDataList[newIndex].type + "_" + key
      });
      // 指定当前选择为新加入的组件
      this.selectWidget = this.centerDataList[newIndex];
    },

    //处理选中事件
    handleSelectWidget(index) {
      console.log("选中第" + index + "个");
      this.selectWidget = this.centerDataList[index];
    },

    onMove({ relatedContext, draggedContext }) {
      console.log(relatedContext, draggedContext);
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },

    // 删除选中组件
    handleWidgetDelete(index) {
      console.info("删除: ", index);
      // 如果删除的是最后一个组件(自动选择删除组件的上一个)
      if (this.centerDataList.length - 1 === index) {
        // 如果只有一个组件
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.centerDataList[index - 1];
        }
      } else {
        // 自动选择删除组件的下一个
        this.selectWidget = this.centerDataList[index + 1];
      }
      // this.$nextTick(() => {
      this.centerDataList.splice(index, 1);
      // });
    },

    // 复制选中组件(包含内容) 并在粘贴在下方
    handleWidgetClone(index) {
      console.info("复制: ", index);
      // 复制后仅有key变了
      let cloneData = {
        ...this.centerDataList[index],
        options: { ...this.centerDataList[index].options },
        key: makeKey()
      };
      this.centerDataList.splice(index + 1, 0, cloneData);
      this.selectWidget = this.centerDataList[index + 1];
    },

    // 切换配置页面
    handleConfigSelect(value) {
      this.configTab = value;
    }
  },
  computed: {
    leftDragOptions() {
      return {
        animation: 200, // number 单位：ms，定义排序动画的时间；
        group: { name: "description", pull: "clone", put: false },
        sort: false,
        ghostClass: "ghost" // 此配置项就是来给这个影子单元添加一个class，
      };
    },
    mainDragOptions() {
      return {
        animation: 200, // number 单位：ms，定义排序动画的时间；
        group: { name: "description", pull: "clone", put: true },
        ghostClass: "ghost" // 此配置项就是来给这个影子单元添加一个class，
      };
    },
    listString() {
      return JSON.stringify(this.leftWeidgetList, null, 2);
    },
    centerDataListString() {
      return JSON.stringify(this.centerDataList, null, 2);
    },
    generalSettingsDataString() {
      return JSON.stringify(this.app.generalSettingsData, null, 2);
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