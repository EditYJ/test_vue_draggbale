<template>
  <div class="main-weidget-container">
    <el-form>
      <draggable
        class="widget-list"
        v-model="data.list"
        :options="{group:'people', ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >
        <template v-for="(element, index) in data.list">
          <widget-form-item
            v-if="element && element.key"
            :key="element.key"
            :element="element"
            :select.sync="selectWidget"
            :index="index"
            :data="data"
          ></widget-form-item>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import WidgetFormItem from "./MainWeidgetItem";

export default {
  components: {
    Draggable,
    WidgetFormItem
  },
  props: ["data", "select"],
  data() {
    return {
      selectWidget: this.select
    };
  },
  methods: {
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log("index", newIndex, oldIndex);
    },
    handleWidgetAdd(evt) {
      console.log("add", evt);
      console.log("end", evt);
      const newIndex = evt.newIndex;
      const to = evt.to;
      console.log(to);
      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options
        },
        key,
        model: this.data.list[newIndex].type + "_" + key,
        rules: []
      });
      this.selectWidget = this.data.list[newIndex];
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
