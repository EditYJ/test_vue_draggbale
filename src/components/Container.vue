<template>
  <el-container style="height:100%;">
    <el-aside>
      <p>当前选中数据</p>
      <pre>{{selectWidgetString}}</pre>
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
        v-model="app.centerDataList"
        v-bind="mainDragOptions"
        :move="onMove"
        @add="handleWidgetAdd"
      >
        <transition-group name="no" class="list-group" tag="ul">
          <li
            class="list-group-item"
            v-for="(element,index) in app.centerDataList"
            :class="{active: app.selectWidget.key == element.key}"
            :style="`margin-top: ${element.options.marginTop}px;margin-bottom: ${element.options.marginBottom}px;float:left;`"
            :key="`${index}_${element.type}`"
            @click="handleSelectWidget(index)"
          >
            <img width="100%" :src="element.imgSrc" alt="占位图" srcset />
            <el-button
              title="删除"
              @click.stop="handleWidgetDelete(index)"
              class="widget-action-delete"
              v-if="app.selectWidget.key == element.key"
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
              v-if="app.selectWidget.key == element.key"
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
        <widget-config v-show="configTab=='only'"></widget-config>
        <general-settings v-show="configTab=='all'"></general-settings>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";
import WidgetConfig from "./WidgetConfig";
import GeneralSettings from "./GeneralSettings";
import leftWeidgetList from "./provider/LeftWeidgetList";
import { makeKey, copyObj } from "./util/common";

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
      configTab: "only",
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    // 处理组件添加到主容器事件
    handleWidgetAdd(event) {
      console.info("添加事件event打印==>>", event);
      const newIndex = event.newIndex;
      this.app.setPrimaryKey(newIndex); //为拖拽到容器的元素添加唯一 key
      this.app.setSelectWidget(newIndex); // 指定当前选择为新加入的组件
    },

    //处理选中事件
    handleSelectWidget(index) {
      console.log(`选中第 ${index} 个`);
      this.app.setSelectWidget(index);
    },

    // 处理移动事件
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
      console.log(`删除: ${index}`);
      // 如果删除的是最后一个组件(自动选择删除组件的上一个)
      if (this.app.centerDataList.length - 1 === index) {
        // 如果只有一个组件
        if (index === 0) {
          this.app.setSelectWidget();
        } else {
          this.app.setSelectWidget(index - 1);
        }
      } else {
        // 自动选择删除组件的下一个
        this.app.setSelectWidget(index + 1);
      }
      this.app.centerDataList.splice(index, 1);
    },

    // 复制选中组件(包含内容) 并在粘贴在下方
    handleWidgetClone(index) {
      console.info("复制: ", index);
      // 复制后仅有key变了
      let cloneData = {
        ...copyObj(this.app.centerDataList[index]),
        key: makeKey()
      };
      this.app.centerDataList.splice(index + 1, 0, cloneData);
      this.app.setSelectWidget(index + 1);
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

    ////////////////////==数据展示部分==////////////////////
    listString() {
      return JSON.stringify(this.leftWeidgetList, null, 2);
    },
    centerDataListString() {
      return JSON.stringify(this.app.centerDataList, null, 2);
    },
    generalSettingsDataString() {
      return JSON.stringify(this.app.generalSettingsData, null, 2);
    },
    selectWidgetString() {
      return JSON.stringify(this.app.selectWidget, null, 2);
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